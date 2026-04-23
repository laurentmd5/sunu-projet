"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { assertTaskAccess, ActionError, assertCanCreateTask, assertCanAssignTasks } from "@/lib/permissions";
import { sendTaskAssignmentEmail } from "@/lib/email";
import { TASK_STATUSES } from "@/lib/task-status";
import { createActivityLog } from "./activity";
import { createNotification, createNotifications } from "./notifications";
import { normalizeTaskTags } from "@/lib/task-tags";
import {
    createTaskSchema,
    updateTaskStatusSchema,
    updateTaskManagementSchema,
    sendTaskToReviewSchema,
    addTaskCommentSchema,
    routeTaskToUserSchema,
    routeTaskToSubteamSchema,
    clearTaskRoutingSchema,
} from "@/lib/validations";

function stripHtmlToText(value?: string | null) {
    if (!value) return "";
    return value
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

async function assertUserAssignableWithinResponsibleTeam(
    projectId: string,
    userId: string,
    rootTeamId: string
) {
    const rootTeam = await prisma.team.findUnique({
        where: { id: rootTeamId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
            children: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!rootTeam) {
        throw new ActionError("Équipe responsable introuvable.", 404);
    }

    if (rootTeam.projectId !== projectId) {
        throw new ActionError(
            "L'équipe responsable n'appartient pas à ce projet.",
            400
        );
    }

    if (rootTeam.parentId !== null) {
        throw new ActionError(
            "Seules les équipes racines peuvent être responsables d'une tâche.",
            400
        );
    }

    const allowedTeamIds = [rootTeam.id, ...rootTeam.children.map((child) => child.id)];

    const membership = await prisma.teamMember.findFirst({
        where: {
            userId,
            teamId: {
                in: allowedTeamIds,
            },
        },
        select: {
            teamId: true,
        },
    });

    if (!membership) {
        throw new ActionError(
            "L'utilisateur assigné doit appartenir à l'équipe responsable ou à l'une de ses sous-équipes.",
            400
        );
    }

    return {
        rootTeam,
        allowedTeamIds,
        membership,
    };
}

async function getTaskRoutingContext(taskId: string, actorUserId: string) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: true,
            team: true,
        },
    });

    if (!task) {
        throw new ActionError("Tâche introuvable.", 404);
    }

    if (!task.teamId || !task.team) {
        throw new ActionError(
            "Cette tâche n'est pas rattachée à une équipe responsable.",
            400
        );
    }

    if (task.team.parentId !== null) {
        throw new ActionError(
            "La redistribution n'est possible que pour une tâche portée par une équipe racine.",
            400
        );
    }

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId: actorUserId,
                projectId: task.projectId,
            },
        },
        select: {
            role: true,
        },
    });

    const isProjectOwner = task.project.createdById === actorUserId;
    const isManager = membership?.role === "MANAGER";
    const isRootTeamLead = task.team.leadUserId === actorUserId;

    if (!isProjectOwner && !isManager && !isRootTeamLead) {
        throw new ActionError(
            "Vous n'êtes pas autorisé à redistribuer cette tâche.",
            403
        );
    }

    return {
        task,
        membership,
        rootTeam: task.team,
        isProjectOwner,
        isManager,
        isRootTeamLead,
    };
}

