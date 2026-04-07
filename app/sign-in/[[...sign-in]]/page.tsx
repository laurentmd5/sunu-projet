import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export default function LegacySignInPage() {
    redirect(AUTH_ROUTES.login);
}