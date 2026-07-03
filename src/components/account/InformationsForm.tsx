// src/components/account/InformationsForm.tsx

"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase-browser";
import { authInputClass, authLabelClass } from "@/lib/form-styles";

type Props = {
  initial: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
};

export default function InformationsForm({ initial }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("first_name") ?? "").trim();
    const lastName = String(formData.get("last_name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage({ type: "error", text: "Session expirée, merci de vous reconnecter." });
      setStatus("idle");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ first_name: firstName, last_name: lastName, phone: phone || null })
      .eq("id", user.id);

    if (profileError) {
      setMessage({ type: "error", text: "Une erreur est survenue, merci de réessayer." });
      setStatus("idle");
      return;
    }

    if (email !== initial.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email });

      if (emailError) {
        setMessage({
          type: "error",
          text: "Vos informations ont été mises à jour, mais l'email n'a pas pu être modifié.",
        });
        setStatus("idle");
        return;
      }

      setMessage({
        type: "success",
        text: "Informations mises à jour. Un email de confirmation a été envoyé à votre nouvelle adresse : cliquez sur le lien qu'il contient pour finaliser le changement.",
      });
      setStatus("idle");
      return;
    }

    setMessage({ type: "success", text: "Vos informations ont bien été mises à jour." });
    setStatus("idle");
  };

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
            defaultValue={initial.firstName}
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
            defaultValue={initial.lastName}
            required
            className={authInputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={authLabelClass}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={initial.phone}
            placeholder="06 12 34 56 78"
            className={authInputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={authLabelClass}>
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={initial.email}
            required
            className={authInputClass}
          />
        </div>
      </div>

      {message && (
        <div
          className={
            message.type === "success"
              ? "rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
              : "rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          }
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
}
