export const TASK_STATUSES = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
  CANCELLED: "CANCELLED",
} as const;

export const TASK_STATUS_VALUES = [
  TASK_STATUSES.TODO,
  TASK_STATUSES.IN_PROGRESS,
  TASK_STATUSES.IN_REVIEW,
  TASK_STATUSES.DONE,
  TASK_STATUSES.CANCELLED,
] as const;

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TASK_STATUSES.TODO]: "À faire",
  [TASK_STATUSES.IN_PROGRESS]: "En cours",
  [TASK_STATUSES.IN_REVIEW]: "En revue",
  [TASK_STATUSES.DONE]: "Terminée",
  [TASK_STATUSES.CANCELLED]: "Annulée",
};
