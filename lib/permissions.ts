// lib/permissions.ts
import prisma from "@/lib/prisma";
import { getCurrentAuthIdentity } from "@/lib/auth";
import { assertProjectCapability } from "@/lib/project-capabilities";
import { ActionError } from "@/lib/permissions-core";

export { ActionError } from "@/lib/permissions-core";
export { getCurrentDbUser, assertProjectAccess } from "@/lib/project-access";
export {
  assertCanReadProject,
  assertCanCreateTask,
  assertCanAssignTasks,
  assertCanManageMembers,
  assertCanManageViewers,
  assertCanCreateTeam,
  assertCanReadMeetings,
  assertCanJoinMeetings,
  assertCanCreateMeeting,
} from "@/lib/permission-helpers";

// Legacy wrappers temporaires pour compatibilité
export async function assertProjectMember(projectId: string) {
  return assertProjectCapability(projectId, "READ_PROJECT");
}

export async function canManageProject(projectId: string) {
  return assertProjectCapability(projectId, "MANAGE_PROJECT_SETTINGS");
}

export async function canAdminProject(projectId: string) {
  return assertProjectCapability(projectId, "DELETE_PROJECT");
}

// Fonctions legacy conservées temporairement
export async function assertTeamMember(teamId: string) {
    const identity = await getCurrentAuthIdentity();

    if (!identity?.email) {
        throw new ActionError(
            "Vous devez être connecté pour effectuer cette action.",
            401
        );
    }

    const user = await prisma.user.findUnique({
        where: { email: identity.email },
    });

    if (!user) {
        throw new ActionError("Utilisateur introuvable en base.", 401);
    }

    const membership = await prisma.teamMember.findUnique({
        where: {
            teamId_userId: {
                teamId,
                userId: user.id,
            },
        },
        include: {
            team: true,
        },
    });

    if (!membership) {
        throw new ActionError("Accès refusé à cette équipe.", 403);
    }

    return { user, team: membership.team, membership };
}

export async function assertProjectOwner(projectId: string) {
  return assertProjectCapability(projectId, "DELETE_PROJECT");
}

export async function assertTaskAccess(taskId: string) {
    const identity = await getCurrentAuthIdentity();

    if (!identity?.email) {
        throw new ActionError(
            "Vous devez être connecté pour effectuer cette action.",
            401
        );
    }

    const user = await prisma.user.findUnique({
        where: { email: identity.email },
    });

    if (!user) {
        throw new ActionError("Utilisateur introuvable en base.", 401);
    }

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

    const projectMembership = await prisma.projectUser.findUnique({
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

    const isProjectOwner = task.project.createdById === user.id;
    const isProjectMember = !!projectMembership;
    const isRootTeamLead = task.team?.leadUserId === user.id;

    if (!isProjectOwner && !isProjectMember && !isRootTeamLead) {
        throw new ActionError("Tâche introuvable ou accès refusé.", 404);
    }

    return { user, task };
}