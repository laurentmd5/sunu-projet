"use client";

import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import EmptyState from "@/app/components/EmptyState";
import {
    addTeamMember,
    getProjectMembersWithRoles,
    getTeamDetails,
    getTeamMembers,
    removeTeamMember,
    updateTeamMemberRole,
} from "@/app/actions";
import { TEAM_ROLE_LABELS } from "@/lib/team-role-labels";
import { ProjectUserMember, TeamMember, TeamRole } from "@/type";
import {
    ArrowRight,
    Building2,
    Crown,
    Layers3,
    UsersRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuthUser } from "@/lib/auth-client";
import Link from "next/link";

const ROLE_ORDER: Record<TeamRole, number> = {
    OWNER: 0,
    MEMBER: 1,
};

const ROLE_SECTION_META: Record<
    TeamRole,
    { title: string; icon: React.ReactNode; empty: string }
> = {
    OWNER: {
        title: "Propriétaires",
        icon: <Crown className="w-4 h-4" />,
        empty: "Aucun propriétaire",
    },
    MEMBER: {
        title: "Membres",
        icon: <UsersRound className="w-4 h-4" />,
        empty: "Aucun membre",
    },
};

type PendingRoleChange = {
    memberUserId: string;
    memberName: string;
    currentRole: "OWNER" | "MEMBER";
    newRole: "OWNER" | "MEMBER";
};

type PendingRemoval = {
    memberUserId: string;
    memberName: string;
};

