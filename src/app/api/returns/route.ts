// src/app/api/returns/route.ts

import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { getClientIp, checkRateLimit } from "@/lib/rate-limit";
import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  MAX_ATTACHMENT_SIZE_BYTES,
  RETURNS_ATTACHMENTS_BUCKET,
} from "@/lib/returns";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTROL_CHARS_REGEX = new RegExp("[\\u0000-\\u001f\\u007f]", "g");

function sanitize(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";

  return value.replace(CONTROL_CHARS_REGEX, "").trim().slice(0, maxLength);
}

/**
 * No orders table exists in this project yet, so a return request can
 * never be linked to an order. Kept as its own function so wiring up
 * real order lookup later only means changing this one place.
 */
async function tryLinkOrder(): Promise<{
  orderId: string | null;
  orderVerified: boolean;
}> {
  return { orderId: null, orderVerified: false };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = await checkRateLimit(ip, "returns-submit");

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives, merci de réessayer plus tard." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  // Honeypot: bots that fill hidden fields get a fake success with no
  // processing, so they don't learn their submission was rejected.
  if (typeof body.website_url === "string" && body.website_url.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const firstName = sanitize(body.first_name, 100);
  const lastName = sanitize(body.last_name, 100);
  const email = sanitize(body.email, 320);
  const address = sanitize(body.address, 300);
  const phone = sanitize(body.phone, 50);
  const requestId = sanitize(body.request_id, 100);
  const attachmentPath = sanitize(body.attachment_path, 500);
  const consent = body.consent === true;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !phone ||
    !requestId ||
    !attachmentPath
  ) {
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

  if (!consent) {
    return NextResponse.json(
      {
        success: false,
        error: "Merci d’accepter l’utilisation de vos données pour continuer.",
      },
      { status: 400 }
    );
  }

  // Re-verify the uploaded file actually exists in storage and matches
  // what the client claims -- never trust the client's own size/type.
  const folderPath = `returns/${requestId}`;
  const { data: folderContents, error: listError } = await supabase.storage
    .from(RETURNS_ATTACHMENTS_BUCKET)
    .list(folderPath);

  if (listError) {
    console.error("Erreur vérification fichier joint:", listError);

    return NextResponse.json(
      { success: false, error: "Une erreur est survenue, merci de réessayer." },
      { status: 500 }
    );
  }

  const fileName = attachmentPath.split("/").pop();
  const uploadedFile = folderContents?.find((file) => file.name === fileName);

  if (!uploadedFile) {
    return NextResponse.json(
      { success: false, error: "Le fichier joint est introuvable, merci de le renvoyer." },
      { status: 400 }
    );
  }

  const actualSize = uploadedFile.metadata?.size ?? 0;
  const actualMimeType = uploadedFile.metadata?.mimetype ?? "";

  if (actualSize === 0 || actualSize > MAX_ATTACHMENT_SIZE_BYTES) {
    return NextResponse.json(
      { success: false, error: "Le fichier dépasse la taille maximale (15 Mo)." },
      { status: 400 }
    );
  }

  if (!ALLOWED_ATTACHMENT_MIME_TYPES.includes(actualMimeType)) {
    return NextResponse.json(
      { success: false, error: "Format de fichier non accepté." },
      { status: 400 }
    );
  }

  const { orderId, orderVerified } = await tryLinkOrder();

  const { error: insertError } = await supabase.from("return_requests").insert({
    id: requestId,
    first_name: firstName,
    last_name: lastName,
    email,
    address,
    phone,
    order_id: orderId,
    order_verified: orderVerified,
    attachment_path: attachmentPath,
    attachment_mime_type: actualMimeType,
    attachment_size_bytes: actualSize,
    consent_given: consent,
  });

  if (insertError) {
    console.error("Erreur enregistrement demande de retour:", insertError);

    return NextResponse.json(
      { success: false, error: "Une erreur est survenue, merci de réessayer." },
      { status: 500 }
    );
  }

  // TODO: envoyer un email interne à literie1@koalit.fr (avec un lien
  // signé temporaire vers la pièce jointe via createSignedUrl) et un
  // email de confirmation au client, une fois Resend configuré -- pour
  // l'instant la demande est uniquement enregistrée dans
  // return_requests, consultable depuis le tableau Supabase.

  return NextResponse.json({ success: true });
}
