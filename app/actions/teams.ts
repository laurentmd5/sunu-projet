"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionError, assertCanReadProject, getCurrentDbUser } from "@/lib/permissions";
import { canManageProject } from "@/lib/project-roles";
import { canAdminProject } from "@/lib/project-roles";
import { assertCanCreateTeam } from "@/lib/permissions";
import { assertValidTeamParent, buildProjectTeamsTree } from "@/lib/team-hierarchy";
import {
    createTeamSchema,
    getProjectTeamsSchema,
    getTeamDetailsSchema,
    updateTeamRoleSchema,
    removeTeamMemberSchema,
    updateTeamLeadSchema,
    addTeamMemberSchema,
} from "@/lib/validations";
import type { ProjectTeamsResult } from "@/type";

function generateUniqueCode(): string {
    return randomBytes(6).toString("hex");
}

async function assertValidTeamLead(
    projectId: string,
    leadUserId?: string | null
) {
    if (!leadUserId) {
        return null;
    }

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId: leadUserId,
                projectId,
            },
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!membership) {
        throw new ActionError(
            "Le chef d'équipe doit appartenir au projet.",
            400
        );
    }

    if (membership.role === "VIEWER") {
        throw new ActionError(
            "Un VIEWER ne peut pas être chef d'équipe.",
            400
        );
    }

    return membership;
}

async function getTeamWithParent(teamId: string) {
    const team = await prisma.team.findUnique({
        where: { id: teamId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    return team;
}

async function ensureProjectMember(projectId: string, userId: string) {
    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
        select: {
            userId: true,
            role: true,
        },
    });

    if (!membership) {
        throw new ActionError(
            "L'utilisateur doit appartenir au projet pour être ajouté à cette équipe.",
            400
        );
    }

    if (membership.role === "VIEWER") {
        throw new ActionError(
            "Un VIEWER ne peut pas être ajouté comme membre d'équipe.",
            400
        );
    }

    return membership;
}

async function ensureTeamMembership(teamId: string, userId: string, role: "OWNER" | "MEMBER" = "MEMBER") {
    const existingMembership = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId,
                userId,
            },
        },
    });

    if (existingMembership) {
        return existingMembership;
    }

    return prisma.teamMember.create({
        data: {
            teamId,
            userId,
            role,
        },
    });
}

export async function createTeam(
    name: string,
    description?: string,
    projectId?: string,
    parentId?: string | null,
    leadUserId?: string | null
) {
    const parsed = createTeamSchema.parse({ name, description, projectId, parentId, leadUserId });
    const user = await getCurrentDbUser();

    await assertCanCreateTeam(parsed.projectId);
    await assertValidTeamParent(parsed.projectId, parsed.parentId);

    if (parsed.parentId && parsed.leadUserId) {
        throw new ActionError(
            "Une sous-équipe ne peut pas avoir de chef d'équipe.",
            400
        );
    }

    const leadMembership = await assertValidTeamLead(
        parsed.projectId,
        parsed.leadUserId
    );

    const inviteCode = generateUniqueCode();

    const team = await prisma.team.create({
        data: {
            name: parsed.name,
            description: parsed.description || null,
            inviteCode,
            createdById: user.id,
            projectId: parsed.projectId,
            parentId: parsed.parentId ?? null,
            leadUserId: parsed.leadUserId ?? null,
            members: {
                create: [
                    {
                        userId: user.id,
                        role: "OWNER",
                    },
                    ...(leadMembership && leadMembership.user.id !== user.id
                        ? [
                              {
                                  userId: leadMembership.user.id,
                                  role: "MEMBER" as const,
                              },
                          ]
                        : []),
                ],
            },
        },
        include: {
            createdBy: true,
            lead: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            project: {
                select: {
                    id: true,
                    name: true,
                },
            },
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            parent: true,
            children: true,
        },
    });

    revalidatePath(`/project/${parsed.projectId}`);
    revalidatePath("/teams");

    return team;
}