const page = ({ params }: { params: Promise<{ teamId: string }> }) => {
    const { email, isLoading } = useAuthUser();

    const [teamId, setTeamId] = useState("");
    const [team, setTeam] = useState<Awaited<ReturnType<typeof getTeamDetails>> | null>(null);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [membersLoading, setMembersLoading] = useState(false);

    const [projectMembers, setProjectMembers] = useState<ProjectUserMember[] | null>(null);
    const [projectMembersLoading, setProjectMembersLoading] = useState(false);
    const [selectedProjectMemberId, setSelectedProjectMemberId] = useState("");
    const [isAddingMember, setIsAddingMember] = useState(false);

    const [pendingRoleChange, setPendingRoleChange] = useState<PendingRoleChange | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval | null>(null);
    const [isSubmittingSensitiveAction, setIsSubmittingSensitiveAction] = useState(false);

    const fetchTeam = async (id: string) => {
        try {
            setLoading(true);
            const data = await getTeamDetails(id);
            setTeam(data);
            return data;
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Erreur lors du chargement de l'équipe."
            );
            return null;
        } finally {
            setLoading(false);
        }
    };

    const fetchMembers = async (id: string) => {
        try {
            setMembersLoading(true);
            const data = await getTeamMembers(id);
            setMembers(data);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Erreur lors du chargement des membres."
            );
        } finally {
            setMembersLoading(false);
        }
    };

    const fetchProjectMembers = async (projectId: string) => {
        try {
            setProjectMembersLoading(true);
            const data = await getProjectMembersWithRoles(projectId);
            setProjectMembers(data as ProjectUserMember[]);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors du chargement des membres du projet."
            );
        } finally {
            setProjectMembersLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            const resolved = await params;
            setTeamId(resolved.teamId);
            const data = await fetchTeam(resolved.teamId);

            await Promise.all([
                fetchMembers(resolved.teamId),
                data?.project?.id ? fetchProjectMembers(data.project.id) : Promise.resolve(),
            ]);
        };

        init();
    }, [params]);

    const currentMembership = useMemo(() => {
        if (!email) return null;
        return members.find((member) => member.user.email === email) || null;
    }, [members, email]);

    const currentUserRole: TeamRole | null = currentMembership?.role ?? null;
    const canManageMembers = currentUserRole === "OWNER";
    const isRootTeam = !team?.parentId;

    const groupedMembers = useMemo(() => {
        const sorted = [...members].sort((a, b) => {
            const roleOrderDiff = ROLE_ORDER[a.role] - ROLE_ORDER[b.role];
            if (roleOrderDiff !== 0) return roleOrderDiff;

            const aName = a.user.name || a.user.email;
            const bName = b.user.name || b.user.email;
            return aName.localeCompare(bName, "fr", { sensitivity: "base" });
        });

        return {
            OWNER: sorted.filter((member) => member.role === "OWNER"),
            MEMBER: sorted.filter((member) => member.role === "MEMBER"),
        };
    }, [members]);

    const addableProjectMembers = useMemo(() => {
        const teamMemberIds = new Set(members.map((member) => member.userId));

        return projectMembers?.filter((member) => {
            if (member.role === "VIEWER") return false;
            if (teamMemberIds.has(member.userId)) return false;
            return true;
        }) ?? [];
    }, [projectMembers, members]);

    const requestRoleChange = (
        member: TeamMember,
        newRole: "OWNER" | "MEMBER"
    ) => {
        if (member.role === newRole) return;

        setPendingRoleChange({
            memberUserId: member.userId,
            memberName: member.user.name || member.user.email,
            currentRole: member.role as "OWNER" | "MEMBER",
            newRole,
        });

        const modal = document.getElementById("confirm_team_role_change_modal") as HTMLDialogElement | null;
        modal?.showModal();
    };

    const confirmRoleChange = async () => {
        if (!pendingRoleChange) return;

        try {
            setIsSubmittingSensitiveAction(true);
            await updateTeamMemberRole(
                teamId,
                pendingRoleChange.memberUserId,
                pendingRoleChange.newRole
            );
            await fetchMembers(teamId);
            await fetchTeam(teamId);
            toast.success("Rôle mis à jour avec succès.");
            closeRoleChangeModal();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
        } finally {
            setIsSubmittingSensitiveAction(false);
        }
    };

    const requestRemoveMember = (member: TeamMember) => {
        setPendingRemoval({
            memberUserId: member.userId,
            memberName: member.user.name || member.user.email,
        });

        const modal = document.getElementById("confirm_team_remove_member_modal") as HTMLDialogElement | null;
        modal?.showModal();
    };

    const confirmRemoveMember = async () => {
        if (!pendingRemoval) return;

        try {
            setIsSubmittingSensitiveAction(true);
            await removeTeamMember(teamId, pendingRemoval.memberUserId);
            await fetchMembers(teamId);
            await fetchTeam(teamId);
            toast.success("Membre retiré avec succès.");
            closeRemoveMemberModal();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
        } finally {
            setIsSubmittingSensitiveAction(false);
        }
    };

    const closeRoleChangeModal = () => {
        const modal = document.getElementById("confirm_team_role_change_modal") as HTMLDialogElement | null;
        modal?.close();
        setPendingRoleChange(null);
    };

    const closeRemoveMemberModal = () => {
        const modal = document.getElementById("confirm_team_remove_member_modal") as HTMLDialogElement | null;
        modal?.close();
        setPendingRemoval(null);
    };

    const handleAddMember = async () => {
        if (!selectedProjectMemberId) {
            toast.error("Sélectionnez un membre du projet.");
            return;
        }

        try {
            setIsAddingMember(true);
            await addTeamMember(teamId, selectedProjectMemberId);
            await fetchMembers(teamId);
            await fetchTeam(teamId);

            if (team?.project?.id) {
                await fetchProjectMembers(team.project.id);
            }

            setSelectedProjectMemberId("");
            toast.success("Membre ajouté à l'équipe avec succès.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
        } finally {
            setIsAddingMember(false);
        }
    };

    const renderMemberCard = (member: TeamMember) => {
        const isOwner = member.role === "OWNER";
        const isCurrentUser = member.user.email === email;

        return (
            <div
                key={member.userId}
                className={`rounded-lg border p-3 ${isOwner ? "border-primary/40 bg-base-200/60" : "border-base-300"
                    }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="font-medium break-words">
                            {member.user.name || "Utilisateur"}
                            {isCurrentUser && (
                                <span className="ml-2 text-xs opacity-70">(Vous)</span>
                            )}
                        </p>
                        <p className="text-sm opacity-70 break-all">{member.user.email}</p>
                    </div>

                    <span
                        className={`badge shrink-0 ${isOwner ? "badge-primary" : "badge-outline"
                            }`}
                    >
                        {TEAM_ROLE_LABELS[member.role]}
                    </span>
                </div>

                {canManageMembers && !isOwner && (
                    <div className="mt-3 space-y-2">
                        <select
                            className="select select-bordered select-sm w-full"
                            value={member.role}
                            onChange={(e) =>
                                requestRoleChange(
                                    member,
                                    e.target.value as "OWNER" | "MEMBER"
                                )
                            }
                        >
                            <option value="MEMBER">Membre</option>
                            <option value="OWNER">Propriétaire</option>
                        </select>

                        <button
                            onClick={() => requestRemoveMember(member)}
                            className="btn btn-sm btn-error btn-outline w-full"
                        >
                            Retirer
                        </button>
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <Wrapper>
                <div className="rounded-xl border border-base-300 p-5">
                    <p className="text-sm opacity-70">Chargement de l’équipe...</p>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="flex flex-col gap-6 lg:flex-row">
                <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
                    <div className="rounded-xl border border-base-300 p-5">
                        <h1 className="text-xl font-bold break-words">{team?.name}</h1>
                        <p className="text-sm opacity-70 mt-2 break-words">
                            {team?.description || "Aucune description pour cette équipe."}
                        </p>

                        {currentUserRole && (
                            <div className="badge badge-primary mt-4 h-auto py-2 whitespace-normal text-left">
                                Mon rôle : {TEAM_ROLE_LABELS[currentUserRole]}
                            </div>
                        )}

                        <div className="mt-4 space-y-3">
                            {isRootTeam ? (
                                <div className="rounded-lg border border-base-300 p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Crown className="w-4 h-4" />
                                        <h2 className="font-medium">Chef d’équipe</h2>
                                    </div>
                                    <p className="text-sm opacity-80 break-words">
                                        {team?.lead
                                            ? `${team.lead.name || "Utilisateur"} (${team.lead.email})`
                                            : "Aucun chef d’équipe défini."}
                                    </p>
                                </div>
                            ) : (
                                <div className="rounded-lg border border-base-300 p-3">
                                    <h2 className="font-medium mb-2">Sous-équipe</h2>
                                    <p className="text-sm opacity-70">
                                        Les sous-équipes n’ont pas de chef d’équipe dédié.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {canManageMembers && (
                        <div className="rounded-xl border border-base-300 p-5 mt-6">
                            <h2 className="font-semibold text-lg">Ajouter un membre</h2>
                            <p className="text-xs opacity-70 mt-2 leading-6">
                                Vous pouvez ajouter à cette équipe un membre déjà présent dans le projet.
                            </p>

                            <div className="mt-4 space-y-3">
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedProjectMemberId}
                                    onChange={(e) => setSelectedProjectMemberId(e.target.value)}
                                    disabled={projectMembersLoading || isAddingMember}
                                >
                                    <option value="">Sélectionner un membre</option>
                                    {addableProjectMembers.map((member) => (
                                        <option key={member.userId} value={member.userId}>
                                            {member.user.name || member.user.email} — {member.role}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    className="btn btn-primary btn-sm w-full"
                                    onClick={handleAddMember}
                                    disabled={
                                        projectMembersLoading ||
                                        isAddingMember ||
                                        !selectedProjectMemberId
                                    }
                                >
                                    {isAddingMember ? "Ajout..." : "Ajouter à l'équipe"}
                                </button>

                                {!projectMembersLoading && addableProjectMembers.length === 0 && (
                                    <p className="text-xs opacity-60">
                                        Aucun autre membre du projet disponible à ajouter.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="rounded-xl border border-base-300 p-5 mt-6">
                        <h2 className="font-semibold text-lg">Membres de l’équipe</h2>

                        {canManageMembers ? (
                            <p className="text-xs opacity-70 mt-2 leading-6">
                                Vous pouvez modifier les rôles des membres, ainsi que retirer des membres de l’équipe.
                            </p>
                        ) : (
                            <p className="text-xs opacity-70 mt-2 leading-6">
                                Vue en lecture seule des membres de l’équipe.
                            </p>
                        )}

                        <div className="mt-4">
                            {membersLoading ? (
                                <p className="text-sm opacity-70">Chargement des membres...</p>
                            ) : members.length > 0 ? (
                                <div className="space-y-5">
                                    {(["OWNER", "MEMBER"] as TeamRole[]).map((roleKey) => {
                                        const sectionMembers = groupedMembers[roleKey];
                                        const meta = ROLE_SECTION_META[roleKey];

                                        return (
                                            <div key={roleKey}>
                                                <div className="flex items-center gap-2 mb-3">
                                                    {meta.icon}
                                                    <h3 className="text-sm font-semibold">{meta.title}</h3>
                                                    <span className="text-xs opacity-60">
                                                        ({sectionMembers.length})
                                                    </span>
                                                </div>

                                                {sectionMembers.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {sectionMembers.map(renderMemberCard)}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm opacity-60">{meta.empty}</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm opacity-70">Aucun membre trouvé.</p>
                            )}
                        </div>
                    </div>
                </aside>

                <section className="min-w-0 flex-1 space-y-6">
                    <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="w-4 h-4" />
                            <h2 className="text-lg font-semibold">Projet parent</h2>
                        </div>

                        {team?.project ? (
                            <div className="rounded-xl border border-base-300 p-4">
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <p className="font-medium break-words">{team.project.name}</p>
                                    <Link
                                        href={`/project/${team.project.id}`}
                                        className="btn btn-sm btn-outline self-start"
                                    >
                                        Voir le projet
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <EmptyState
                                imageSrc="/empty-project.png"
                                imageAlt="Aucun projet"
                                message="Aucun projet parent trouvé pour cette équipe."
                            />
                        )}
                    </div>

                    {team?.parent && (
                        <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <ArrowRight className="w-4 h-4" />
                                <h2 className="text-lg font-semibold">Équipe parente</h2>
                            </div>

                            <div className="rounded-xl border border-base-300 p-4">
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <p className="font-medium break-words">{team.parent.name}</p>
                                    <Link
                                        href={`/teams/${team.parent.id}`}
                                        className="btn btn-sm btn-outline self-start"
                                    >
                                        Ouvrir
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {team?.children && team.children.length > 0 && (
                        <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers3 className="w-4 h-4" />
                                <h2 className="text-lg font-semibold">Sous-équipes</h2>
                            </div>

                            <div className="space-y-3">
                                {team.children.map((child) => (
                                    <div
                                        key={child.id}
                                        className="rounded-xl border border-base-300 p-4"
                                    >
                                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                            <div className="min-w-0">
                                                <p className="font-medium break-words">{child.name}</p>
                                                <p className="text-sm opacity-70 mt-1 break-words">
                                                    {child.description || "Aucune description."}
                                                </p>
                                                <div className="mt-2 text-sm opacity-80">
                                                    {child.directMembersCount} membre(s)
                                                </div>
                                            </div>

                                            <Link
                                                href={`/teams/${child.id}`}
                                                className="btn btn-sm btn-outline self-start"
                                            >
                                                Ouvrir
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <dialog id="confirm_team_role_change_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeRoleChangeModal}
                        >
                            ✕
                        </button>
                    </form>

                    <h3 className="font-bold text-lg">Confirmer le changement de rôle</h3>

                    {pendingRoleChange && (
                        <>
                            <p className="py-3 text-sm opacity-80">
                                Vous êtes sur le point de modifier le rôle de{" "}
                                <strong>{pendingRoleChange.memberName}</strong>.
                            </p>

                            <div className="alert alert-warning mb-4">
                                <span>
                                    Rôle actuel :{" "}
                                    <strong>{TEAM_ROLE_LABELS[pendingRoleChange.currentRole]}</strong>
                                    {" → "}
                                    Nouveau rôle :{" "}
                                    <strong>{TEAM_ROLE_LABELS[pendingRoleChange.newRole]}</strong>
                                </span>
                            </div>
                        </>
                    )}

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={closeRoleChangeModal}
                            disabled={isSubmittingSensitiveAction}
                        >
                            Annuler
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={confirmRoleChange}
                            disabled={!pendingRoleChange || isSubmittingSensitiveAction}
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </dialog>

            <dialog id="confirm_team_remove_member_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={closeRemoveMemberModal}
                        >
                            ✕
                        </button>
                    </form>

                    <h3 className="font-bold text-lg">Retirer ce membre</h3>

                    {pendingRemoval && (
                        <>
                            <p className="py-3 text-sm opacity-80">
                                Vous êtes sur le point de retirer{" "}
                                <strong>{pendingRemoval.memberName}</strong> de cette équipe.
                            </p>

                            <div className="alert alert-warning mb-4">
                                <span>
                                    Cette personne perdra l’accès à l’équipe, mais pas automatiquement aux projets où elle collabore déjà.
                                </span>
                            </div>
                        </>
                    )}

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={closeRemoveMemberModal}
                            disabled={isSubmittingSensitiveAction}
                        >
                            Annuler
                        </button>

                        <button
                            type="button"
                            className="btn btn-error"
                            onClick={confirmRemoveMember}
                            disabled={!pendingRemoval || isSubmittingSensitiveAction}
                        >
                            Retirer de l’équipe
                        </button>
                    </div>
                </div>
            </dialog>
        </Wrapper>
    );
};

export default page;