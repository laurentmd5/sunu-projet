"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionError } from "@/lib/permissions";
import { hashPassword } from "@/lib/auth-password";
import {
    generateSessionToken,
    getSessionExpiresAt,
    hashSessionToken,
    setSessionCookie,
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
