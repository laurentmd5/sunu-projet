"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutCurrentUser } from "@/app/actions/auth";

export default function LocalLogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutCurrentUser();
            router.push("/login");
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={handleLogout}
            disabled={loading}
            aria-label="Se déconnecter"
            title="Se déconnecter"
        >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">
                {loading ? "Déconnexion..." : "Déconnexion"}
            </span>
        </button>
    );
}
