"use client";

import React from "react";
import { Crown, ShieldCheck, UserCheck, Users } from "lucide-react";
import { PROJECT_ROLE_LABELS } from "@/lib/project-role-labels";
import type { ProjectRole, ProjectUserMember } from "@/type";
import type { ViewerPermission } from "@/lib/permissions-core";

const ROLE_ORDER: Record<ProjectRole, number> = {
    OWNER: 0,
    MANAGER: 1,
    VIEWER: 2,
    MEMBER: 3,
};

const ROLE_SECTION_META: Record<
    ProjectRole,
    { title: string; icon: React.ReactNode; empty: string }
> = {
    OWNER: {
        title: "Propriétaire",
        icon: <Crown className="w-4 h-4" />,
        empty: "Aucun propriétaire",
    },
    MANAGER: {
        title: "Managers",
        icon: <ShieldCheck className="w-4 h-4" />,
        empty: "Aucun manager",
    },
    VIEWER: {
        title: "Observateurs",
        icon: <UserCheck className="w-4 h-4" />,
        empty: "Aucun observateur",
    },
    MEMBER: {
        title: "Membres",
        icon: <Users className="w-4 h-4" />,
        empty: "Aucun membre",
    },
};

const VIEWER_PERMISSION_OPTIONS: {
    value: ViewerPermission;
    label: string;
}[] = [
    { value: "VIEW_PROJECT_PROGRESS", label: "Voir l'avancement du projet" },
    { value: "VIEW_MEMBER_STATS", label: "Voir les statistiques des membres" },
    { value: "ASSIGN_TASKS", label: "Assigner des tâches" },
    { value: "CREATE_TASK", label: "Créer des tâches" },
    { value: "VIEW_MEETINGS", label: "Voir les réunions" },
    { value: "JOIN_MEETINGS", label: "Rejoindre les réunions" },
];

type PendingRoleChange = {
    memberUserId: string;
    memberName: string;
    currentRole: "MANAGER" | "VIEWER" | "MEMBER";
    newRole: "MANAGER" | "MEMBER";
};

type PendingRemoval = {
    memberUserId: string;
    memberName: string;
};

type Props = {
    isActive: boolean;
    membersLoading: boolean;
    members: ProjectUserMember[];
    email: string | null;
    currentUserRole: ProjectRole | null;
    canManageMembers: boolean;
    groupedMembers: Record<ProjectRole, ProjectUserMember[]>;
    viewerEmail: string;
    setViewerEmail: React.Dispatch<React.SetStateAction<string>>;
    viewerPermissions: ViewerPermission[];
    setViewerPermissions: React.Dispatch<React.SetStateAction<ViewerPermission[]>>;
    isCreatingViewer: boolean;
    handleCreateViewer: () => void;
    editingViewerUserId: string | null;
    editingViewerPermissions: ViewerPermission[];
    setEditingViewerUserId: React.Dispatch<React.SetStateAction<string | null>>;
    setEditingViewerPermissions: React.Dispatch<React.SetStateAction<ViewerPermission[]>>;
    isUpdatingViewerPermissions: boolean;
    handleUpdateViewerPermissions: () => void;
    startEditViewerPermissions: (viewerUserId: string, permissions: ViewerPermission[]) => void;
    requestRoleChange: (member: ProjectUserMember, newRole: "MANAGER" | "MEMBER") => void;
    requestRemoveMember: (member: ProjectUserMember) => void;
};

