import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getSessionCookie, hashSessionToken } from "@/lib/auth-session";

export type AuthIdentity = {
    email: string;
    name?: string | null;
};

async function getLocalAuthIdentity(): Promise<AuthIdentity | null> {
    const sessionToken = await getSessionCookie();

    if (!sessionToken) {
        return null;
    }

    const sessionTokenHash = hashSessionToken(sessionToken);
    const now = new Date();

    const session = await (prisma as any).session.findUnique({
        where: {
            tokenHash: sessionTokenHash,
        },
        include: {
            user: true,
        },
    });

    if (!session) {
        return null;
    }

    if (session.expiresAt <= now) {
        await (prisma as any).session.delete({
            where: {
                id: session.id,
            },
        });

        return null;
    }

    if (!session.user?.email) {
        return null;
    }

    return {
        email: session.user.email,
        name: session.user.name || null,
    };
}

async function getClerkAuthIdentity(): Promise<AuthIdentity | null> {
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

export async function getCurrentAuthIdentity(): Promise<AuthIdentity | null> {
    const localIdentity = await getLocalAuthIdentity();

    if (localIdentity) {
        return localIdentity;
    }

    return getClerkAuthIdentity();
}
