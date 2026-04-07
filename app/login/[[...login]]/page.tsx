import { SignIn } from "@clerk/nextjs";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
            <SignIn
                path={AUTH_ROUTES.login}
                routing="path"
                signUpUrl={AUTH_ROUTES.register}
                fallbackRedirectUrl="/"
            />
        </div>
    );
}
