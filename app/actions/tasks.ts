"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { assertProjectMember, assertTaskAccess, ActionError, assertCanCreateTask, assertCanAssignTasks } from "@/lib/permissions";
import { sendTaskAssignmentEmail } from "@/lib/email";
import { TASK_STATUSES } from "@/lib/task-status";
import { createActivityLog } from "./activity";

const createTaskSchema = z.object({
    name: z.string().min(1, "Le nom de la tâche est requis"),
    description: z.string().optional(),
    dueDate: z.date().nullable().optional(),
    projectId: z.string().min(1, "L'ID du projet est requis"),
    assignToEmail: z.string().trim().email("Email invalide").nullable().optional(),
});

const taskStatusSchema = z.enum([
    "TODO",
    "IN_PROGRESS",
    "IN_REVIEW",
    "DONE",
    "CANCELLED",
]);

const updateTaskStatusSchema = z.object({
    taskId: z.string().min(1, "L'ID de la tâche est requis"),
    newStatus: taskStatusSchema,
    solutionDescription: z.string().optional(),
});

const updateTaskManagementSchema = z.object({
    taskId: z.string().min(1, "L'ID de la tâche est requis"),
    assignToEmail: z.string().trim().email("Email invalide").nullable().optional(),
    dueDate: z.date().nullable().optional(),
});

export async function createTask(
    name: string,
    description: string,
    dueDate: Date | null,
    projectId: string,
    assignToEmail: string | null
) {
    const parsed = createTaskSchema.parse({
        name,
        description,
        dueDate,
        projectId,
        assignToEmail,
    });

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

    const newTask = await prisma.task.create({
        data: {
            name: parsed.name,
            description: parsed.description || "",
            dueDate: parsed.dueDate,
            projectId: parsed.projectId,
            createdById: user.id,
            userId: assignedUserId,
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
        },
    });

    if (!task) {
        throw new ActionError("Tâche non trouvée.", 404);
    }

    return task;
};

export async function updateTaskManagement(
    taskId: string,
    assignToEmail: string | null,
    dueDate: Date | null
) {
    const parsed = updateTaskManagementSchema.parse({
        taskId,
        assignToEmail,
        dueDate,
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

    const canManageTask =
        task.project.createdById === user.id ||
        membership?.role === "MANAGER";

    if (!canManageTask) {
        throw new ActionError(
            "Seuls le propriétaire du projet ou un manager peuvent modifier l'assignation ou l'échéance.",
            403
        );
    }

    if (parsed.dueDate && parsed.dueDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        throw new ActionError("La date d'échéance ne peut pas être dans le passé.", 400);
    }

    let assignedUserId: string | null = null;
    let assignedUserName: string | null = null;

    if (parsed.assignToEmail) {
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

        assignedUserId = assignedMembership.userId;
        assignedUserName = assignedMembership.user.name;
    }

    const updatedTask = await prisma.task.update({
        where: { id: parsed.taskId },
        data: {
            userId: assignedUserId,
            dueDate: parsed.dueDate ?? null,
        },
    });

    await createActivityLog({
        projectId: task.projectId,
        actorUserId: user.id,
        type: "TASK_CREATED",
        message: assignedUserName
            ? `${user.name} a mis à jour la gestion de la tâche "${task.name}" et l'a assignée à ${assignedUserName}.`
            : `${user.name} a mis à jour la gestion de la tâche "${task.name}".`,
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

    if (parsed.newStatus === TASK_STATUSES.DONE && !parsed.solutionDescription?.trim()) {
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
                    ? parsed.solutionDescription?.trim() || null
                    : null,
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
