"use client";

import { useAuthUser } from "@/lib/auth-client";
import { User } from "lucide-react";

export default function LocalUserBadge() {
    const { name, email, isSignedIn } = useAuthUser();

    if (!isSignedIn) {
        return null;
    }

    return (
        <div className="hidden md:flex items-center gap-2 rounded-full border border-base-300 px-3 py-2 bg-base-100">
            <User className="w-4 h-4" />
            <div className="leading-tight">
                <p className="text-sm font-medium max-w-[140px] truncate">
                    {name || "Utilisateur"}
                </p>
                <p className="text-xs text-base-content/60 max-w-[160px] truncate">
                    {email || ""}
                </p>
            </div>
        </div>
    );
}
