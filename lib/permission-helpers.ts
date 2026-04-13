import { assertProjectCapability } from "@/lib/project-capabilities";

export const assertCanReadProject = (projectId: string) =>
  assertProjectCapability(projectId, "READ_PROJECT");

export const assertCanCreateTask = (projectId: string) =>
  assertProjectCapability(projectId, "CREATE_TASK");

export const assertCanAssignTasks = (projectId: string) =>
  assertProjectCapability(projectId, "ASSIGN_TASKS");

export const assertCanManageMembers = (projectId: string) =>
  assertProjectCapability(projectId, "MANAGE_MEMBERS");

export const assertCanManageViewers = (projectId: string) =>
  assertProjectCapability(projectId, "MANAGE_VIEWERS");

export const assertCanCreateTeam = (projectId: string) =>
  assertProjectCapability(projectId, "CREATE_TEAM");

export const assertCanReadMeetings = (projectId: string) =>
  assertProjectCapability(projectId, "READ_MEETINGS");

export const assertCanJoinMeetings = (projectId: string) =>
  assertProjectCapability(projectId, "JOIN_MEETING");

export const assertCanCreateMeeting = (projectId: string) =>
  assertProjectCapability(projectId, "CREATE_MEETING");
