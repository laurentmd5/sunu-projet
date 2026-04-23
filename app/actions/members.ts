"use server";

import prisma from "@/lib/prisma";
import { ActionError, getCurrentDbUser } from "@/lib/permissions";
import {
  assertCanReadProject,
  assertCanManageMembers,
  assertCanManageViewers,
} from "@/lib/permission-helpers";
import { ViewerPermission } from "@/lib/permissions-core";
import { createActivityLog } from "./activity";
import { createNotification } from "./notifications";
import { revalidatePath } from "next/cache";

export async function getProjectUsers(idProject: string) {
    try {
        await assertCanReadProject(idProject);

        const projectWithUsers = await prisma.project.findUnique({
            where: { id: idProject },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return projectWithUsers?.users.map(
            (projectUser: { user: { id: string; name: string; email: string } }) =>
                projectUser.user
        ) || [];
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la récupération des utilisateurs du projet");
    }
}

export async function getProjectMembersWithRoles(projectId: string) {
    await assertCanReadProject(projectId);

    const members = await prisma.projectUser.findMany({
        where: {
            projectId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            viewerPermissionGrants: {
                select: {
                    permission: true,
                },
            },
        },
        orderBy: [{ role: "asc" }, { userId: "asc" }],
    });

    return members.map(
        (membership: {
            id: string;
            projectId: string;
            userId: string;
            role: "OWNER" | "MANAGER" | "VIEWER" | "MEMBER";
            user: { id: string; name: string | null; email: string };
            viewerPermissionGrants: { permission: string }[];
        }) => ({
            id: membership.id,
            projectId: membership.projectId,
            userId: membership.userId,
            role: membership.role,
            user: membership.user,
            permissions: membership.viewerPermissionGrants.map((grant) => grant.permission),
        })
    );
}

export async function updateProjectMemberRole(
    projectId: string,
    memberUserId: string,
    newRole: "MANAGER" | "MEMBER"
) {
    const currentUser = await getCurrentDbUser();
    await assertCanManageMembers(projectId);

    if (!memberUserId) {
        throw new ActionError("Collaborateur invalide.", 400);
    }

    if (!["MANAGER", "MEMBER"].includes(newRole)) {
        throw new ActionError("Rôle invalide.", 400);
    }

    const membership = await prisma.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId: memberUserId,
                projectId,
            },
        },
        include: {
            user: true,
        },
    });

    if (!membership) {
        throw new ActionError("Collaborateur introuvable dans ce projet.", 404);
    }

    if (membership.role === "OWNER") {
        throw new ActionError("Le rôle OWNER ne peut pas être modifié ici.", 400);
    }

    if (membership.role === "VIEWER") {
        throw new ActionError(
            "Le rôle VIEWER doit être géré via les actions dédiées aux permissions observateur.",
            400
        );
    }

    if (membership.role === newRole) {
        return { success: true, message: "Aucune modification nécessaire." };
    }

    const previousRole = membership.role;

    await prisma.projectUser.update({
        where: {
            userId_projectId: {
                userId: memberUserId,
                projectId,
            },
        },
        data: {
            role: newRole,
        },
    });

    await createActivityLog({
        projectId,
        actorUserId: currentUser.id,
        type: "MEMBER_ROLE_UPDATED",
        message: `${currentUser.name} a modifié le rôle de ${membership.user.name} : ${previousRole} → ${newRole}.`,
        metadata: {
            projectId,
            actorUserId: currentUser.id,
            targetUserId: memberUserId,
            previousRole,
            newRole,
        },
    });

    try {
        if (newRole === "MANAGER" && memberUserId !== currentUser.id) {
            await createNotification({
                userId: memberUserId,
                type: "MANAGER_ASSIGNED",
                title: "Vous êtes désormais manager",
                message: `${currentUser.name} vous a nommé manager sur ce projet.`,
                metadata: {
                    projectId,
                    actorUserId: currentUser.id,
                },
            });
        }
    } catch (error) {
        console.error(
            "Erreur lors de la création de la notification de nomination manager :",
            error
        );
    }

    revalidatePath(`/project/${projectId}`);

    return { success: true, message: "Rôle mis à jour avec succès." };
}

