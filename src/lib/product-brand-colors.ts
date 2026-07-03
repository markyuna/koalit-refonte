// src/lib/product-brand-colors.ts
//
// Per-product accent colors for the 4 flagship matelas (Cassiopée,
// Stella, Lyre, Librea). These are NOT extracted from koalit.fr --
// the old site's live pages (detail + listing) were checked and don't
// show any product-specific color band, so these were chosen to match
// the requested palette (morado/mostaza/verde olive/azul) while fitting
// the site's existing navy/gold/cream identity. If a real reference
// image turns up later, swap the hex values here.

export const PRODUCT_ACCENT_COLORS: Record<string, string> = {
  "matelas-cassiopee": "#6B5271", // morado
  "matelas-stella": "#B8863C", // mostaza
  "matelas-lyre": "#6E7B4E", // vert olive
  "matelas-librea": "#4C6B8A", // azul
};

export const DEFAULT_PRODUCT_ACCENT_COLOR = "#103a63";

export function getProductAccentColor(slug: string) {
  return PRODUCT_ACCENT_COLORS[slug] ?? DEFAULT_PRODUCT_ACCENT_COLOR;
}
