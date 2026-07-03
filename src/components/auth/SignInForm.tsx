// src/components/auth/SignInForm.tsx

"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase-browser";
import { translateAuthError } from "@/lib/auth-errors";
import { authInputClass, authLabelClass } from "@/lib/form-styles";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(translateAuthError(error.message));
      setLoading(false);
      return;
    }

    const next = searchParams.get("next") || "/compte";
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className={authLabelClass}>
          Adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="vous@exemple.fr"
          className={authInputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={authLabelClass}>
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={authInputClass}
        />
      </div>

      <div className="text-right">
        <Link
          href="/mot-de-passe-oublie"
          className="text-sm font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
        >
          Mot de passe oublié ?
        </Link>
      </div>

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>

      <p className="text-center text-sm text-[var(--koalit-text)]">
        Pas encore de compte ?{" "}
        <Link
          href="/inscription"
          className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
        >
          Créer un compte
        </Link>
      </p>
    </form>
  );
}
