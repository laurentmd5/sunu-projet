"use server";

import prisma from "@/lib/prisma";
import { ActionError, getCurrentDbUser, canManageProject, assertCanReadProject } from "@/lib/permissions";
import { createActivityLog } from "./activity";
import {
    createMilestoneSchema,
    getProjectMilestonesSchema,
    updateMilestoneSchema,
    deleteMilestoneSchema,
} from "@/lib/validations";

export async function createMilestone(input: {
    projectId: string;
    name: string;
    description?: string;
    targetDate?: Date | null;
}) {
    const parsed = createMilestoneSchema.parse(input);

    await canManageProject(parsed.projectId);
    const user = await getCurrentDbUser();

    if (
        parsed.targetDate &&
        parsed.targetDate < new Date(new Date().setHours(0, 0, 0, 0))
    ) {
        throw new ActionError(
            "La date cible du jalon ne peut pas être dans le passé.",
            400
        );
    }

    const milestone = await prisma.milestone.create({
        data: {
            projectId: parsed.projectId,
            name: parsed.name,
            description: parsed.description || null,
            targetDate: parsed.targetDate ?? null,
        },
    });

    await createActivityLog({
        projectId: parsed.projectId,
        actorUserId: user.id,
        type: "MILESTONE_CREATED",
        message: `${user.name} a créé le jalon "${milestone.name}".`,
        metadata: {
            milestoneId: milestone.id,
            targetDate: milestone.targetDate,
        },
    });

    return milestone;
}

export async function getProjectMilestones(projectId: string) {
    const parsed = getProjectMilestonesSchema.parse({ projectId });

    await assertCanReadProject(parsed.projectId);

    return prisma.milestone.findMany({
        where: {
            projectId: parsed.projectId,
        },
        orderBy: [
            { targetDate: "asc" },
            { createdAt: "asc" },
        ],
    });
}

export async function updateMilestone(input: {
    milestoneId: string;
    name: string;
    description?: string;
    targetDate?: Date | null;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";
}) {
    const parsed = updateMilestoneSchema.parse(input);

    const milestone = await prisma.milestone.findUnique({
        where: { id: parsed.milestoneId },
        select: {
            id: true,
            projectId: true,
            name: true,
        },
    });

    if (!milestone) {
        throw new ActionError("Jalon introuvable.", 404);
    }

    await canManageProject(milestone.projectId);
    const user = await getCurrentDbUser();

    if (
        parsed.targetDate &&
        parsed.targetDate < new Date(new Date().setHours(0, 0, 0, 0))
    ) {
        throw new ActionError(
            "La date cible du jalon ne peut pas être dans le passé.",
            400
        );
    }

    const updatedMilestone = await prisma.milestone.update({
        where: { id: parsed.milestoneId },
        data: {
            name: parsed.name,
            description: parsed.description || null,
            targetDate: parsed.targetDate ?? null,
            status: parsed.status,
        },
    });

    await createActivityLog({
        projectId: milestone.projectId,
        actorUserId: user.id,
        type: "MILESTONE_UPDATED",
        message: `${user.name} a mis à jour le jalon "${updatedMilestone.name}".`,
        metadata: {
            milestoneId: updatedMilestone.id,
            previousName: milestone.name,
            status: updatedMilestone.status,
            targetDate: updatedMilestone.targetDate,
        },
    });

    return updatedMilestone;
}

export async function deleteMilestone(milestoneId: string) {
    const parsed = deleteMilestoneSchema.parse({ milestoneId });

    const milestone = await prisma.milestone.findUnique({
        where: { id: parsed.milestoneId },
        select: {
            id: true,
            projectId: true,
            name: true,
        },
    });

    if (!milestone) {
        throw new ActionError("Jalon introuvable.", 404);
    }

    await canManageProject(milestone.projectId);
    const user = await getCurrentDbUser();

    await prisma.milestone.delete({
        where: { id: parsed.milestoneId },
    });

    await createActivityLog({
        projectId: milestone.projectId,
        actorUserId: user.id,
        type: "MILESTONE_DELETED",
        message: `${user.name} a supprimé le jalon "${milestone.name}".`,
        metadata: {
            milestoneId: milestone.id,
            milestoneName: milestone.name,
        },
    });

    return {
        success: true,
        message: "Jalon supprimé avec succès.",
    };
}
