import prisma from "@/lib/prisma";
import { ActionError } from "@/lib/permissions-core";
import { assertProjectCapability } from "@/lib/project-capabilities";
import { getCurrentDbUser } from "@/lib/project-access";

export const TEAM_ROLES = {
    OWNER: "OWNER",
    MEMBER: "MEMBER",
} as const;

export type TeamRole = typeof TEAM_ROLES[keyof typeof TEAM_ROLES];

export async function getTeamMembership(teamId: string, userId: string) {
    return prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId,
                userId,
            },
        },
        include: {
            team: true,
            user: true,
        },
    });
}

export async function assertTeamProjectCapability(
    teamId: string,
    capability:
        | "READ_TEAMS"
        | "CREATE_TEAM"
        | "UPDATE_TEAM"
        | "DELETE_TEAM"
        | "MANAGE_TEAM_MEMBERS"
) {
    const team = await prisma.team.findUnique({
        where: { id: teamId },
        select: {
            id: true,
            projectId: true,
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    const ctx = await assertProjectCapability(team.projectId, capability);
    return { ctx, team };
}

export async function assertHasTeamRole(
    teamId: string,
    allowedRoles: TeamRole[]
) {
    const user = await getCurrentDbUser();
    const membership = await getTeamMembership(teamId, user.id);

    if (!membership) {
        throw new ActionError("Vous n'avez pas accès à cette équipe.", 403);
    }

    if (!allowedRoles.includes(membership.role as TeamRole)) {
        throw new ActionError(
            "Vous n'avez pas les droits suffisants pour cette action dans l'équipe.",
            403
        );
    }

    return membership;
}

export async function canManageTeam(teamId: string) {
    return assertHasTeamRole(teamId, ["OWNER"]);
}

export async function canAdminTeam(teamId: string) {
    return assertHasTeamRole(teamId, ["OWNER"]);
}
