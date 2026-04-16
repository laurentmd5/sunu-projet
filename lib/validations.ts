import { z } from "zod";
import { TASK_STATUS_VALUES } from "@/lib/task-status";

export const TASK_PRIORITY_VALUES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
] as const;

export const taskPrioritySchema = z.enum(TASK_PRIORITY_VALUES);

export const taskTagsSchema = z
  .array(
    z.string()
      .trim()
      .min(1, "Tag invalide.")
      .max(50, "Tag trop long.")
  )
  .max(10, "Trop de tags.")
  .default([]);

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Le nom du projet doit contenir au moins 3 caractères.")
        .max(100, "Le nom du projet est trop long."),
    description: z
        .string()
        .trim()
        .max(1000, "La description du projet est trop longue.")
        .optional()
        .or(z.literal("")),
    email: z
        .string()
        .trim()
        .email("Adresse email invalide."),
});

export const joinProjectSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Adresse email invalide."),
    inviteCode: z
        .string()
        .trim()
        .min(6, "Code d'invitation invalide.")
        .max(64, "Code d'invitation invalide."),
});

export const createTaskSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Le nom de la tâche doit contenir au moins 2 caractères.")
        .max(100, "Le nom de la tâche est trop long."),
    description: z
        .string()
        .trim()
        .max(2000, "La description de la tâche est trop longue.")
        .optional()
        .or(z.literal("")),
    dueDate: z.date().nullable(),
    projectId: z
        .string()
        .trim()
        .min(1, "Projet invalide."),
    assignToEmail: z
        .string()
        .trim()
        .email("Email d'assignation invalide.")
        .nullable()
        .optional(),
    priority: taskPrioritySchema.default("MEDIUM"),
    tags: taskTagsSchema.optional(),
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide.")
        .nullable()
        .optional(),
    milestoneId: z
        .string()
        .trim()
        .min(1, "Jalon invalide.")
        .nullable()
        .optional(),
});

export const updateTaskStatusSchema = z.object({
    taskId: z
        .string()
        .trim()
        .min(1, "Tâche invalide."),
    newStatus: z
        .enum(TASK_STATUS_VALUES)
        .default("TODO")
        .refine((val) => TASK_STATUS_VALUES.includes(val), {
            message: "Statut de tâche invalide.",
        }),
    solutionDescription: z
        .string()
        .trim()
        .max(2000, "La description de solution est trop longue.")
        .optional(),
});

export const updateTaskManagementSchema = z.object({
    taskId: z
        .string()
        .trim()
        .min(1, "L'ID de la tâche est requis"),
    assignToEmail: z
        .string()
        .trim()
        .email("Email invalide")
        .nullable()
        .optional(),
    dueDate: z.date().nullable().optional(),
    priority: taskPrioritySchema.optional(),
    tags: taskTagsSchema.optional(),
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide.")
        .nullable()
        .optional(),
    milestoneId: z
        .string()
        .trim()
        .min(1, "Jalon invalide.")
        .nullable()
        .optional(),
});

export const createTeamSchema = z.object({
    projectId: z
        .string()
        .trim()
        .min(1, "Projet invalide."),
    name: z
        .string()
        .trim()
        .min(2, "Le nom de l'équipe doit contenir au moins 2 caractères.")
        .max(100, "Le nom de l'équipe est trop long."),
    description: z
        .string()
        .trim()
        .max(1000, "La description est trop longue.")
        .optional()
        .or(z.literal("")),
    parentId: z
        .string()
        .trim()
        .min(1, "Sous-équipe invalide.")
        .optional()
        .nullable(),
    leadUserId: z
        .string()
        .trim()
        .min(1, "Responsable invalide.")
        .optional()
        .nullable(),
});

export const getProjectTeamsSchema = z.object({
    projectId: z
        .string()
        .trim()
        .min(1, "Projet invalide."),
});

export const getTeamDetailsSchema = z.object({
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide."),
});

export const updateTeamRoleSchema = z.object({
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide."),
    memberUserId: z
        .string()
        .trim()
        .min(1, "Utilisateur invalide."),
    newRole: z.enum(["OWNER", "MEMBER"]),
});

export const removeTeamMemberSchema = z.object({
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide."),
    memberUserId: z
        .string()
        .trim()
        .min(1, "Utilisateur invalide."),
});

export const updateTeamLeadSchema = z.object({
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide."),
    leadUserId: z
        .string()
        .trim()
        .min(1, "Responsable invalide.")
        .nullable(),
});

export const addTeamMemberSchema = z.object({
    teamId: z
        .string()
        .trim()
        .min(1, "Équipe invalide."),
    userId: z
        .string()
        .trim()
        .min(1, "Utilisateur invalide."),
});

export const sendTaskToReviewSchema = z.object({
    taskId: z
        .string()
        .trim()
        .min(1, "Tâche invalide."),
    reviewFeedback: z
        .string()
        .trim()
        .min(3, "Expliquez ce qui ne va pas.")
        .max(2000, "Le retour de revue est trop long."),
});