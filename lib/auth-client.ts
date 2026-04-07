"use client";

import { useUser } from "@clerk/nextjs";

export type ClientAuthUser = {
    email: string | null;
    name: string | null;
    isSignedIn: boolean;
};

export function useAuthUser(): ClientAuthUser {
    const { user, isSignedIn } = useUser();

    return {
        email: user?.primaryEmailAddress?.emailAddress ?? null,
        name: user?.fullName || user?.firstName || null,
        isSignedIn: Boolean(isSignedIn),
    };
}
