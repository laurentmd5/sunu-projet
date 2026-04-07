"use server";

import crypto from "crypto";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionError } from "@/lib/permissions";
import { hashPassword, verifyPassword } from "@/lib/auth-password";
import {
    generateSessionToken,
    getSessionExpiresAt,
    hashSessionToken,
    setSessionCookie,
    getSessionCookie,
    clearSessionCookie,
} from "@/lib/auth-session";
import { getCurrentAuthIdentity } from "@/lib/auth";

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(100, "Le nom est trop long"),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Adresse email invalide"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(72, "Le mot de passe est trop long"),
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Adresse email invalide"),
    password: z
        .string()
        .min(1, "Le mot de passe est requis"),
});

type CredentialRow = {
    id: string;
    userId: string;
    passwordHash: string;
};

export async function registerWithPassword(
    name: string,
    email: string,
    password: string
) {
    const parsed = registerSchema.parse({
        name,
        email,
        password,
    });

    const existingUser = await prisma.user.findUnique({
        where: { email: parsed.email },
        select: { id: true },
    });

    if (existingUser) {
        throw new ActionError("Un compte existe déjà avec cette adresse email.", 409);
    }

    const passwordHash = await hashPassword(parsed.password);
    const sessionToken = generateSessionToken();
    const sessionTokenHash = hashSessionToken(sessionToken);
    const expiresAt = getSessionExpiresAt();

    const result = await prisma.user.create({
        data: {
            name: parsed.name,
            email: parsed.email,
        },
    });

    await prisma.$executeRaw`
        INSERT INTO \`AuthCredential\` (\`id\`, \`userId\`, \`passwordHash\`, \`createdAt\`, \`updatedAt\`)
        VALUES (${crypto.randomUUID()}, ${result.id}, ${passwordHash}, NOW(), NOW())
    `;

    await prisma.$executeRaw`
        INSERT INTO \`Session\` (\`id\`, \`userId\`, \`tokenHash\`, \`expiresAt\`, \`createdAt\`, \`updatedAt\`)
        VALUES (${crypto.randomUUID()}, ${result.id}, ${sessionTokenHash}, ${expiresAt}, NOW(), NOW())
    `;

    await setSessionCookie(sessionToken, expiresAt);

    return {
        success: true,
        user: {
            id: result.id,
            name: result.name,
            email: result.email,
        },
    };
}

export async function loginWithPassword(email: string, password: string) {
    const parsed = loginSchema.parse({
        email,
        password,
    });

    const user = await prisma.user.findUnique({
        where: { email: parsed.email },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    if (!user) {
        throw new ActionError("Email ou mot de passe incorrect.", 401);
    }

    const credentials = await prisma.$queryRaw<CredentialRow[]>`
        SELECT \`id\`, \`userId\`, \`passwordHash\` 
        FROM \`AuthCredential\` 
        WHERE \`userId\` = ${user.id}
        LIMIT 1
    `;

    const credential = credentials[0];

    if (!credential) {
        throw new ActionError(
            "Ce compte ne dispose pas encore d'un mot de passe local.",
            401
        );
    }

    const isValidPassword = await verifyPassword(
        parsed.password,
        credential.passwordHash
    );

    if (!isValidPassword) {
        throw new ActionError("Email ou mot de passe incorrect.", 401);
    }

    const sessionToken = generateSessionToken();
    const sessionTokenHash = hashSessionToken(sessionToken);
    const expiresAt = getSessionExpiresAt();

    await prisma.$executeRaw`
        INSERT INTO \`Session\` (\`id\`, \`userId\`, \`tokenHash\`, \`expiresAt\`, \`createdAt\`, \`updatedAt\`)
        VALUES (${crypto.randomUUID()}, ${user.id}, ${sessionTokenHash}, ${expiresAt}, NOW(), NOW())
    `;

    await setSessionCookie(sessionToken, expiresAt);

    return {
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };
}

export async function logoutCurrentUser() {
    const sessionToken = await getSessionCookie();

    if (sessionToken) {
        const sessionTokenHash = hashSessionToken(sessionToken);

        await prisma.$executeRaw`
            DELETE FROM \`Session\` 
            WHERE \`tokenHash\` = ${sessionTokenHash}
        `;
    }

    await clearSessionCookie();

    return { success: true };
}

export async function getAuthenticatedUser() {
    const identity = await getCurrentAuthIdentity();

    if (!identity?.email) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { email: identity.email },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    if (!user) {
        return null;
    }

    return user;
}
