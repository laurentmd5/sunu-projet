import prisma from "@/lib/prisma";
import { ActionError } from "@/lib/permissions";

export async function assertValidTeamParent(
    projectId: string,
    parentId?: string | null
) {
    if (!parentId) {
        return null;
    }

    const parent = await prisma.team.findUnique({
        where: { id: parentId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
        },
    });

    if (!parent) {
        throw new ActionError("Équipe parente introuvable.", 404);
    }

    if (parent.projectId !== projectId) {
        throw new ActionError(
            "L'équipe parente doit appartenir au même projet.",
            400
        );
    }

    if (parent.parentId) {
        throw new ActionError(
            "La profondeur maximale des équipes est limitée à 2 niveaux.",
            400
        );
    }

    return parent;
}

export function buildProjectTeamsTree<
    T extends {
        id: string;
        parentId: string | null;
        membersCount: number;
        childrenCount: number;
    }
>(teams: T[]) {
    const byId = new Map<string, T & { children: Array<T & { children: any[] }> }>();

    for (const team of teams) {
        byId.set(team.id, {
            ...team,
            children: [],
        });
    }

    const roots: Array<T & { children: Array<T & { children: any[] }> }> = [];

    for (const team of byId.values()) {
        if (!team.parentId) {
            roots.push(team);
            continue;
        }

        const parent = byId.get(team.parentId);
        if (parent) {
            parent.children.push(team);
        }
    }

    return roots;
}
