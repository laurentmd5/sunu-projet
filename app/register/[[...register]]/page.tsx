import { SignUp } from "@clerk/nextjs";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
            <SignUp
                path={AUTH_ROUTES.register}
                routing="path"
                signInUrl={AUTH_ROUTES.login}
                fallbackRedirectUrl="/"
            />
        </div>
    );
}
