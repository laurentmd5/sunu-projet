export class ActionError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "ActionError";
    this.status = status;
  }
}

export type ProjectRole = "OWNER" | "MANAGER" | "VIEWER" | "MEMBER";

export type ViewerPermission =
  | "VIEW_PROJECT_PROGRESS"
  | "VIEW_MEMBER_STATS"
  | "ASSIGN_TASKS"
  | "CREATE_TASK"
  | "VIEW_MEETINGS"
  | "JOIN_MEETINGS";

export type ProjectCapability =
  | "READ_PROJECT"
  | "VIEW_PROJECT_PROGRESS"
  | "VIEW_MEMBER_STATS"
  | "MANAGE_PROJECT_SETTINGS"
  | "MANAGE_MEMBERS"
  | "MANAGE_MANAGERS"
  | "MANAGE_VIEWERS"
  | "DELETE_PROJECT"
  | "COMPLETE_PROJECT"
  | "READ_TEAMS"
  | "CREATE_TEAM"
  | "UPDATE_TEAM"
  | "DELETE_TEAM"
  | "MANAGE_TEAM_MEMBERS"
  | "READ_TASKS"
  | "CREATE_TASK"
  | "ASSIGN_TASKS"
  | "UPDATE_ANY_TASK"
  | "DELETE_ANY_TASK"
  | "UPDATE_OWN_TASK_STATUS"
  | "COMMENT_TASK"
  | "READ_MEETINGS"
  | "CREATE_MEETING"
  | "JOIN_MEETING"
  | "UPDATE_MEETING"
  | "ADD_MEETING_RECORDING";

export interface ProjectAccessContext {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
  project: {
    id: string;
    name: string;
    createdById: string;
    status?: string | null;
  };
  membership: {
    id: string;
    projectId: string;
    userId: string;
    role: ProjectRole;
  };
  role: ProjectRole;
  viewerGrants: Set<ViewerPermission>;
}
