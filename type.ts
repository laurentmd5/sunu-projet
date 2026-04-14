import {
    MeetingProvider,
    MeetingRecording as PrismaMeetingRecording,
    MeetingStatus,
    Project as PrismaProject,
    Task as PrismaTask,
    Team as PrismaTeam,
    TeamMeeting as PrismaTeamMeeting,
    User,
} from "@prisma/client";
import { ViewerPermission } from "./lib/permissions-core";

export type ProjectRole = "OWNER" | "MANAGER" | "VIEWER" | "MEMBER";
export type TeamRole = "OWNER" | "MEMBER";
export type TaskStatus =
    | "TODO"
    | "IN_PROGRESS"
    | "IN_REVIEW"
    | "DONE"
    | "CANCELLED";
export type ProjectCollaboratorScope = "INTERNAL" | "EXTERNAL";

export type ProjectUserMember = {
    id: string;
    projectId: string;
    userId: string;
    role: ProjectRole;
    scope?: ProjectCollaboratorScope;
    permissions?: ViewerPermission[];
    user: {
        id: string;
        name: string | null;
        email: string;
    };
};

export type TeamMember = {
    id: string;
    teamId: string;
    userId: string;
    role: TeamRole;
    joinedAt: Date | string;
    user: {
        id: string;
        name: string | null;
        email: string;
    };
};

export type Team = PrismaTeam & {
    createdBy?: User;
    members?: TeamMember[];
    project?: Project;
    meetings?: TeamMeeting[];
};

export type Project = PrismaProject & {
    totalTasks?: number;
    collaboratorsCount?: number;

    taskStats?: {
        todo: number;
        inProgress: number;
        done: number;
        inReview: number;
        cancelled: number;
    };

    percentages?: {
        progressPercentage: number;
        inProgressPercentage: number;
        todoPercentage: number;
        inReviewPercentage: number;
    };

    tasks?: Task[];
    users?: User[];
    createdBy?: User;
    teams?: Array<{
        id: string;
        name: string;
        description?: string | null;
        inviteCode?: string;
        createdAt?: Date;
        updatedAt?: Date;
        createdById?: string;
        projectId?: string;
        parentId?: string | null;
    }>;
    meetings?: TeamMeeting[];
};

export type Task = PrismaTask & {
    user?: User | null;
    createdBy?: User | null;
};

export type MeetingRecording = PrismaMeetingRecording & {
    addedBy?: User;
};

export type TeamMeeting = PrismaTeamMeeting & {
    team?: Team;
    project?: Project | null;
    createdBy?: User;
    meetingRecordings?: MeetingRecording[];
    currentUserTeamRole?: TeamRole | null;
};

export type TeamMeetingStatus = MeetingStatus;
export type TeamMeetingProvider = MeetingProvider;