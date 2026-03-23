"use client"
import { getProjectInfo, getTaskDetails } from '@/app/actions'
import EmptyState from '@/app/components/EmptyState'
import UserInfo from '@/app/components/UserInfo'
import Wrapper from '@/app/components/Wrapper'
import { Project, Task } from '@/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = ({ params }: { params: Promise<{ taskId: string }> }) => {

    const [task, setTask] = useState<Task | null>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState<Project | null>(null);

    const fetchInfos = async (taskId: string) => {
        try {
            const task = await getTaskDetails(taskId)
            setTask(task)
            fetchProject(task.projectId)
        } catch (error) {
            toast.error("Erreur lors du chargement des détails de la tâche.")
        }
    }

    const fetchProject = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, false)
            setProject(project)
        } catch (error) {
            toast.error("Erreur lors du chargement du projet.")
        }
    }

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setTaskId(resolvedParams.taskId)
            fetchInfos(resolvedParams.taskId)
        }
        getId()
    }, [params])

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
                    </div>

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