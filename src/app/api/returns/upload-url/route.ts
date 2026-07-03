// src/app/api/returns/upload-url/route.ts

import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { getClientIp, checkRateLimit } from "@/lib/rate-limit";
import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  MAX_ATTACHMENT_SIZE_BYTES,
  RETURNS_ATTACHMENTS_BUCKET,
  sanitizeFilename,
} from "@/lib/returns";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = await checkRateLimit(ip, "returns-upload-url");

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives, merci de réessayer plus tard." },
      { status: 429 }
    );
  }

  let body: { fileName?: unknown; mimeType?: unknown; sizeBytes?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const fileName = typeof body.fileName === "string" ? body.fileName : "";
  const mimeType = typeof body.mimeType === "string" ? body.mimeType : "";
  const sizeBytes = typeof body.sizeBytes === "number" ? body.sizeBytes : 0;

  if (!fileName || !mimeType || !sizeBytes) {
    return NextResponse.json(
      { success: false, error: "Fichier invalide." },
      { status: 400 }
    );
  }

  if (!ALLOWED_ATTACHMENT_MIME_TYPES.includes(mimeType)) {
    return NextResponse.json(
      { success: false, error: "Format de fichier non accepté." },
      { status: 400 }
    );
  }

  if (sizeBytes > MAX_ATTACHMENT_SIZE_BYTES) {
    return NextResponse.json(
      { success: false, error: "Le fichier dépasse la taille maximale (15 Mo)." },
      { status: 400 }
    );
  }

  const requestId = randomUUID();
  const path = `returns/${requestId}/${sanitizeFilename(fileName)}`;

  const { data, error } = await supabase.storage
    .from(RETURNS_ATTACHMENTS_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("Erreur génération signed upload URL:", error);

    return NextResponse.json(
      { success: false, error: "Une erreur est survenue, merci de réessayer." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    requestId,
    path: data.path,
    token: data.token,
  });
}
