import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export default function LegacySignUpPage() {
    redirect(AUTH_ROUTES.register);
}