async function assertUserEligibleForTaskRouting(
    projectId: string,
    userId: string,
    rootTeamId: string
) {
    const rootTeam = await prisma.team.findUnique({
        where: { id: rootTeamId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
            children: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!rootTeam) {
        throw new ActionError("Équipe racine introuvable.", 404);
    }

    if (rootTeam.projectId !== projectId) {
        throw new ActionError(
            "L'équipe racine n'appartient pas à ce projet.",
            400
        );
    }

    if (rootTeam.parentId !== null) {
        throw new ActionError(
            "La redistribution doit partir d'une équipe racine.",
            400
        );
    }

    const allowedTeamIds = [rootTeam.id, ...rootTeam.children.map((child) => child.id)];

    const teamMembership = await prisma.teamMember.findFirst({
        where: {
            userId,
            teamId: {
                in: allowedTeamIds,
            },
        },
        select: {
            id: true,
            teamId: true,
        },
    });

    if (!teamMembership) {
        throw new ActionError(
            "L'utilisateur cible doit appartenir à l'équipe racine responsable ou à une de ses sous-équipes.",
            400
        );
    }

    const projectMembership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
        select: {
            role: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!projectMembership) {
        throw new ActionError(
            "L'utilisateur cible n'appartient pas au projet.",
            400
        );
    }

    if (projectMembership.role === "VIEWER") {
        throw new ActionError(
            "Un observateur ne peut pas devenir exécutant d'une tâche redistribuée.",
            400
        );
    }

    return {
        rootTeam,
        projectMembership,
        teamMembership,
        allowedTeamIds,
    };
}

async function assertSubteamEligibleForTaskRouting(
    projectId: string,
    rootTeamId: string,
    targetTeamId: string
) {
    const rootTeam = await prisma.team.findUnique({
        where: { id: rootTeamId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
        },
    });

    if (!rootTeam) {
        throw new ActionError("Équipe racine introuvable.", 404);
    }

    if (rootTeam.projectId !== projectId) {
        throw new ActionError(
            "L'équipe racine n'appartient pas à ce projet.",
            400
        );
    }

    if (rootTeam.parentId !== null) {
        throw new ActionError(
            "La redistribution doit partir d'une équipe racine.",
            400
        );
    }

    const targetTeam = await prisma.team.findUnique({
        where: { id: targetTeamId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
            name: true,
        },
    });

    if (!targetTeam) {
        throw new ActionError("Sous-équipe cible introuvable.", 404);
    }

    if (targetTeam.projectId !== projectId) {
        throw new ActionError(
            "La sous-équipe cible n'appartient pas à ce projet.",
            400
        );
    }

    if (targetTeam.parentId !== rootTeam.id) {
        throw new ActionError(
            "La sous-équipe cible doit être rattachée à l'équipe racine responsable.",
            400
        );
    }

    return {
        rootTeam,
        targetTeam,
    };
}

async function getTaskStatusPermissionContext(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: true,
            team: true,
            routing: true,
        },
    });

    if (!task) {
        throw new ActionError("Tâche introuvable.", 404);
    }

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId: task.projectId,
            },
        },
        select: {
            role: true,
        },
    });

    const isProjectOwner = task.project.createdById === userId;
    const isManager = membership?.role === "MANAGER";
    const isCreator = task.createdById === userId;
    const isDirectAssignee = task.userId === userId;
    const isRootTeamLead = task.team?.leadUserId === userId;

    let isMemberOfRoutedSubteam = false;

    if (
        task.routing &&
        task.routing.targetType === "SUBTEAM" &&
        task.routing.targetTeamId
    ) {
        const subteamMembership = await prisma.teamMember.findUnique({
            where: {
                teamId_userId: {
                    teamId: task.routing.targetTeamId,
                    userId,
                },
            },
            select: {
                id: true,
            },
        });

        isMemberOfRoutedSubteam = !!subteamMembership;
    }

    return {
        task,
        membership,
        isProjectOwner,
        isManager,
        isCreator,
        isDirectAssignee,
        isRootTeamLead,
        isMemberOfRoutedSubteam,
    };
}

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

    if (validatedTeamId && assignedUserId) {
        await assertUserAssignableWithinResponsibleTeam(
            parsed.projectId,
            assignedUserId,
            validatedTeamId
        );
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

    let projectForNotification:
        | {
              id: string;
              name: string;
          }
        | null = null;

    try {
        if (
            assignedUserEmail &&
            assignedUserId &&
            assignedUserId !== user.id
        ) {
            projectForNotification = await prisma.project.findUnique({
                where: { id: parsed.projectId },
                select: {
                    id: true,
                    name: true,
                },
            });

            if (projectForNotification) {
                await sendTaskAssignmentEmail({
                    to: assignedUserEmail,
                    assigneeName: assignedUserName,
                    projectName: projectForNotification.name,
                    projectId: projectForNotification.id,
                    taskName: newTask.name,
                    dueDate: newTask.dueDate,
                });
            }
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email d'assignation :", error);
    }

    try {
        if (
            assignedUserId &&
            assignedUserId !== user.id
        ) {
            if (!projectForNotification) {
                projectForNotification = await prisma.project.findUnique({
                    where: { id: parsed.projectId },
                    select: {
                        id: true,
                        name: true,
                    },
                });
            }

            await createNotification({
                userId: assignedUserId,
                type: "TASK_ASSIGNED",
                title: "Nouvelle tâche assignée",
                message: projectForNotification
                    ? `${user.name} vous a assigné la tâche "${newTask.name}" dans le projet "${projectForNotification.name}".`
                    : `${user.name} vous a assigné la tâche "${newTask.name}".`,
                metadata: {
                    projectId: parsed.projectId,
                    taskId: newTask.id,
                    actorUserId: user.id,
                    teamId: validatedTeamId ?? undefined,
                },
            });
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création de la notification d'assignation :",
            error
        );
    }

    await createActivityLog({
        projectId: parsed.projectId,
        actorUserId: user.id,
        type: "TASK_CREATED",
        message:
            assignedUserName && assignedUserId !== user.id
                ? `${user.name} a créé la tâche "${newTask.name}" et l'a assignée à ${assignedUserName}.`
                : `${user.name} a créé la tâche "${newTask.name}".`,
        metadata: {
            projectId: parsed.projectId,
            taskId: newTask.id,
            actorUserId: user.id,
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
            comments: {
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
            routing: {
                include: {
                    rootTeam: true,
                    targetUser: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    targetTeam: true,
                    assignedBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
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
            projectId: taskWithTeam.projectId,
            taskId: taskWithTeam.id,
            previousStatus: taskWithTeam.status,
            newStatus: TASK_STATUSES.IN_REVIEW,
            reviewFeedback: parsed.reviewFeedback,
            reviewedById: user.id,
            actorUserId: user.id,
            teamId: taskWithTeam.teamId ?? undefined,
        },
    });

    try {
        const notificationRecipientUserId =
            taskWithTeam.userId && taskWithTeam.userId !== user.id
                ? taskWithTeam.userId
                : taskWithTeam.createdById !== user.id
                    ? taskWithTeam.createdById
                    : null;

        if (notificationRecipientUserId) {
            await createNotification({
                userId: notificationRecipientUserId,
                type: "TASK_REVIEW_REQUESTED",
                title: "Tâche renvoyée en revue",
                message: `${user.name} a renvoyé la tâche "${taskWithTeam.name}" en revue.`,
                metadata: {
                    projectId: taskWithTeam.projectId,
                    taskId: taskWithTeam.id,
                    actorUserId: user.id,
                    teamId: taskWithTeam.teamId ?? undefined,
                },
            });
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création de la notification de revue :",
            error
        );
    }

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
    const isAssignOnlyUpdate =
        Object.prototype.hasOwnProperty.call(input, "assignToEmail") &&
        !Object.prototype.hasOwnProperty.call(input, "dueDate") &&
        !Object.prototype.hasOwnProperty.call(input, "priority") &&
        !Object.prototype.hasOwnProperty.call(input, "tags") &&
        !Object.prototype.hasOwnProperty.call(input, "teamId") &&
        !Object.prototype.hasOwnProperty.call(input, "milestoneId");

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

    const isOwner = task.project.createdById === user.id;
    const isManager = membership?.role === "MANAGER";

    if (isAssignOnlyUpdate) {
        await assertCanAssignTasks(task.projectId);
    } else {
        const canManageTask = isOwner || isManager;

        if (!canManageTask) {
            throw new ActionError(
                "Seuls le propriétaire du projet ou un manager peuvent modifier la gestion complète de la tâche.",
                403
            );
        }
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

    const effectiveUserId =
        nextUserId !== undefined ? nextUserId : task.userId;

    const effectiveTeamId =
        nextTeamId !== undefined ? nextTeamId : task.teamId;

    if (effectiveTeamId && effectiveUserId) {
        await assertUserAssignableWithinResponsibleTeam(
            task.projectId,
            effectiveUserId,
            effectiveTeamId
        );
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

export async function routeTaskToUser(input: {
    taskId: string;
    targetUserId: string;
}) {
    const parsed = routeTaskToUserSchema.parse(input);

    const { user } = await assertTaskAccess(parsed.taskId);

    const { task, rootTeam } = await getTaskRoutingContext(parsed.taskId, user.id);

    const { projectMembership } = await assertUserEligibleForTaskRouting(
        task.projectId,
        parsed.targetUserId,
        rootTeam.id
    );

    const routedTask = await prisma.$transaction(async (tx) => {
        const routing = await tx.taskRouting.upsert({
            where: {
                taskId: task.id,
            },
            update: {
                rootTeamId: rootTeam.id,
                targetType: "USER",
                targetUserId: parsed.targetUserId,
                targetTeamId: null,
                assignedById: user.id,
            },
            create: {
                taskId: task.id,
                rootTeamId: rootTeam.id,
                targetType: "USER",
                targetUserId: parsed.targetUserId,
                targetTeamId: null,
                assignedById: user.id,
            },
        });

        const updatedTask = await tx.task.update({
            where: { id: task.id },
            data: {
                userId: parsed.targetUserId,
            },
        });

        return {
            routing,
            task: updatedTask,
        };
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_ROUTED_TO_USER",
        message: `${user.name} a redistribué la tâche "${task.name}" à ${projectMembership.user.name || projectMembership.user.email}.`,
        metadata: {
            projectId: task.projectId,
            taskId: task.id,
            actorUserId: user.id,
            rootTeamId: rootTeam.id,
            targetUserId: parsed.targetUserId,
            routingType: "USER",
        },
    });

    try {
        if (parsed.targetUserId !== user.id) {
            await createNotification({
                userId: parsed.targetUserId,
                type: "TASK_ROUTED_TO_USER",
                title: "Tâche redistribuée",
                message: `${user.name} vous a redistribué la tâche "${task.name}".`,
                metadata: {
                    projectId: task.projectId,
                    taskId: task.id,
                    actorUserId: user.id,
                    teamId: rootTeam.id,
                    routingType: "USER",
                },
            });
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création de la notification de redistribution utilisateur :",
            error
        );
    }

    return {
        success: true,
        message: "La tâche a été redistribuée avec succès.",
        task: routedTask.task,
        routing: routedTask.routing,
    };
}

export async function routeTaskToSubteam(input: {
    taskId: string;
    targetTeamId: string;
}) {
    const parsed = routeTaskToSubteamSchema.parse(input);

    const { user } = await assertTaskAccess(parsed.taskId);

    const { task, rootTeam } = await getTaskRoutingContext(parsed.taskId, user.id);

    const { targetTeam } = await assertSubteamEligibleForTaskRouting(
        task.projectId,
        rootTeam.id,
        parsed.targetTeamId
    );

    const routedTask = await prisma.$transaction(async (tx) => {
        const routing = await tx.taskRouting.upsert({
            where: {
                taskId: task.id,
            },
            update: {
                rootTeamId: rootTeam.id,
                targetType: "SUBTEAM",
                targetUserId: null,
                targetTeamId: targetTeam.id,
                assignedById: user.id,
            },
            create: {
                taskId: task.id,
                rootTeamId: rootTeam.id,
                targetType: "SUBTEAM",
                targetUserId: null,
                targetTeamId: targetTeam.id,
                assignedById: user.id,
            },
        });

        const updatedTask = await tx.task.update({
            where: { id: task.id },
            data: {
                userId: null,
            },
        });

        return {
            routing,
            task: updatedTask,
        };
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_ROUTED_TO_SUBTEAM",
        message: `${user.name} a redistribué la tâche "${task.name}" à la sous-équipe "${targetTeam.name}".`,
        metadata: {
            projectId: task.projectId,
            taskId: task.id,
            actorUserId: user.id,
            rootTeamId: rootTeam.id,
            targetTeamId: targetTeam.id,
            routingType: "SUBTEAM",
        },
    });

    try {
        const targetSubteamMembers = await prisma.teamMember.findMany({
            where: {
                teamId: targetTeam.id,
                userId: {
                    not: user.id,
                },
            },
            select: {
                userId: true,
            },
        });

        const uniqueRecipientIds = Array.from(
            new Set(targetSubteamMembers.map((member) => member.userId))
        );

        if (uniqueRecipientIds.length > 0) {
            await createNotifications(
                uniqueRecipientIds.map((recipientUserId) => ({
                    userId: recipientUserId,
                    type: "TASK_ROUTED_TO_SUBTEAM" as const,
                    title: "Tâche redistribuée à votre sous-équipe",
                    message: `${user.name} a redistribué la tâche "${task.name}" à la sous-équipe "${targetTeam.name}".`,
                    metadata: {
                        projectId: task.projectId,
                        taskId: task.id,
                        actorUserId: user.id,
                        teamId: rootTeam.id,
                        subteamId: targetTeam.id,
                        routingType: "SUBTEAM" as const,
                    },
                }))
            );
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création des notifications de redistribution sous-équipe :",
            error
        );
    }

    return {
        success: true,
        message: "La tâche a été redistribuée à la sous-équipe avec succès.",
        task: routedTask.task,
        routing: routedTask.routing,
    };
}

export async function clearTaskRouting(input: { taskId: string }) {
    const parsed = clearTaskRoutingSchema.parse(input);

    const { user } = await assertTaskAccess(parsed.taskId);
    const { task, rootTeam } = await getTaskRoutingContext(parsed.taskId, user.id);

    const existingRouting = await prisma.taskRouting.findUnique({
        where: {
            taskId: task.id,
        },
    });

    if (!existingRouting) {
        throw new ActionError(
            "Aucune redistribution active n'est définie pour cette tâche.",
            400
        );
    }

    await prisma.$transaction(async (tx) => {
        await tx.taskRouting.delete({
            where: {
                taskId: task.id,
            },
        });

        await tx.task.update({
            where: { id: task.id },
            data: {
                userId: null,
            },
        });
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_ROUTING_CLEARED",
        message: `${user.name} a retiré la redistribution de la tâche "${task.name}".`,
        metadata: {
            projectId: task.projectId,
            taskId: task.id,
            actorUserId: user.id,
            rootTeamId: rootTeam.id,
            previousTargetUserId: existingRouting.targetUserId,
            previousTargetTeamId: existingRouting.targetTeamId,
            previousRoutingType: existingRouting.targetType,
        },
    });

    try {
        if (
            existingRouting.targetType === "USER" &&
            existingRouting.targetUserId &&
            existingRouting.targetUserId !== user.id
        ) {
            await createNotification({
                userId: existingRouting.targetUserId,
                type: "TASK_ROUTING_CLEARED",
                title: "Redistribution retirée",
                message: `${user.name} a retiré la redistribution de la tâche "${task.name}".`,
                metadata: {
                    projectId: task.projectId,
                    taskId: task.id,
                    actorUserId: user.id,
                    teamId: rootTeam.id,
                    routingType: "USER",
                },
            });
        }

        if (
            existingRouting.targetType === "SUBTEAM" &&
            existingRouting.targetTeamId
        ) {
            const previousSubteamMembers = await prisma.teamMember.findMany({
                where: {
                    teamId: existingRouting.targetTeamId,
                    userId: {
                        not: user.id,
                    },
                },
                select: {
                    userId: true,
                },
            });

            const uniqueRecipientIds = Array.from(
                new Set(previousSubteamMembers.map((member) => member.userId))
            );

            if (uniqueRecipientIds.length > 0) {
                await createNotifications(
                    uniqueRecipientIds.map((recipientUserId) => ({
                        userId: recipientUserId,
                        type: "TASK_ROUTING_CLEARED" as const,
                        title: "Redistribution retirée",
                        message: `${user.name} a retiré la redistribution de la tâche "${task.name}".`,
                        metadata: {
                            projectId: task.projectId,
                            taskId: task.id,
                            actorUserId: user.id,
                            teamId: rootTeam.id,
                            subteamId: existingRouting.targetTeamId ?? undefined,
                            routingType: "SUBTEAM" as const,
                        },
                    }))
                );
            }
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création des notifications de retrait de redistribution :",
            error
        );
    }

    return {
        success: true,
        message: "La redistribution a été retirée avec succès.",
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

    const { user } = await assertTaskAccess(parsed.taskId);

    const {
        task,
        membership,
        isProjectOwner,
        isManager,
        isCreator,
        isDirectAssignee,
        isRootTeamLead,
        isMemberOfRoutedSubteam,
    } = await getTaskStatusPermissionContext(parsed.taskId, user.id);

    const canUpdate =
        isDirectAssignee ||
        isCreator ||
        isProjectOwner ||
        isManager ||
        isRootTeamLead ||
        isMemberOfRoutedSubteam;

    if (!canUpdate) {
        throw new ActionError("Vous n'êtes pas autorisé à modifier cette tâche.", 403);
    }

    if (parsed.newStatus === TASK_STATUSES.IN_REVIEW) {
        throw new ActionError(
            "Utilisez l'action dédiée de mise en revue pour ce changement.",
            400
        );
    }

    const isPrivileged =
        isProjectOwner ||
        isManager ||
        isRootTeamLead;

    if (
        task.status === TASK_STATUSES.DONE &&
        !isPrivileged
    ) {
        throw new ActionError(
            "La tâche est terminée. Seul un responsable peut la renvoyer en revue.",
            403
        );
    }

    const newSolutionText = stripHtmlToText(parsed.solutionDescription);
    const existingSolutionText = stripHtmlToText(task.solutionDescription);

    if (
        parsed.newStatus === TASK_STATUSES.DONE &&
        !newSolutionText &&
        !existingSolutionText
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

export async function addTaskComment(input: {
    taskId: string;
    body: string;
}) {
    const parsed = addTaskCommentSchema.parse(input);

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

    if (membership?.role === "VIEWER") {
        throw new ActionError(
            "Un observateur ne peut pas commenter cette tâche.",
            403
        );
    }

    const comment = await prisma.taskComment.create({
        data: {
            taskId: parsed.taskId,
            authorId: user.id,
            body: parsed.body.trim(),
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_COMMENT_ADDED",
        message: `${user.name} a ajouté un commentaire sur la tâche "${task.name}".`,
        metadata: {
            projectId: task.projectId,
            taskId: task.id,
            commentId: comment.id,
            actorUserId: user.id,
            teamId: task.teamId ?? undefined,
        },
    });

    try {
        const taskWithRouting = await prisma.task.findUnique({
            where: { id: task.id },
            select: {
                userId: true,
                createdById: true,
                routing: {
                    select: {
                        targetType: true,
                        targetUserId: true,
                    },
                },
            },
        });

        const recipientIds = new Set<string>();

        if (taskWithRouting?.userId && taskWithRouting.userId !== user.id) {
            recipientIds.add(taskWithRouting.userId);
        }

        if (
            taskWithRouting?.createdById &&
            taskWithRouting.createdById !== user.id
        ) {
            recipientIds.add(taskWithRouting.createdById);
        }

        if (
            taskWithRouting?.routing?.targetType === "USER" &&
            taskWithRouting.routing.targetUserId &&
            taskWithRouting.routing.targetUserId !== user.id
        ) {
            recipientIds.add(taskWithRouting.routing.targetUserId);
        }

        if (recipientIds.size > 0) {
            await createNotifications(
                Array.from(recipientIds).map((recipientUserId) => ({
                    userId: recipientUserId,
                    type: "TASK_COMMENT_ADDED" as const,
                    title: "Nouveau commentaire sur une tâche",
                    message: `${user.name} a commenté la tâche "${task.name}".`,
                    metadata: {
                        projectId: task.projectId,
                        taskId: task.id,
                        commentId: comment.id,
                        actorUserId: user.id,
                        teamId: task.teamId ?? undefined,
                    },
                }))
            );
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création des notifications de commentaire :",
            error
        );
    }

    return {
        success: true,
        message: "Commentaire ajouté avec succès.",
        comment,
    };
}
