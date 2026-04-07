"use client";

import { useEffect } from "react";
import { syncCurrentUser } from "../actions/users";
import { useAuthUser } from "@/lib/auth-client";

export default function AuthUserSync() {
    const { isSignedIn } = useAuthUser();

    useEffect(() => {
        if (isSignedIn) {
            syncCurrentUser();
        }
    }, [isSignedIn]);

    return null;
}
