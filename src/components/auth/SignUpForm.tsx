// src/components/auth/SignUpForm.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

import { createClient } from "@/lib/supabase-browser";
import { translateAuthError } from "@/lib/auth-errors";
import { authInputClass, authLabelClass } from "@/lib/form-styles";

const SUCCESS_MESSAGE =
  "Merci ! Un email de confirmation vient de vous être envoyé. Cliquez sur le lien qu'il contient pour activer votre compte.";

export default function SignUpForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("first_name") ?? "").trim();
    const lastName = String(formData.get("last_name") ?? "").trim();
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const passwordConfirmation = String(formData.get("password_confirmation") ?? "");
    const consent = formData.get("consent") === "on";

    if (password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!consent) {
      setErrorMessage(
        "Merci d’accepter les conditions générales de vente et la politique de confidentialité."
      );
      return;
    }

    setStatus("submitting");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });

    if (error) {
      setErrorMessage(translateAuthError(error.message));
      setStatus("idle");
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        {SUCCESS_MESSAGE}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className={authLabelClass}>
            Prénom
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="last_name" className={authLabelClass}>
            Nom
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            className={authInputClass}
          />
        </div>
      </div>

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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className={authLabelClass}>
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="password_confirmation" className={authLabelClass}>
            Confirmer le mot de passe
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            minLength={8}
            className={authInputClass}
          />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-[var(--koalit-text)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span>
          J&apos;accepte les{" "}
          <Link
            href="/conditions-generales-de-vente"
            className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
          >
            conditions générales de vente
          </Link>{" "}
          et la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
          >
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Création..." : "Créer mon compte"}
      </button>

      <p className="text-center text-sm text-[var(--koalit-text)]">
        Déjà un compte ?{" "}
        <Link
          href="/connexion"
          className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
        >
          Se connecter
        </Link>
      </p>
    </form>
  );
}
