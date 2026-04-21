"use client";

import type { OwnerDashboardOverview } from "@/type";

type Props = {
  summary: OwnerDashboardOverview["summary"];
};

export default function OwnerDashboardSummary({ summary }: Props) {
  const items = [
    {
      label: "Projets suivis",
      value: summary.totalProjects,
    },
    {
      label: "Projets sains",
      value: summary.greenProjects,
    },
    {
      label: "À surveiller",
      value: summary.orangeProjects,
    },
    {
      label: "Intervention requise",
      value: summary.redProjects,
    },
    {
      label: "Tâches en retard",
      value: summary.totalOverdueTasks,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm"
        >
          <p className="text-sm opacity-70">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
