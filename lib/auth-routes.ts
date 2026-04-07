export const AUTH_ROUTES = {
    login: "/login",
    register: "/register",
    legacySignIn: "/sign-in",
    legacySignUp: "/sign-up",
} as const;

export const PUBLIC_AUTH_ROUTE_PATTERNS = [
    `${AUTH_ROUTES.login}(.*)`,
    `${AUTH_ROUTES.register}(.*)`,
    `${AUTH_ROUTES.legacySignIn}(.*)`,
    `${AUTH_ROUTES.legacySignUp}(.*)`,
] as const;
