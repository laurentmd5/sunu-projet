"use client";

import Link from "next/link";
import type { OwnerDashboardProjectCard } from "@/type";
import { ArrowRight, AlertTriangle, FolderKanban, Users } from "lucide-react";
import OwnerDashboardProjectInsights from "./OwnerDashboardProjectInsights";

type Props = {
  card: OwnerDashboardProjectCard;
};

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

export default function OwnerDashboardProjectCard({ card }: Props) {
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

          <p className="mt-2 text-sm opacity-70">
            Statut projet : <span className="font-medium">{card.projectStatus}</span>
          </p>
        </div>

        <div
          className={`badge border px-3 py-3 text-xs font-semibold ${getHealthBadgeClasses(
            card.healthColor
          )}`}
        >
          {getHealthLabel(card.healthColor)}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-base-300 p-4">
          <p className="text-sm opacity-70">Score de santé</p>
          <p className="mt-2 text-3xl font-bold">{card.healthScore}/100</p>
        </div>

        <div className="rounded-lg border border-base-300 p-4">
          <p className="text-sm opacity-70">Avancement</p>
          <p className="mt-2 text-3xl font-bold">{card.progressPercent}%</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>Progression globale</span>
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
            <span>Activité récente</span>
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
            <span>Alignement planning</span>
            <span>{card.scheduleAlignmentPercent}%</span>
          </div>
          <progress
            className="progress progress-warning w-full"
            value={card.scheduleAlignmentPercent}
            max={100}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-base-300 p-3">
          <p className="text-xs opacity-70">Tâches totales</p>
          <p className="mt-1 text-xl font-semibold">{card.totalTasks}</p>
        </div>

        <div className="rounded-lg border border-base-300 p-3">
          <p className="text-xs opacity-70">Tâches actives</p>
          <p className="mt-1 text-xl font-semibold">{card.activeTasks}</p>
        </div>

        <div className="rounded-lg border border-base-300 p-3">
          <p className="text-xs opacity-70">Terminées</p>
          <p className="mt-1 text-xl font-semibold">{card.completedTasks}</p>
        </div>

        <div className="rounded-lg border border-base-300 p-3">
          <p className="text-xs opacity-70">En retard</p>
          <p className="mt-1 text-xl font-semibold">{card.overdueTasks}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
        <Users className="h-4 w-4" />
        <span>
          {card.activeMembers7d} membre(s) actifs sur {card.executableMembersCount} exécutant(s)
        </span>
      </div>
      <p className="mt-1 text-xs opacity-60">
        {card.membersCount} membre(s) au total dans le projet
      </p>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-semibold">Alertes</h3>

        {card.alerts.length > 0 ? (
          <div className="space-y-2">
            {card.alerts.slice(0, 3).map((alert, index) => (
              <div
                key={`${alert.type}-${index}`}
                className="flex items-start gap-2 rounded-lg border border-base-300 p-3 text-sm"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-base-300 p-3 text-sm opacity-70">
            Aucune alerte prioritaire.
          </div>
        )}
      </div>

      <OwnerDashboardProjectInsights insights={card.insights} />

      <div className="mt-5">
        <Link href={`/project/${card.projectId}`} className="btn btn-primary btn-sm">
          Ouvrir le projet
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
