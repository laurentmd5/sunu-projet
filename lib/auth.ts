import { currentUser } from "@clerk/nextjs/server";

export type AuthIdentity = {
    email: string;
    name?: string | null;
};

export async function getCurrentAuthIdentity(): Promise<AuthIdentity | null> {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
        return null;
    }

    return {
        email,
        name:
            clerkUser?.fullName ||
            clerkUser?.firstName ||
            clerkUser?.username ||
            null,
    };
}
