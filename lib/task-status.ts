export const TASK_STATUSES = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
} as const;

export const TASK_STATUS_VALUES = [
  TASK_STATUSES.TODO,
  TASK_STATUSES.IN_PROGRESS,
  TASK_STATUSES.DONE,
] as const;

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TASK_STATUSES.TODO]: "À faire",
  [TASK_STATUSES.IN_PROGRESS]: "En cours",
  [TASK_STATUSES.DONE]: "Terminée",
};
