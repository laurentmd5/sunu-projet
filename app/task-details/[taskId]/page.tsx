"use client"
import { getProjectInfo, getProjectMembersWithRoles, getTaskDetails, updateTaskStatus } from '@/app/actions'
import EmptyState from '@/app/components/EmptyState'
import UserInfo from '@/app/components/UserInfo'
import Wrapper from '@/app/components/Wrapper'
import { Project, ProjectRole, ProjectUserMember, Task, TaskStatus } from '@/type'
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
            setTask(task)
            setStatus(task.status)
            setRealStatus(task.status)
            await fetchProject(task.projectId)
            await fetchMembers(task.projectId)
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
        currentUserRole === "OWNER"
    );

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value as TaskStatus;
        setStatus(newStatus);

        const modal = document.getElementById("my_modal_3") as HTMLDialogElement | null;

        if (
            newStatus === TASK_STATUSES.TODO ||
            newStatus === TASK_STATUSES.IN_PROGRESS ||
            newStatus === TASK_STATUSES.IN_REVIEW
        ) {
            changeStatus(taskId, newStatus);
            toast.success("Status changé");
            modal?.close();
        } else {
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
                                role="Assigné à"
                                email={task.user?.email || null}
                                name={task.user?.name || null}
                            />
                        </div>
                    </div>

                    <h1 className='font-semibold italic text-2xl mb-4'>
                        {task.name}
                    </h1>

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
                                    Seuls l’assigné, le créateur de la tâche ou le propriétaire du projet
                                    peuvent modifier le statut.
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
                                <option value={TASK_STATUSES.IN_REVIEW}>En revue</option>
                                <option value={TASK_STATUSES.DONE}>Terminée</option>
                                <option value={TASK_STATUSES.CANCELLED}>Annulée</option>
                            </select>
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