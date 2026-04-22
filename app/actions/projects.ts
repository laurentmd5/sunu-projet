"use server";

import { randomBytes } from "crypto";
import { z } from "zod";
import prisma from "@/lib/prisma";
import {
    assertProjectMember,
    ActionError,
    getCurrentDbUser,
} from "@/lib/permissions";
import { canAdminProject } from "@/lib/project-roles";
import { createActivityLog } from "./activity";
import { normalizeTaskTags } from "@/lib/task-tags";

const createProjectSchema = z.object({
    name: z.string().min(1, "Le nom du projet est requis"),
    description: z.string().optional(),
});

const joinProjectSchema = z.object({
    inviteCode: z.string().min(1, "Le code d'invitation est requis"),
});

const updateProjectStatusSchema = z.object({
    projectId: z.string().min(1, "Projet invalide."),
    status: z.enum(["ACTIVE", "COMPLETED", "ARCHIVED", "ON_HOLD"]),
});

function generateUniqueCode(): string {
    return randomBytes(6).toString("hex");
}

export async function createProject(name: string, description: string) {
    try {
        const parsed = createProjectSchema.parse({
            name,
            description,
        });

        const user = await getCurrentDbUser();
        const inviteCode = generateUniqueCode();

        const newProject = await prisma.project.create({
            data: {
                name: parsed.name,
                description: parsed.description || null,
                inviteCode,
                createdById: user.id,
            },
        });

        await prisma.projectUser.create({
            data: {
                projectId: newProject.id,
                userId: user.id,
                role: "OWNER",
                scope: "INTERNAL",
            },
        });

        await createActivityLog({
            projectId: newProject.id,
            actorUserId: user.id,
            type: "PROJECT_CREATED",
            message: `${user.name} a créé le projet "${newProject.name}".`,
        });

        return newProject;
    } catch (error) {
        console.log(error);
        throw error instanceof Error
            ? error
            : new Error("Erreur lors de la création du projet");
    }
}

