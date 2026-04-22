export type DashboardHealthInputs = {
  overdueTasks: number;
  activeTasksWithDueDate: number;
  weightedOverdueTasks?: number;
  weightedActiveTasksWithDueDate?: number;
  activeMembers7d: number;
  membersCount: number;
  progressPercent: number;
  totalTasks?: number;
  activeTasks?: number;
  projectStatus?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD" | string | null;
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
  healthDrivers: string[];
};

export type MilestoneRiskLevel = "LOW" | "WARNING" | "CRITICAL";

export type MilestoneRiskResult = {
  progressPercent: number;
  scheduleAlignmentPercent: number;
  riskLevel: MilestoneRiskLevel;
  isAtRisk: boolean;
};

const FINAL_TASK_STATUSES = new Set(["DONE", "CANCELLED"]);

const TASK_PRIORITY_WEIGHTS = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
} as const;

type TaskPriority = keyof typeof TASK_PRIORITY_WEIGHTS;

export function getTaskPriorityWeight(priority?: string | null) {
  if (!priority) return TASK_PRIORITY_WEIGHTS.MEDIUM;
  return TASK_PRIORITY_WEIGHTS[priority as TaskPriority] ?? TASK_PRIORITY_WEIGHTS.MEDIUM;
}

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

export function computeWeightedTaskTotal<T>(
  tasks: T[],
  getPriority: (task: T) => string | null | undefined
) {
  return tasks.reduce((sum, task) => sum + getTaskPriorityWeight(getPriority(task)), 0);
}

export function computeWeightedCompletedTaskTotal<T>(
  tasks: T[],
  getStatus: (task: T) => string,
  getPriority: (task: T) => string | null | undefined
) {
  return tasks
    .filter((task) => getStatus(task) === "DONE")
    .reduce((sum, task) => sum + getTaskPriorityWeight(getPriority(task)), 0);
}

export function computeWeightedOverdueTaskTotal<T>(
  tasks: T[],
  getDueDate: (task: T) => Date | string | null | undefined,
  getStatus: (task: T) => string,
  getPriority: (task: T) => string | null | undefined,
  now = new Date()
) {
  return tasks
    .filter((task) => isTaskOverdue(getDueDate(task), getStatus(task), now))
    .reduce((sum, task) => sum + getTaskPriorityWeight(getPriority(task)), 0);
}

export function computeProjectProgressPercent(
  completedTasks: number,
  totalTasks: number
) {
  if (totalTasks <= 0) return 0;
  return Math.round((completedTasks / totalTasks) * 100);
}

export function computeWeightedProjectProgressPercent<T>(
  tasks: T[],
  getStatus: (task: T) => string,
  getPriority: (task: T) => string | null | undefined
) {
  const weightedTotal = computeWeightedTaskTotal(tasks, getPriority);
  if (weightedTotal <= 0) return 0;

  const weightedCompleted = computeWeightedCompletedTaskTotal(
    tasks,
    getStatus,
    getPriority
  );

  return Math.round((weightedCompleted / weightedTotal) * 100);
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

export function normalizeProjectStatus(
  status?: string | null
): "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD" | "UNKNOWN" {
  if (status === "ACTIVE") return "ACTIVE";
  if (status === "COMPLETED") return "COMPLETED";
  if (status === "ARCHIVED") return "ARCHIVED";
  if (status === "ON_HOLD") return "ON_HOLD";
  return "UNKNOWN";
}

export function computeMilestoneRisk(params: {
  totalTasks: number;
  completedTasks: number;
  targetDate?: Date | string | null;
  createdAt?: Date | string | null;
  now?: Date;
}): MilestoneRiskResult {
  const {
    totalTasks,
    completedTasks,
    targetDate,
    createdAt,
    now = new Date(),
  } = params;

  const progressPercent =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!targetDate) {
    return {
      progressPercent,
      scheduleAlignmentPercent: 50,
      riskLevel: "LOW",
      isAtRisk: false,
    };
  }

  const target = new Date(targetDate).getTime();
  const current = now.getTime();

  if (Number.isNaN(target)) {
    return {
      progressPercent,
      scheduleAlignmentPercent: 50,
      riskLevel: "LOW",
      isAtRisk: false,
    };
  }

  if (target <= current) {
    const riskLevel = progressPercent < 100 ? "CRITICAL" : "LOW";
    return {
      progressPercent,
      scheduleAlignmentPercent: progressPercent < 100 ? 0 : 100,
      riskLevel,
      isAtRisk: riskLevel !== "LOW",
    };
  }

  const start = createdAt ? new Date(createdAt).getTime() : null;

  if (!start || Number.isNaN(start) || target <= start) {
    const remaining = target - current;
    const riskLevel =
      remaining <= 3 * 24 * 60 * 60 * 1000 && progressPercent < 50
        ? "WARNING"
        : "LOW";

    return {
      progressPercent,
      scheduleAlignmentPercent: 50,
      riskLevel,
      isAtRisk: riskLevel !== "LOW",
    };
  }

  const elapsedRatio = (current - start) / (target - start);
  const timeElapsedPercent = Math.max(0, Math.min(100, Math.round(elapsedRatio * 100)));
  const scheduleAlignmentPercent = Math.max(
    0,
    100 - Math.abs(timeElapsedPercent - progressPercent)
  );

  let riskLevel: MilestoneRiskLevel = "LOW";

  if (scheduleAlignmentPercent < 35 || (timeElapsedPercent >= 80 && progressPercent < 60)) {
    riskLevel = "CRITICAL";
  } else if (
    scheduleAlignmentPercent < 60 ||
    (timeElapsedPercent >= 50 && progressPercent < 50)
  ) {
    riskLevel = "WARNING";
  }

  return {
    progressPercent,
    scheduleAlignmentPercent,
    riskLevel,
    isAtRisk: riskLevel !== "LOW",
  };
}

