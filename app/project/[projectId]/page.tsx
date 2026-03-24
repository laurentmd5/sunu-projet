"use client"
import {
    deleteTaskById,
    getProjectInfo,
    getProjectMembersWithRoles,
    removeProjectMember,
    updateProjectMemberRole,
} from "@/app/actions";
import ProjectComponent from "@/app/components/ProjectComponent";
import UserInfo from "@/app/components/UserInfo";
import Wrapper from "@/app/components/Wrapper";
import { Project } from "@/type";
import { PROJECT_ROLE_LABELS } from "@/lib/project-role-labels";
import { TASK_STATUSES } from "@/lib/task-status";
import { useUser } from "@clerk/nextjs";
import { CircleCheckBig, CopyPlus, ListTodo, Loader, SlidersHorizontal, UserCheck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EmptyState from "@/app/components/EmptyState";
import TaskComponent from "@/app/components/TaskComponent";
import { toast } from "react-toastify";

type ProjectMember = {
    id: string;
    projectId: string;
    userId: string;
    role: "OWNER" | "MANAGER" | "MEMBER";
    user: {
        id: string;
        name: string | null;
        email: string;
    };
};

const page = ({ params }: { params: Promise<{ projectId: string }> }) => {

    const { user } = useUser()
    const email = user?.primaryEmailAddress?.emailAddress as string
    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState<Project | null>(null);
    const [members, setMembers] = useState<ProjectMember[]>([]);
    const [membersLoading, setMembersLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [assignedFilter, setAssignedFilter] = useState<boolean>(false)
    const [taskCounts, setTaskCounts] = useState({ todo: 0, inProgress: 0, done: 0, assigned: 0 })

    const fetchInfos = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true)
            setProject(project)
        } catch (error) {
            console.error(`Erreur lors du chargement du projets:`, error)
        }
    }

    const fetchMembers = async (projectId: string) => {
        try {
            setMembersLoading(true);
            const projectMembers = await getProjectMembersWithRoles(projectId);
            setMembers(projectMembers as ProjectMember[]);
        } catch (error) {
            console.error("Erreur lors du chargement des membres :", error);
            toast.error(error instanceof Error ? error.message : "Erreur lors du chargement des membres");
        } finally {
            setMembersLoading(false);
        }
    };

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setProjectId(resolvedParams.projectId)
            fetchInfos(resolvedParams.projectId)
            fetchMembers(resolvedParams.projectId)
        }
        getId()
    }, [params])

    useEffect(() => {
        if (project && project.tasks && email) {
            const counts = {
                todo: project.tasks.filter(task => task.status == TASK_STATUSES.TODO).length,
                inProgress: project.tasks.filter(task => task.status == TASK_STATUSES.IN_PROGRESS).length,
                done: project.tasks.filter(task => task.status == TASK_STATUSES.DONE).length,
                assigned: project.tasks.filter(task => task?.user?.email == email).length

            }
            setTaskCounts(counts)
        }
    }, [project, email])

    const filteredTasks = project?.tasks?.filter(task => {
        const statusMatch = !statusFilter || task.status == statusFilter
        const assignedMatch = !assignedFilter || task?.user?.email == email
        return statusMatch && assignedMatch
    })

    const deleteTask = async (taskId: string) => {
        try {
            await deleteTaskById(taskId)
            fetchInfos(projectId)
            toast.success("Tâche supprimée avec succès")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    }

    const handleRoleChange = async (
        memberUserId: string,
        newRole: "MANAGER" | "MEMBER"
    ) => {
        try {
            await updateProjectMemberRole(projectId, memberUserId, newRole);
            await fetchMembers(projectId);
            toast.success("Rôle mis à jour avec succès");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    const handleRemoveMember = async (memberUserId: string) => {
        try {
            await removeProjectMember(projectId, memberUserId);
            await fetchMembers(projectId);
            toast.success("Collaborateur retiré avec succès");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    return (
        <Wrapper>
            <div className="md:flex md:flex-row flex-col">
                <div className="md:w-1/4">

                    <div className="p-5 border border-base-300 rounded-xl mb-6">
                        <UserInfo
                            role="Créé par"
                            email={project?.createdBy?.email || null}
                            name={project?.createdBy?.name || null}
                        />
                    </div>
                    <div className="p-5 border border-base-300 rounded-xl mb-6">
                        <h2 className="font-semibold mb-4">Membres du projet</h2>

                        {membersLoading ? (
                            <p className="text-sm opacity-70">Chargement des membres...</p>
                        ) : members.length > 0 ? (
                            <div className="space-y-4">
                                {members.map((member) => {
                                    const isOwner = member.role === "OWNER";

                                    return (
                                        <div
                                            key={member.userId}
                                            className="border border-base-300 rounded-lg p-3"
                                        >
                                            <p className="font-medium">
                                                {member.user.name || "Utilisateur"}
                                            </p>
                                            <p className="text-sm opacity-70 break-all">
                                                {member.user.email}
                                            </p>

                                            <div className="mt-2">
                                                <span className="badge badge-outline">
                                                    {PROJECT_ROLE_LABELS[member.role]}
                                                </span>
                                            </div>

                                            {!isOwner && (
                                                <div className="mt-3 space-y-2">
                                                    <select
                                                        className="select select-bordered select-sm w-full"
                                                        defaultValue={member.role}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                member.userId,
                                                                e.target.value as "MANAGER" | "MEMBER"
                                                            )
                                                        }
                                                    >
                                                        <option value="MEMBER">Membre</option>
                                                        <option value="MANAGER">Manager</option>
                                                    </select>

                                                    <button
                                                        onClick={() => handleRemoveMember(member.userId)}
                                                        className="btn btn-sm btn-error btn-outline w-full"
                                                    >
                                                        Retirer
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-sm opacity-70">Aucun membre trouvé.</p>
                        )}
                    </div>
                    <div className="w-full">
                        {project && (
                            <ProjectComponent project={project} admin={0} style={false}></ProjectComponent>
                        )
                        }

                    </div>
                </div>
                <div className="mt-6 md:ml-6 md:mt-0 md:w-3/4">
                    <div className="md:flex md:justify-between">
                        <div className="flex flex-col">
                            <div className="space-x-2 mt-2">
                                <button
                                    onClick={() => { setStatusFilter(''); setAssignedFilter(false) }}
                                    className={`btn btn-sm ${!statusFilter ? 'btn-primary' : ''}`}>
                                    <SlidersHorizontal className="w-4" /> Tous ({project?.tasks?.length || 0})
                                </button>

                                <button
                                    onClick={() => setStatusFilter(TASK_STATUSES.TODO)}
                                    className={`btn btn-sm ${statusFilter === TASK_STATUSES.TODO ? 'btn-primary' : ''}`}>
                                    <ListTodo className="w-4" />
                                    À faire ({taskCounts.todo})
                                </button>
                                <button
                                    onClick={() => setStatusFilter(TASK_STATUSES.IN_PROGRESS)}
                                    className={`btn btn-sm ${statusFilter === TASK_STATUSES.IN_PROGRESS ? 'btn-primary' : ''}`}>
                                    <Loader className="w-4" />
                                    En Cours ({taskCounts.inProgress})
                                </button>
                            </div>
                            <div className="space-x-2 mt-2">

                                <button
                                    onClick={() => setStatusFilter(TASK_STATUSES.DONE)}
                                    className={`btn btn-sm ${statusFilter === TASK_STATUSES.DONE ? 'btn-primary' : ''}`}>
                                    <CircleCheckBig className="w-4" />
                                    Terminée(s) ({taskCounts.done})
                                </button>

                                <button
                                    onClick={() => setAssignedFilter(!assignedFilter)}
                                    className={`btn btn-sm ${assignedFilter ? 'btn-primary' : ''}`}>
                                    <UserCheck className="w-4" />
                                    Vos tâches ({taskCounts.assigned})
                                </button>
                            </div>
                        </div>
                        <Link href={`/new-tasks/${projectId}`} className="btn btn-sm mt-2 md:mt-0">
                            Nouvelle tâche
                            <CopyPlus className="w-4" />
                        </Link>
                    </div>

                    <div className="mt-6 border border-base-300 p-5 shadow-sm rounded-xl">
                        {
                            filteredTasks && filteredTasks.length > 0 ? (
                                <div className="overflow-auto">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Titre</th>
                                                <th>Assigné à</th>
                                                <th className="hidden md:flex">À livré le</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="w-fit">
                                            {filteredTasks.map((task, index) => (
                                                <tr key={task.id} className="border-t last:border-none">
                                                    <TaskComponent task={task} index={index} onDelete={deleteTask} email={email} />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <EmptyState
                                    imageSrc="/empty-task.png"
                                    imageAlt="Picture of an empty project"
                                    message="0 tâche à afficher"
                                />
                            )
                        }
                    </div>
                </div>

            </div>
        </Wrapper>
    )
}

export default page