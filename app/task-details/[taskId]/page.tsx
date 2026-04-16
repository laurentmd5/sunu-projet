"use client"
import { getProjectInfo, getProjectMembersWithRoles, getTaskDetails, updateTaskManagement, updateTaskStatus, getProjectTeams, sendTaskToReview, addTaskComment, getProjectMilestones, createMilestone } from '@/app/actions'
import EmptyState from '@/app/components/EmptyState'
import UserInfo from '@/app/components/UserInfo'
import Wrapper from '@/app/components/Wrapper'
import { Project, ProjectRole, ProjectUserMember, Task, TaskStatus, TaskPriority, ProjectTeamNode, Milestone } from '@/type'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import ReactQuill from 'react-quill-new'
import { toast } from 'react-toastify'
import 'react-quill-new/dist/quill.snow.css';
import { useAuthUser } from "@/lib/auth-client"
import { TASK_STATUSES } from '@/lib/task-status'

const page = ({ params }: { params: Promise<{ taskId: string }> }) => {

    const { email, isLoading } = useAuthUser();

    const [task, setTask] = useState<Task | null>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [project, setProject] = useState<Project | null>(null);
    const [members, setMembers] = useState<ProjectUserMember[]>([]);
    const [status, setStatus] = useState<TaskStatus>(TASK_STATUSES.TODO)
    const [solution, setSolution] = useState("")
    const [realStatus, setRealStatus] = useState<TaskStatus>(TASK_STATUSES.TODO)
    const [selectedAssigneeEmail, setSelectedAssigneeEmail] = useState<string>("");
    const [managementDueDate, setManagementDueDate] = useState<string>("")
    const [managementPriority, setManagementPriority] = useState<TaskPriority>("MEDIUM");
    const [managementTagsInput, setManagementTagsInput] = useState("");
    const [managementTeamId, setManagementTeamId] = useState("");
    const [managementMilestoneId, setManagementMilestoneId] = useState("");
    const [availableTeams, setAvailableTeams] = useState<ProjectTeamNode[]>([]);
    const [availableMilestones, setAvailableMilestones] = useState<Milestone[]>([]);
    const [isSubmittingManagement, setIsSubmittingManagement] = useState(false);
    const [reviewFeedback, setReviewFeedback] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [newMilestoneName, setNewMilestoneName] = useState("");
    const [newMilestoneDescription, setNewMilestoneDescription] = useState("");
    const [newMilestoneTargetDate, setNewMilestoneTargetDate] = useState("");
    const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
        ]
    };

    const fetchInfos = async (taskId: string) => {
        try {
            const task = await getTaskDetails(taskId)
            setTask(task as Task)
            setStatus(task.status)
            setRealStatus(task.status)
            setSelectedAssigneeEmail(task.user?.email || "");
            setManagementDueDate(
                task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] || "" : ""
            );
            setManagementPriority((task.priority as TaskPriority) || "MEDIUM");
            setManagementTagsInput(Array.isArray(task.tags) ? task.tags.join(", ") : "");
            setManagementTeamId(task.teamId || "");
            setManagementMilestoneId(task.milestoneId || "");
            await fetchProject(task.projectId)
            await fetchMembers(task.projectId)
            await fetchTeams(task.projectId)
            await fetchMilestones(task.projectId)
        } catch (error) {
            toast.error("Erreur lors du chargement des détails de la tâche.")
        }
    }

    const fetchProject = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, false)
            setProject(project)
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    }

    const fetchMembers = async (projectId: string) => {
        try {
            const projectMembers = await getProjectMembersWithRoles(projectId);
            setMembers(projectMembers as ProjectUserMember[]);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    const fetchTeams = async (projectId: string) => {
        try {
            const teamsResult = await getProjectTeams(projectId);
            setAvailableTeams(teamsResult.teamsTree);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    const fetchMilestones = async (projectId: string) => {
        try {
            const milestones = await getProjectMilestones(projectId);
            setAvailableMilestones(milestones as Milestone[]);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setTaskId(resolvedParams.taskId)
            fetchInfos(resolvedParams.taskId)
        }
        getId()
    }, [params])

    const changeStatus = async (taskId: string, newStatus: TaskStatus) => {
        try {
            await updateTaskStatus(taskId, newStatus)
            fetchInfos(taskId)
        } catch (error) {
            toast.error("Erreur lors du changement de status")
        }
    }

    const currentMembership = useMemo(() => {
        if (!email) return null;
        return members.find((member) => member.user.email === email) || null;
    }, [members, email]);

    const currentUserRole: ProjectRole | null = currentMembership?.role ?? null;

    const canUpdateStatus = !!task && (
        task.user?.email === email ||
        task.createdBy?.email === email ||
        currentUserRole === "OWNER" ||
        currentUserRole === "MANAGER"
    );

    const canManageTaskSettings =
        currentUserRole === "OWNER" || currentUserRole === "MANAGER";

    const isTeamLeadForTask =
        !!task?.team && task.team.leadUserId === currentMembership?.userId;

    const canSendToReview =
        !!task &&
        task.status === TASK_STATUSES.DONE &&
        (
            currentUserRole === "OWNER" ||
            currentUserRole === "MANAGER" ||
            isTeamLeadForTask
        );

    const canComment =
        currentUserRole !== null && currentUserRole !== "VIEWER";

    const assignableMembers = useMemo(() => {
        return members.filter((member) => member.role !== "VIEWER");
    }, [members]);

    const handleSaveTaskManagement = async (): Promise<boolean> => {
        if (!task) return false;

        try {
            setIsSubmittingManagement(true);

            // Parser les tags
            const parsedTags = managementTagsInput
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean);

            await updateTaskManagement({
                taskId: task.id,
                assignToEmail: selectedAssigneeEmail || null,
                dueDate: managementDueDate ? new Date(`${managementDueDate}T00:00:00`) : null,
                priority: managementPriority,
                tags: parsedTags,
                teamId: managementTeamId || null,
                milestoneId: managementMilestoneId || null,
            });

            await fetchInfos(task.id);
            toast.success("Gestion de la tâche mise à jour");
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
            return false;
        } finally {
            setIsSubmittingManagement(false);
        }
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value as TaskStatus;
        setStatus(newStatus);

        const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;

        if (
            newStatus === TASK_STATUSES.TODO ||
            newStatus === TASK_STATUSES.IN_PROGRESS ||
            newStatus === TASK_STATUSES.CANCELLED
        ) {
            changeStatus(taskId, newStatus);
            toast.success("Statut changé");
            modal?.close();
        } else if (newStatus === TASK_STATUSES.DONE) {
            modal?.showModal();
        }
    }

    const closeTask = async (newStatus: TaskStatus) => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement

        try {
            if (solution != "") {
                await updateTaskStatus(taskId, newStatus, solution)
                fetchInfos(taskId)
                if (modal) {
                    modal.close()
                }
                toast.success('Tâche cloturée')
            }
            else {
                toast.error('Il manque une solution')
            }
        } catch (error) {
            toast.error("Erreur lors du changement de status")
        }
    }

    const handleClose = () => {
        if (status === TASK_STATUSES.DONE && status !== realStatus) {
            setStatus(realStatus)
        }
    }

    const handleSendToReview = async () => {
        if (!task) return;

        try {
            setIsSubmittingReview(true);
            await sendTaskToReview({
                taskId: task.id,
                reviewFeedback,
            });
            setReviewFeedback("");
            const modal = document.getElementById("review_modal") as HTMLDialogElement | null;
            modal?.close();
            await fetchInfos(task.id);
            toast.success("La tâche a été mise en revue.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const handleAddComment = async () => {
        if (!task) return;

        try {
            setIsSubmittingComment(true);

            await addTaskComment({
                taskId: task.id,
                body: newComment,
            });

            setNewComment("");
            await fetchInfos(task.id);
            toast.success("Commentaire ajouté");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleCreateMilestone = async (): Promise<boolean> => {
        if (!task) return false;

        try {
            setIsCreatingMilestone(true);

            const milestone = await createMilestone({
                projectId: task.projectId,
                name: newMilestoneName,
                description: newMilestoneDescription,
                targetDate: newMilestoneTargetDate
                    ? new Date(`${newMilestoneTargetDate}T00:00:00`)
                    : null,
            });

            const milestones = await getProjectMilestones(task.projectId);
            setAvailableMilestones(milestones as Milestone[]);
            setManagementMilestoneId(milestone.id);

            setNewMilestoneName("");
            setNewMilestoneDescription("");
            setNewMilestoneTargetDate("");

            toast.success("Jalon créé avec succès.");
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
            return false;
        } finally {
            setIsCreatingMilestone(false);
        }
    };

    useEffect(() => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement
        if (modal) {
            modal.addEventListener('close', handleClose)
        }
        return () => {
            if (modal) {
                modal.removeEventListener('close', handleClose)
            }
        }
    }, [status, realStatus])

    if (isLoading) {
        return (
            <Wrapper>
                <div className="p-4">
                    <p className="text-sm opacity-70">Chargement...</p>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {task ? (
                <div>
                    <div className='flex flex-col md:justify-between md:flex-row'>
                        <div className='breadcrumbs text-sm'>
                            <ul>
                                <li>
                                    <Link href={`/project/${task?.projectId}`}>
                                        Retour
                                    </Link>
                                </li>
                                <li>
                                    {project?.name}
                                </li>
                            </ul>
                        </div>
                        <div className='p-5 border border-base-300 rounded-xl w-full md:w-fit my-4'>
                            <UserInfo
                                role="Exécutant"
                                email={task.user?.email || null}
                                name={task.user?.name || null}
                            />
                        </div>
                    </div>

                    <h1 className='font-semibold italic text-2xl mb-4'>
                        {task.name}
                    </h1>

                    <div className="p-5 border border-base-300 rounded-xl mb-4">
                        <h2 className="font-semibold text-lg mb-3">Responsabilité</h2>
                        <div className="grid gap-3 md:grid-cols-3">
                            <div>
                                <div className="text-sm opacity-70 mb-1">Exécutant actuel</div>
                                <div className="font-medium">
                                    {task.user ? (task.user.name || task.user.email) : "Aucun exécutant défini"}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm opacity-70 mb-1">Équipe responsable</div>
                                <div className="font-medium">
                                    {task.team ? task.team.name : "Aucune équipe responsable"}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm opacity-70 mb-1">Jalon</div>
                                <div className="font-medium">
                                    {task.milestone ? task.milestone.name : "Aucun jalon"}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs opacity-70 mt-3">
                            L'équipe responsable porte la responsabilité métier de la tâche. L'exécutant correspond à la personne qui la réalise actuellement.
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-2 mb-4'>
                        {task.priority && (
                            <div className={`badge text-xs
                            ${task.priority === "LOW" ? "bg-blue-100 text-blue-800" : ""}
                            ${task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" : ""}
                            ${task.priority === "HIGH" ? "bg-orange-100 text-orange-800" : ""}
                            ${task.priority === "CRITICAL" ? "bg-red-100 text-red-800" : ""}
                            `}>
                                {task.priority === "LOW" && "Basse"}
                                {task.priority === "MEDIUM" && "Moyenne"}
                                {task.priority === "HIGH" && "Haute"}
                                {task.priority === "CRITICAL" && "Critique"}
                            </div>
                        )}
                        {task.team && (
                            <div className='badge badge-ghost text-xs'>
                                Équipe responsable : {task.team.name}
                            </div>
                        )}
                        {task.milestone && (
                            <div className='badge badge-ghost text-xs'>
                                Jalon: {task.milestone.name}
                            </div>
                        )}
                    </div>

                    {Array.isArray(task.tags) && task.tags.length > 0 && (
                        <div className='flex gap-1 mb-4 flex-wrap'>
                            {task.tags.map((tag, i) => (
                                <span key={i} className="badge badge-ghost badge-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {task.status === TASK_STATUSES.IN_REVIEW && task.reviewFeedback && (
                        <div className="alert alert-warning mb-4">
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold">Retour de revue</span>
                                <span>{task.reviewFeedback}</span>
                                {task.reviewedBy && (
                                    <span className="text-xs opacity-70">
                                        Demandé par {task.reviewedBy.name || task.reviewedBy.email}
                                        {task.reviewedAt ? ` le ${new Date(task.reviewedAt).toLocaleString()}` : ""}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {canManageTaskSettings && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                    const modal = document.getElementById("management_modal") as HTMLDialogElement | null;
                                    modal?.showModal();
                                }}
                            >
                                Gestion de la tâche
                            </button>
                        </div>
                    )}

                    <div className='flex justify-between items-center mb-4'>
                        <span>
                            À livré le
                            <div className='badge badge-ghost ml-2'>
                                {task?.dueDate?.toLocaleDateString()}
                            </div>
                        </span>
                        <div className="flex flex-col items-end gap-2">
                            {!canUpdateStatus && (
                                <span className="text-xs opacity-70">
                                    Seuls l'assigné, le créateur de la tâche, le propriétaire du projet
                                    ou un manager peuvent modifier le statut.
                                </span>
                            )}
                            <select
                                value={status}
                                onChange={handleStatusChange}
                                className='select select-sm select-bordered select-primary focus:outline-none ml-3'
                                disabled={status === TASK_STATUSES.DONE || !canUpdateStatus}
                            >
                                <option value={TASK_STATUSES.TODO}>À faire</option>
                                <option value={TASK_STATUSES.IN_PROGRESS}>En cours</option>
                                <option value={TASK_STATUSES.DONE}>Terminée</option>
                                <option value={TASK_STATUSES.CANCELLED}>Annulée</option>
                            </select>
                            {canSendToReview && (
                                <button
                                    className="btn btn-warning btn-sm mt-2"
                                    onClick={() => {
                                        const modal = document.getElementById("review_modal") as HTMLDialogElement | null;
                                        modal?.showModal();
                                    }}
                                >
                                    Mettre en revue
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className='flex md:justify-between md:items-center flex-col md:flex-row'>
                            <div className='p-5 border border-base-300 rounded-xl w-full md:w-fit'>
                                <UserInfo
                                    role="Créée par"
                                    email={task.createdBy?.email || null}
                                    name={task.createdBy?.name || null}
                                />
                            </div>
                            <div className='badge badge-primary my-4 md:mt-0'>
                                {task.dueDate && `
                                    ${Math.max(0, Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} jours restants
                                `}
                            </div>
                        </div>
                    </div>

                    <div className='ql-snow w-full'>
                        <div
                            className='ql-editor p-5 border-base-300 border rounded-xl'
                            dangerouslySetInnerHTML={{ __html: task.description }}
                        />
                    </div>

                    {task?.solutionDescription && (
                        <div>
                            <div className='badge badge-primary my-4'>
                                Solution
                            </div>
                            <div className='ql-snow w-full'>
                                <div
                                    className='ql-editor p-5 border-base-300 border rounded-xl'
                                    dangerouslySetInnerHTML={{ __html: task.solutionDescription }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-6">
                        <h2 className="font-semibold text-lg mb-4">Commentaires</h2>

                        {canComment && (
                            <div className="p-4 border border-base-300 rounded-xl mb-4">
                                <textarea
                                    className="textarea textarea-bordered w-full min-h-28"
                                    placeholder="Ajouter un commentaire..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <div className="flex justify-end mt-3">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={handleAddComment}
                                        disabled={isSubmittingComment || !newComment.trim()}
                                    >
                                        {isSubmittingComment ? "Envoi..." : "Commenter"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {Array.isArray(task.comments) && task.comments.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {task.comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="p-4 border border-base-300 rounded-xl"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium">
                                                {comment.author?.name || comment.author?.email || "Utilisateur"}
                                            </span>
                                            <span className="text-xs opacity-70">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm whitespace-pre-wrap">{comment.body}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm opacity-70">
                                Aucun commentaire pour le moment.
                            </div>
                        )}
                    </div>

                    <dialog id="management_modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg mb-4">Gestion de la tâche</h3>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Exécutant</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={selectedAssigneeEmail}
                                            onChange={(e) => setSelectedAssigneeEmail(e.target.value)}
                                        >
                                            <option value="">Aucun exécutant</option>
                                            {assignableMembers.map((member) => (
                                                <option key={member.userId} value={member.user.email}>
                                                    {member.user.name || member.user.email}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-xs opacity-70 mt-1">
                                            L'équipe responsable et l'exécutant peuvent être définis séparément. Si les deux sont renseignés, l'exécutant doit appartenir à l'équipe responsable ou à une de ses sous-équipes.
                                        </p>
                                    </div>

                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Date d'échéance</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={managementDueDate}
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={(e) => setManagementDueDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Priorité</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={managementPriority}
                                            onChange={(e) => setManagementPriority(e.target.value as TaskPriority)}
                                        >
                                            <option value="LOW">Basse</option>
                                            <option value="MEDIUM">Moyenne</option>
                                            <option value="HIGH">Haute</option>
                                            <option value="CRITICAL">Critique</option>
                                        </select>
                                    </div>

                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Tags</span>
                                        </label>
                                        <input
                                            placeholder="frontend, api, urgent (séparés par virgules)"
                                            className="input input-bordered w-full"
                                            type='text'
                                            value={managementTagsInput}
                                            onChange={(e) => setManagementTagsInput(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Équipe responsable</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={managementTeamId}
                                            onChange={(e) => setManagementTeamId(e.target.value)}
                                        >
                                            <option value="">Aucune équipe responsable</option>
                                            {availableTeams.map((team) => (
                                                <option key={team.id} value={team.id}>
                                                    {team.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                    <div className="flex-1">
                                        <label className="label">
                                            <span className="label-text">Jalon</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={managementMilestoneId}
                                            onChange={(e) => setManagementMilestoneId(e.target.value)}
                                        >
                                            <option value="">Aucun jalon</option>
                                            {availableMilestones.map((milestone) => (
                                                <option key={milestone.id} value={milestone.id}>
                                                    {milestone.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline btn-sm"
                                                onClick={() => {
                                                    const modal = document.getElementById("create_milestone_modal") as HTMLDialogElement | null;
                                                    modal?.showModal();
                                                }}
                                            >
                                                Créer un jalon
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-4">
                                    <button
                                        className="btn btn-primary"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            const ok = await handleSaveTaskManagement();
                                            if (ok) {
                                                const modal = document.getElementById("management_modal") as HTMLDialogElement | null;
                                                modal?.close();
                                            }
                                        }}
                                        disabled={isSubmittingManagement}
                                    >
                                        {isSubmittingManagement ? "Enregistrement..." : "Enregistrer"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </dialog>

                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">Quelle est la solution ?</h3>
                            <p className="py-4">Décrivez ce que vous avez fait exactement</p>

                            <ReactQuill
                                placeholder='Décrivez la solution'
                                value={solution}
                                modules={modules}
                                onChange={setSolution}
                            />
                            <button onClick={() => closeTask(status)} className='btn mt-4'>Valider</button>
                        </div>
                    </dialog>

                    <dialog id="review_modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg">Mettre la tâche en revue</h3>
                            <p className="py-4">
                                Expliquez précisément ce qui ne va pas dans la solution proposée.
                            </p>

                            <textarea
                                className="textarea textarea-bordered w-full min-h-32"
                                placeholder="Décrivez le problème constaté..."
                                value={reviewFeedback}
                                onChange={(e) => setReviewFeedback(e.target.value)}
                            />

                            <div className="flex justify-end mt-4">
                                <button
                                    className="btn btn-warning"
                                    onClick={handleSendToReview}
                                    disabled={isSubmittingReview}
                                >
                                    {isSubmittingReview ? "Validation..." : "Valider la revue"}
                                </button>
                            </div>
                        </div>
                    </dialog>

                    <dialog id="create_milestone_modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <h3 className="font-bold text-lg mb-4">Créer un jalon</h3>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Nom</span>
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        value={newMilestoneName}
                                        onChange={(e) => setNewMilestoneName(e.target.value)}
                                        placeholder="Nom du jalon"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        value={newMilestoneDescription}
                                        onChange={(e) => setNewMilestoneDescription(e.target.value)}
                                        placeholder="Description du jalon"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Date cible</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input input-bordered w-full"
                                        value={newMilestoneTargetDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setNewMilestoneTargetDate(e.target.value)}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={async () => {
                                            const ok = await handleCreateMilestone();
                                            if (ok) {
                                                const modal = document.getElementById("create_milestone_modal") as HTMLDialogElement | null;
                                                modal?.close();
                                            }
                                        }}
                                        disabled={isCreatingMilestone || !newMilestoneName.trim()}
                                    >
                                        {isCreatingMilestone ? "Création..." : "Créer"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </dialog>

                </div>
            ) : (
                <EmptyState
                    imageSrc="/empty-task.png"
                    imageAlt="Picture of an empty project"
                    message="Cette tâche n'existe pas"
                />
            )}
        </Wrapper>
    )
}

export default page