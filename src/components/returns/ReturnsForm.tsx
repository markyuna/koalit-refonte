// src/components/returns/ReturnsForm.tsx

"use client";

import Link from "next/link";
import { useState } from "react";

import { supabase } from "@/lib/supabase";
import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  MAX_ATTACHMENT_SIZE_BYTES,
  RETURNS_ATTACHMENTS_BUCKET,
} from "@/lib/returns";

const SUCCESS_MESSAGE =
  "Merci, votre demande a bien été envoyée. Notre équipe reviendra vers vous dans les plus brefs délais.";

const ERROR_MESSAGE =
  "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous écrire directement à literie1@koalit.fr.";

type Status = "idle" | "uploading_file" | "submitting_form" | "success" | "error";

export default function ReturnsForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isBusy = status === "uploading_file" || status === "submitting_form";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real users never see or fill this field.
    const websiteUrl = formData.get("website_url");

    const file = formData.get("attachment");
    const consent = formData.get("consent") === "on";

    if (!(file instanceof File) || file.size === 0) {
      setErrorMessage("Merci de joindre une photo du défaut constaté.");
      setStatus("error");
      return;
    }

    if (!ALLOWED_ATTACHMENT_MIME_TYPES.includes(file.type)) {
      setErrorMessage("Format de fichier non accepté (JPG, PNG, HEIC ou PDF).");
      setStatus("error");
      return;
    }

    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      setErrorMessage("Le fichier dépasse la taille maximale (15 Mo).");
      setStatus("error");
      return;
    }

    setErrorMessage(null);

    try {
      setStatus("uploading_file");

      const uploadUrlResponse = await fetch("/api/returns/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        }),
      });

      const uploadUrlData = await uploadUrlResponse.json();

      if (!uploadUrlResponse.ok || !uploadUrlData.success) {
        setErrorMessage(uploadUrlData.error ?? ERROR_MESSAGE);
        setStatus("error");
        return;
      }

      const { requestId, path, token } = uploadUrlData;

      const { error: uploadError } = await supabase.storage
        .from(RETURNS_ATTACHMENTS_BUCKET)
        .uploadToSignedUrl(path, token, file);

      if (uploadError) {
        console.error("Erreur upload pièce jointe:", uploadError);
        setErrorMessage(ERROR_MESSAGE);
        setStatus("error");
        return;
      }

      setStatus("submitting_form");

      const payload = {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        address: formData.get("address"),
        phone: formData.get("phone"),
        request_id: requestId,
        attachment_path: path,
        attachment_mime_type: file.type,
        consent,
        website_url: websiteUrl,
      };

      const response = await fetch("/api/returns", {
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
      console.error("Erreur envoi formulaire de retour:", error);
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
      {/* Honeypot -- hidden off-screen, never visible to real users. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website_url">Site web</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first_name" className={labelClass}>
            Prénom
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="last_name" className={labelClass}>
            Nom
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail
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

        <div>
          <label htmlFor="phone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="06 12 34 56 78"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>
          Adresse
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="attachment" className={labelClass}>
          Photo du défaut (max 15 Mo)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          required
          accept="image/*,application/pdf"
          className={inputClass}
        />
        <p className="mt-2 text-xs text-[var(--koalit-muted)]">
          Formats acceptés : JPG, PNG, HEIC, PDF. Taille maximale : 15 Mo.
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-[var(--koalit-text)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span>
          J&apos;accepte que mes données et la photo transmise soient
          utilisées pour traiter ma demande de retour, conformément à la{" "}
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
        disabled={isBusy}
        className="inline-flex rounded-full bg-[var(--koalit-blue)] px-7 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "uploading_file"
          ? "Envoi de la photo..."
          : status === "submitting_form"
            ? "Envoi..."
            : "Envoyer"}
      </button>
    </form>
  );
}
