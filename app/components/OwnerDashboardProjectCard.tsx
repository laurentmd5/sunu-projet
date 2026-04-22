"use client";

import { useState } from "react";
import Link from "next/link";
import type { OwnerDashboardProjectCard } from "@/type";
import { ArrowRight, AlertTriangle, FolderKanban, Users, CalendarClock } from "lucide-react";
import OwnerDashboardProjectInsights from "./OwnerDashboardProjectInsights";
import { PROJECT_STATUS_LABELS } from "@/lib/project-status";

type Props = {
  card: OwnerDashboardProjectCard;
};

function formatOptionalDate(value?: Date | string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("fr-FR");
}

function getHealthBadgeClasses(color: OwnerDashboardProjectCard["healthColor"]) {
  switch (color) {
    case "GREEN":
      return "bg-green-100 text-green-800 border-green-200";
    case "ORANGE":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "RED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-base-200 text-base-content border-base-300";
  }
}

function getHealthLabel(color: OwnerDashboardProjectCard["healthColor"]) {
  switch (color) {
    case "GREEN":
      return "Bonne santé";
    case "ORANGE":
      return "À surveiller";
    case "RED":
      return "Intervention requise";
    default:
      return "Indéfini";
  }
}

function getProjectStatusBadgeClasses(
  status: OwnerDashboardProjectCard["projectStatus"]
) {
  switch (status) {
    case "ACTIVE":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "ON_HOLD":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200";
    case "ARCHIVED":
      return "bg-gray-200 text-gray-700 border-gray-300";
    default:
      return "bg-base-200 text-base-content border-base-300";
  }
}

function getProjectLifecycleMessage(
  status: OwnerDashboardProjectCard["projectStatus"]
) {
  switch (status) {
    case "ACTIVE":
      return "Projet en cours d'exécution, à piloter selon les alertes et le rythme d'avancement.";
    case "ON_HOLD":
      return "Projet actuellement en pause. Les indicateurs sont à lire avec davantage de recul.";
    case "COMPLETED":
      return "Projet terminé. Les indicateurs ci-dessous servent surtout de synthèse de fin.";
    case "ARCHIVED":
      return "Projet archivé. Les informations affichées sont conservées à titre historique.";
    default:
      return "État du projet non précisé.";
  }
}

