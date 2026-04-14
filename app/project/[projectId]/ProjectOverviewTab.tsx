"use client";

import React from "react";
import EmptyState from "@/app/components/EmptyState";
import ProjectComponent from "@/app/components/ProjectComponent";
import UserInfo from "@/app/components/UserInfo";
import type { Project } from "@/type";

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
};

export default function ProjectOverviewTab({
    isActive,
    project,
    taskCount,
    activityPreview,
}: Props) {
    if (!isActive) return null;

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
                </div>
            </div>
        </div>
    );
}
