"use client";

import {
    createProjectViewer,
    deleteTaskById,
    getProjectActivityLogs,
    getProjectInfo,
    getProjectMembersWithRoles,
    removeProjectMember,
    updateProjectMemberRole,
    updateViewerPermissions,
} from "@/app/actions";

import EmptyState from "@/app/components/EmptyState";
import TaskComponent from "@/app/components/TaskComponent";
import Wrapper from "@/app/components/Wrapper";
import { PROJECT_ROLE_LABELS } from "@/lib/project-role-labels";
import { TASK_STATUSES } from "@/lib/task-status";
import { Project, ProjectRole, ProjectUserMember } from "@/type";
import { ViewerPermission } from "@/lib/permissions-core";
import { useAuthUser } from "@/lib/auth-client";
import {
    CircleCheckBig,
    CopyPlus,
    ListTodo,
    Loader,
    SlidersHorizontal,
    UserCheck,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import ProjectOverviewTab from "./ProjectOverviewTab";
import ProjectMembersTab from "./ProjectMembersTab";
import ProjectActivityTab from "./ProjectActivityTab";
import ProjectTeamsTab from "./ProjectTeamsTab";

const ROLE_ORDER: Record<ProjectRole, number> = {
    OWNER: 0,
    MANAGER: 1,
    VIEWER: 2,
    MEMBER: 3,
};

type PendingRoleChange = {
    memberUserId: string;
    memberName: string;
    currentRole: "MANAGER" | "VIEWER" | "MEMBER";
    newRole: "MANAGER" | "MEMBER";
};

type PendingRemoval = {
    memberUserId: string;
    memberName: string;
};

type ActivityLogItem = {
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

type ProjectTabKey = "overview" | "tasks" | "teams" | "members" | "activity";

const page = ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { email, isLoading } = useAuthUser();

    const [projectId, setProjectId] = useState("");
    const [project, setProject] = useState<Project | null>(null);
    const [members, setMembers] = useState<ProjectUserMember[]>([]);
    const [membersLoading, setMembersLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [assignedFilter, setAssignedFilter] = useState<boolean>(false);
    const [taskCounts, setTaskCounts] = useState({
        todo: 0,
        inProgress: 0,
        done: 0,
        assigned: 0,
    });

    const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([]);
    const [activityLoading, setActivityLoading] = useState(false);

    const [pendingRoleChange, setPendingRoleChange] = useState<PendingRoleChange | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(null);
    const [isSubmittingSensitiveAction, setIsSubmittingSensitiveAction] = useState(false);

    const [viewerEmail, setViewerEmail] = useState("");
    const [viewerPermissions, setViewerPermissions] = useState<ViewerPermission[]>([]);
    const [isCreatingViewer, setIsCreatingViewer] = useState(false);

    const [editingViewerUserId, setEditingViewerUserId] = useState<string | null>(null);
    const [editingViewerPermissions, setEditingViewerPermissions] = useState<ViewerPermission[]>([]);
    const [isUpdatingViewerPermissions, setIsUpdatingViewerPermissions] = useState(false);

    const [activeTab, setActiveTab] = useState<ProjectTabKey>("overview");
    const [membersLoaded, setMembersLoaded] = useState(false);
    const [activityLoaded, setActivityLoaded] = useState(false);

    const fetchInfos = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true);
            setProject(project);
        } catch (error) {
            console.error(`Erreur lors du chargement du projet :`, error);
        }
    };

    const fetchMembers = async (projectId: string) => {
        try {
            setMembersLoading(true);
            const projectMembers = await getProjectMembersWithRoles(projectId);
            setMembers(projectMembers as ProjectUserMember[]);
        } catch (error) {
            console.error("Erreur lors du chargement des membres :", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors du chargement des membres"
            );
        } finally {
            setMembersLoading(false);
        }
    };

    const fetchActivityLogs = async (projectId: string) => {
        try {
            setActivityLoading(true);
            const logs = await getProjectActivityLogs(projectId);
            setActivityLogs(logs as ActivityLogItem[]);
        } catch (error) {
            console.error("Erreur lors du chargement de l'activité :", error);
            if (error && typeof error === "object" && "status" in error && error.status === 403) {
                setActivityLogs([]);
                return;
            }
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors du chargement de l'activité"
            );
        } finally {
            setActivityLoading(false);
        }
    };

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setProjectId(resolvedParams.projectId);
            await fetchInfos(resolvedParams.projectId);
        };
        getId();
    }, [params]);

    useEffect(() => {
        if (project && project.tasks && email) {
            const counts = {
                todo: project.tasks.filter(
                    (task) => task.status === TASK_STATUSES.TODO
                ).length,
                inProgress: project.tasks.filter(
                    (task) => task.status === TASK_STATUSES.IN_PROGRESS
                ).length,
                done: project.tasks.filter(
                    (task) => task.status === TASK_STATUSES.DONE
                ).length,
                assigned: project.tasks.filter(
                    (task) => task?.user?.email === email
                ).length,
            };
            setTaskCounts(counts);
        }
    }, [project, email]);

    useEffect(() => {
        if (!projectId) return;

        if (activeTab === "members" && !membersLoaded) {
            fetchMembers(projectId).then(() => setMembersLoaded(true));
        }

        if ((activeTab === "activity" || activeTab === "overview") && !activityLoaded) {
            fetchActivityLogs(projectId).then(() => setActivityLoaded(true));
        }
    }, [activeTab, projectId, membersLoaded, activityLoaded]);

    const currentMembership = useMemo(() => {
        if (!email) return null;
        return members.find((member) => member.user.email === email) || null;
    }, [members, email]);

    const currentUserRole: ProjectRole | null = currentMembership?.role ?? null;
    const currentViewerPermissions = currentMembership?.permissions ?? [];
    const canManageMembers = currentUserRole === "OWNER";
    const canCreateTask =
        currentUserRole === "OWNER" ||
        currentUserRole === "MANAGER" ||
        (currentUserRole === "VIEWER" &&
            currentViewerPermissions.includes("CREATE_TASK"));
    const canDeleteTask =
        currentUserRole === "OWNER" || currentUserRole === "MANAGER";

    const groupedMembers = useMemo(() => {
        const sorted = [...members].sort((a, b) => {
            const roleOrderDiff = ROLE_ORDER[a.role] - ROLE_ORDER[b.role];
            if (roleOrderDiff !== 0) return roleOrderDiff;

            const aName = a.user.name || a.user.email;
            const bName = b.user.name || b.user.email;
            return aName.localeCompare(bName, "fr", { sensitivity: "base" });
        });

        return {
            OWNER: sorted.filter((member) => member.role === "OWNER"),
            MANAGER: sorted.filter((member) => member.role === "MANAGER"),
            VIEWER: sorted.filter((member) => member.role === "VIEWER"),
            MEMBER: sorted.filter((member) => member.role === "MEMBER"),
        };
    }, [members]);

    const filteredTasks = project?.tasks?.filter((task) => {
        const statusMatch = !statusFilter || task.status === statusFilter;
        const assignedMatch = !assignedFilter || task?.user?.email === email;
        return statusMatch && assignedMatch;
    });

    if (isLoading) {
        return (
            <Wrapper>
                <div className="p-4">
                    <p className="text-sm opacity-70">Chargement...</p>
                </div>
            </Wrapper>
        );
    }

    const deleteTask = async (taskId: string) => {
        try {
            await deleteTaskById(taskId);
            fetchInfos(projectId);
            fetchActivityLogs(projectId);
            toast.success("Tâche supprimée avec succès");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    const requestRoleChange = (
        member: ProjectUserMember,
        newRole: "MANAGER" | "MEMBER"
    ) => {
        if (member.role === newRole) return;

        setPendingRoleChange({
            memberUserId: member.userId,
            memberName: member.user.name || member.user.email,
            currentRole: member.role as "MANAGER" | "VIEWER" | "MEMBER",
            newRole,
        });

        const modal = document.getElementById("confirm_role_change_modal") as HTMLDialogElement | null;
        modal?.showModal();
    };

    const confirmRoleChange = async () => {
        if (!pendingRoleChange) return;

        try {
            setIsSubmittingSensitiveAction(true);
            await updateProjectMemberRole(
                projectId,
                pendingRoleChange.memberUserId,
                pendingRoleChange.newRole
            );
            await fetchMembers(projectId);
            await fetchActivityLogs(projectId);
            setMembersLoaded(true);
            setActivityLoaded(true);
            toast.success("Rôle mis à jour avec succès");
            closeRoleChangeModal();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setIsSubmittingSensitiveAction(false);
        }
    };

    const requestRemoveMember = (member: ProjectUserMember) => {
        setPendingRemoval({
            memberUserId: member.userId,
            memberName: member.user.name || member.user.email,
        });

        const modal = document.getElementById("confirm_remove_member_modal") as HTMLDialogElement | null;
        modal?.showModal();
    };

    const confirmRemoveMember = async () => {
        if (!pendingRemoval) return;

        try {
            setIsSubmittingSensitiveAction(true);
            await removeProjectMember(projectId, pendingRemoval.memberUserId);
            await fetchMembers(projectId);
            await fetchActivityLogs(projectId);
            setMembersLoaded(true);
            setActivityLoaded(true);
            toast.success("Collaborateur retiré avec succès");
            closeRemoveMemberModal();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setIsSubmittingSensitiveAction(false);
        }
    };

    const handleCreateViewer = async () => {
        try {
            setIsCreatingViewer(true);
            await createProjectViewer(projectId, viewerEmail, viewerPermissions);
            setViewerEmail("");
            setViewerPermissions([]);
            await fetchMembers(projectId);
            await fetchActivityLogs(projectId);
            setMembersLoaded(true);
            setActivityLoaded(true);
            toast.success("Observateur ajouté avec succès");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setIsCreatingViewer(false);
        }
    };

    const startEditViewerPermissions = (
        viewerUserId: string,
        permissions: ViewerPermission[]
    ) => {
        setEditingViewerUserId(viewerUserId);
        setEditingViewerPermissions(permissions);
    };

    const handleUpdateViewerPermissions = async () => {
        if (!editingViewerUserId) return;

        try {
            setIsUpdatingViewerPermissions(true);
            await updateViewerPermissions(
                projectId,
                editingViewerUserId,
                editingViewerPermissions
            );
            setEditingViewerUserId(null);
            setEditingViewerPermissions([]);
            await fetchMembers(projectId);
            await fetchActivityLogs(projectId);
            setMembersLoaded(true);
            setActivityLoaded(true);
            toast.success("Permissions mises à jour avec succès");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setIsUpdatingViewerPermissions(false);
        }
    };

    const closeRoleChangeModal = () => {
        const modal = document.getElementById("confirm_role_change_modal") as HTMLDialogElement | null;
        modal?.close();
        setPendingRoleChange(null);
    };

    const closeRemoveMemberModal = () => {
        const modal = document.getElementById("confirm_remove_member_modal") as HTMLDialogElement | null;
        modal?.close();
        setPendingRemoval(null);
    };

    return (
        <Wrapper>
            <div className="space-y-6">
                <div className="flex flex-wrap gap-2 border-b border-base-300 pb-4">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`btn btn-sm ${activeTab === "overview" ? "btn-primary" : "btn-ghost"}`}
                    >
                        Aperçu
                    </button>
                    <button
                        onClick={() => setActiveTab("tasks")}
                        className={`btn btn-sm ${activeTab === "tasks" ? "btn-primary" : "btn-ghost"}`}
                    >
                        Tâches
                    </button>
                    <button
                        onClick={() => setActiveTab("teams")}
                        className={`btn btn-sm ${activeTab === "teams" ? "btn-primary" : "btn-ghost"}`}
                    >
                        Équipes
                    </button>
                    <button
                        onClick={() => setActiveTab("members")}
                        className={`btn btn-sm ${activeTab === "members" ? "btn-primary" : "btn-ghost"}`}
                    >
                        Membres
                    </button>
                    <button
                        onClick={() => setActiveTab("activity")}
                        className={`btn btn-sm ${activeTab === "activity" ? "btn-primary" : "btn-ghost"}`}
                    >
                        Activité
                    </button>
                </div>

                <ProjectOverviewTab
                    isActive={activeTab === "overview"}
                    project={project}
                    taskCount={project?.tasks?.length || 0}
                    activityPreview={activityLogs.slice(0, 5)}
                />

                {activeTab === "tasks" && (
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        setStatusFilter("");
                                        setAssignedFilter(false);
                                    }}
                                    className={`btn btn-sm ${!statusFilter ? "btn-primary" : ""}`}
                                >
                                    <SlidersHorizontal className="w-4" />
                                    Tous ({project?.tasks?.length || 0})
                                </button>

                                <button
                                    onClick={() => setStatusFilter(TASK_STATUSES.TODO)}
                                    className={`btn btn-sm ${statusFilter === TASK_STATUSES.TODO ? "btn-primary" : ""}`}
                                >
                                    <ListTodo className="w-4" />
                                    À faire ({taskCounts.todo})
                                </button>

                                <button
                                    onClick={() => setStatusFilter(TASK_STATUSES.IN_PROGRESS)}
                                    className={`btn btn-sm ${statusFilter === TASK_STATUSES.IN_PROGRESS ? "btn-primary" : ""}`}
                                >
                                    <Loader className="w-4" />
                                    En Cours ({taskCounts.inProgress})
                                </button>

                                <button
                                    onClick={() => setStatusFilter(TASK_STATUSES.DONE)}
                                    className={`btn btn-sm ${statusFilter === TASK_STATUSES.DONE ? "btn-primary" : ""}`}
                                >
                                    <CircleCheckBig className="w-4" />
                                    Terminée(s) ({taskCounts.done})
                                </button>

                                <button
                                    onClick={() => setAssignedFilter(!assignedFilter)}
                                    className={`btn btn-sm ${assignedFilter ? "btn-primary" : ""}`}
                                >
                                    <UserCheck className="w-4" />
                                    Vos tâches ({taskCounts.assigned})
                                </button>
                            </div>
                        </div>

                        {canCreateTask && (
                            <Link
                                href={`/new-tasks/${projectId}`}
                                className="btn btn-sm self-start"
                            >
                                Nouvelle tâche
                                <CopyPlus className="w-4" />
                            </Link>
                        )}

                        <div className="border border-base-300 p-4 md:p-5 shadow-sm rounded-xl">
                            {filteredTasks && filteredTasks.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="table table-lg">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Titre</th>
                                                <th>Assigné à</th>
                                                <th className="hidden md:table-cell">À livrer le</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTasks.map((task, index) => (
                                                <tr key={task.id} className="border-t last:border-none">
                                                    <TaskComponent
                                                        task={task}
                                                        index={index}
                                                        onDelete={deleteTask}
                                                        canDelete={canDeleteTask}
                                                    />
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
                            )}
                        </div>
                    </div>
                )}

                <ProjectTeamsTab
                    isActive={activeTab === "teams"}
                    projectId={projectId}
                />

                <ProjectMembersTab
                    isActive={activeTab === "members"}
                    members={members}
                    membersLoading={membersLoading}
                    groupedMembers={groupedMembers}
                    email={email}
                    currentUserRole={currentUserRole}
                    canManageMembers={canManageMembers}
                    viewerEmail={viewerEmail}
                    setViewerEmail={setViewerEmail}
                    viewerPermissions={viewerPermissions}
                    setViewerPermissions={setViewerPermissions}
                    isCreatingViewer={isCreatingViewer}
                    handleCreateViewer={handleCreateViewer}
                    editingViewerUserId={editingViewerUserId}
                    editingViewerPermissions={editingViewerPermissions}
                    setEditingViewerUserId={setEditingViewerUserId}
                    setEditingViewerPermissions={setEditingViewerPermissions}
                    isUpdatingViewerPermissions={isUpdatingViewerPermissions}
                    handleUpdateViewerPermissions={handleUpdateViewerPermissions}
                    startEditViewerPermissions={startEditViewerPermissions}
                    requestRoleChange={requestRoleChange}
                    requestRemoveMember={requestRemoveMember}
                />

                <ProjectActivityTab
                    isActive={activeTab === "activity"}
                    loading={activityLoading}
                    logs={activityLogs}
                />

                <dialog id="confirm_role_change_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={closeRoleChangeModal}
                            >
                                ✕
                            </button>
                        </form>

                        <h3 className="font-bold text-lg">Confirmer le changement de rôle</h3>

                        {pendingRoleChange && (
                            <>

                                <p className="py-3 text-sm opacity-80">
                                    Vous êtes sur le point de modifier le rôle de{" "}
                                    <strong>{pendingRoleChange.memberName}</strong>.
                                </p>

                                <div className="alert alert-warning mb-4">
                                    <span>
                                        Rôle actuel :{" "}
                                        <strong>{PROJECT_ROLE_LABELS[pendingRoleChange.currentRole]}</strong>
                                        {" → "}
                                        Nouveau rôle :{" "}
                                        <strong>{PROJECT_ROLE_LABELS[pendingRoleChange.newRole]}</strong>
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={closeRoleChangeModal}
                                disabled={isSubmittingSensitiveAction}
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={confirmRoleChange}
                                disabled={!pendingRoleChange || isSubmittingSensitiveAction}
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </dialog>

                <dialog id="confirm_remove_member_modal" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={closeRemoveMemberModal}
                            >
                                ✕
                            </button>
                        </form>

                        <h3 className="font-bold text-lg">Retirer ce collaborateur</h3>

                        {pendingRemoval && (
                            <>

                                <p className="py-3 text-sm opacity-80">
                                    Vous êtes sur le point de retirer{" "}
                                    <strong>{pendingRemoval.memberName}</strong> de ce projet.
                                </p>

                                <div className="alert alert-warning mb-4">
                                    <span>
                                        Cette personne perdra l'accès au projet et à ses tâches associées.
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={closeRemoveMemberModal}
                                disabled={isSubmittingSensitiveAction}
                            >
                                Annuler
                            </button>

                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={confirmRemoveMember}
                                disabled={!pendingRemoval || isSubmittingSensitiveAction}
                            >
                                Retirer du projet
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </Wrapper>
    );
};

export default page;