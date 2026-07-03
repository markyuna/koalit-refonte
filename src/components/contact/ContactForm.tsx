// src/components/contact/ContactForm.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

const SUBJECT_OPTIONS = [
  "Question sur un produit",
  "Suivi de commande",
  "Demande de garantie",
  "Retour / échange",
  "Autre demande",
];

const SUCCESS_MESSAGE =
  "Merci, votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.";

const ERROR_MESSAGE =
  "Une erreur est survenue, merci de réessayer ou de nous écrire directement à literie1@koalit.fr.";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const consent = formData.get("consent") === "on";

    const payload = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      order_number: formData.get("order_number"),
      message: formData.get("message"),
      consent,
    };

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error ?? ERROR_MESSAGE);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Erreur envoi formulaire de contact:", error);
      setErrorMessage(ERROR_MESSAGE);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
        {SUCCESS_MESSAGE}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-[var(--koalit-border)] bg-white px-4 py-3 text-[var(--koalit-text)] outline-none transition focus:border-[var(--koalit-gold)]";
  const labelClass = "mb-2 block text-sm font-semibold text-[var(--koalit-blue)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="full_name" className={labelClass}>
            Nom complet
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            placeholder="Jean Dupont"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="vous@exemple.fr"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Sujet
          </label>
          <select id="subject" name="subject" required className={inputClass}>
            <option value="">Sélectionner un sujet</option>
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="order_number" className={labelClass}>
          Numéro de commande (si applicable)
        </label>
        <input
          id="order_number"
          name="order_number"
          type="text"
          placeholder="#12345"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre demande..."
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-[var(--koalit-text)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span>
          J&apos;accepte que mes données soient utilisées pour traiter ma
          demande, conformément à la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="font-medium text-[var(--koalit-blue)] underline underline-offset-2 hover:text-[var(--koalit-gold-hover)]"
          >
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {status === "error" && errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
