"use client";

import React from "react";

type ActivityLogItem = {
    id: string;
    type: string;
    message: string;
    createdAt: Date | string;
    actor: {
        id: string;
        name: string | null;
        email: string;
    };
};

type Props = {
    isActive: boolean;
    loading: boolean;
    logs: ActivityLogItem[];
};

export default function ProjectActivityTab({ isActive, loading, logs }: Props) {
    if (!isActive) return null;

    return (
        <div className="rounded-xl border border-base-300 p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Activité récente</h2>
            </div>

            {loading ? (
                <p className="text-sm opacity-70">Chargement de l'activité...</p>
            ) : logs.length > 0 ? (
                <div className="space-y-3">
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className="border border-base-300 rounded-lg p-3"
                        >
                            <p className="text-sm break-words">{log.message}</p>
                            <p className="text-xs opacity-60 mt-1">
                                {new Date(log.createdAt).toLocaleString("fr-FR")}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm opacity-70">
                    Aucune activité récente pour ce projet.
                </p>
            )}
        </div>
    );
}
