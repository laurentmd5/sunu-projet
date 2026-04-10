"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionError, getCurrentDbUser } from "@/lib/permissions";
import { assertHasTeamRole, canAdminTeam } from "@/lib/team-roles";
import type { Team } from "@/type";

const createTeamSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Le nom de l'équipe doit contenir au moins 2 caractères.")
        .max(100, "Le nom de l'équipe est trop long."),
    description: z
        .string()
        .trim()
        .max(1000, "La description est trop longue.")
        .optional()
        .or(z.literal("")),
    projectId: z.string().trim().min(1, "Projet invalide."),
    parentId: z.string().trim().optional().nullable(),
});

const joinTeamSchema = z.object({
    inviteCode: z
        .string()
        .trim()
        .min(6, "Code d'invitation invalide.")
        .max(64, "Code d'invitation invalide."),
});

const updateTeamRoleSchema = z.object({
    teamId: z.string().trim().min(1, "Équipe invalide."),
    memberUserId: z.string().trim().min(1, "Utilisateur invalide."),
    newRole: z.enum(["OWNER", "MEMBER"]),
});

const removeTeamMemberSchema = z.object({
    teamId: z.string().trim().min(1, "Équipe invalide."),
    memberUserId: z.string().trim().min(1, "Utilisateur invalide."),
});


function generateUniqueCode(): string {
    return randomBytes(6).toString("hex");
}

export async function createTeam(
    name: string,
    description?: string,
    projectId?: string,
    parentId?: string | null
) {
    const parsed = createTeamSchema.parse({ name, description, projectId, parentId });
    const user = await getCurrentDbUser();

    const inviteCode = generateUniqueCode();

    const team = await prisma.team.create({
        data: {
            name: parsed.name,
            description: parsed.description || null,
            inviteCode,
            createdById: user.id,
            projectId: parsed.projectId,
            parentId: parsed.parentId ?? null,
            members: {
                create: {
                    userId: user.id,
                    role: "OWNER",
                },
            },
        },
        include: {
            createdBy: true,
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

    revalidatePath("/teams");

    return team;
}

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
    await assertHasTeamRole(teamId, ["OWNER", "MEMBER"]);

    const team = await prisma.team.findUnique({
        where: { id: teamId },
        include: {
            createdBy: true,
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
                include: {
                    tasks: {
                        include: {
                            user: true,
                            createdBy: true,
                        },
                    },
                    users: {
                        select: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                },
                            },
                        },
                    },
                    createdBy: true,
                },
            },
            meetings: {
                include: {
                    project: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    scheduledAt: "desc",
                },
            },
        },
    });

    if (!team) {
        throw new ActionError("Équipe introuvable.", 404);
    }

    return {
        ...team,
        project: team.project ? {
            ...team.project,
            users: team.project.users.map(
                (entry: { user: { id: string; name: string; email: string } }) =>
                    entry.user
            ),
        } : null,
    };
}

export async function joinTeamByInviteCode(inviteCode: string) {
    const parsed = joinTeamSchema.parse({ inviteCode });
    const user = await getCurrentDbUser();

    const team = await prisma.team.findUnique({
        where: {
            inviteCode: parsed.inviteCode,
        },
    });

    if (!team) {
        throw new ActionError("Code d'invitation invalide.", 404);
    }

    const existingMembership = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId: team.id,
                userId: user.id,
            },
        },
    });

    if (existingMembership) {
        throw new ActionError("Vous appartenez déjà à cette équipe.", 400);
    }

    await prisma.teamMember.create({
        data: {
            teamId: team.id,
            userId: user.id,
            role: "MEMBER",
        },
    });

    revalidatePath("/teams");
    revalidatePath(`/teams/${team.id}`);

    return { success: true, message: "Vous avez rejoint l'équipe avec succès." };
}

export async function getTeamMembers(teamId: string) {
    await assertHasTeamRole(teamId, ["OWNER", "MEMBER"]);

    return prisma.teamMember.findMany({
        where: { teamId },
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
    await canAdminTeam(parsed.teamId);

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

    revalidatePath(`/teams/${parsed.teamId}`);

    return {
        success: true,
        message: `${currentUser.name || currentUser.email} a mis à jour le rôle de ${membership.user.name || membership.user.email}.`,
        member: updated,
    };
}

export async function removeTeamMember(teamId: string, memberUserId: string) {
    const parsed = removeTeamMemberSchema.parse({
        teamId,
        memberUserId,
    });

    await canAdminTeam(parsed.teamId);

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

    await prisma.teamMember.delete({
        where: {
            teamId_userId: {
                teamId: parsed.teamId,
                userId: parsed.memberUserId,
            },
        },
    });

    revalidatePath(`/teams/${parsed.teamId}`);

    return { success: true, message: "Membre retiré de l'équipe avec succès." };
}

