// src/components/auth/ResetPasswordForm.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase-browser";
import { authInputClass, authLabelClass } from "@/lib/form-styles";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("new_password") ?? "");
    const newPasswordConfirmation = String(
      formData.get("new_password_confirmation") ?? ""
    );

    if (newPassword.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setStatus("submitting");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setErrorMessage("Une erreur est survenue, merci de réessayer.");
      setStatus("idle");
      return;
    }

    setStatus("success");

    setTimeout(() => {
      router.push("/compte");
      router.refresh();
    }, 1500);
  };

  if (hasSession === null) {
    return <p className="text-sm text-[var(--koalit-muted)]">Chargement...</p>;
  }

  if (!hasSession) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        Ce lien de réinitialisation est invalide ou a expiré. Merci de{" "}
        <Link href="/mot-de-passe-oublie" className="font-medium underline">
          en demander un nouveau
        </Link>
        .
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        Votre mot de passe a bien été mis à jour. Redirection en cours...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="new_password" className={authLabelClass}>
          Nouveau mot de passe
        </label>
        <input
          id="new_password"
          name="new_password"
          type="password"
          required
          minLength={8}
          className={authInputClass}
        />
      </div>

      <div>
        <label htmlFor="new_password_confirmation" className={authLabelClass}>
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="new_password_confirmation"
          name="new_password_confirmation"
          type="password"
          required
          minLength={8}
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
        {status === "submitting" ? "Mise à jour..." : "Mettre à jour le mot de passe"}
      </button>
    </form>
  );
}
