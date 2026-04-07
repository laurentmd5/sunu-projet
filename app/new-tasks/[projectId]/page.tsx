"use client";

import { createTask, getProjectInfo, getProjectMembersWithRoles, getProjectUsers } from '@/app/actions';
import AssignTask from '@/app/components/AssignTask';
import Wrapper from '@/app/components/Wrapper';
import { Project, ProjectRole, ProjectUserMember } from '@/type';
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
    const router = useRouter();

    const fetchInfos = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true);
            setProject(project);

            const associatedUsers = await getProjectUsers(projectId);
            setUsersProject(associatedUsers);

            const projectMembers = await getProjectMembersWithRoles(projectId);
            setMembers(projectMembers as ProjectUserMember[]);
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
    const canCreateTask = currentUserRole === "OWNER" || currentUserRole === "MANAGER";

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

        if (!name || !description || !selectedUser || !projectId || !dueDate) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }
        try {
            await createTask(name, description, dueDate, projectId, selectedUser.email);
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
                            Vous pouvez consulter ce projet, mais seuls le propriétaire et les managers
                            peuvent créer des tâches.
                        </span>
                    </div>
                )}
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className='md:w-1/4'>
                        <AssignTask users={usersProject} projectId={projectId} onAssignTask={handleUserSelect} />
                        <div className='flex justify-between items-center mt-4'>
                            <span className='badge w-20 mr-2'>
                                À livrer
                            </span>
                            <input
                                placeholder="Date d'échéance"
                                className='input input-bordered border border-base-300'
                                type="date"
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                                disabled={!canCreateTask} />
                        </div>
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