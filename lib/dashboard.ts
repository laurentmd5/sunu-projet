export type DashboardHealthInputs = {
  overdueTasks: number;
  activeTasksWithDueDate: number;
  activeMembers7d: number;
  membersCount: number;
  progressPercent: number;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  now?: Date;
};

export type DashboardHealthResult = {
  lateRatePercent: number;
  activityRatePercent: number;
  scheduleAlignmentPercent: number;
  healthScore: number;
  healthColor: "GREEN" | "ORANGE" | "RED";
};

const FINAL_TASK_STATUSES = new Set(["DONE", "CANCELLED"]);

export function isTaskOverdue(
  dueDate?: Date | string | null,
  status?: string,
  now = new Date()
) {
  if (!dueDate || !status || FINAL_TASK_STATUSES.has(status)) return false;
  return new Date(dueDate) < now;
}

export function isTaskDueSoon(
  dueDate?: Date | string | null,
  status?: string,
  now = new Date()
) {
  if (!dueDate || !status || FINAL_TASK_STATUSES.has(status)) return false;
  const due = new Date(dueDate).getTime();
  const diff = due - now.getTime();
  return diff >= 0 && diff <= 48 * 60 * 60 * 1000;
}

export function computeProjectProgressPercent(
  completedTasks: number,
  totalTasks: number
) {
  if (totalTasks <= 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
}

export function computeScheduleAlignmentPercent(params: {
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  progressPercent: number;
  now?: Date;
}) {
  const { startDate, endDate, progressPercent, now = new Date() } = params;

  if (!startDate || !endDate) return 50;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const current = now.getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 50;

  const elapsedRatio = (current - start) / (end - start);
  const timeElapsedPercent = Math.max(0, Math.min(100, Math.round(elapsedRatio * 100)));

  return Math.max(0, 100 - Math.abs(timeElapsedPercent - progressPercent));
}

export function computeProjectHealth(input: DashboardHealthInputs): DashboardHealthResult {
  const {
    overdueTasks,
    activeTasksWithDueDate,
    activeMembers7d,
    membersCount,
    progressPercent,
    startDate,
    endDate,
    now = new Date(),
  } = input;

  const lateRatePercent =
    activeTasksWithDueDate > 0
      ? Math.round((overdueTasks / activeTasksWithDueDate) * 100)
      : 0;

  const lateScore = Math.max(0, 100 - lateRatePercent);

  const activityRatePercent =
    membersCount > 0
      ? Math.round((activeMembers7d / membersCount) * 100)
      : 100;

  const scheduleAlignmentPercent = computeScheduleAlignmentPercent({
    startDate,
    endDate,
    progressPercent,
    now,
  });

  const healthScore = Math.round(
    lateScore * 0.4 +
      activityRatePercent * 0.3 +
      scheduleAlignmentPercent * 0.3
  );

  const healthColor =
    healthScore >= 80 ? "GREEN" : healthScore >= 50 ? "ORANGE" : "RED";

  return {
    lateRatePercent,
    activityRatePercent,
    scheduleAlignmentPercent,
    healthScore,
    healthColor,
  };
}

export type DashboardAlert = {
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

export function buildProjectAlerts(params: {
  overdueTasks: number;
  dueSoonTasks: number;
  inactiveMembersCount: number;
  milestonesAtRiskCount: number;
  healthColor: "GREEN" | "ORANGE" | "RED";
}): DashboardAlert[] {
  const alerts: DashboardAlert[] = [];

  if (params.overdueTasks > 0) {
    alerts.push({
      type: "OVERDUE_TASKS" as const,
      level: params.overdueTasks >= 3 ? "critical" as const : "warning" as const,
      message: `${params.overdueTasks} tâche(s) en retard.`,
      count: params.overdueTasks,
    });
  }

  if (params.dueSoonTasks > 0) {
    alerts.push({
      type: "TASKS_DUE_SOON" as const,
      level: "warning" as const,
      message: `${params.dueSoonTasks} tâche(s) arrivent à échéance sous 48h.`,
      count: params.dueSoonTasks,
    });
  }

  if (params.inactiveMembersCount > 0) {
    alerts.push({
      type: "INACTIVE_MEMBERS" as const,
      level: "warning" as const,
      message: `${params.inactiveMembersCount} membre(s) inactif(s) sur 7 jours.`,
      count: params.inactiveMembersCount,
    });
  }

  if (params.milestonesAtRiskCount > 0) {
    alerts.push({
      type: "MILESTONES_AT_RISK" as const,
      level: "warning" as const,
      message: `${params.milestonesAtRiskCount} jalon(s) à risque.`,
      count: params.milestonesAtRiskCount,
    });
  }

  if (params.healthColor === "RED") {
    alerts.push({
      type: "PROJECT_LATE" as const,
      level: "critical" as const,
      message: "Projet en difficulté, intervention requise.",
    });
  }

  return alerts;
}
