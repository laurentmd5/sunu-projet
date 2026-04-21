"use client";

import React, { useEffect, useMemo, useState } from "react";
import Wrapper from "../components/Wrapper";
import EmptyState from "../components/EmptyState";
import {
    createMeeting,
    getEligibleParticipantsForMeetingCreation,
    getMeetingsForCurrentUser,
    getProjectsAssociatedWithUser,
    getTeamsForCurrentUser,
    updateMeetingStatus,
} from "../actions";
import { Team, TeamMeeting, TeamRole } from "@/type";
import {
    ArrowRight,
    CalendarDays,
    FileText,
    FolderKanban,
    FolderPlus,
    Link2,
    UsersRound,
    Video,
} from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

type TeamOption = Team & {
    currentUserRole?: TeamRole;
    membersCount?: number;
    projectsCount?: number;
};

type EligibleMeetingParticipant = {
    id: string;
    name: string | null;
    email: string;
    role: "OWNER" | "MANAGER" | "VIEWER" | "MEMBER" | null;
};

type MeetingStatusFilter = "ALL" | "SCHEDULED" | "COMPLETED" | "CANCELLED";
type MeetingTypeFilter = "ALL" | "STANDALONE" | "PROJECT" | "TEAM";
type MeetingTimeFilter = "ALL" | "UPCOMING" | "PAST";

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

