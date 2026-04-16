"use client";

import { createTask, getProjectInfo, getProjectMembersWithRoles, getProjectUsers, getProjectTeams, getProjectMilestones, createMilestone } from '@/app/actions';
import AssignTask from '@/app/components/AssignTask';
import Wrapper from '@/app/components/Wrapper';
import { Project, ProjectRole, ProjectUserMember, TaskPriority, ProjectTeamNode, Milestone } from '@/type';
import { ViewerPermission } from '@/lib/permissions-core';
import { useAuthUser } from "@/lib/auth-client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { toast } from 'react-toastify';

// Définition du type User localement
interface User {
    id: string;
    name: string | null;
    email: string;
}

const page = ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { email: currentEmail, isLoading } = useAuthUser();

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const [projectId, setProjectId] = useState("");
    const [project, setProject] = useState<Project | null>(null);
    const [usersProject, setUsersProject] = useState<User[]>([]);
    const [members, setMembers] = useState<ProjectUserMember[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
    const [tagsInput, setTagsInput] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState("");
    const [selectedMilestoneId, setSelectedMilestoneId] = useState("");
    const [availableTeams, setAvailableTeams] = useState<ProjectTeamNode[]>([]);
    const [availableMilestones, setAvailableMilestones] = useState<Milestone[]>([]);
    const [newMilestoneName, setNewMilestoneName] = useState("");
    const [newMilestoneDescription, setNewMilestoneDescription] = useState("");
    const [newMilestoneTargetDate, setNewMilestoneTargetDate] = useState("");
    const [isCreatingMilestone, setIsCreatingMilestone] = useState(false);
    const router = useRouter();

    const fetchInfos = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true);
            setProject(project);

            const associatedUsers = await getProjectUsers(projectId);
            setUsersProject(associatedUsers);

            const projectMembers = await getProjectMembersWithRoles(projectId);
            setMembers(projectMembers as ProjectUserMember[]);

            const teamsResult = await getProjectTeams(projectId);
            setAvailableTeams(teamsResult.teamsTree);

            const milestones = await getProjectMilestones(projectId);
            setAvailableMilestones(milestones as Milestone[]);
        } catch (error) {
            console.error(`Erreur lors du chargement du projet :`, error);
        }
    };

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setProjectId(resolvedParams.projectId);
            fetchInfos(resolvedParams.projectId);
        };
        getId();
    }, [params]);

    const currentMembership = useMemo(() => {
        if (!currentEmail) return null;
        return members.find((member) => member.user.email === currentEmail) || null;
    }, [members, currentEmail]);

    const currentUserRole: ProjectRole | null = currentMembership?.role ?? null;
    const currentViewerPermissions = currentMembership?.permissions ?? [];
    const canCreateTask =
        currentUserRole === "OWNER" ||
        currentUserRole === "MANAGER" ||
        (currentUserRole === "VIEWER" &&
            currentViewerPermissions.includes("CREATE_TASK"));
    const canAssignTasks =
        currentUserRole === "OWNER" ||
        currentUserRole === "MANAGER" ||
        (currentUserRole === "VIEWER" &&
            currentViewerPermissions.includes("ASSIGN_TASKS"));
    const canSetDueDate =
        currentUserRole === "OWNER" ||
        currentUserRole === "MANAGER" ||
        canAssignTasks;

    const assignableUsers = useMemo(() => {
        const allowedIds = new Set(
            members
                .filter((member) => member.role !== "VIEWER")
                .map((member) => member.user.id)
        );

        return usersProject.filter((user) => allowedIds.has(user.id));
    }, [usersProject, members]);

    if (isLoading) {
        return (
            <Wrapper>
                <div className="p-4">
                    <p className="text-sm opacity-70">Chargement...</p>
                </div>
            </Wrapper>
        );
    }

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleCreateMilestone = async (): Promise<boolean> => {
        if (!projectId) return false;

        try {
            setIsCreatingMilestone(true);

            const milestone = await createMilestone({
                projectId,
                name: newMilestoneName,
                description: newMilestoneDescription,
                targetDate: newMilestoneTargetDate
                    ? new Date(`${newMilestoneTargetDate}T00:00:00`)
                    : null,
            });

            const milestones = await getProjectMilestones(projectId);
            setAvailableMilestones(milestones as Milestone[]);
            setSelectedMilestoneId(milestone.id);

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

    const handleSubmit = async () => {
        if (!canCreateTask) {
            toast.error("Vous n'avez pas les droits pour créer une tâche dans ce projet.");
            return;
        }

        if (!name || !projectId) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }

        if (selectedUser && !canAssignTasks) {
            toast.error("Vous pouvez créer une tâche, mais pas définir d'exécutant.");
            return;
        }

        // Parser les tags
        const parsedTags = tagsInput
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean);

        try {
            await createTask({
                name,
                description,
                dueDate,
                projectId,
                assignToEmail: selectedUser ? selectedUser.email : null,
                priority,
                tags: parsedTags,
                teamId: selectedTeamId || null,
                milestoneId: selectedMilestoneId || null,
            });
            router.push(`/project/${projectId}`);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue");
        }
    };

    return (
        <Wrapper>
            <div>
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link href={`/project/${projectId}`}>Retour</Link></li>
                        <li>
                            <div className='badge badge-primary'>
                                {project?.name}
                            </div>
                        </li>
                    </ul>
                </div>
                {!canCreateTask && members.length > 0 && (
                    <div className="alert alert-warning mt-4">
                        <span>
                            Vous pouvez consulter ce projet, mais vous n'avez pas la permission de créer des tâches.
                        </span>
                    </div>
                )}
                {canCreateTask && !canAssignTasks && (
                    <div className="alert alert-info mt-4">
                        <span>
                            Vous pouvez créer une tâche, mais pas définir d'exécutant.
                        </span>
                    </div>
                )}
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className='md:w-1/4'>
                        <div className="flex flex-col gap-2 mb-3">
                            <span className="badge w-24 mr-2">
                                Exécutant
                            </span>
                            <p className="text-xs opacity-70">
                                L'exécutant correspond à la personne qui réalise actuellement la tâche.
                            </p>
                        </div>
                        {canAssignTasks ? (
                            <AssignTask users={assignableUsers} projectId={projectId} onAssignTask={handleUserSelect} />
                        ) : (
                            <div className="rounded-2xl border border-base-300 p-4">
                                <p className="text-sm opacity-70">
                                    Aucun exécutant sélectionné. Vous pouvez créer la tâche sans définir d'exécutant pour le moment.
                                </p>
                            </div>
                        )}
                        {canSetDueDate && (
                            <div className='flex justify-between items-center mt-4'>
                                <span className='badge w-20 mr-2'>
                                    À livrer
                                </span>
                                <input
                                    placeholder="Date d'échéance"
                                    className='input input-bordered border border-base-300'
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setDueDate(e.target.value ? new Date(`${e.target.value}T00:00:00`) : null)}
                                    disabled={!canCreateTask} />
                            </div>
                        )}
                        {canCreateTask && (
                            <>
                                <div className='flex flex-col gap-2 mt-4'>
                                    <span className='badge w-20 mr-2'>
                                        Priorité
                                    </span>
                                    <select
                                        className='select select-bordered border border-base-300'
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value as TaskPriority)}
                                        disabled={!canCreateTask}
                                    >
                                        <option value="LOW">Basse</option>
                                        <option value="MEDIUM">Moyenne</option>
                                        <option value="HIGH">Haute</option>
                                        <option value="CRITICAL">Critique</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-2 mt-4'>
                                    <span className='badge w-20 mr-2'>
                                        Tags
                                    </span>
                                    <input
                                        placeholder="frontend, api, urgent (séparés par virgules)"
                                        className='input input-bordered border border-base-300'
                                        type='text'
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        disabled={!canCreateTask}
                                    />
                                </div>
                                <div className='flex flex-col gap-2 mt-4'>
                                    <span className='badge w-20 mr-2'>
                                        Équipe
                                    </span>
                                    <select
                                        className='select select-bordered border border-base-300'
                                        value={selectedTeamId}
                                        onChange={(e) => setSelectedTeamId(e.target.value)}
                                        disabled={!canCreateTask}
                                    >
                                        <option value="">Aucune équipe responsable</option>
                                        {availableTeams.map((team) => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs opacity-70 mt-1">
                                        Cette équipe porte la responsabilité métier de la tâche. L'exécutant peut être défini séparément.
                                    </p>
                                </div>
                                <div className='flex flex-col gap-2 mt-4'>
                                    <span className='badge w-20 mr-2'>
                                        Jalon
                                    </span>
                                    <select
                                        className='select select-bordered border border-base-300'
                                        value={selectedMilestoneId}
                                        onChange={(e) => setSelectedMilestoneId(e.target.value)}
                                        disabled={!canCreateTask}
                                    >
                                        <option value="">Aucun jalon</option>
                                        {availableMilestones.map((milestone) => (
                                            <option key={milestone.id} value={milestone.id}>
                                                {milestone.name}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs opacity-70 mt-1">
                                        Le jalon permet de rattacher la tâche à une étape structurante du projet.
                                    </p>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline btn-sm"
                                            onClick={() => {
                                                const modal = document.getElementById("create_milestone_modal") as HTMLDialogElement | null;
                                                modal?.showModal();
                                            }}
                                            disabled={!canCreateTask}
                                        >
                                            Créer un jalon
                                        </button>
                                    </div>
                                </div>
                                {(selectedUser || selectedTeamId || selectedMilestoneId) && (
                                    <div className="rounded-xl border border-base-300 p-3 mt-4 text-sm">
                                        <div className="font-semibold mb-2">Responsabilité actuelle</div>
                                        <div className="space-y-1">
                                            <div>
                                                <span className="opacity-70">Exécutant :</span>{" "}
                                                {selectedUser ? (selectedUser.name || selectedUser.email) : "Aucun"}
                                            </div>
                                            <div>
                                                <span className="opacity-70">Équipe responsable :</span>{" "}
                                                {selectedTeamId
                                                    ? availableTeams.find((team) => team.id === selectedTeamId)?.name || "Équipe inconnue"
                                                    : "Aucune"}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className='md:w-3/4 mt-4 md:mt-0 md:ml-4'>
                        <div className='flex flex-col justify-between w-full'>
                            <input
                                placeholder='Nom de la tâche'
                                className='w-full input-bordered border border-base-300 font-bold mb-4'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!canCreateTask}
                            />

                            <ReactQuill
                                placeholder='Décrivez la tâche'
                                value={description}
                                modules={modules}
                                onChange={setDescription}
                                readOnly={!canCreateTask}
                            />

                        </div>
                        <div className='flex justify-end'>
                            <button
                                className='btn mt-4 btn-md btn-primary'
                                onClick={handleSubmit}
                                disabled={!canCreateTask}
                            >
                                Créer la tâche
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
        </Wrapper>
    )
}

export default page;