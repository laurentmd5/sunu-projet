import { getCurrentAuthIdentity } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  ActionError,
  ProjectAccessContext,
  ViewerPermission,
} from "@/lib/permissions-core";

export async function getCurrentDbUser() {
  const session = await getCurrentAuthIdentity();
  const email = session?.email;

  if (!email) {
    throw new ActionError(
      "Vous devez être connecté pour effectuer cette action.",
      401
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    throw new ActionError("Utilisateur introuvable en base.", 401);
  }

  return user;
}

export async function getProjectAccessContext(
  projectId: string
): Promise<ProjectAccessContext> {
  const user = await getCurrentDbUser();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      name: true,
      createdById: true,
      status: true,
    },
  });

  if (!project) {
    throw new ActionError("Projet introuvable.", 404);
  }

  const membership = await prisma.projectUser.findUnique({
    where: {
      userId_projectId: {
        userId: user.id,
        projectId,
      },
    },
    select: {
      id: true,
      userId: true,
      projectId: true,
      role: true,
    },
  });

  if (!membership) {
    throw new ActionError("Vous n'avez pas accès à ce projet.", 403);
  }

  let viewerGrants = new Set<ViewerPermission>();

  if (membership.role === "VIEWER") {
    const grants = await prisma.viewerPermissionGrant.findMany({
      where: {
        projectUserId: membership.id,
      },
      select: {
        permission: true,
      },
    });

    viewerGrants = new Set(
      grants.map((g) => g.permission as ViewerPermission)
    );
  }

  return {
    user,
    project,
    membership: {
      ...membership,
      role: membership.role as ProjectAccessContext["role"],
    },
    role: membership.role as ProjectAccessContext["role"],
    viewerGrants,
  };
}

export async function assertProjectAccess(projectId: string) {
  return getProjectAccessContext(projectId);
}