export function computeProjectHealth(input: DashboardHealthInputs): DashboardHealthResult {
  const {
    overdueTasks,
    activeTasksWithDueDate,
    weightedOverdueTasks,
    weightedActiveTasksWithDueDate,
    activeMembers7d,
    membersCount,
    progressPercent,
    totalTasks = 0,
    activeTasks = 0,
    projectStatus,
    startDate,
    endDate,
    now = new Date(),
  } = input;

  const normalizedStatus = normalizeProjectStatus(projectStatus);

  // Cas 1 : projet terminé
  if (normalizedStatus === "COMPLETED") {
    const completedDrivers =
      totalTasks > 0
        ? ["Projet terminé"]
        : ["Projet terminé", "Aucune tâche à évaluer"];

    return {
      lateRatePercent: 0,
      activityRatePercent: 100,
      scheduleAlignmentPercent: 100,
      healthScore: 100,
      healthColor: "GREEN",
      healthDrivers: completedDrivers,
    };
  }

  // Cas 2 : projet archivé
  if (normalizedStatus === "ARCHIVED") {
    return {
      lateRatePercent: 0,
      activityRatePercent: 100,
      scheduleAlignmentPercent: 100,
      healthScore: 100,
      healthColor: "GREEN",
      healthDrivers: ["Projet archivé"],
    };
  }

  // Cas 3 : projet sans tâches
  if (totalTasks <= 0) {
    const baseScore = normalizedStatus === "ON_HOLD" ? 75 : 70;

    return {
      lateRatePercent: 0,
      activityRatePercent: 100,
      scheduleAlignmentPercent: 50,
      healthScore: baseScore,
      healthColor: baseScore >= 80 ? "GREEN" : "ORANGE",
      healthDrivers:
        normalizedStatus === "ON_HOLD"
          ? ["Projet en pause", "Aucune tâche à évaluer"]
          : ["Aucune tâche à évaluer"],
    };
  }

  const effectiveOverdueTasks = weightedOverdueTasks ?? overdueTasks;
  const effectiveActiveTasksWithDueDate =
    weightedActiveTasksWithDueDate ?? activeTasksWithDueDate;

  const lateRatePercent =
    effectiveActiveTasksWithDueDate > 0
      ? Math.round((effectiveOverdueTasks / effectiveActiveTasksWithDueDate) * 100)
      : 0;

  const lateScore = Math.max(0, 100 - lateRatePercent);

  // Si aucun exécutant, on reste neutre plutôt que de pénaliser
  const activityRatePercent =
    membersCount > 0
      ? Math.round((activeMembers7d / membersCount) * 100)
      : 100;

  // En pause => le planning pèse moins fort
  const rawScheduleAlignmentPercent = computeScheduleAlignmentPercent({
    startDate,
    endDate,
    progressPercent,
    now,
  });

  const scheduleAlignmentPercent =
    normalizedStatus === "ON_HOLD"
      ? Math.max(rawScheduleAlignmentPercent, 70)
      : rawScheduleAlignmentPercent;

  const healthDrivers: string[] = [];

  if (normalizedStatus === "ON_HOLD") {
    healthDrivers.push("Projet en pause");
  }

  if (lateRatePercent >= 40) {
    healthDrivers.push("Retards élevés");
  } else if (lateRatePercent >= 20) {
    healthDrivers.push("Retards à surveiller");
  }

  if (membersCount > 0 && activityRatePercent < 50 && normalizedStatus !== "ON_HOLD") {
    healthDrivers.push("Activité faible");
  }

  if (scheduleAlignmentPercent < 50 && normalizedStatus !== "ON_HOLD") {
    healthDrivers.push("Avancement en retard sur le planning");
  } else if (scheduleAlignmentPercent < 70 && normalizedStatus === "ACTIVE") {
    healthDrivers.push("Planning à surveiller");
  }

  // Pondérations adaptées au statut
  let healthScore: number;

  if (normalizedStatus === "ON_HOLD") {
    healthScore = Math.round(
      lateScore * 0.5 +
        activityRatePercent * 0.15 +
        scheduleAlignmentPercent * 0.35
    );
  } else {
    healthScore = Math.round(
      lateScore * 0.4 +
        activityRatePercent * 0.3 +
        scheduleAlignmentPercent * 0.3
    );
  }

  const healthColor =
    healthScore >= 80 ? "GREEN" : healthScore >= 50 ? "ORANGE" : "RED";

  return {
    lateRatePercent,
    activityRatePercent,
    scheduleAlignmentPercent,
    healthScore,
    healthColor,
    healthDrivers,
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
      level: params.overdueTasks >= 5 ? "critical" as const : "warning" as const,
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
      level: params.milestonesAtRiskCount >= 2 ? "critical" as const : "warning" as const,
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
