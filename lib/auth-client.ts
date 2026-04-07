"use client";

import { useEffect, useState } from "react";
import { getAuthenticatedUser } from "@/app/actions/auth";

export type ClientAuthUser = {
    id: string | null;
    email: string | null;
    name: string | null;
    isSignedIn: boolean;
    isLoading: boolean;
};

export function useAuthUser(): ClientAuthUser {
    const [user, setUser] = useState<{
        id: string;
        email: string;
        name: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadUser() {
            try {
                const currentUser = await getAuthenticatedUser();

                if (!mounted) {
                    return;
                }

                setUser(currentUser);
            } catch {
                if (!mounted) {
                    return;
                }

                setUser(null);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        }

        loadUser();

        return () => {
            mounted = false;
        };
    }, []);

    return {
        id: user?.id ?? null,
        email: user?.email ?? null,
        name: user?.name ?? null,
        isSignedIn: Boolean(user),
        isLoading,
    };
}
