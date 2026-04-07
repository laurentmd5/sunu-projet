"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncCurrentUser } from "../actions/users";

export default function AuthUserSync() {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            syncCurrentUser();
        }
    }, [user]);

    return null;
}
