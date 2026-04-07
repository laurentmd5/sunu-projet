"use server";

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

    const result = await (prisma.user as any).create({
        data: {
            name: parsed.name,
            email: parsed.email,
            credential: {
                create: {
                    passwordHash,
                },
            },
            sessions: {
                create: {
                    tokenHash: sessionTokenHash,
                    expiresAt,
                },
            },
        },
    });

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

    const user = await (prisma.user as any).findUnique({
        where: { email: parsed.email },
        include: {
            credential: true,
        },
    });

    if (!user) {
        throw new ActionError("Email ou mot de passe incorrect.", 401);
    }

    if (!user.credential) {
        throw new ActionError(
            "Ce compte ne dispose pas encore d'un mot de passe local.",
            401
        );
    }

    const isValidPassword = await verifyPassword(
        parsed.password,
        user.credential.passwordHash
    );

    if (!isValidPassword) {
        throw new ActionError("Email ou mot de passe incorrect.", 401);
    }

    const sessionToken = generateSessionToken();
    const sessionTokenHash = hashSessionToken(sessionToken);
    const expiresAt = getSessionExpiresAt();

    await (prisma.user as any).update({
        where: { id: user.id },
        data: {
            sessions: {
                create: {
                    tokenHash: sessionTokenHash,
                    expiresAt,
                },
            },
        },
    });

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

        const user = await (prisma.user as any).findFirst({
            where: {
                sessions: {
                    some: {
                        tokenHash: sessionTokenHash,
                    },
                },
            },
            select: {
                id: true,
            },
        });

        if (user) {
            await (prisma.user as any).update({
                where: { id: user.id },
                data: {
                    sessions: {
                        deleteMany: {
                            tokenHash: sessionTokenHash,
                        },
                    },
                },
            });
        }
    }

    await clearSessionCookie();

    return { success: true };
}
