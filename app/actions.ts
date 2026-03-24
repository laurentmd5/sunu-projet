"use server"

import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import {
    assertHasProjectRole,
    canAdminProject,
    getProjectMembership,
} from "@/lib/project-roles";
import {
    ActionError,
    assertProjectMember,
    assertProjectOwner,
    assertTaskAccess,
    getCurrentDbUser,
} from "@/lib/permissions";

const ALLOWED_TASK_STATUSES = ["To Do", "In Progress", "Done"] as const;

export async function checkAndAddUser(email: string, name: string) {
    if (!email) return
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!existingUser && name) {
            await prisma.user.create({
                data: {
                    email,
                    name
                }
            })
            console.error("Erreur lors de la  vérification de l'utilisateur:");
        } else {
            console.error("Utilisateur déjà présent dans la base de données.");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur:", error);
    }


}

function generateUniqueCode(): string {
    return randomBytes(6).toString('hex')
}

export async function createProject(name: string, description: string, email: string) {
    try {

        const inviteCode = generateUniqueCode()
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error('User not found');
        }

        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                inviteCode,
                createdById: user.id
            }
        })

        await prisma.projectUser.create({
            data: {
                projectId: newProject.id,
                userId: user.id,
                role: "OWNER",
            },
        });

        return newProject;

    } catch (error) {
        console.log(error)
        throw new Error
    }

}

export async function getProjectsCreatedByUSer(email: string) {
    try {

        const projects = await prisma.project.findMany({
            where: {
                createdBy: { email }
            },
            include: {
                tasks: {
                    include: {
                        user: true,
                        createdBy: true
                    }
                },
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        })

        const formattedProjects = projects.map((project) => ({
            ...project,
            users: project.users.map((userEntry: any) => userEntry.user)
        }))

        return formattedProjects

    } catch (error) {
        console.error(error)
        throw new Error
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

export async function addUserToProject(email: string, inviteCode: string) {

    try {
        const project = await prisma.project.findUnique({
            where: {
                inviteCode
            }
        })

        if (!project) {
            throw new Error("Code d'invitation invalide")
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error("Utilisateur non trouvé")
        }

        const existingAssociation = await prisma.projectUser.findUnique({
            where: {
                userId_projectId: {
                    projectId: project.id,
                    userId: user.id
                }
            }
        })

        if (existingAssociation) {
            throw new Error("L'utilisateur est déjà membre de ce projet")
        }

        await prisma.projectUser.create({
            data: {
                projectId: project.id,
                userId: user.id,
                role: "MEMBER",
            }
        })

        return 'Utilisateur ajouté au projet avec succès';

    } catch (error) {
        console.error(error)
        throw new Error
    }

}

export async function getProjectsAssociatedWithUser(email: string) {
    try {
        const projects = await prisma.project.findMany({
            where: {
                users: {
                    some: {
                        user: {
                            email
                        }
                    }
                }
            },
            include: {
                tasks: true,
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        })

        const formattedProjects = projects.map((project) => ({
            ...project,
            users: project.users.map((userEntry: any) => userEntry.user)
        }))

        return formattedProjects

    } catch (error) {
        console.error(error)
        throw new Error
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
            }
            : {
                createdBy: true,
            },
    });

    if (!project) {
        throw new ActionError("Projet non trouvé.", 404);
    }

    return project;
}

export async function getProjectUsers(idProject: string) {
    try {
        await assertHasProjectRole(idProject, ["OWNER", "MANAGER", "MEMBER"]);

        const projectWithUsers = await prisma.project.findUnique({
            where: { id: idProject },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return projectWithUsers?.users.map((projectUser) => projectUser.user) || [];
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la récupération des utilisateurs du projet");
    }
}

export async function createTask(
    name: string,
    description: string,
    dueDate: Date | null,
    projectId: string,
    assignToEmail: string | null
) {
    try {
        await assertHasProjectRole(projectId, ["OWNER", "MANAGER", "MEMBER"]);

        const currentUser = await getCurrentDbUser();

        let assignedUserId = currentUser.id;

        if (assignToEmail) {
            const assignedUser = await prisma.user.findUnique({
                where: {
                    email: assignToEmail,
                },
            });

            if (!assignedUser) {
                throw new ActionError("Utilisateur assigné introuvable.", 404);
            }

            const assignedMembership = await prisma.projectUser.findUnique({
                where: {
                    userId_projectId: {
                        userId: assignedUser.id,
                        projectId,
                    },
                },
            });

            if (!assignedMembership) {
                throw new ActionError("L'utilisateur assigné n'appartient pas à ce projet.", 400);
            }

            assignedUserId = assignedUser.id;
        }

        const newTask = await prisma.task.create({
            data: {
                name,
                description,
                dueDate,
                projectId,
                createdById: currentUser.id,
                userId: assignedUserId,
            },
        });

        return newTask;
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la création de la tâche");
    }
}

export async function deleteTaskById(taskId: string) {
    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: {
                project: true,
            },
        });

        if (!task) {
            throw new ActionError("Tâche introuvable.", 404);
        }

        await assertHasProjectRole(task.projectId, ["OWNER", "MANAGER"]);

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return { success: true, message: "Tâche supprimée avec succès." };
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la suppression de la tâche");
    }
}

export const getTaskDetails = async (taskId: string) => {
    await assertTaskAccess(taskId);

    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
            project: true,
            user: true,
            createdBy: true,
        },
    });

    if (!task) {
        throw new ActionError("Tâche non trouvée.", 404);
    }

    return task;
};

export const updateTaskStatus = async (
    taskId: string,
    newStatus: string,
    solutionDescription?: string
) => {
    try {
        const existingTask = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!existingTask) {
            throw new ActionError("Tâche non trouvée.", 404);
        }

        const membership = await getProjectMembership(existingTask.projectId);

        const isManagerLike =
            membership.role === "OWNER" || membership.role === "MANAGER";

        const isAssignedMember =
            membership.role === "MEMBER" && existingTask.userId === membership.userId;

        if (!isManagerLike && !isAssignedMember) {
            throw new ActionError("Vous n'êtes pas autorisé à modifier cette tâche.", 403);
        }

        if (
            !ALLOWED_TASK_STATUSES.includes(
                newStatus as (typeof ALLOWED_TASK_STATUSES)[number]
            )
        ) {
            throw new ActionError("Statut de tâche invalide.", 400);
        }

        if (newStatus === "Done" && !solutionDescription?.trim()) {
            throw new ActionError(
                "Une description de solution est requise pour terminer la tâche.",
                400
            );
        }

        await prisma.task.update({
            where: { id: taskId },
            data: {
                status: newStatus,
                solutionDescription: newStatus === "Done" ? solutionDescription : null,
            },
        });

        return { success: true, message: "Statut mis à jour avec succès." };
    } catch (error) {
        console.log(error);
        throw error instanceof Error ? error : new Error("Erreur lors de la mise à jour du statut");
    }
};