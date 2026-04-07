import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";

export const AUTH_SESSION_COOKIE = "sunu_session";

const SESSION_TOKEN_BYTES = 32;
const SESSION_DURATION_DAYS = 7;

export function generateSessionToken(): string {
    return randomBytes(SESSION_TOKEN_BYTES).toString("hex");
}

export function hashSessionToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
}

export function getSessionExpiresAt(): Date {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);
    return expiresAt;
}

export async function setSessionCookie(token: string, expiresAt: Date) {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });
}

export async function getSessionCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_SESSION_COOKIE)?.value;
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_SESSION_COOKIE);
}