export default function OwnerDashboardProjectCard({ card }: Props) {
  const isClosedProject =
    card.projectStatus === "COMPLETED" || card.projectStatus === "ARCHIVED";

  const isPausedProject = card.projectStatus === "ON_HOLD";
  const showOperationalSignals = !isClosedProject;
  const showHealthDrivers = card.healthDrivers.length > 0 && !isClosedProject;

  const [showDetails, setShowDetails] = useState(false);
  const detailToggleLabel = showDetails ? "Masquer les détails" : "Voir les détails";

  return (
    <div className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
            <h2 className="truncate text-lg font-semibold">{card.projectName}</h2>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="opacity-70">Statut projet :</span>
            <span
              className={`badge border ${getProjectStatusBadgeClasses(card.projectStatus)}`}
            >
              {PROJECT_STATUS_LABELS[card.projectStatus]}
            </span>
          </div>
        </div>

        <div
          className={`badge border px-3 py-3 text-xs font-semibold ${getHealthBadgeClasses(
            card.healthColor
          )}`}
        >
          {getHealthLabel(card.healthColor)}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-base-300 p-3 text-sm opacity-80">
        {getProjectLifecycleMessage(card.projectStatus)}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-base-200/60 p-4">
          <p className="text-sm opacity-70">Score de santé</p>
          <p className="mt-2 text-3xl font-bold">{card.healthScore}/100</p>
        </div>

        <div className="rounded-lg bg-base-200/60 p-4">
          <p className="text-sm opacity-70">Avancement</p>
          <p className="mt-2 text-3xl font-bold">{card.progressPercent}%</p>
        </div>
      </div>

      {card.alerts[0] && showOperationalSignals && (
        <div className="mt-4 rounded-lg bg-base-200/40 p-3 text-sm">
          <div className="mb-1 flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>{isPausedProject ? "Point d'attention" : "Alerte principale"}</span>
          </div>
          <p>{card.alerts[0].message}</p>
        </div>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg bg-base-200/50 p-3">
          <p className="text-xs opacity-70">Tâches totales</p>
          <p className="mt-1 text-lg font-semibold">{card.totalTasks}</p>
        </div>

        <div className="rounded-lg bg-base-200/50 p-3">
          <p className="text-xs opacity-70">Tâches actives</p>
          <p className="mt-1 text-lg font-semibold">{card.activeTasks}</p>
        </div>

        <div className="rounded-lg bg-base-200/50 p-3">
          <p className="text-xs opacity-70">Terminées</p>
          <p className="mt-1 text-lg font-semibold">{card.completedTasks}</p>
        </div>

        <div className="rounded-lg bg-base-200/50 p-3">
          <p className="text-xs opacity-70">En retard</p>
          <p className="mt-1 text-lg font-semibold">{card.overdueTasks}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
        <Users className="h-4 w-4" />
        <span>
          {isClosedProject
            ? `${card.executableMembersCount} exécutant(s) impliqué(s) dans le projet` 
            : `${card.activeMembers7d} membre(s) actifs sur ${card.executableMembersCount} exécutant(s)`}
        </span>
      </div>
      <p className="mt-1 text-xs opacity-60">
        {card.membersCount} membre(s) au total dans le projet
      </p>

      <div className="mt-5">
        <button
          type="button"
          className="btn btn-ghost btn-sm px-0"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {detailToggleLabel}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-5 border-t border-base-300 pt-4">
          {(card.startDate || card.endDate) && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-base-200/40 p-3 text-sm">
                <div className="flex items-center gap-2 opacity-70">
                  <CalendarClock className="h-4 w-4" />
                  <span>Début</span>
                </div>
                <p className="mt-1 font-medium">{formatOptionalDate(card.startDate)}</p>
              </div>

              <div className="rounded-lg bg-base-200/40 p-3 text-sm">
                <div className="flex items-center gap-2 opacity-70">
                  <CalendarClock className="h-4 w-4" />
                  <span>Échéance</span>
                </div>
                <p className="mt-1 font-medium">{formatOptionalDate(card.endDate)}</p>
              </div>
            </div>
          )}

          {showHealthDrivers && (
            <div>
              <h3 className="mb-2 text-sm font-semibold">Facteurs principaux</h3>
              <div className="flex flex-wrap gap-2">
                {card.healthDrivers.map((driver) => (
                  <span key={driver} className="badge badge-outline">
                    {driver}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>{isClosedProject ? "Progression finale" : "Progression globale"}</span>
                <span>{card.progressPercent}%</span>
              </div>
              <progress
                className="progress progress-success w-full"
                value={card.progressPercent}
                max={100}
              />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>{isClosedProject ? "Activité observée" : "Activité récente"}</span>
                <span>{card.activityRatePercent}%</span>
              </div>
              <progress
                className="progress progress-info w-full"
                value={card.activityRatePercent}
                max={100}
              />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>{isClosedProject ? "Alignement final" : "Alignement planning"}</span>
                <span>{card.scheduleAlignmentPercent}%</span>
              </div>
              <progress
                className="progress progress-warning w-full"
                value={card.scheduleAlignmentPercent}
                max={100}
              />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">
              {isClosedProject ? "Historique des alertes" : "Alertes"}
            </h3>

            {card.alerts.length > 0 ? (
              <div className="space-y-2">
                {card.alerts.slice(0, 3).map((alert, index) => (
                  <div
                    key={`${alert.type}-${index}`}
                    className="flex items-start gap-2 rounded-lg bg-base-200/40 p-3 text-sm"
                  >
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{alert.message}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-base-200/40 p-3 text-sm opacity-70">
                {isClosedProject
                  ? "Aucune alerte historique notable."
                  : "Aucune alerte prioritaire."}
              </div>
            )}
          </div>

          {card.recentActivity.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold">Activité récente</h3>
              <div className="space-y-2">
                {card.recentActivity.slice(0, 3).map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg bg-base-200/40 p-3 text-sm"
                  >
                    <p>{log.message}</p>
                    <p className="mt-1 text-xs opacity-60">
                      {new Date(log.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <OwnerDashboardProjectInsights
            insights={card.insights}
            projectStatus={card.projectStatus}
          />
        </div>
      )}

      <div className="mt-5">
        <Link href={`/project/${card.projectId}`} className="btn btn-primary btn-sm">
          Ouvrir le projet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
