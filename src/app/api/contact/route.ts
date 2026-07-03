// src/app/api/contact/route.ts

import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

const ALLOWED_SUBJECTS = [
  "Question sur un produit",
  "Suivi de commande",
  "Demande de garantie",
  "Retour / échange",
  "Autre demande",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARS_REGEX = new RegExp("[\\u0000-\\u001f\\u007f]", "g");

function sanitize(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  return value.replace(CONTROL_CHARS_REGEX, "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const fullName = sanitize(body.full_name, 200);
  const email = sanitize(body.email, 320);
  const phone = sanitize(body.phone, 50);
  const subject = sanitize(body.subject, 100);
  const orderNumber = sanitize(body.order_number, 100);
  const message = sanitize(body.message, 5000);
  const consent = body.consent === true;

  if (!fullName || !email || !subject || !message) {
    return NextResponse.json(
      { success: false, error: "Merci de renseigner tous les champs obligatoires." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: "Adresse e-mail invalide." },
      { status: 400 }
    );
  }

  if (!ALLOWED_SUBJECTS.includes(subject)) {
    return NextResponse.json(
      { success: false, error: "Sujet invalide." },
      { status: 400 }
    );
  }

  if (!consent) {
    return NextResponse.json(
      {
        success: false,
        error: "Merci d’accepter l’utilisation de vos données pour continuer.",
      },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("contact_messages").insert({
    full_name: fullName,
    email,
    phone: phone || null,
    subject,
    order_number: orderNumber || null,
    message,
    consent,
  });

  if (error) {
    console.error("Erreur enregistrement message de contact:", error);

    return NextResponse.json(
      { success: false, error: "Une erreur est survenue, merci de réessayer." },
      { status: 500 }
    );
  }

  // TODO: envoyer un email à literie1@koalit.fr via Resend une fois le
  // domaine et la clé API configurés -- pour l'instant le message est
  // uniquement enregistré dans la table contact_messages.

  return NextResponse.json({ success: true });
}