export async function createProjectViewer(
  projectId: string,
  viewerEmail: string,
  permissions: ViewerPermission[]
) {
  const currentUser = await getCurrentDbUser();
  await assertCanManageViewers(projectId);

  if (!viewerEmail?.trim()) {
    throw new ActionError("Email observateur invalide.", 400);
  }

  const targetUser = await prisma.user.findUnique({
    where: { email: viewerEmail.trim() },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!targetUser) {
    throw new ActionError("Utilisateur introuvable pour cet email.", 404);
  }

  const existingMembership = await prisma.projectUser.findUnique({
    where: {
      userId_projectId: {
        userId: targetUser.id,
        projectId,
      },
    },
  });

  if (existingMembership) {
    throw new ActionError("Cet utilisateur appartient déjà au projet.", 400);
  }

  const uniquePermissions = Array.from(new Set(permissions ?? []));

  const viewerMembership = await prisma.projectUser.create({
    data: {
      userId: targetUser.id,
      projectId,
      role: "VIEWER",
      scope: "EXTERNAL",
      viewerPermissionGrants: {
        create: uniquePermissions.map((permission) => ({
          permission,
        })),
      },
    },
    include: {
      user: true,
      viewerPermissionGrants: true,
    },
  });

  await createActivityLog({
    projectId,
    actorUserId: currentUser.id,
    type: "VIEWER_INVITED",
    message: `${currentUser.name} a ajouté ${viewerMembership.user.name} comme observateur.`,
    metadata: {
      projectId,
      actorUserId: currentUser.id,
      targetUserId: targetUser.id,
      permissions: uniquePermissions,
    },
  });

  try {
    if (targetUser.id !== currentUser.id) {
      await createNotification({
        userId: targetUser.id,
        type: "VIEWER_INVITED",
        title: "Accès observateur accordé",
        message: `${currentUser.name} vous a ajouté comme observateur sur un projet.`,
        metadata: {
          projectId,
          actorUserId: currentUser.id,
        },
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la création de la notification observateur :",
      error
    );
  }

  revalidatePath(`/project/${projectId}`);

  return {
    success: true,
    message: "Observateur ajouté avec succès.",
    viewer: viewerMembership,
  };
}

export async function updateViewerPermissions(
  projectId: string,
  viewerUserId: string,
  permissions: ViewerPermission[]
) {
  const currentUser = await getCurrentDbUser();
  await assertCanManageViewers(projectId);

  if (!viewerUserId) {
    throw new ActionError("Observateur invalide.", 400);
  }

  const viewerMembership = await prisma.projectUser.findUnique({
    where: {
      userId_projectId: {
        userId: viewerUserId,
        projectId,
      },
    },
    include: {
      user: true,
      viewerPermissionGrants: true,
    },
  });

  if (!viewerMembership) {
    throw new ActionError("Observateur introuvable dans ce projet.", 404);
  }

  if (viewerMembership.role !== "VIEWER") {
    throw new ActionError("Les permissions granulaires ne s'appliquent qu'aux observateurs.", 400);
  }

  const uniquePermissions = Array.from(new Set(permissions ?? []));

  await prisma.viewerPermissionGrant.deleteMany({
    where: {
      projectUserId: viewerMembership.id,
    },
  });

  if (uniquePermissions.length > 0) {
    await prisma.viewerPermissionGrant.createMany({
      data: uniquePermissions.map((permission) => ({
        projectUserId: viewerMembership.id,
        permission,
      })),
      skipDuplicates: true,
    });
  }

  await createActivityLog({
    projectId,
    actorUserId: currentUser.id,
    type: "VIEWER_PERMISSIONS_UPDATED",
    message: `${currentUser.name} a mis à jour les permissions observateur de ${viewerMembership.user.name}.`,
    metadata: {
      projectId,
      actorUserId: currentUser.id,
      targetUserId: viewerUserId,
      permissions: uniquePermissions,
    },
  });

  try {
    if (viewerUserId !== currentUser.id) {
      await createNotification({
        userId: viewerUserId,
        type: "VIEWER_PERMISSIONS_UPDATED",
        title: "Permissions observateur mises à jour",
        message: `${currentUser.name} a mis à jour vos permissions observateur sur un projet.`,
        metadata: {
          projectId,
          actorUserId: currentUser.id,
        },
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la création de la notification de mise à jour observateur :",
      error
    );
  }

  revalidatePath(`/project/${projectId}`);

  return {
    success: true,
    message: "Permissions observateur mises à jour avec succès.",
  };
}

export async function removeProjectMember(projectId: string, memberUserId: string) {
  const currentUser = await getCurrentDbUser();
  await assertCanManageMembers(projectId);

  if (!memberUserId) {
    throw new ActionError("Collaborateur invalide.", 400);
  }

  const membership = await prisma.projectUser.findUnique({
    where: {
      userId_projectId: {
        userId: memberUserId,
        projectId,
      },
    },
    include: {
      user: true,
    },
  });

  if (!membership) {
    throw new ActionError("Collaborateur introuvable dans ce projet.", 404);
  }

  if (membership.role === "OWNER") {
    throw new ActionError("Le propriétaire du projet ne peut pas être retiré.", 400);
  }

  await prisma.projectUser.delete({
    where: {
      userId_projectId: {
        userId: memberUserId,
        projectId,
      },
    },
  });

  await createActivityLog({
    projectId,
    actorUserId: currentUser.id,
    type: "MEMBER_REMOVED",
    message: `${currentUser.name} a retiré ${membership.user.name} du projet.`,
    metadata: {
      projectId,
      actorUserId: currentUser.id,
      targetUserId: memberUserId,
      removedRole: membership.role,
    },
  });

  revalidatePath(`/project/${projectId}`);

  return { success: true, message: "Collaborateur retiré du projet avec succès." };
}