export default function ProjectMembersTab(props: Props) {
    const {
        isActive,
        membersLoading,
        members,
        email,
        currentUserRole,
        canManageMembers,
        groupedMembers,
        viewerEmail,
        setViewerEmail,
        viewerPermissions,
        setViewerPermissions,
        isCreatingViewer,
        handleCreateViewer,
        editingViewerUserId,
        editingViewerPermissions,
        setEditingViewerUserId,
        setEditingViewerPermissions,
        isUpdatingViewerPermissions,
        handleUpdateViewerPermissions,
        startEditViewerPermissions,
        requestRoleChange,
        requestRemoveMember,
    } = props;

    if (!isActive) return null;

    function toggleViewerPermission(
        permission: ViewerPermission,
        selected: ViewerPermission[],
        setSelected: React.Dispatch<React.SetStateAction<ViewerPermission[]>>
    ) {
        if (selected.includes(permission)) {
            setSelected(selected.filter((p) => p !== permission));
        } else {
            setSelected([...selected, permission]);
        }
    }

    const renderMemberCard = (member: ProjectUserMember) => {
        const isOwner = member.role === "OWNER";
        const isCurrentUser = member.user.email === email;

        return (
            <div
                key={member.userId}
                className={`rounded-lg border p-3 ${isOwner ? "border-primary/40 bg-base-200/60" : "border-base-300"}`}
            >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                        <p className="font-medium break-words">
                            {member.user.name || "Utilisateur"}
                            {isCurrentUser && (
                                <span className="ml-2 text-xs opacity-70">(Vous)</span>
                            )}
                        </p>
                        <p className="text-sm opacity-70 break-all">{member.user.email}</p>
                    </div>

                    <span className={`badge shrink-0 ${isOwner ? "badge-primary" : "badge-outline"}`}>
                        {PROJECT_ROLE_LABELS[member.role]}
                    </span>
                </div>

                {member.role === "VIEWER" && (
                    <div className="mt-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {member.permissions?.length ? (
                                member.permissions.map((permission) => (
                                    <span key={permission} className="badge badge-outline badge-sm">
                                        {permission}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs opacity-70">Aucune permission</span>
                            )}
                        </div>

                        {canManageMembers && (
                            <>
                                <button
                                    className="btn btn-outline btn-xs w-full"
                                    onClick={() =>
                                        startEditViewerPermissions(member.userId, member.permissions ?? [])
                                    }
                                >
                                    Modifier permissions
                                </button>

                                <button
                                    onClick={() => requestRemoveMember(member)}
                                    className="btn btn-error btn-outline btn-xs w-full"
                                >
                                    Retirer
                                </button>
                            </>
                        )}

                        {editingViewerUserId === member.userId && (
                            <div className="mt-2 p-3 border border-base-300 rounded-lg">
                                <div className="grid gap-2 mb-3">
                                    {VIEWER_PERMISSION_OPTIONS.map((option) => (
                                        <label
                                            key={option.value}
                                            className="label cursor-pointer justify-start gap-3"
                                        >
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm"
                                                checked={editingViewerPermissions.includes(option.value)}
                                                onChange={() =>
                                                    toggleViewerPermission(
                                                        option.value,
                                                        editingViewerPermissions,
                                                        setEditingViewerPermissions
                                                    )
                                                }
                                            />
                                            <span className="label-text">{option.label}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <button
                                        className="btn btn-primary btn-xs"
                                        onClick={handleUpdateViewerPermissions}
                                        disabled={isUpdatingViewerPermissions}
                                    >
                                        {isUpdatingViewerPermissions ? "Enregistrement..." : "Enregistrer"}
                                    </button>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        onClick={() => {
                                            setEditingViewerUserId(null);
                                            setEditingViewerPermissions([]);
                                        }}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {canManageMembers && !isOwner && member.role !== "VIEWER" && (
                    <div className="mt-3 space-y-2">
                        <select
                            className="select select-bordered select-sm w-full"
                            value={member.role}
                            onChange={(e) =>
                                requestRoleChange(member, e.target.value as "MANAGER" | "MEMBER")
                            }
                        >
                            <option value="MEMBER">Membre</option>
                            <option value="MANAGER">Manager</option>
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

    return (
        <div className="rounded-xl border border-base-300 p-5">
            <div className="flex flex-col items-start gap-3 mb-4 xl:flex-row xl:items-center xl:justify-between">
                <h2 className="font-semibold text-lg leading-tight">Membres du projet</h2>

                {currentUserRole && (
                    <div className="badge badge-primary w-fit max-w-full whitespace-normal text-left h-auto py-2">
                        Mon rôle : {PROJECT_ROLE_LABELS[currentUserRole]}
                    </div>
                )}
            </div>

            {canManageMembers ? (
                <p className="text-xs opacity-70 mb-4 leading-6">
                    Vous pouvez modifier les rôles des managers et membres, ainsi que retirer
                    des collaborateurs du projet.
                </p>
            ) : (
                <p className="text-xs opacity-70 mb-4 leading-6">
                    Vue en lecture seule des collaborateurs du projet.
                </p>
            )}

            {canManageMembers && (
                <div className="p-4 border border-base-300 rounded-xl mb-4">
                    <h3 className="font-semibold mb-3">Ajouter un observateur</h3>

                    <input
                        type="email"
                        className="input input-bordered w-full mb-3"
                        placeholder="Email du viewer"
                        value={viewerEmail}
                        onChange={(e) => setViewerEmail(e.target.value)}
                    />

                    <div className="grid gap-2 mb-4">
                        {VIEWER_PERMISSION_OPTIONS.map((option) => (
                            <label
                                key={option.value}
                                className="label cursor-pointer justify-start gap-3"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={viewerPermissions.includes(option.value)}
                                    onChange={() =>
                                        toggleViewerPermission(
                                            option.value,
                                            viewerPermissions,
                                            setViewerPermissions
                                        )
                                    }
                                />
                                <span className="label-text">{option.label}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleCreateViewer}
                        disabled={isCreatingViewer || !viewerEmail.trim()}
                    >
                        {isCreatingViewer ? "Ajout..." : "Ajouter le viewer"}
                    </button>
                </div>
            )}

            {membersLoading ? (
                <p className="text-sm opacity-70">Chargement des membres...</p>
            ) : members.length > 0 ? (
                <div className="space-y-5">
                    {(["OWNER", "MANAGER", "VIEWER", "MEMBER"] as ProjectRole[]).map((roleKey) => {
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
    );
}
