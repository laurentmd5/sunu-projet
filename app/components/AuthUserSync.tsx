"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { checkAndAddUser } from "../actions";

export default function AuthUserSync() {
    const { user } = useUser();

    useEffect(() => {
        const email = user?.primaryEmailAddress?.emailAddress;
        const name = user?.fullName || user?.firstName || "";

        if (email) {
            checkAndAddUser(email, name);
        }
    }, [user]);

    return null;
}
