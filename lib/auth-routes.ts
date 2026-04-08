export const AUTH_ROUTES = {
    login: "/login",
    register: "/register",
} as const;

export const PUBLIC_AUTH_ROUTE_PATTERNS = [
    `${AUTH_ROUTES.login}(.*)`,
    `${AUTH_ROUTES.register}(.*)`,
] as const;
