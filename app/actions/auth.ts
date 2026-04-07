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
    });

    if (existingUser) {
        // Utiliser prisma.$transaction pour accéder aux modèles qui pourraient ne pas être typés correctement
        const existingCredential = await (prisma as any).authCredential.findUnique({
            where: { userId: existingUser.id },
        });

        if (existingCredential) {
            throw new ActionError("Un compte existe déjà avec cette adresse email.", 409);
        }

        throw new ActionError(
            "Cette adresse email est déjà liée à un compte existant. La création d'un mot de passe local n'est pas encore disponible pour ce compte.",
            409
        );
    }

    const passwordHash = await hashPassword(parsed.password);
    const sessionToken = generateSessionToken();
    const sessionTokenHash = hashSessionToken(sessionToken);
    const expiresAt = getSessionExpiresAt();

    const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                name: parsed.name,
                email: parsed.email,
            },
        });

        await (tx as any).authCredential.create({
            data: {
                userId: user.id,
                passwordHash,
            },
        });

        await (tx as any).session.create({
            data: {
                userId: user.id,
                tokenHash: sessionTokenHash,
                expiresAt,
            },
        });

        return user;
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
    const parsed = z.object({
        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Adresse email invalide"),
        password: z
            .string()
            .min(1, "Le mot de passe est requis"),
    }).parse({
        email,
        password,
    });

    const user = await prisma.user.findUnique({
        where: { email: parsed.email },
    });

    if (!user) {
        throw new ActionError("Email ou mot de passe incorrect.", 401);
    }

    const credential = await (prisma as any).authCredential.findUnique({
        where: { userId: user.id },
    });

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

    await (prisma as any).session.create({
        data: {
            userId: user.id,
            tokenHash: sessionTokenHash,
            expiresAt,
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

        await (prisma as any).session.deleteMany({
            where: {
                tokenHash: sessionTokenHash,
            },
        });
    }

    await clearSessionCookie();

    return { success: true };
}
