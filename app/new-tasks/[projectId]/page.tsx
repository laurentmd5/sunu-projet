"use client"

import { getProjectInfo, getProjectUsers } from '@/app/actions';
import AssignTask from '@/app/components/AssignTask';
import Wrapper from '@/app/components/Wrapper'
import { Project } from '@/type';
import { User } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = ({ params }: { params: Promise<{ projectId: string }> }) => {

    const [projectId, setProjectId] = useState("")
    const [project, setProject] = useState<Project | null>(null);
    const [usersProject, setUsersProject] = useState<User[]>([]);

    const fetchInfos = async (projectId: string) => {
        try {
            const project = await getProjectInfo(projectId, true)
            setProject(project)
            const associatedUsers = await getProjectUsers(projectId)
            setUsersProject(associatedUsers)
        } catch (error) {
            console.error(`Erreur lors du chargement du projets:`, error)
        }
    }

    useEffect(() => {
        const getId = async () => {
            const resolvedParams = await params;
            setProjectId(resolvedParams.projectId)
            fetchInfos(resolvedParams.projectId)
        }
        getId()
    }, [params])

    return (
        <Wrapper>
            <div >
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
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className='md:w-1/4'>
                        <AssignTask users={usersProject} projectId={projectId} />
                    </div>
                    <div className='md:w-3/4'>


                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default page