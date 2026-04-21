// Users
export { syncCurrentUser } from "./users";

// Auth
export * from "./auth";

// Projects
export {
    createProject,
    getProjectsCreatedByUSer,
    getProjectsAssociatedWithUser,
    getProjectInfo,
    deleteProjectById,
    addUserToProject,
} from "./projects";

// Members
export {
    getProjectUsers,
    getProjectMembersWithRoles,
    updateProjectMemberRole,
    removeProjectMember,
    createProjectViewer,
    updateViewerPermissions,
} from "./members";

// Teams
export {
    createTeam,
    getProjectTeams,
    getTeamsForCurrentUser,
    getTeamDetails,
    getTeamMembers,
    updateTeamMemberRole,
    removeTeamMember,
    addTeamMember,
    updateTeamLead,
} from "./teams";

// Meetings
export {
    createMeeting,
    getMeetingsForCurrentUser,
    getTeamProjectsForMeeting,
    getMeetingDetails,
    getMeetingRecordings,
    addMeetingRecording,
    removeMeetingRecording,
    updateMeetingNotes,
    updateMeetingStatus,
    generateJitsiMeetingLink,
    regenerateJitsiMeetingLink,
    removeMeetingVideoLink,
    getEligibleMeetingParticipants,
    getEligibleParticipantsForMeetingCreation,
    updateMeetingParticipants,
} from "./meetings";

// Tasks
export {
    createTask,
    deleteTaskById,
    getTaskDetails,
    updateTaskManagement,
    updateTaskStatus,
    sendTaskToReview,
    addTaskComment,
    routeTaskToUser,
    routeTaskToSubteam,
    clearTaskRouting,
} from "./tasks";

// Milestones
export {
    createMilestone,
    getProjectMilestones,
    updateMilestone,
    deleteMilestone,
} from "./milestones";

// Activity
export {
    createActivityLog,
    getProjectActivityLogs,
} from "./activity";

// Notifications
export {
    createNotification,
    createNotifications,
    getMyNotifications,
    getUnreadNotificationsCount,
    markNotificationAsRead,
    markNotificationAsUnread,
    markAllNotificationsAsRead,
} from "./notifications";

// Dashboard
export {
    getOwnerDashboardOverview,
} from "./dashboard";