export async function getProjectTeams(projectId: string): Promise<ProjectTeamsResult> {
    const parsed = getProjectTeamsSchema.parse({ projectId });

    await assertCanReadProject(parsed.projectId);

    const teams = await prisma.team.findMany({
        where: {
            projectId: parsed.projectId,
        },
        include: {
            lead: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            members: {
                select: {
                    userId: true,
                },
            },
            _count: {
                select: {
                    members: true,
                    children: true,
                },
            },
        },
        orderBy: [
            { parentId: "asc" },
            { createdAt: "asc" },
        ],
    });

    const normalized = teams.map((team) => {
        const directMemberIds = new Set(team.members.map((member) => member.userId));

        let effectiveMemberIds = new Set<string>(directMemberIds);

        if (!team.parentId) {
            const childTeams = teams.filter((candidate) => candidate.parentId === team.id);

            for (const childTeam of childTeams) {
                for (const member of childTeam.members) {
                    effectiveMemberIds.add(member.userId);
                }
            }
        }

        return {
            id: team.id,
            name: team.name,
            description: team.description,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
            createdById: team.createdById,
            projectId: team.projectId,
            parentId: team.parentId,
            leadUserId: team.leadUserId,
            lead: team.lead
                ? {
                      id: team.lead.id,
                      name: team.lead.name,
                      email: team.lead.email,
                  }
                : null,
            directMembersCount: directMemberIds.size,
            effectiveMembersCount: effectiveMemberIds.size,
            childrenCount: team._count.children,
        };
    });

    const teamsTree = buildProjectTeamsTree(normalized);

    return {
        teamsTree,
        summary: {
            rootTeamsCount: normalized.filter((team) => !team.parentId).length,
            subteamsCount: normalized.filter((team) => !!team.parentId).length,
            totalTeamsCount: normalized.length,
        },
    };
}

