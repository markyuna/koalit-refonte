// src/components/auth/ForgotPasswordForm.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

import { createClient } from "@/lib/supabase-browser";
import { authInputClass, authLabelClass } from "@/lib/form-styles";

const SUCCESS_MESSAGE =
  "Si un compte existe avec cet email, vous allez recevoir un lien pour réinitialiser votre mot de passe.";

export default function ForgotPasswordForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reinitialiser-mot-de-passe`,
    });

    if (error) {
      setErrorMessage("Une erreur est survenue, merci de réessayer.");
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
        {status === "submitting" ? "Envoi..." : "Envoyer le lien de réinitialisation"}
      </button>

      <p className="text-center text-sm text-[var(--koalit-text)]">
        <Link
          href="/connexion"
          className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
        >
          Retour à la connexion
        </Link>
      </p>
    </form>
  );
}
