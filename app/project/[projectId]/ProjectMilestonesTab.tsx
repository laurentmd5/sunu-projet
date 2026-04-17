"use client";

import {
    createMilestone,
    updateMilestone,
    deleteMilestone,
    getProjectMilestones,
} from "@/app/actions";
import { Milestone, Task } from "@/type";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type ProjectMilestonesTabProps = {
    projectId: string;
    tasks: Task[];
    canManageMilestones: boolean;
};

type MilestoneStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DELAYED";

export default function ProjectMilestonesTab({
    projectId,
    tasks,
    canManageMilestones,
}: ProjectMilestonesTabProps) {
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newTargetDate, setNewTargetDate] = useState("");

    const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editTargetDate, setEditTargetDate] = useState("");
    const [editStatus, setEditStatus] = useState<MilestoneStatus>("PENDING");

    const [pendingDelete, setPendingDelete] = useState<Milestone | null>(null);

    const fetchMilestones = async () => {
        try {
            setIsLoading(true);
            const result = await getProjectMilestones(projectId);
            setMilestones(result as Milestone[]);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur lors du chargement des jalons");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) {
            fetchMilestones();
        }
    }, [projectId]);

    const milestoneStats = useMemo(() => {
        const byMilestoneId = new Map<string, {
            total: number;
            todo: number;
            inProgress: number;
            inReview: number;
            done: number;
            cancelled: number;
        }>();

        for (const milestone of milestones) {
            byMilestoneId.set(milestone.id, {
                total: 0,
                todo: 0,
                inProgress: 0,
                inReview: 0,
                done: 0,
                cancelled: 0,
            });
        }

        for (const task of tasks ?? []) {
            if (!task.milestoneId) continue;
            const stats = byMilestoneId.get(task.milestoneId);
            if (!stats) continue;

            stats.total += 1;

            switch (task.status) {
                case "TODO":
                    stats.todo += 1;
                    break;
                case "IN_PROGRESS":
                    stats.inProgress += 1;
                    break;
                case "IN_REVIEW":
                    stats.inReview += 1;
                    break;
                case "DONE":
                    stats.done += 1;
                    break;
                case "CANCELLED":
                    stats.cancelled += 1;
                    break;
            }
        }

        return byMilestoneId;
    }, [milestones, tasks]);

    const handleCreateMilestone = async (): Promise<boolean> => {
        try {
            setIsSubmitting(true);

            await createMilestone({
                projectId,
                name: newName,
                description: newDescription,
                targetDate: newTargetDate ? new Date(`${newTargetDate}T00:00:00`) : null,
            });

            setNewName("");
            setNewDescription("");
            setNewTargetDate("");
            await fetchMilestones();
            toast.success("Jalon créé avec succès.");
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur lors de la création du jalon");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditModal = (milestone: Milestone) => {
        setEditingMilestone(milestone);
        setEditName(milestone.name);
        setEditDescription(milestone.description || "");
        setEditTargetDate(
            milestone.targetDate
                ? new Date(milestone.targetDate).toISOString().split("T")[0] || ""
                : ""
        );
        setEditStatus(milestone.status as MilestoneStatus);

        const modal = document.getElementById("edit_milestone_modal") as HTMLDialogElement | null;
        modal?.showModal();
    };

    const handleUpdateMilestone = async (): Promise<boolean> => {
        if (!editingMilestone) return false;

        try {
            setIsSubmitting(true);

            await updateMilestone({
                milestoneId: editingMilestone.id,
                name: editName,
                description: editDescription,
                targetDate: editTargetDate ? new Date(`${editTargetDate}T00:00:00`) : null,
                status: editStatus,
            });

            await fetchMilestones();
            toast.success("Jalon mis à jour avec succès.");
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur lors de la mise à jour du jalon");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const openDeleteModal = (milestone: Milestone) => {
        setPendingDelete(milestone);
        const modal = document.getElementById("delete_milestone_modal") as HTMLDialogElement | null;
        modal?.showModal();
    };

    const handleDeleteMilestone = async (): Promise<boolean> => {
        if (!pendingDelete) return false;

        try {
            setIsSubmitting(true);
            await deleteMilestone(pendingDelete.id);
            await fetchMilestones();
            toast.success("Jalon supprimé avec succès.");
            setPendingDelete(null);
            return true;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erreur lors de la suppression du jalon");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            {canManageMilestones && (
                <div className="flex justify-end">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                            const modal = document.getElementById("create_milestone_modal") as HTMLDialogElement | null;
                            modal?.showModal();
                        }}
                    >
                        Créer un jalon
                    </button>
                </div>
            )}

            {isLoading ? (
                <div className="text-sm opacity-70">Chargement des jalons...</div>
            ) : milestones.length === 0 ? (
                <div className="rounded-xl border border-base-300 p-4 text-sm opacity-70">
                    Aucun jalon pour le moment.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {milestones.map((milestone) => {
                        const stats = milestoneStats.get(milestone.id) ?? {
                            total: 0,
                            todo: 0,
                            inProgress: 0,
                            inReview: 0,
                            done: 0,
                            cancelled: 0,
                        };

                        return (
                            <div
                                key={milestone.id}
                                className="rounded-xl border border-base-300 p-4 space-y-3"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold">{milestone.name}</h3>
                                        {milestone.description && (
                                            <p className="text-sm opacity-70 mt-1">{milestone.description}</p>
                                        )}
                                    </div>

                                    <div className="badge badge-ghost">
                                        {milestone.status}
                                    </div>
                                </div>

                                <div className="text-sm">
                                    <span className="opacity-70">Date cible :</span>{" "}
                                    {milestone.targetDate
                                        ? new Date(milestone.targetDate).toLocaleDateString()
                                        : "Aucune"}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <div className="badge badge-outline">Total: {stats.total}</div>
                                    <div className="badge badge-outline">À faire: {stats.todo}</div>
                                    <div className="badge badge-outline">En cours: {stats.inProgress}</div>
                                    <div className="badge badge-outline">En revue: {stats.inReview}</div>
                                    <div className="badge badge-outline">Terminées: {stats.done}</div>
                                    <div className="badge badge-outline">Annulées: {stats.cancelled}</div>
                                </div>

                                {canManageMilestones && (
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => openEditModal(milestone)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => openDeleteModal(milestone)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <dialog id="create_milestone_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg mb-4">Créer un jalon</h3>

                    <div className="space-y-4">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Nom du jalon"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />

                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={newTargetDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setNewTargetDate(e.target.value)}
                        />

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={isSubmitting || !newName.trim()}
                                onClick={async () => {
                                    const ok = await handleCreateMilestone();
                                    if (ok) {
                                        const modal = document.getElementById("create_milestone_modal") as HTMLDialogElement | null;
                                        modal?.close();
                                    }
                                }}
                            >
                                {isSubmitting ? "Création..." : "Créer"}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog id="edit_milestone_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg mb-4">Modifier le jalon</h3>

                    <div className="space-y-4">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Nom du jalon"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />

                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={editTargetDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setEditTargetDate(e.target.value)}
                        />

                        <select
                            className="select select-bordered w-full"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as MilestoneStatus)}
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="DELAYED">DELAYED</option>
                        </select>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={isSubmitting || !editName.trim()}
                                onClick={async () => {
                                    const ok = await handleUpdateMilestone();
                                    if (ok) {
                                        const modal = document.getElementById("edit_milestone_modal") as HTMLDialogElement | null;
                                        modal?.close();
                                        setEditingMilestone(null);
                                    }
                                }}
                            >
                                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog id="delete_milestone_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg mb-4">Supprimer le jalon</h3>
                    <p className="text-sm opacity-80 mb-4">
                        Voulez-vous vraiment supprimer le jalon{" "}
                        <span className="font-semibold">
                            {pendingDelete?.name || ""}
                        </span>{" "}
                        ?
                    </p>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="btn btn-error"
                            disabled={isSubmitting || !pendingDelete}
                            onClick={async () => {
                                const ok = await handleDeleteMilestone();
                                if (ok) {
                                    const modal = document.getElementById("delete_milestone_modal") as HTMLDialogElement | null;
                                    modal?.close();
                                }
                            }}
                        >
                            {isSubmitting ? "Suppression..." : "Supprimer"}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
