"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import {
    getMeetingDetails,
    updateMeetingNotes,
    updateMeetingStatus,
} from "@/app/actions";
import { TeamMeeting } from "@/type";
import {
    CalendarDays,
    CheckCircle2,
    FileText,
    FolderKanban,
    Link2,
    UsersRound,
    ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

const STATUS_LABELS = {
    SCHEDULED: "Planifiée",
    COMPLETED: "Terminée",
    CANCELLED: "Annulée",
} as const;

const STATUS_BADGE_CLASS = {
    SCHEDULED: "badge-info",
    COMPLETED: "badge-success",
    CANCELLED: "badge-error",
} as const;

const page = ({ params }: { params: Promise<{ meetingId: string }> }) => {
    const [meetingId, setMeetingId] = useState("");
    const [meeting, setMeeting] = useState<TeamMeeting | null>(null);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [savingNotes, setSavingNotes] = useState(false);
    const [savingStatus, setSavingStatus] = useState(false);

    const fetchMeeting = async (id: string) => {
        try {
            setLoading(true);
            const data = await getMeetingDetails(id);
            setMeeting(data as TeamMeeting);
            setNotes((data as TeamMeeting).notes || "");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors du chargement de la réunion."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            const resolved = await params;
            setMeetingId(resolved.meetingId);
            fetchMeeting(resolved.meetingId);
        };

        init();
    }, [params]);

    const handleSaveNotes = async () => {
        if (!meetingId) return;

        try {
            setSavingNotes(true);
            await updateMeetingNotes(meetingId, notes);
            await fetchMeeting(meetingId);
            toast.success("Compte-rendu mis à jour.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors de la mise à jour du compte-rendu."
            );
        } finally {
            setSavingNotes(false);
        }
    };

    const handleStatusChange = async (
        status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
    ) => {
        if (!meetingId) return;

        try {
            setSavingStatus(true);
            await updateMeetingStatus(meetingId, status);
            await fetchMeeting(meetingId);
            toast.success("Statut mis à jour.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Erreur lors de la mise à jour du statut."
            );
        } finally {
            setSavingStatus(false);
        }
    };

    if (loading) {
        return (
            <Wrapper>
                <div className="rounded-xl border border-base-300 p-5">
                    <p className="text-sm opacity-70">Chargement de la réunion...</p>
                </div>
            </Wrapper>
        );
    }

    if (!meeting) {
        return (
            <Wrapper>
                <div className="rounded-xl border border-base-300 p-5">
                    <p className="text-sm opacity-70">Réunion introuvable.</p>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="space-y-6">
                <div className="flex flex-col gap-3">
                    <Link href="/meetings" className="btn btn-sm btn-ghost self-start">
                        <ArrowLeft className="w-4 h-4" />
                        Retour aux réunions
                    </Link>

                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-bold break-words">{meeting.title}</h1>
                                <span className={`badge ${STATUS_BADGE_CLASS[meeting.status as keyof typeof STATUS_BADGE_CLASS]}`}>
                                    {STATUS_LABELS[meeting.status as keyof typeof STATUS_LABELS]}
                                </span>
                            </div>

                            <div className="mt-3 flex flex-col gap-2 text-sm opacity-75">
                                <p className="flex items-center gap-2">
                                    <UsersRound className="w-4 h-4" />
                                    Équipe : {meeting.team?.name}
                                </p>

                                {meeting.project ? (
                                    <p className="flex items-center gap-2">
                                        <FolderKanban className="w-4 h-4" />
                                        Projet lié : {meeting.project.name}
                                    </p>
                                ) : null}

                                <p className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" />
                                    {new Date(meeting.scheduledAt).toLocaleString("fr-FR")}
                                </p>

                                {meeting.durationMinutes ? (
                                    <p className="text-sm opacity-75">
                                        Durée prévue : {meeting.durationMinutes} min
                                    </p>
                                ) : null}

                                {meeting.externalUrl ? (
                                    <a
                                        href={meeting.externalUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 link link-primary break-all"
                                    >
                                        <Link2 className="w-4 h-4" />
                                        Ouvrir le lien de réunion
                                    </a>
                                ) : null}
                            </div>
                        </div>

                        <div className="w-full lg:w-auto">
                            <select
                                className="select select-bordered w-full lg:w-56"
                                value={meeting.status}
                                onChange={(e) =>
                                    handleStatusChange(
                                        e.target.value as "SCHEDULED" | "COMPLETED" | "CANCELLED"
                                    )
                                }
                                disabled={savingStatus}
                            >
                                <option value="SCHEDULED">Planifiée</option>
                                <option value="COMPLETED">Terminée</option>
                                <option value="CANCELLED">Annulée</option>
                            </select>
                        </div>
                    </div>
                </div>

                {meeting.description ? (
                    <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Description</h2>
                        <p className="text-sm break-words">{meeting.description}</p>
                    </div>
                ) : null}

                <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4" />
                        <h2 className="text-lg font-semibold">Compte-rendu</h2>
                    </div>

                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="textarea textarea-bordered w-full min-h-56"
                        placeholder="Ajoutez ici le compte-rendu détaillé de la réunion..."
                    />

                    <div className="mt-4 flex justify-end">
                        <button
                            className="btn btn-primary w-full sm:w-auto"
                            onClick={handleSaveNotes}
                            disabled={savingNotes}
                        >
                            Enregistrer le compte-rendu
                            <CheckCircle2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default page;
