"use client";

import type { OwnerDashboardProjectInsight } from "@/type";
import { Award, Flag } from "lucide-react";

type Props = {
  insights?: OwnerDashboardProjectInsight;
  projectStatus?: "ACTIVE" | "COMPLETED" | "ARCHIVED" | "ON_HOLD";
};

export default function OwnerDashboardProjectInsights({ insights, projectStatus }: Props) {
  if (!insights) return null;

  const isClosedProject =
    projectStatus === "COMPLETED" || projectStatus === "ARCHIVED";

  return (
    <div className="mt-5 space-y-4">
      {insights.topPerformer && (
        <div className="rounded-lg border border-base-300 p-3 text-sm">
          <div className="mb-1 flex items-center gap-2 font-medium">
            <Award className="h-4 w-4" />
            <span>{isClosedProject ? "Contributeur marquant" : "Top contributeur"}</span>
          </div>
          <p>{insights.topPerformer.name || insights.topPerformer.email}</p>
          <p className="mt-1 opacity-70">
            Score {insights.topPerformer.performanceScore} ·{" "}
            {insights.topPerformer.completedTasks}/{insights.topPerformer.assignedTasks} tâches terminées
          </p>
        </div>
      )}

      {(insights.milestonesAtRiskCount ?? 0) > 0 && (
        <div className="rounded-lg border border-base-300 p-3 text-sm">
          <div className="mb-1 flex items-center gap-2 font-medium">
            <Flag className="h-4 w-4" />
            <span>{isClosedProject ? "Jalons historiquement sensibles" : "Jalons à risque"}</span>
          </div>
          <p>
            {isClosedProject
              ? `${insights.milestonesAtRiskCount} jalon(s) ont présenté un risque sur le cycle du projet.` 
              : `${insights.milestonesAtRiskCount} jalon(s) nécessitent une attention particulière.`}
          </p>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-semibold">
          {isClosedProject ? "Contributeurs marquants" : "Top contributeurs"}
        </h3>
        {insights.topMembers.length > 0 ? (
          <div className="space-y-2">
            {insights.topMembers.map((member) => (
              <div
                key={member.userId}
                className="rounded-lg border border-base-300 p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">
                    {member.name || member.email}
                  </span>
                  <span className="badge badge-outline">
                    {member.performanceScore}
                  </span>
                </div>
                <p className="mt-1 opacity-70">
                  {member.completedTasks}/{member.assignedTasks} tâches terminées
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-base-300 p-3 text-sm opacity-70">
            Aucun contributeur à classer pour le moment.
          </div>
        )}
      </div>

      {!isClosedProject && (
        <div>
          <h3 className="mb-2 text-sm font-semibold">Membres à surveiller</h3>
          {insights.strugglingMembers.length > 0 ? (
            <div className="space-y-2">
              {insights.strugglingMembers.map((member) => (
                <div
                  key={member.userId}
                  className="rounded-lg border border-base-300 p-3 text-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">
                      {member.name || member.email}
                    </span>
                    <span className="opacity-70">
                      {member.overdueTasks} retard(s)
                    </span>
                  </div>
                  <p className="mt-1 opacity-70">
                    {member.isActive7d ? "Actif récemment" : "Inactif sur 7 jours"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-base-300 p-3 text-sm opacity-70">
              Aucun membre en difficulté détecté.
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-semibold">Équipes</h3>
        {insights.teamMetrics.length > 0 ? (
          <div className="space-y-2">
            {insights.teamMetrics.slice(0, 3).map((team) => (
              <div
                key={team.teamId}
                className="rounded-lg border border-base-300 p-3 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{team.teamName}</span>
                  <span>{team.progressPercent}%</span>
                </div>
                <p className="mt-1 opacity-70">
                  {team.completedTasks}/{team.totalTasks} tâches terminées · {team.overdueTasks} en retard
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-base-300 p-3 text-sm opacity-70">
            Aucune équipe rattachée à ce projet.
          </div>
        )}
      </div>
    </div>
  );
}
