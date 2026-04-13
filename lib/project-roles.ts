import { ActionError, ProjectRole } from "@/lib/permissions-core";
import { getProjectAccessContext } from "@/lib/project-access";
import { assertProjectCapability } from "@/lib/project-capabilities";

export const PROJECT_ROLES = {
    OWNER: "OWNER",
    MANAGER: "MANAGER",
    VIEWER: "VIEWER",
    MEMBER: "MEMBER",
} as const;

export async function getProjectMembership(projectId: string) {
  const ctx = await getProjectAccessContext(projectId);
  return ctx.membership;
}

export async function assertHasProjectRole(
  projectId: string,
  allowedRoles: ProjectRole[]
) {
  const ctx = await getProjectAccessContext(projectId);

  if (!allowedRoles.includes(ctx.role)) {
    throw new ActionError("Rôle insuffisant pour cette action.", 403);
  }

  return ctx.membership;
}

export async function canManageProject(projectId: string) {
  return assertProjectCapability(projectId, "MANAGE_PROJECT_SETTINGS");
}

export async function canAdminProject(projectId: string) {
  return assertProjectCapability(projectId, "DELETE_PROJECT");
}