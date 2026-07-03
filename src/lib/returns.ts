// src/lib/returns.ts

export const RETURNS_ATTACHMENTS_BUCKET = "returns-attachments";
export const MAX_ATTACHMENT_SIZE_BYTES = 15 * 1024 * 1024;

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
];

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");

export function sanitizeFilename(name: string) {
  const lastDot = name.lastIndexOf(".");
  const base = lastDot === -1 ? name : name.slice(0, lastDot);
  const extension = lastDot === -1 ? "" : name.slice(lastDot + 1);

  const cleanBase = base
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  const cleanExtension = extension.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);

  return cleanExtension ? `${cleanBase || "fichier"}.${cleanExtension}` : cleanBase || "fichier";
}
