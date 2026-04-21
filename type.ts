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
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ProjectCollaboratorScope = "INTERNAL" | "EXTERNAL";
export type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";

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

export type ProjectTeamBase = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    createdById: string;
    projectId: string;
    parentId: string | null;
    leadUserId: string | null;
};

export type ProjectTeamNode = ProjectTeamBase & {
    directMembersCount: number;
    effectiveMembersCount: number;
    childrenCount: number;
    children: ProjectTeamNode[];
    lead?: {
        id: string;
        name: string | null;
        email: string;
    } | null;
};

export type ProjectTeamsSummary = {
    rootTeamsCount: number;
    subteamsCount: number;
    totalTeamsCount: number;
};

export type ProjectTeamsResult = {
    teamsTree: ProjectTeamNode[];
    summary: ProjectTeamsSummary;
};

export type CreateTeamInput = {
    projectId: string;
    name: string;
    description?: string;
    parentId?: string | null;
    leadUserId?: string | null;
};

export type Milestone = {
  id: string;
  projectId: string;
  name: string;
  description: string | null;
  targetDate: Date | string | null;
  status: MilestoneStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type TaskComment = {
  id: string;
  taskId: string;
  authorId: string;
  body: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  author?: {
    id: string;
    name: string | null;
    email: string;
  };
};

export type TaskRoutingTargetType = "USER" | "SUBTEAM";

export type TaskRouting = {
    id: string;
    taskId: string;
    rootTeamId: string;
    targetType: TaskRoutingTargetType;
    targetUserId: string | null;
    targetTeamId: string | null;
    assignedById: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    rootTeam?: Team;
    targetUser?: {
        id: string;
        name: string | null;
        email: string;
    } | null;
    targetTeam?: Team | null;
    assignedBy?: {
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
    parent?: Team | null;
    children?: Team[];
    lead?: {
        id: string;
        name: string | null;
        email: string;
    } | null;
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
        leadUserId?: string | null;
        lead?: {
            id: string;
            name: string | null;
            email: string;
        } | null;
    }>;
    meetings?: TeamMeeting[];
};

export type Task = Omit<PrismaTask, "tags"> & {
    user?: User | null;
    createdBy?: User | null;
    team?: Team | null;
    milestone?: Milestone | null;
    comments?: TaskComment[];
    tags?: string[] | null;
    reviewedBy?: {
        id: string;
        name: string | null;
        email: string;
    } | null;
    routing?: TaskRouting | null;
};

export type MeetingRecording = PrismaMeetingRecording & {
    addedBy?: User;
};

export type MeetingParticipantItem = {
    id: string;
    meetingId: string;
    userId: string;
    joinedAt: Date | string | null;
    createdAt: Date | string;
    user: {
        id: string;
        name: string | null;
        email: string;
    };
};

export type TeamMeeting = PrismaTeamMeeting & {
    team?: {
        id: string;
        name: string;
    };
    project?: {
        id: string;
        name: string;
    } | null;
    createdBy?: {
        id: string;
        name: string | null;
        email: string;
    };
    meetingRecordings?: (MeetingRecording & {
        addedBy?: {
            id: string;
            name: string | null;
            email: string;
        };
    })[];
    participants?: MeetingParticipantItem[];
    currentUserTeamRole?: TeamRole | null;
    canManageMeeting?: boolean;
    canJoinMeeting?: boolean;
};

export type TeamMeetingStatus = MeetingStatus;
export type TeamMeetingProvider = MeetingProvider;

export type NotificationType =
    | "TASK_ASSIGNED"
    | "TASK_REVIEW_REQUESTED"
    | "TASK_ROUTED_TO_USER"
    | "TASK_ROUTED_TO_SUBTEAM"
    | "TASK_ROUTING_CLEARED"
    | "TASK_COMMENT_ADDED"
    | "MANAGER_ASSIGNED"
    | "VIEWER_INVITED"
    | "VIEWER_PERMISSIONS_UPDATED"
    | "MEETING_INVITED"
    | "MEETING_UPDATED";

export type NotificationRoutingType = "USER" | "SUBTEAM";

export type NotificationPayload = {
    projectId?: string;
    taskId?: string;
    meetingId?: string;
    teamId?: string;
    subteamId?: string;
    commentId?: string;
    actorUserId?: string;
    routingType?: NotificationRoutingType;
};

export type NotificationItem = {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string | null;
    link: string | null;
    metadata: NotificationPayload | null;
    readAt: Date | string | null;
    createdAt: Date | string;
};

// Dashboard Types
export type OwnerDashboardHealthColor = "GREEN" | "ORANGE" | "RED";

export type OwnerDashboardAlert = {
    type:
        | "OVERDUE_TASKS"
        | "TASKS_DUE_SOON"
        | "INACTIVE_MEMBERS"
        | "MILESTONES_AT_RISK"
        | "PROJECT_LATE";
    level: "info" | "warning" | "critical";
    message: string;
    count?: number;
};

export type OwnerDashboardRecentActivityItem = {
    id: string;
    type: string;
    message: string;
    createdAt: Date | string;
    actor: {
        id: string;
        name: string | null;
        email: string;
    };
};

export type OwnerDashboardMemberMetric = {
    userId: string;
    name: string | null;
    email: string;
    assignedTasks: number;
    completedTasks: number;
    overdueTasks: number;
    completionRatePercent: number;
    performanceScore: number;
    isActive7d: boolean;
};

export type OwnerDashboardTeamMetric = {
    teamId: string;
    teamName: string;
    membersCount: number;
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    progressPercent: number;
};

export type OwnerDashboardProjectInsight = {
    topMembers: OwnerDashboardMemberMetric[];
    strugglingMembers: OwnerDashboardMemberMetric[];
    teamMetrics: OwnerDashboardTeamMetric[];
    topPerformer?: OwnerDashboardMemberMetric | null;
    milestonesAtRiskCount?: number;
    criticalMilestonesAtRiskCount?: number;
};

export type OwnerDashboardProjectCard = {
    projectId: string;
    projectName: string;
    projectStatus: "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD";
    startDate: Date | string | null;
    endDate: Date | string | null;
    membersCount: number;
    executableMembersCount: number;
    activeMembers7d: number;
    totalTasks: number;
    activeTasks: number;
    completedTasks: number;
    overdueTasks: number;
    dueSoonTasks: number;
    progressPercent: number;
    lateRatePercent: number;
    activityRatePercent: number;
    scheduleAlignmentPercent: number;
    healthScore: number;
    healthColor: OwnerDashboardHealthColor;
    healthDrivers: string[];
    alerts: OwnerDashboardAlert[];
    recentActivity: OwnerDashboardRecentActivityItem[];
    insights?: OwnerDashboardProjectInsight;
};

export type OwnerDashboardOverview = {
    projects: OwnerDashboardProjectCard[];
    summary: {
        totalProjects: number;
        greenProjects: number;
        orangeProjects: number;
        redProjects: number;
        totalOverdueTasks: number;
    };
};