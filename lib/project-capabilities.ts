import {
  ActionError,
  ProjectAccessContext,
  ProjectCapability,
  ProjectRole,
  ViewerPermission,
} from "@/lib/permissions-core";
import { getProjectAccessContext } from "@/lib/project-access";

const ROLE_CAPABILITIES: Record<ProjectRole, Set<ProjectCapability>> = {
  OWNER: new Set([
    "READ_PROJECT",
    "VIEW_PROJECT_PROGRESS",
    "VIEW_MEMBER_STATS",
    "MANAGE_PROJECT_SETTINGS",
    "MANAGE_MEMBERS",
    "MANAGE_MANAGERS",
    "MANAGE_VIEWERS",
    "DELETE_PROJECT",
    "COMPLETE_PROJECT",
    "READ_TEAMS",
    "CREATE_TEAM",
    "UPDATE_TEAM",
    "DELETE_TEAM",
    "MANAGE_TEAM_MEMBERS",
    "READ_TASKS",
    "CREATE_TASK",
    "ASSIGN_TASKS",
    "UPDATE_ANY_TASK",
    "DELETE_ANY_TASK",
    "UPDATE_OWN_TASK_STATUS",
    "COMMENT_TASK",
    "READ_MEETINGS",
    "CREATE_MEETING",
    "JOIN_MEETING",
    "UPDATE_MEETING",
    "ADD_MEETING_RECORDING",
  ]),
  MANAGER: new Set([
    "READ_PROJECT",
    "VIEW_PROJECT_PROGRESS",
    "VIEW_MEMBER_STATS",
    "MANAGE_MEMBERS",
    "READ_TEAMS",
    "CREATE_TEAM",
    "UPDATE_TEAM",
    "DELETE_TEAM",
    "MANAGE_TEAM_MEMBERS",
    "READ_TASKS",
    "CREATE_TASK",
    "ASSIGN_TASKS",
    "UPDATE_ANY_TASK",
    "DELETE_ANY_TASK",
    "UPDATE_OWN_TASK_STATUS",
    "COMMENT_TASK",
    "READ_MEETINGS",
    "CREATE_MEETING",
    "JOIN_MEETING",
    "UPDATE_MEETING",
    "ADD_MEETING_RECORDING",
  ]),
  MEMBER: new Set([
    "READ_PROJECT",
    "VIEW_PROJECT_PROGRESS",
    "READ_TEAMS",
    "READ_TASKS",
    "UPDATE_OWN_TASK_STATUS",
    "COMMENT_TASK",
    "READ_MEETINGS",
    "JOIN_MEETING",
  ]),
  VIEWER: new Set(["READ_PROJECT"]),
};

const VIEWER_GRANT_CAPABILITIES: Record<ViewerPermission, ProjectCapability[]> =
  {
    VIEW_PROJECT_PROGRESS: ["VIEW_PROJECT_PROGRESS", "READ_TASKS"],
    VIEW_MEMBER_STATS: ["VIEW_MEMBER_STATS"],
    ASSIGN_TASKS: ["ASSIGN_TASKS"],
    CREATE_TASK: ["CREATE_TASK"],
    VIEW_MEETINGS: ["READ_MEETINGS"],
    JOIN_MEETINGS: ["JOIN_MEETING"],
  };

export function hasProjectCapability(
  ctx: ProjectAccessContext,
  capability: ProjectCapability
): boolean {
  if (ROLE_CAPABILITIES[ctx.role].has(capability)) {
    return true;
  }

  if (ctx.role !== "VIEWER") {
    return false;
  }

  for (const grant of ctx.viewerGrants) {
    const mapped = VIEWER_GRANT_CAPABILITIES[grant] ?? [];
    if (mapped.includes(capability)) {
      return true;
    }
  }

  return false;
}

export async function assertProjectCapability(
  projectId: string,
  capability: ProjectCapability
) {
  const ctx = await getProjectAccessContext(projectId);

  if (!hasProjectCapability(ctx, capability)) {
    throw new ActionError("Permissions insuffisantes pour cette action.", 403);
  }

  return ctx;
}
