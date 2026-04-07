import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PUBLIC_AUTH_ROUTE_PATTERNS, AUTH_ROUTES } from "@/lib/auth-routes";
import { AUTH_SESSION_COOKIE } from "@/lib/auth-session";

const isPublicRoute = createRouteMatcher([...PUBLIC_AUTH_ROUTE_PATTERNS]);

export default clerkMiddleware(async (auth, request) => {
    if (isPublicRoute(request)) {
        return NextResponse.next();
    }

    const localSessionToken = request.cookies.get(AUTH_SESSION_COOKIE)?.value;

    if (localSessionToken) {
        return NextResponse.next();
    }

    try {
        await auth.protect();
        return NextResponse.next();
    } catch {
        const loginUrl = new URL(AUTH_ROUTES.login, request.url);
        return NextResponse.redirect(loginUrl);
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};