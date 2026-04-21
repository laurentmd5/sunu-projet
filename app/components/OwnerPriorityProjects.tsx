"use client";

import Link from "next/link";
import type { OwnerDashboardProjectCard } from "@/type";
import { AlertTriangle, ArrowRight } from "lucide-react";

type Props = {
  projects: OwnerDashboardProjectCard[];
};

export default function OwnerPriorityProjects({ projects }: Props) {
  const criticalProjects = projects
    .filter((project) => project.healthColor !== "GREEN")
    .sort((a, b) => {
      const weight = { RED: 0, ORANGE: 1, GREEN: 2 };
      const diff = weight[a.healthColor] - weight[b.healthColor];
      if (diff !== 0) return diff;
      return a.healthScore - b.healthScore;
    })
    .slice(0, 3);

  if (criticalProjects.length === 0) return null;

  return (
    <div className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Projets à surveiller</h2>
      </div>

      <div className="space-y-3">
        {criticalProjects.map((project) => (
          <div
            key={project.projectId}
            className="flex flex-col gap-3 rounded-lg border border-base-300 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium">{project.projectName}</p>
              <p className="mt-1 text-sm opacity-70">
                Score santé : {project.healthScore}/100 · {project.overdueTasks} tâche(s) en retard
              </p>
              {project.alerts[0] && (
                <p className="mt-1 text-sm">{project.alerts[0].message}</p>
              )}
            </div>

            <Link
              href={`/project/${project.projectId}`}
              className="btn btn-primary btn-sm"
            >
              Ouvrir
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