const page = () => {
    const [meetings, setMeetings] = useState<TeamMeeting[]>([]);
    const [teams, setTeams] = useState<TeamOption[]>([]);
    const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [savingStatusId, setSavingStatusId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<MeetingStatusFilter>("ALL");
    const [typeFilter, setTypeFilter] = useState<MeetingTypeFilter>("ALL");
    const [timeFilter, setTimeFilter] = useState<MeetingTimeFilter>("ALL");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState("");
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [externalUrl, setExternalUrl] = useState("");
    const [eligibleParticipants, setEligibleParticipants] = useState<EligibleMeetingParticipant[]>([]);
    const [selectedParticipantUserIds, setSelectedParticipantUserIds] = useState<string[]>([]);
    const [participantSearch, setParticipantSearch] = useState("");

    const fetchMeetings = async () => {
        try {
            setLoading(true);
            const data = await getMeetingsForCurrentUser();
            setMeetings(data as TeamMeeting[]);
        } catch (error) {
            toast.error("Erreur lors du chargement des réunions.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTeams = async () => {
        try {
            const data = await getTeamsForCurrentUser();
            setTeams(data as TeamOption[]);
        } catch (error) {
            toast.error("Erreur lors du chargement des équipes.");
        }
    };

    const fetchProjects = async () => {
        try {
            const data = await getProjectsAssociatedWithUser();
            setProjects(data.map((p: { id: string; name: string }) => ({ id: p.id, name: p.name })));
        } catch (error) {
            toast.error("Erreur lors du chargement des projets.");
        }
    };

    useEffect(() => {
        fetchMeetings();
        fetchTeams();
        fetchProjects();
    }, []);

    function getMeetingType(meeting: TeamMeeting): MeetingTypeFilter {
        if (!meeting.project && !meeting.team) return "STANDALONE";
        if (meeting.team) return "TEAM";
        return "PROJECT";
    }

    function getMeetingTypeLabel(meeting: TeamMeeting) {
        if (!meeting.project && !meeting.team) return "Réunion autonome";
        if (meeting.team) return "Réunion d'équipe";
        return "Réunion projet";
    }

    function getMeetingStatusLabel(status: TeamMeeting["status"]) {
        switch (status) {
            case "SCHEDULED":
                return "Planifiée";
            case "COMPLETED":
                return "Terminée";
            case "CANCELLED":
                return "Annulée";
            default:
                return status;
        }
    }

    function getMeetingStatusBadgeClass(status: TeamMeeting["status"]) {
        switch (status) {
            case "SCHEDULED":
                return "badge-info";
            case "COMPLETED":
                return "badge-success";
            case "CANCELLED":
                return "badge-error";
            default:
                return "badge-outline";
        }
    }

    useEffect(() => {
        fetchEligibleParticipants(selectedProjectId || null);

        if (!selectedProjectId) {
            setSelectedTeamId("");
        }

        setSelectedParticipantUserIds([]);
    }, [selectedProjectId]);

    const filteredMeetings = useMemo(() => {
        const query = search.trim().toLowerCase();
        const now = new Date();

        return meetings.filter((meeting) => {
            const meetingDate = new Date(meeting.scheduledAt);
            const type = getMeetingType(meeting);

            const haystack = [
                meeting.title,
                meeting.description || "",
                meeting.project?.name || "",
                meeting.team?.name || "",
                meeting.createdBy?.name || "",
                meeting.createdBy?.email || "",
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = !query || haystack.includes(query);
            const matchesStatus =
                statusFilter === "ALL" || meeting.status === statusFilter;
            const matchesType = typeFilter === "ALL" || type === typeFilter;
            const matchesTime =
                timeFilter === "ALL" ||
                (timeFilter === "UPCOMING" && meetingDate >= now) ||
                (timeFilter === "PAST" && meetingDate < now);

            return matchesSearch && matchesStatus && matchesType && matchesTime;
        });
    }, [meetings, search, statusFilter, typeFilter, timeFilter]);


    const filteredTeamsForProject = useMemo(() => {
        if (!selectedProjectId) {
            return teams;
        }

        return teams.filter((team) => team.projectId === selectedProjectId);
    }, [teams, selectedProjectId]);

    const filteredEligibleParticipants = useMemo(() => {
        const query = participantSearch.trim().toLowerCase();

        if (!query) {
            return eligibleParticipants;
        }

        return eligibleParticipants.filter((participant) => {
            const name = participant.name?.toLowerCase() ?? "";
            const email = participant.email.toLowerCase();

            return name.includes(query) || email.includes(query);
        });
    }, [eligibleParticipants, participantSearch]);

    const fetchEligibleParticipants = async (projectId?: string | null) => {
        try {
            const data = await getEligibleParticipantsForMeetingCreation(projectId ?? null);
            setEligibleParticipants(data as EligibleMeetingParticipant[]);
        } catch (error) {
            toast.error("Erreur lors du chargement des participants éligibles.");
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setNotes("");
        setScheduledAt("");
        setDurationMinutes("");
        setSelectedTeamId("");
        setSelectedProjectId("");
        setExternalUrl("");
        setSelectedParticipantUserIds([]);
        setEligibleParticipants([]);
        setParticipantSearch("");
    };

    const handleToggleParticipant = (userId: string) => {
        setSelectedParticipantUserIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleCreateMeeting = async () => {
        if (!title.trim() || !scheduledAt) {
            toast.error("Veuillez renseigner le titre et la date.");
            return;
        }

        try {
            setCreating(true);

            await createMeeting({
                title,
                description,
                notes,
                scheduledAt,
                durationMinutes: durationMinutes ? Number(durationMinutes) : null,
                teamId: selectedTeamId || null,
                projectId: selectedProjectId || null,
                externalUrl: externalUrl || null,
                participantUserIds: selectedParticipantUserIds,
            });

            resetForm();
            (document.getElementById("create_meeting_modal") as HTMLDialogElement | null)?.close();
            await fetchMeetings();

            toast.success("Réunion créée avec succès.");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Erreur lors de la création de la réunion."
            );
        } finally {
            setCreating(false);
        }
    };

    const handleStatusChange = async (
        meetingId: string,
        status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
    ) => {
        try {
            setSavingStatusId(meetingId);
            await updateMeetingStatus(meetingId, status);
            await fetchMeetings();
            toast.success("Statut mis à jour.");
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Erreur lors de la mise à jour du statut."
            );
        } finally {
            setSavingStatusId(null);
        }
    };

    return (
        <Wrapper>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Réunions</h1>
                        <p className="text-sm opacity-70 mt-1">
                            Planifiez vos réunions d'équipe ou de projet, puis centralisez les comptes-rendus.
                        </p>
                    </div>

                    <button
                        className="btn btn-primary self-start lg:self-auto"
                        onClick={() =>
                            (document.getElementById("create_meeting_modal") as HTMLDialogElement | null)?.showModal()
                        }
                    >
                        Nouvelle réunion
                        <FolderPlus className="w-4 h-4" />
                    </button>
                </div>

                <div className="rounded-xl border border-base-300 p-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Rechercher par titre, projet ou équipe"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            className="select select-bordered w-full"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as MeetingStatusFilter)}
                        >
                            <option value="ALL">Tous les statuts</option>
                            <option value="SCHEDULED">Planifiées</option>
                            <option value="COMPLETED">Terminées</option>
                            <option value="CANCELLED">Annulées</option>
                        </select>

                        <select
                            className="select select-bordered w-full"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as MeetingTypeFilter)}
                        >
                            <option value="ALL">Tous les types</option>
                            <option value="STANDALONE">Autonomes</option>
                            <option value="PROJECT">Liées à un projet</option>
                            <option value="TEAM">Liées à une équipe</option>
                        </select>

                        <select
                            className="select select-bordered w-full"
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value as MeetingTimeFilter)}
                        >
                            <option value="ALL">Toutes les périodes</option>
                            <option value="UPCOMING">À venir</option>
                            <option value="PAST">Passées</option>
                        </select>
                    </div>
                    <p className="text-sm opacity-70 mt-3">
                        {filteredMeetings.length} réunion{filteredMeetings.length > 1 ? "s" : ""} affichée{filteredMeetings.length > 1 ? "s" : ""}
                    </p>
                </div>

                <dialog id="create_meeting_modal" className="modal">
                    <div className="modal-box max-w-2xl">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>

                        <h3 className="font-bold text-lg">Nouvelle réunion</h3>
                        <p className="py-4 text-sm opacity-80">
                            Créez une réunion autonome, liée à un projet, ou ciblée sur une équipe si besoin.
                        </p>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                placeholder="Titre de la réunion"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            <textarea
                                placeholder="Description (optionnelle)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="textarea textarea-bordered w-full"
                            />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Projet lié (optionnel)</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedProjectId}
                                        onChange={(e) => {
                                            setSelectedProjectId(e.target.value);
                                            setSelectedTeamId("");
                                        }}
                                    >
                                        <option value="">Choisir un projet</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Équipe concernée (optionnel)</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedTeamId}
                                        onChange={(e) => setSelectedTeamId(e.target.value)}
                                        disabled={!selectedProjectId}
                                    >
                                        <option value="">Aucune équipe spécifique</option>
                                        {filteredTeamsForProject.map((team) => (
                                            <option key={team.id} value={team.id}>
                                                {team.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Date et heure</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={scheduledAt}
                                        onChange={(e) => setScheduledAt(e.target.value)}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Durée (minutes, optionnel)</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={durationMinutes}
                                        onChange={(e) => setDurationMinutes(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Ex : 60"
                                    />
                                </div>
                            </div>

                            <input
                                placeholder="Lien externe / visio (optionnel)"
                                type="url"
                                value={externalUrl}
                                onChange={(e) => setExternalUrl(e.target.value)}
                                className="input input-bordered w-full"
                            />

                            <textarea
                                placeholder="Compte-rendu initial (optionnel)"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="textarea textarea-bordered w-full min-h-32"
                            />

                            <div>
                                <label className="label">
                                    <span className="label-text">Participants (optionnel)</span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Rechercher un participant par nom ou email"
                                    className="input input-bordered w-full mb-3"
                                    value={participantSearch}
                                    onChange={(e) => setParticipantSearch(e.target.value)}
                                />

                                {eligibleParticipants.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto rounded-lg border border-base-300 p-3">
                                        {filteredEligibleParticipants.map((participant) => {
                                            const checked = selectedParticipantUserIds.includes(participant.id);

                                            return (
                                                <label
                                                    key={participant.id}
                                                    className="flex items-start gap-3 rounded-lg border border-base-300 p-3 cursor-pointer hover:bg-base-200"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="checkbox checkbox-sm mt-1"
                                                        checked={checked}
                                                        onChange={() => handleToggleParticipant(participant.id)}
                                                    />

                                                    <div className="min-w-0">
                                                        <p className="font-medium break-words">
                                                            {participant.name || participant.email}
                                                        </p>
                                                        <p className="text-sm opacity-70 break-all">
                                                            {participant.email}
                                                        </p>
                                                        <p className="text-xs opacity-60 mt-1">
                                                            {participant.role ? `Rôle : ${participant.role}` : "Utilisateur"}
                                                        </p>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-base-300 p-3 text-sm opacity-70">
                                        Aucun participant sélectionnable pour le contexte actuel.
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    className="btn btn-primary w-full sm:w-auto"
                                    onClick={handleCreateMeeting}
                                    disabled={creating}
                                >
                                    Créer la réunion
                                    <CalendarDays className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog>

                {loading ? (
                    <div className="rounded-xl border border-base-300 p-5">
                        <p className="text-sm opacity-70">Chargement des réunions...</p>
                    </div>
                ) : filteredMeetings.length > 0 ? (
                    <ul className="space-y-4">
                        {filteredMeetings.map((meeting) => (
                            <li key={meeting.id}>
                                <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm space-y-4">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-lg font-semibold break-words">{meeting.title}</h2>

                                                <span className={`badge ${getMeetingStatusBadgeClass(meeting.status)}`}>
                                                    {getMeetingStatusLabel(meeting.status)}
                                                </span>

                                                <span className="badge badge-outline">
                                                    {getMeetingTypeLabel(meeting)}
                                                </span>
                                            </div>

                                            <div className="mt-3 flex flex-col gap-2 text-sm opacity-75">
                                                <p className="flex items-center gap-2">
                                                    <FolderKanban className="w-4 h-4" />
                                                    {meeting.project?.name
                                                        ? `Projet : ${meeting.project.name}`
                                                        : "Réunion autonome"}
                                                </p>

                                                <p className="flex items-center gap-2">
                                                    <UsersRound className="w-4 h-4" />
                                                    {meeting.team?.name
                                                        ? `Équipe : ${meeting.team.name}`
                                                        : "Aucune équipe spécifique"}
                                                </p>

                                                <p className="flex items-center gap-2">
                                                    <CalendarDays className="w-4 h-4" />
                                                    {new Date(meeting.scheduledAt).toLocaleString("fr-FR")}
                                                </p>

                                                {meeting.externalUrl ? (
                                                    <a
                                                        href={meeting.externalUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 link link-primary break-all"
                                                    >
                                                        <Link2 className="w-4 h-4" />
                                                        Lien de réunion
                                                    </a>
                                                ) : null}

                                                {meeting.externalUrl ? (
                                                    <p className="flex items-center gap-2 text-sm opacity-75">
                                                        <Video className="w-4 h-4" />
                                                        {meeting.provider === "JITSI" ? "Salle Jitsi configurée" : "Lien visio configuré"}
                                                    </p>
                                                ) : null}
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-auto">
                                            <select
                                                className="select select-bordered select-sm w-full lg:w-52"
                                                value={meeting.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        meeting.id,
                                                        e.target.value as "SCHEDULED" | "COMPLETED" | "CANCELLED"
                                                    )
                                                }
                                                disabled={savingStatusId === meeting.id}
                                            >
                                                <option value="SCHEDULED">Planifiée</option>
                                                <option value="COMPLETED">Terminée</option>
                                                <option value="CANCELLED">Annulée</option>
                                            </select>
                                        </div>
                                    </div>

                                    {meeting.description ? (
                                        <div className="rounded-lg border border-base-300 p-3">
                                            <p className="text-sm break-words">{meeting.description}</p>
                                        </div>
                                    ) : null}

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-2 text-sm opacity-75">
                                            <FileText className="w-4 h-4" />
                                            {meeting.notes?.trim() ? (
                                                <span>Compte-rendu disponible</span>
                                            ) : (
                                                <span>Aucun compte-rendu pour le moment</span>
                                            )}
                                        </div>

                                        {meeting.meetingRecordings && meeting.meetingRecordings.length > 0 ? (
                                            <p className="flex items-center gap-2 text-sm opacity-75">
                                                <FileText className="w-4 h-4" />
                                                {meeting.meetingRecordings.length} enregistrement{meeting.meetingRecordings.length > 1 ? "s" : ""}
                                            </p>
                                        ) : null}

                                        <Link href={`/meetings/${meeting.id}`} className="btn btn-sm btn-outline self-start sm:self-auto">
                                            Voir le détail
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyState
                        imageSrc="/empty-project.png"
                        imageAlt="Aucune réunion"
                        message="Aucune réunion disponible pour le moment"
                    />
                )}
            </div>
        </Wrapper>
    );
};

export default page;
