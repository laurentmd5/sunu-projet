"use client";

import { createTask, getProjectInfo, getProjectMembersWithRoles, getProjectUsers, getProjectTeams } from '@/app/actions';
import AssignTask from '@/app/components/AssignTask';
import Wrapper from '@/app/components/Wrapper';
import { Project, ProjectRole, ProjectUserMember, TaskPriority, ProjectTeamNode } from '@/type';
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
    const [availableTeams, setAvailableTeams] = useState<ProjectTeamNode[]>([]);
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
            toast.error("Vous pouvez créer une tâche, mais pas l'assigner.");
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
                milestoneId: null,
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
                            Vous pouvez créer une tâche, mais pas l'assigner à un collaborateur.
                        </span>
                    </div>
                )}
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className='md:w-1/4'>
                        {canAssignTasks ? (
                            <AssignTask users={assignableUsers} projectId={projectId} onAssignTask={handleUserSelect} />
                        ) : (
                            <div className="rounded-2xl border border-base-300 p-4">
                                <p className="text-sm opacity-70">
                                    Aucune assignation. Vous pouvez créer la tâche sans l'assigner.
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
                                        Cette équipe sera marquée responsable de la tâche.
                                    </p>
                                </div>
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
        </Wrapper>
    )
}

export default page;