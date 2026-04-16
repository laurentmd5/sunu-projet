"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { assertTaskAccess, ActionError, assertCanCreateTask, assertCanAssignTasks } from "@/lib/permissions";
import { sendTaskAssignmentEmail } from "@/lib/email";
import { TASK_STATUSES } from "@/lib/task-status";
import { createActivityLog } from "./activity";
import { normalizeTaskTags } from "@/lib/task-tags";
import {
    createTaskSchema,
    updateTaskStatusSchema,
    updateTaskManagementSchema,
    sendTaskToReviewSchema,
} from "@/lib/validations";

export async function createTask(input: {
    name: string;
    description: string;
    dueDate: Date | null;
    projectId: string;
    assignToEmail?: string | null;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    tags?: string[];
    teamId?: string | null;
    milestoneId?: string | null;
}) {
    const parsed = createTaskSchema.parse(input);

    if (parsed.dueDate && parsed.dueDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        throw new ActionError("La date d'échéance ne peut pas être dans le passé.", 400);
    }

    const { user } = await assertCanCreateTask(parsed.projectId);

    let assignedUserId: string | null = null;
    let assignedUserEmail: string | null = null;
    let assignedUserName: string | null = null;

    if (parsed.assignToEmail) {
        await assertCanAssignTasks(parsed.projectId);

        const assignedMembership = await prisma.projectUser.findFirst({
            where: {
                projectId: parsed.projectId,
                user: {
                    email: parsed.assignToEmail,
                },
            },
            include: {
                user: true,
            },
        });

        if (!assignedMembership) {
            throw new ActionError("Utilisateur assigné introuvable dans ce projet.", 404);
        }

        if (assignedMembership.role === "VIEWER") {
            throw new ActionError("Un observateur ne peut pas être assigné à une tâche.", 400);
        }

        assignedUserId = assignedMembership.userId;
        assignedUserEmail = assignedMembership.user.email;
        assignedUserName = assignedMembership.user.name;
    }

    // Normaliser les tags
    const normalizedTags = [...new Set((parsed.tags ?? [])
        .map(tag => tag.trim())
        .filter(Boolean))];

    // Valider teamId si fourni
    let validatedTeamId: string | null = null;
    if (parsed.teamId) {
        const team = await prisma.team.findUnique({
            where: { id: parsed.teamId },
        });

        if (!team) {
            throw new ActionError("Équipe introuvable.", 404);
        }

        if (team.projectId !== parsed.projectId) {
            throw new ActionError("L'équipe n'appartient pas à ce projet.", 400);
        }

        if (team.parentId !== null) {
            throw new ActionError("Seules les équipes racines peuvent être responsables d'une tâche.", 400);
        }

        validatedTeamId = team.id;
    }

    // Valider milestoneId si fourni
    let validatedMilestoneId: string | null = null;
    if (parsed.milestoneId) {
        const milestone = await prisma.milestone.findUnique({
            where: { id: parsed.milestoneId },
        });

        if (!milestone) {
            throw new ActionError("Jalon introuvable.", 404);
        }

        if (milestone.projectId !== parsed.projectId) {
            throw new ActionError("Le jalon n'appartient pas à ce projet.", 400);
        }

        validatedMilestoneId = milestone.id;
    }

    const newTask = await prisma.task.create({
        data: {
            name: parsed.name,
            description: parsed.description || "",
            dueDate: parsed.dueDate,
            projectId: parsed.projectId,
            createdById: user.id,
            userId: assignedUserId,
            priority: parsed.priority,
            tags: normalizedTags.length > 0 ? normalizedTags : Prisma.JsonNull,
            teamId: validatedTeamId,
            milestoneId: validatedMilestoneId,
        },
    });

    try {
        if (
            assignedUserEmail &&
            assignedUserId &&
            assignedUserId !== user.id
        ) {
            const project = await prisma.project.findUnique({
                where: { id: parsed.projectId },
                select: {
                    id: true,
                    name: true,
                },
            });

            if (project) {
                await sendTaskAssignmentEmail({
                    to: assignedUserEmail,
                    assigneeName: assignedUserName,
                    projectName: project.name,
                    projectId: project.id,
                    taskName: newTask.name,
                    dueDate: newTask.dueDate,
                });
            }
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email d'assignation :", error);
    }

    await createActivityLog({
        projectId: parsed.projectId,
        actorUserId: user.id,
        type: "TASK_CREATED",
        message: assignedUserName && assignedUserId !== user.id
            ? `${user.name} a créé la tâche "${newTask.name}" et l'a assignée à ${assignedUserName}.`
            : `${user.name} a créé la tâche "${newTask.name}".`,
        metadata: {
            taskId: newTask.id,
            assignedUserId,
            teamId: validatedTeamId,
            milestoneId: validatedMilestoneId,
            priority: parsed.priority,
            tags: normalizedTags,
        },
    });

    return newTask;
}

export async function deleteTaskById(taskId: string) {
    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                project: true,
            },
        });

        if (!task) {
            throw new ActionError("Tâche introuvable.", 404);
        }

        await assertTaskAccess(taskId);

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return { success: true, message: "Tâche supprimée avec succès." };
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la suppression de la tâche");
    }
}

