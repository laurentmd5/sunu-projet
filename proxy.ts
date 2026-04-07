import { NextResponse } from "next/server";
import { AUTH_ROUTES, PUBLIC_AUTH_ROUTE_PATTERNS } from "@/lib/auth-routes";
import { AUTH_SESSION_COOKIE } from "@/lib/auth-session";

function isPublicPath(pathname: string) {
    return PUBLIC_AUTH_ROUTE_PATTERNS.some((pattern) => {
        const normalized = pattern.replace("(.*)", "");
        return pathname === normalized || pathname.startsWith(`${normalized}/`);
    });
}

export default function middleware(request: Request & { nextUrl: URL; cookies: { get(name: string): { value: string } | undefined } }) {
    const { pathname } = request.nextUrl;

    if (isPublicPath(pathname)) {
        return NextResponse.next();
    }

    const localSessionToken = request.cookies.get(AUTH_SESSION_COOKIE)?.value;

    if (localSessionToken) {
        return NextResponse.next();
    }

    const loginUrl = new URL(AUTH_ROUTES.login, request.url);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};