"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginWithPassword } from "@/app/actions";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            setLoading(true);

            await loginWithPassword(email, password);

            router.push("/");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Erreur lors de la connexion."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center">Se connecter</h1>
                    <p className="text-sm text-center text-base-content/70">
                        Connectez-vous avec votre compte local Sunu Projets
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="vous@entreprise.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Mot de passe</span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error text-sm">
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>

                    <div className="divider my-2">ou</div>

                    <p className="text-sm text-center">
                        Pas encore de compte ?{" "}
                        <Link className="link link-primary" href={AUTH_ROUTES.register}>
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