// LEGACY V1
// À conserver temporairement pour la page /teams,
// mais ne plus utiliser comme source principale du front V2.
export async function getTeamsForCurrentUser() {
    const user = await getCurrentDbUser();

    const memberships = await prisma.teamMember.findMany({
        where: {
            userId: user.id,
        },
        include: {
            team: {
                include: {
                    createdBy: true,
                    project: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    parent: true,
                    children: {
                        select: { id: true },
                    },
                    _count: {
                        select: {
                            members: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            team: {
                createdAt: "desc",
            },
        },
    });

    return memberships.map(
        (membership: any) => ({
            ...membership.team,
            currentUserRole: membership.role,
            membersCount: membership.team._count.members,
            childrenCount: membership.team.children?.length || 0,
            project: membership.team.project,
        })
    );
}

export async function getTeamDetails(teamId: string) {
    const parsed = getTeamDetailsSchema.parse({ teamId });

    const team = await prisma.team.findUnique({
        where: { id: parsed.teamId },
        include: {
            createdBy: true,
            lead: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            parent: {
                select: {
                    id: true,
                    name: true,
                    parentId: true,
                    projectId: true,
                },
            },
            children: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    projectId: true,
                    parentId: true,
                    leadUserId: true,
                    lead: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            members: true,
                            children: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: [
                    { role: "asc" },
                    { joinedAt: "asc" },
                ],
            },
            project: {
                select: {
                    id: true,
                    name: true,
                    createdById: true,
                },
            },
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    await assertCanReadProject(team.projectId);

    return {
        ...team,
        children: team.children.map((child) => ({
            ...child,
            directMembersCount: child._count.members,
            effectiveMembersCount: child._count.members,
            childrenCount: child._count.children,
        })),
    };
}

export async function getTeamMembers(teamId: string) {
    const parsed = getTeamDetailsSchema.parse({ teamId });

    const team = await prisma.team.findUnique({
        where: { id: parsed.teamId },
        select: {
            id: true,
            projectId: true,
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    await assertCanReadProject(team.projectId);

    return prisma.teamMember.findMany({
        where: { teamId: team.id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: [
            { role: "asc" },
            { joinedAt: "asc" },
        ],
    });
}

export async function updateTeamMemberRole(
    teamId: string,
    memberUserId: string,
    newRole: "OWNER" | "MEMBER"
) {
    const parsed = updateTeamRoleSchema.parse({
        teamId,
        memberUserId,
        newRole,
    });

    const currentUser = await getCurrentDbUser();

    const team = await prisma.team.findUnique({
        where: { id: parsed.teamId },
        select: {
            id: true,
            projectId: true,
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    await canAdminProject(team.projectId);

    const membership = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId: parsed.teamId,
                userId: parsed.memberUserId,
            },
        },
        include: {
            user: true,
        },
    });

    if (!membership) {
        throw new ActionError("Membre introuvable dans cette équipe.", 404);
    }

    if (membership.role === "OWNER") {
        throw new ActionError("Le rôle OWNER ne peut pas être modifié ici.", 400);
    }

    const updated = await prisma.teamMember.update({
        where: {
            teamId_userId: {
                teamId: parsed.teamId,
                userId: parsed.memberUserId,
            },
        },
        data: {
            role: parsed.newRole,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    revalidatePath(`/project/${team.projectId}`);

    return {
        success: true,
        message: `${currentUser.name || currentUser.email} a mis à jour le rôle de ${membership.user.name || membership.user.email}.`,
        member: updated,
    };
}

export async function addTeamMember(teamId: string, userId: string) {
    const parsed = addTeamMemberSchema.parse({ teamId, userId });

    const team = await getTeamWithParent(parsed.teamId);

    await canManageProject(team.projectId);
    await ensureProjectMember(team.projectId, parsed.userId);

    if (team.parentId) {
        await ensureTeamMembership(team.parentId, parsed.userId, "MEMBER");
    }

    const existingMembership = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId: parsed.teamId,
                userId: parsed.userId,
            },
        },
    });

    if (existingMembership) {
        throw new ActionError("Cet utilisateur appartient déjà à cette équipe.", 400);
    }

    const membership = await prisma.teamMember.create({
        data: {
            teamId: parsed.teamId,
            userId: parsed.userId,
            role: "MEMBER",
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    revalidatePath(`/project/${team.projectId}`);
    revalidatePath(`/teams/${team.id}`);
    if (team.parentId) {
        revalidatePath(`/teams/${team.parentId}`);
    }

    return {
        success: true,
        member: membership,
    };
}

export async function removeTeamMember(teamId: string, memberUserId: string) {
    const parsed = removeTeamMemberSchema.parse({
        teamId,
        memberUserId,
    });

    const team = await prisma.team.findUnique({
        where: { id: parsed.teamId },
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

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    await canAdminProject(team.projectId);

    const membership = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId: parsed.teamId,
                userId: parsed.memberUserId,
            },
        },
        include: {
            user: true,
        },
    });

    if (!membership) {
        throw new ActionError("Membre introuvable dans cette équipe.", 404);
    }

    if (membership.role === "OWNER") {
        throw new ActionError("Le propriétaire de l'équipe ne peut pas être retiré.", 400);
    }

    if (!team.parentId) {
        const teamIdsToClean = [team.id, ...team.children.map((child) => child.id)];

        await prisma.teamMember.deleteMany({
            where: {
                teamId: {
                    in: teamIdsToClean,
                },
                userId: parsed.memberUserId,
            },
        });
    } else {
        await prisma.teamMember.delete({
            where: {
                teamId_userId: {
                    teamId: parsed.teamId,
                    userId: parsed.memberUserId,
                },
            },
        });
    }

    revalidatePath(`/project/${team.projectId}`);
    revalidatePath(`/teams/${team.id}`);
    if (team.parentId) {
        revalidatePath(`/teams/${team.parentId}`);
    }

    return {
        success: true,
        message: "Membre retiré de l'équipe avec succès.",
    };
}

export async function updateTeamLead(teamId: string, leadUserId: string | null) {
    const parsed = updateTeamLeadSchema.parse({
        teamId,
        leadUserId,
    });

    const team = await prisma.team.findUnique({
        where: { id: parsed.teamId },
        select: {
            id: true,
            projectId: true,
            parentId: true,
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    if (team.parentId) {
        throw new ActionError(
            "Une sous-équipe ne peut pas avoir de chef d'équipe.",
            400
        );
    }

    await canManageProject(team.projectId);

    const leadMembership = await assertValidTeamLead(
        team.projectId,
        parsed.leadUserId
    );

    const updatedTeam = await prisma.team.update({
        where: { id: parsed.teamId },
        data: {
            leadUserId: parsed.leadUserId,
        },
        include: {
            lead: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (leadMembership) {
        const existingTeamMembership = await prisma.teamMember.findUnique({
            where: {
                teamId_userId: {
                    teamId: parsed.teamId,
                    userId: leadMembership.user.id,
                },
            },
        });

        if (!existingTeamMembership) {
            await prisma.teamMember.create({
                data: {
                    teamId: parsed.teamId,
                    userId: leadMembership.user.id,
                    role: "MEMBER",
                },
            });
        }
    }

    revalidatePath(`/project/${team.projectId}`);
    revalidatePath(`/teams/${team.id}`);

    return updatedTeam;
}