export const getTaskDetails = async (taskId: string) => {
    await assertTaskAccess(taskId);

    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: true,
            user: true,
            createdBy: true,
            team: true,
            milestone: true,
            reviewedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!task) {
        throw new ActionError("Tâche non trouvée.", 404);
    }

    // Normaliser tags pour renvoyer string[] | null au lieu de JsonValue
    return {
        ...task,
        tags: normalizeTaskTags(task.tags),
    };
};

export async function sendTaskToReview(input: {
    taskId: string;
    reviewFeedback: string;
}) {
    const parsed = sendTaskToReviewSchema.parse(input);

    const { user, task } = await assertTaskAccess(parsed.taskId);

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId: user.id,
                projectId: task.projectId,
            },
        },
        select: {
            role: true,
        },
    });

    const taskWithTeam = await prisma.task.findUnique({
        where: { id: parsed.taskId },
        include: {
            project: true,
            team: true,
        },
    });

    if (!taskWithTeam) {
        throw new ActionError("Tâche introuvable.", 404);
    }

    if (taskWithTeam.status !== TASK_STATUSES.DONE) {
        throw new ActionError(
            "Seules les tâches terminées peuvent être renvoyées en revue.",
            400
        );
    }

    const isProjectOwner = taskWithTeam.project.createdById === user.id;
    const isManager = membership?.role === "MANAGER";
    const isTeamLead =
        !!taskWithTeam.team && taskWithTeam.team.leadUserId === user.id;

    if (!isProjectOwner && !isManager && !isTeamLead) {
        throw new ActionError(
            "Vous n'êtes pas autorisé à renvoyer cette tâche en revue.",
            403
        );
    }

    const updatedTask = await prisma.task.update({
        where: { id: parsed.taskId },
        data: {
            status: TASK_STATUSES.IN_REVIEW,
            reviewFeedback: parsed.reviewFeedback,
            reviewedById: user.id,
            reviewedAt: new Date(),
        },
    });

    await createActivityLog({
        projectId: taskWithTeam.projectId,
        actorUserId: user.id,
        type: "TASK_STATUS_UPDATED",
        message: `${user.name} a renvoyé la tâche "${taskWithTeam.name}" en revue.`,
        metadata: {
            taskId: taskWithTeam.id,
            previousStatus: taskWithTeam.status,
            newStatus: TASK_STATUSES.IN_REVIEW,
            reviewFeedback: parsed.reviewFeedback,
            reviewedById: user.id,
        },
    });

    return {
        success: true,
        message: "La tâche a été mise en revue avec succès.",
        task: updatedTask,
    };
}

