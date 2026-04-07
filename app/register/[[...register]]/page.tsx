"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerWithPassword } from "@/app/actions";
import { AUTH_ROUTES } from "@/lib/auth-routes";

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            setLoading(true);

            await registerWithPassword(name, email, password);

            router.push("/");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Erreur lors de la création du compte."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                    <h1 className="text-2xl font-bold text-center">Créer un compte</h1>
                    <p className="text-sm text-center text-base-content/70">
                        Créez votre compte local Sunu Projets
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Nom</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Votre nom"
                                required
                            />
                        </div>

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
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Confirmer le mot de passe</span>
                            </label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="********"
                                required
                                minLength={8}
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
                            {loading ? "Création..." : "Créer mon compte"}
                        </button>
                    </form>

                    <div className="divider my-2">ou</div>

                    <p className="text-sm text-center">
                        Vous avez déjà un compte ?{" "}
                        <Link className="link link-primary" href={AUTH_ROUTES.login}>
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
