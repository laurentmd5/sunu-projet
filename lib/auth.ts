import prisma from "@/lib/prisma";
import { getSessionCookie, hashSessionToken } from "@/lib/auth-session";

export type AuthIdentity = {
    email: string;
    name?: string | null;
};

type LocalUserRow = {
    id: string;
    email: string;
    name: string | null;
};

async function getLocalAuthIdentity(): Promise<AuthIdentity | null> {
    const sessionToken = await getSessionCookie();

    if (!sessionToken) {
        return null;
    }

    const sessionTokenHash = hashSessionToken(sessionToken);

    const users = await prisma.$queryRaw<LocalUserRow[]>`
        SELECT u.\`id\`, u.\`email\`, u.\`name\` 
        FROM \`User\` u
        INNER JOIN \`Session\` s ON s.\`userId\` = u.\`id\` 
        WHERE s.\`tokenHash\` = ${sessionTokenHash}
          AND s.\`expiresAt\` > NOW()
        LIMIT 1
    `;

    const user = users[0];

    if (!user?.email) {
        return null;
    }

    return {
        email: user.email,
        name: user.name || null,
    };
}

export async function getCurrentAuthIdentity(): Promise<AuthIdentity | null> {
    return getLocalAuthIdentity();
}