export async function getProjectsCreatedByUSer() {
    try {
        const user = await getCurrentDbUser();

        const projects = await prisma.project.findMany({
            where: {
                createdById: user.id,
            },
            include: {
                tasks: {
                    include: {
                        user: true,
                        createdBy: true,
                    },
                },
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                teams: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                createdBy: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return projects.map((project) => ({
            ...project,
            tasks: project.tasks.map((task) => ({
                ...task,
                tags: normalizeTaskTags(task.tags),
            })),
            users: project.users.map(
                (userEntry: { user: { id: string; name: string; email: string } }) =>
                    userEntry.user
            ),
        }));
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des projets créés.");
    }
}

export async function deleteProjectById(projectId: string) {
    try {
        await canAdminProject(projectId);

        await prisma.project.delete({
            where: {
                id: projectId,
            },
        });

        return { success: true, message: "Projet supprimé avec succès." };
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la suppression du projet");
    }
}

export async function addUserToProject(inviteCode: string) {
    try {
        const parsed = joinProjectSchema.parse({
            inviteCode,
        });

        const user = await getCurrentDbUser();

        const project = await prisma.project.findUnique({
            where: {
                inviteCode: parsed.inviteCode,
            },
        });

        if (!project) {
            throw new Error("Code d'invitation invalide");
        }

        const existingAssociation = await prisma.projectUser.findUnique({
            where: {
                userId_projectId: {
                    projectId: project.id,
                    userId: user.id,
                },
            },
        });

        if (existingAssociation) {
            throw new Error("L'utilisateur est déjà membre de ce projet");
        }

        await prisma.projectUser.create({
            data: {
                projectId: project.id,
                userId: user.id,
                role: "MEMBER",
                scope: "INTERNAL",
            },
        });

        await createActivityLog({
            projectId: project.id,
            actorUserId: user.id,
            type: "MEMBER_JOINED",
            message: `${user.name} a rejoint le projet.`,
        });

        return "Utilisateur ajouté au projet avec succès";
    } catch (error) {
        console.error(error);
        throw error instanceof Error
            ? error
            : new Error("Erreur lors de l'ajout au projet");
    }
}

export async function getProjectsAssociatedWithUser() {
    try {
        const user = await getCurrentDbUser();

        const projects = await prisma.project.findMany({
            where: {
                users: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: {
                tasks: {
                    include: {
                        user: true,
                        createdBy: true,
                    },
                },
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                teams: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                createdBy: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return projects.map((project) => ({
            ...project,
            tasks: project.tasks.map((task) => ({
                ...task,
                tags: normalizeTaskTags(task.tags),
            })),
            users: project.users.map(
                (userEntry: { user: { id: string; name: string; email: string } }) =>
                    userEntry.user
            ),
        }));
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des projets associés.");
    }
}

export async function getProjectInfo(idProject: string, details: boolean) {
    await assertProjectMember(idProject);

    const project = await prisma.project.findUnique({
        where: { id: idProject },
        include: details
            ? {
                  tasks: {
                      include: {
                          user: true,
                          createdBy: true,
                          team: true,
                          milestone: true,
                          routing: {
                              include: {
                                  rootTeam: true,
                                  targetTeam: true,
                                  targetUser: {
                                      select: {
                                          id: true,
                                          name: true,
                                          email: true,
                                      },
                                  },
                                  assignedBy: {
                                      select: {
                                          id: true,
                                          name: true,
                                          email: true,
                                      },
                                  },
                              },
                          },
                      },
                  },
                  users: {
                      select: {
                          user: {
                              select: {
                                  id: true,
                                  name: true,
                                  email: true,
                              },
                          },
                      },
                  },
                  createdBy: true,
                  teams: {
                      select: {
                          id: true,
                          name: true,
                          description: true,
                          inviteCode: true,
                          createdAt: true,
                          updatedAt: true,
                          createdById: true,
                          projectId: true,
                          parentId: true,
                      },
                  },
              }
            : {
                  createdBy: true,
                  teams: {
                      select: {
                          id: true,
                          name: true,
                      },
                  },
              },
    });

    if (!project) {
        throw new ActionError("Projet non trouvé.", 404);
    }

    return {
        ...project,
        tasks: "tasks" in project && Array.isArray(project.tasks)
            ? project.tasks.map((task) => ({
                  ...task,
                  tags: normalizeTaskTags(task.tags),
              }))
            : undefined,
        users:
            "users" in project && Array.isArray(project.users)
                ? project.users.map(
                      (entry: { user: { id: string; name: string; email: string } }) =>
                          entry.user
                  )
                : undefined,
    };
}

export async function updateProjectStatus(
    projectId: string,
    status: "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD"
) {
    try {
        const parsed = updateProjectStatusSchema.parse({
            projectId,
            status,
        });

        const user = await getCurrentDbUser();

        await canAdminProject(parsed.projectId);

        const existingProject = await prisma.project.findUnique({
            where: { id: parsed.projectId },
            select: {
                id: true,
                name: true,
                status: true,
            },
        });

        if (!existingProject) {
            throw new ActionError("Projet non trouvé.", 404);
        }

        if (existingProject.status === parsed.status) {
            return {
                success: true,
                message: "Le statut du projet est déjà à jour.",
            };
        }

        const updatedProject = await prisma.project.update({
            where: { id: parsed.projectId },
            data: {
                status: parsed.status,
            },
        });

        const statusLabels: Record<
            "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD",
            string
        > = {
            ACTIVE: "actif",
            COMPLETED: "terminé",
            ARCHIVED: "archivé",
            ON_HOLD: "en pause",
        };

        await createActivityLog({
            projectId: parsed.projectId,
            actorUserId: user.id,
            type: "PROJECT_STATUS_UPDATED",
            message: `${user.name} a mis à jour le statut du projet "${existingProject.name}" vers "${statusLabels[parsed.status]}".`,
        });

        return {
            success: true,
            message: "Statut du projet mis à jour avec succès.",
            project: updatedProject,
        };
    } catch (error) {
        console.error(error);
        throw error instanceof Error
            ? error
            : new Error("Erreur lors de la mise à jour du statut du projet");
    }
}