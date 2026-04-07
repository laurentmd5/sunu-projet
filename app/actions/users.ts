"use server";

import prisma from "@/lib/prisma";
import { getCurrentAuthIdentity } from "@/lib/auth";

export async function syncCurrentUser() {
    const identity = await getCurrentAuthIdentity();

    if (!identity?.email) {
        return null;
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: identity.email,
            },
        });

        if (!existingUser) {
            const createdUser = await prisma.user.create({
                data: {
                    email: identity.email,
                    name: identity.name || identity.email,
                },
            });

            console.log("Utilisateur ajouté à la base de données.");
            return createdUser;
        }

        if (identity.name && existingUser.name !== identity.name) {
            const updatedUser = await prisma.user.update({
                where: {
                    email: identity.email,
                },
                data: {
                    name: identity.name,
                },
            });

            console.log("Nom de l'utilisateur mis à jour.");
            return updatedUser;
        }

        return existingUser;
    } catch (error) {
        console.error("Erreur lors de la synchronisation de l'utilisateur :", error);
        return null;
    }
}
