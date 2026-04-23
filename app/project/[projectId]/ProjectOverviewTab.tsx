"use client";

import React from "react";
import EmptyState from "@/app/components/EmptyState";
import ProjectComponent from "@/app/components/ProjectComponent";
import UserInfo from "@/app/components/UserInfo";
import type { Project, ProjectUserMember } from "@/type";

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

type Props = {
    isActive: boolean;
    project: Project | null;
    taskCount: number;
    activityPreview: ActivityLogItem[];
    members: ProjectUserMember[];
    canViewProjectProgress: boolean;
    canViewMemberStats: boolean;
};

export default function ProjectOverviewTab({
    isActive,
    project,
    taskCount,
    activityPreview,
    members,
    canViewProjectProgress,
    canViewMemberStats,
}: Props) {
    if (!isActive) return null;

    const tasks = project?.tasks || [];
    const executableMembers = members.filter((member) => member.role !== "VIEWER");

    const assignedTasks = tasks.filter((task) => !!task.userId);
    const completedTasks = tasks.filter((task) => task.status === "DONE");
    const overdueTasks = tasks.filter(
        (task) =>
            task.dueDate &&
            task.status !== "DONE" &&
            task.status !== "CANCELLED" &&
            new Date(task.dueDate) < new Date()
    );

    const memberTaskMap = new Map<string, number>();
    tasks.forEach((task) => {
        if (!task.userId) return;
        memberTaskMap.set(task.userId, (memberTaskMap.get(task.userId) || 0) + 1);
    });

    const topContributor =
        executableMembers
            .map((member) => ({
                member,
                assignedCount: memberTaskMap.get(member.userId) || 0,
            }))
            .sort((a, b) => b.assignedCount - a.assignedCount)[0] || null;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
                <div className="space-y-4">
                    <div className="p-5 border border-base-300 rounded-xl">
                        <UserInfo
                            role="Créé par"
                            email={project?.createdBy?.email || null}
                            name={project?.createdBy?.name || null}
                        />
                    </div>

                    {project && (
                        <div className="w-full">
                            <ProjectComponent project={project} admin={0} style={false} />
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="rounded-xl border border-base-300 p-5">
                        <h2 className="text-lg font-semibold">Résumé</h2>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                            <div className="rounded-lg border border-base-300 p-4">
                                <p className="text-sm opacity-70">Tâches</p>
                                <p className="text-2xl font-semibold mt-1">{taskCount}</p>
                            </div>

                            <div className="rounded-lg border border-base-300 p-4">
                                <p className="text-sm opacity-70">Équipes</p>
                                <p className="text-2xl font-semibold mt-1">
                                    {project?.teams?.length || 0}
                                </p>
                            </div>

                            <div className="rounded-lg border border-base-300 p-4">
                                <p className="text-sm opacity-70">Projet</p>
                                <p className="text-sm font-medium mt-2 break-words">
                                    {project?.name || "Projet"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {canViewProjectProgress ? (
                        <div className="rounded-xl border border-base-300 p-5">
                            <h2 className="text-lg font-semibold mb-4">Aperçu de l'activité</h2>

                            {activityPreview.length > 0 ? (
                                <div className="space-y-3">
                                    {activityPreview.map((log) => (
                                        <div
                                            key={log.id}
                                            className="border border-base-300 rounded-lg p-3"
                                        >
                                            <p className="text-sm break-words">{log.message}</p>
                                            <p className="text-xs opacity-60 mt-1">
                                                {new Date(log.createdAt).toLocaleString("fr-FR")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    imageSrc="/empty-project.png"
                                    imageAlt="Aucune activité"
                                    message="Aucune activité récente à afficher."
                                />
                            )}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-base-300 p-5 text-sm opacity-70">
                            L'activité détaillée du projet n'est pas incluse dans vos permissions.
                        </div>
                    )}

                    {canViewMemberStats ? (
                        <div className="rounded-xl border border-base-300 p-5">
                            <h2 className="text-lg font-semibold">Statistiques des exécutants</h2>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                                <div className="rounded-lg border border-base-300 p-4">
                                    <p className="text-sm opacity-70">Exécutants</p>
                                    <p className="text-2xl font-semibold mt-1">{executableMembers.length}</p>
                                </div>

                                <div className="rounded-lg border border-base-300 p-4">
                                    <p className="text-sm opacity-70">Tâches assignées</p>
                                    <p className="text-2xl font-semibold mt-1">{assignedTasks.length}</p>
                                </div>

                                <div className="rounded-lg border border-base-300 p-4">
                                    <p className="text-sm opacity-70">Terminées</p>
                                    <p className="text-2xl font-semibold mt-1">{completedTasks.length}</p>
                                </div>

                                <div className="rounded-lg border border-base-300 p-4">
                                    <p className="text-sm opacity-70">En retard</p>
                                    <p className="text-2xl font-semibold mt-1">{overdueTasks.length}</p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-lg border border-base-300 p-4">
                                <p className="text-sm opacity-70">Top contributeur</p>
                                <p className="font-medium mt-1">
                                    {topContributor
                                        ? (topContributor.member.user.name || topContributor.member.user.email)
                                        : "Aucun contributeur à mettre en avant"}
                                </p>
                                {topContributor && (
                                    <p className="text-xs opacity-70 mt-1">
                                        {topContributor.assignedCount} tâche(s) assignée(s)
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-base-300 p-5 text-sm opacity-70">
                            Les statistiques détaillées des exécutants ne sont pas incluses dans vos permissions.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
