"use server";

import prisma from "@/lib/prisma";
import { ActionError, getCurrentDbUser, canManageProject, assertCanReadProject } from "@/lib/permissions";
import { createActivityLog } from "./activity";
import {
    createMilestoneSchema,
    getProjectMilestonesSchema,
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