export async function updateTaskManagement(input: {
    taskId: string;
    assignToEmail?: string | null;
    dueDate?: Date | null;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    tags?: string[];
    teamId?: string | null;
    milestoneId?: string | null;
}) {
    const parsed = updateTaskManagementSchema.parse(input);

    const { user, task } = await assertTaskAccess(parsed.taskId);

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId: user.id,
                projectId: task.projectId,
            },
        },
        select: {
            role: true,
        },
    });

    const canManageTask =
        task.project.createdById === user.id ||
        membership?.role === "MANAGER";

    if (!canManageTask) {
        throw new ActionError(
            "Seuls le propriétaire du projet ou un manager peuvent modifier la gestion de la tâche.",
            403
        );
    }

    if (parsed.dueDate && parsed.dueDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        throw new ActionError("La date d'échéance ne peut pas être dans le passé.", 400);
    }

    let nextUserId: string | null | undefined = undefined;
    let assignedUserName: string | null = null;

    if (parsed.assignToEmail !== undefined) {
        if (parsed.assignToEmail === null) {
            nextUserId = null;
        } else {
            const assignedMembership = await prisma.projectUser.findFirst({
                where: {
                    projectId: task.projectId,
                    user: {
                        email: parsed.assignToEmail,
                    },
                },
                include: {
                    user: true,
                },
            });

            if (!assignedMembership) {
                throw new ActionError("Utilisateur assigné introuvable dans ce projet.", 404);
            }

            if (assignedMembership.role === "VIEWER") {
                throw new ActionError("Un observateur ne peut pas être assigné à une tâche.", 400);
            }

            nextUserId = assignedMembership.userId;
            assignedUserName = assignedMembership.user.name;
        }
    }

    // Normaliser les tags si fournis
    let nextTags: string[] | null | undefined = undefined;
    if (parsed.tags !== undefined) {
        const normalized = [...new Set(parsed.tags
            .map(tag => tag.trim())
            .filter(Boolean))];
        nextTags = normalized.length > 0 ? normalized : null;
    }

    // Valider teamId si fourni
    let nextTeamId: string | null | undefined = undefined;
    if (parsed.teamId !== undefined) {
        if (parsed.teamId === null) {
            nextTeamId = null;
        } else {
            const team = await prisma.team.findUnique({
                where: { id: parsed.teamId },
            });

            if (!team) {
                throw new ActionError("Équipe introuvable.", 404);
            }

            if (team.projectId !== task.projectId) {
                throw new ActionError("L'équipe n'appartient pas à ce projet.", 400);
            }

            if (team.parentId !== null) {
                throw new ActionError("Seules les équipes racines peuvent être responsables d'une tâche.", 400);
            }

            nextTeamId = team.id;
        }
    }

    // Valider milestoneId si fourni
    let nextMilestoneId: string | null | undefined = undefined;
    if (parsed.milestoneId !== undefined) {
        if (parsed.milestoneId === null) {
            nextMilestoneId = null;
        } else {
            const milestone = await prisma.milestone.findUnique({
                where: { id: parsed.milestoneId },
            });

            if (!milestone) {
                throw new ActionError("Jalon introuvable.", 404);
            }

            if (milestone.projectId !== task.projectId) {
                throw new ActionError("Le jalon n'appartient pas à ce projet.", 400);
            }

            nextMilestoneId = milestone.id;
        }
    }

    const updatedTask = await prisma.task.update({
        where: { id: parsed.taskId },
        data: {
            userId: nextUserId,
            dueDate: parsed.dueDate === undefined ? undefined : parsed.dueDate,
            priority: parsed.priority,
            tags: nextTags === undefined
                ? undefined
                : (nextTags ?? Prisma.JsonNull),
            teamId: nextTeamId,
            milestoneId: nextMilestoneId,
        },
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_STATUS_UPDATED",
        message: assignedUserName
            ? `${user.name} a mis à jour la gestion de la tâche "${task.name}" et l'a assignée à ${assignedUserName}.`
            : `${user.name} a mis à jour la gestion de la tâche "${task.name}".`,
        metadata: {
            taskId: task.id,
            assignedUserId: nextUserId,
            teamId: nextTeamId,
            milestoneId: nextMilestoneId,
            priority: parsed.priority,
            tags: nextTags,
        },
    });

    return {
        success: true,
        message: "Gestion de la tâche mise à jour avec succès.",
        task: updatedTask,
    };
}

export const updateTaskStatus = async (
    taskId: string,
    newStatus: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" | "CANCELLED",
    solutionDescription?: string
) => {
    const parsed = updateTaskStatusSchema.parse({
        taskId,
        newStatus,
        solutionDescription,
    });

    const { user, task } = await assertTaskAccess(parsed.taskId);

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId: user.id,
                projectId: task.projectId,
            },
        },
        select: {
            role: true,
        },
    });

    const canUpdate =
        task.userId === user.id ||
        task.createdById === user.id ||
        task.project.createdById === user.id ||
        membership?.role === "MANAGER";

    if (!canUpdate) {
        throw new ActionError("Vous n'êtes pas autorisé à modifier cette tâche.", 403);
    }

    if (parsed.newStatus === TASK_STATUSES.IN_REVIEW) {
        throw new ActionError(
            "Utilisez l'action dédiée de mise en revue pour ce changement.",
            400
        );
    }

    let isPrivileged =
        task.project.createdById === user.id ||
        membership?.role === "MANAGER";

    if (task.teamId) {
        const team = await prisma.team.findUnique({
            where: { id: task.teamId },
            select: { leadUserId: true },
        });
        if (team?.leadUserId === user.id) {
            isPrivileged = true;
        }
    }

    if (
        task.status === TASK_STATUSES.DONE &&
        !isPrivileged
    ) {
        throw new ActionError(
            "La tâche est terminée. Seul un responsable peut la renvoyer en revue.",
            403
        );
    }

    if (
        parsed.newStatus === TASK_STATUSES.DONE &&
        !parsed.solutionDescription?.trim() &&
        !task.solutionDescription?.trim()
    ) {
        throw new ActionError(
            "Une description de solution est requise pour terminer la tâche.",
            400
        );
    }

    await prisma.task.update({
        where: { id: parsed.taskId },
        data: {
            status: parsed.newStatus,
            solutionDescription:
                parsed.newStatus === TASK_STATUSES.DONE
                    ? parsed.solutionDescription?.trim() || task.solutionDescription || null
                    : task.solutionDescription,
            reviewFeedback:
                parsed.newStatus === TASK_STATUSES.DONE
                    ? null
                    : task.reviewFeedback,
            reviewedById:
                parsed.newStatus === TASK_STATUSES.DONE
                    ? null
                    : task.reviewedById,
            reviewedAt:
                parsed.newStatus === TASK_STATUSES.DONE
                    ? null
                    : task.reviewedAt,
        },
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_STATUS_UPDATED",
        message: `${user.name} a changé le statut de la tâche "${task.name}" en "${parsed.newStatus}".`,
    });

    return { success: true, message: "Statut mis à jour avec succès." };
};
