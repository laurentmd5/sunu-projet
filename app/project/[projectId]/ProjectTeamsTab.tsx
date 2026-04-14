"use client";

import React, { useEffect, useState } from "react";
import { getProjectTeams } from "@/app/actions/teams";
import EmptyState from "@/app/components/EmptyState";
import type { ProjectTeamsResult } from "@/type";
import Link from "next/link";
import { ArrowRight, Building2, Layers3, Users } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
    projectId: string;
    isActive: boolean;
};

export default function ProjectTeamsTab({ projectId, isActive }: Props) {
    const [data, setData] = useState<ProjectTeamsResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!isActive || hasLoaded || !projectId) return;

        const load = async () => {
            try {
                setLoading(true);
                const result = await getProjectTeams(projectId);
                setData(result);
                setHasLoaded(true);
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Erreur lors du chargement des équipes."
                );
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [isActive, hasLoaded, projectId]);

    if (!isActive) return null;

    if (loading) {
        return (
            <div className="rounded-xl border border-base-300 p-5">
                <p className="text-sm opacity-70">Chargement des équipes...</p>
            </div>
        );
    }

    if (!data || data.summary.totalTeamsCount === 0) {
        return (
            <div className="rounded-xl border border-base-300 p-5">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Équipes du projet</h2>
                    <p className="text-sm opacity-70 mt-1">
                        Les équipes sont désormais organisées à l'intérieur du projet.
                    </p>
                </div>

                <EmptyState
                    imageSrc="/empty-project.png"
                    imageAlt="Aucune équipe"
                    message="Aucune équipe n'est encore créée pour ce projet."
                />
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-base-300 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-5">
                <div>
                    <h2 className="text-lg font-semibold">Équipes du projet</h2>
                    <p className="text-sm opacity-70 mt-1">
                        Structure hiérarchique des équipes rattachées à ce projet.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 text-sm">
                    <span className="badge badge-outline">
                        {data.summary.rootTeamsCount} équipe(s) principale(s)
                    </span>
                    <span className="badge badge-outline">
                        {data.summary.subteamsCount} sous-équipe(s)
                    </span>
                    <span className="badge badge-outline">
                        {data.summary.totalTeamsCount} total
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {data.teamsTree.map((team) => (
                    <div key={team.id} className="rounded-xl border border-base-300 p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    <h3 className="font-semibold break-words">{team.name}</h3>
                                </div>

                                <p className="text-sm opacity-70 mt-1 break-words">
                                    {team.description || "Aucune description."}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                                    <span className="badge badge-outline">
                                        <Users className="w-3 h-3 mr-1" />
                                        {team.membersCount} membre(s)
                                    </span>
                                    <span className="badge badge-outline">
                                        <Layers3 className="w-3 h-3 mr-1" />
                                        {team.childrenCount} sous-équipe(s)
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/teams/${team.id}`}
                                className="btn btn-sm btn-outline self-start"
                            >
                                Voir l'équipe
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {team.children.length > 0 && (
                            <div className="mt-4 pl-4 border-l border-base-300 space-y-3">
                                {team.children.map((child) => (
                                    <div
                                        key={child.id}
                                        className="rounded-lg border border-base-300 p-3"
                                    >
                                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                            <div className="min-w-0">
                                                <p className="font-medium break-words">{child.name}</p>
                                                <p className="text-sm opacity-70 mt-1 break-words">
                                                    {child.description || "Aucune description."}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                                                    <span className="badge badge-outline">
                                                        {child.membersCount} membre(s)
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/teams/${child.id}`}
                                                className="btn btn-xs btn-outline self-start"
                                            >
                                                Ouvrir
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
