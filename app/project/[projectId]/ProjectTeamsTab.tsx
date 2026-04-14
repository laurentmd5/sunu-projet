"use client";

import React, { useEffect, useState } from "react";
import { createTeam, getProjectTeams } from "@/app/actions/teams";
import EmptyState from "@/app/components/EmptyState";
import type { ProjectTeamNode, ProjectTeamsResult } from "@/type";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Layers3,
    Plus,
    Users,
} from "lucide-react";
import { toast } from "react-toastify";

type Props = {
    projectId: string;
    isActive: boolean;
    canManageTeams: boolean;
};

type TeamFormState = {
    name: string;
    description: string;
};

const EMPTY_FORM: TeamFormState = {
    name: "",
    description: "",
};

export default function ProjectTeamsTab({
    projectId,
    isActive,
    canManageTeams,
}: Props) {
    const [data, setData] = useState<ProjectTeamsResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [showCreateRootForm, setShowCreateRootForm] = useState(false);
    const [rootForm, setRootForm] = useState<TeamFormState>(EMPTY_FORM);
    const [creatingRoot, setCreatingRoot] = useState(false);

    const [expandedRootId, setExpandedRootId] = useState<string | null>(null);
    const [subteamForms, setSubteamForms] = useState<Record<string, TeamFormState>>({});
    const [creatingSubteamFor, setCreatingSubteamFor] = useState<string | null>(null);

    const loadTeams = async (force = false) => {
        if (!projectId) return;
        if (!force && hasLoaded && data) return;

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

    useEffect(() => {
        if (!isActive || !projectId) return;
        loadTeams();
    }, [isActive, projectId]);

    const resetRootForm = () => {
        setRootForm(EMPTY_FORM);
        setShowCreateRootForm(false);
    };

    const handleCreateRootTeam = async () => {
        if (!rootForm.name.trim()) {
            toast.error("Le nom de l'équipe est requis.");
            return;
        }

        try {
            setCreatingRoot(true);
            await createTeam(
                rootForm.name,
                rootForm.description,
                projectId,
                null
            );
            toast.success("Équipe créée avec succès.");
            resetRootForm();
            await loadTeams(true);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors de la création de l'équipe."
            );
        } finally {
            setCreatingRoot(false);
        }
    };

    const handleCreateSubteam = async (parentId: string) => {
        const form = subteamForms[parentId];

        if (!form?.name?.trim()) {
            toast.error("Le nom de la sous-équipe est requis.");
            return;
        }

        try {
            setCreatingSubteamFor(parentId);
            await createTeam(
                form.name,
                form.description,
                projectId,
                parentId
            );
            toast.success("Sous-équipe créée avec succès.");
            setSubteamForms((prev) => ({
                ...prev,
                [parentId]: EMPTY_FORM,
            }));
            setExpandedRootId(null);
            await loadTeams(true);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors de la création de la sous-équipe."
            );
        } finally {
            setCreatingSubteamFor(null);
        }
    };

    const toggleRootExpansion = (teamId: string) => {
        setExpandedRootId((prev) => (prev === teamId ? null : teamId));
    };

    const updateSubteamForm = (
        parentId: string,
        field: keyof TeamFormState,
        value: string
    ) => {
        setSubteamForms((prev) => ({
            ...prev,
            [parentId]: {
                name: prev[parentId]?.name ?? "",
                description: prev[parentId]?.description ?? "",
                [field]: value,
            },
        }));
    };

    if (!isActive) return null;

    if (loading && !data) {
        return (
            <div className="rounded-xl border border-base-300 p-5">
                <p className="text-sm opacity-70">Chargement des équipes...</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-base-300 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-5">
                <div>
                    <h2 className="text-lg font-semibold">Équipes du projet</h2>
                    <p className="text-sm opacity-70 mt-1">
                        Structure hiérarchique des équipes rattachées à ce projet.
                    </p>
                </div>

                <div className="flex flex-col gap-3 items-start md:items-end">
                    {data && (
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
                    )}

                    {canManageTeams && (
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setShowCreateRootForm((prev) => !prev)}
                        >
                            <Plus className="w-4 h-4" />
                            Nouvelle équipe
                        </button>
                    )}
                </div>
            </div>

            {canManageTeams && showCreateRootForm && (
                <div className="rounded-xl border border-base-300 p-4 mb-5 bg-base-200/30">
                    <h3 className="font-semibold mb-3">Créer une équipe principale</h3>

                    <div className="grid gap-3">
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Nom de l'équipe"
                            value={rootForm.name}
                            onChange={(e) =>
                                setRootForm((prev) => ({ ...prev, name: e.target.value }))
                            }
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description (optionnelle)"
                            value={rootForm.description}
                            onChange={(e) =>
                                setRootForm((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={handleCreateRootTeam}
                                disabled={creatingRoot}
                            >
                                {creatingRoot ? "Création..." : "Créer l'équipe"}
                            </button>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={resetRootForm}
                                disabled={creatingRoot}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!data || data.summary.totalTeamsCount === 0 ? (
                <EmptyState
                    imageSrc="/empty-project.png"
                    imageAlt="Aucune équipe"
                    message="Aucune équipe n'est encore créée pour ce projet."
                />
            ) : (
                <div className="space-y-4">
                    {data.teamsTree.map((team) => (
                        <RootTeamCard
                            key={team.id}
                            team={team}
                            canManageTeams={canManageTeams}
                            isExpanded={expandedRootId === team.id}
                            onToggleExpand={() => toggleRootExpansion(team.id)}
                            subteamForm={subteamForms[team.id] ?? EMPTY_FORM}
                            onUpdateSubteamForm={updateSubteamForm}
                            onCreateSubteam={handleCreateSubteam}
                            isCreatingSubteam={creatingSubteamFor === team.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function RootTeamCard({
    team,
    canManageTeams,
    isExpanded,
    onToggleExpand,
    subteamForm,
    onUpdateSubteamForm,
    onCreateSubteam,
    isCreatingSubteam,
}: {
    team: ProjectTeamNode;
    canManageTeams: boolean;
    isExpanded: boolean;
    onToggleExpand: () => void;
    subteamForm: TeamFormState;
    onUpdateSubteamForm: (
        parentId: string,
        field: keyof TeamFormState,
        value: string
    ) => void;
    onCreateSubteam: (parentId: string) => void;
    isCreatingSubteam: boolean;
}) {
    return (
        <div className="rounded-xl border border-base-300 p-4">
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

                <div className="flex flex-wrap gap-2">
                    <Link
                        href={`/teams/${team.id}`}
                        className="btn btn-sm btn-outline"
                    >
                        Voir l'équipe
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    {canManageTeams && (
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={onToggleExpand}
                        >
                            <Plus className="w-4 h-4" />
                            Sous-équipe
                        </button>
                    )}
                </div>
            </div>

            {isExpanded && canManageTeams && (
                <div className="mt-4 rounded-lg border border-base-300 p-4 bg-base-200/20">
                    <h4 className="font-medium mb-3">Créer une sous-équipe</h4>

                    <div className="grid gap-3">
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Nom de la sous-équipe"
                            value={subteamForm.name}
                            onChange={(e) =>
                                onUpdateSubteamForm(team.id, "name", e.target.value)
                            }
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description (optionnelle)"
                            value={subteamForm.description}
                            onChange={(e) =>
                                onUpdateSubteamForm(team.id, "description", e.target.value)
                            }
                        />

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => onCreateSubteam(team.id)}
                                disabled={isCreatingSubteam}
                            >
                                {isCreatingSubteam ? "Création..." : "Créer la sous-équipe"}
                            </button>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={onToggleExpand}
                                disabled={isCreatingSubteam}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
    );
}