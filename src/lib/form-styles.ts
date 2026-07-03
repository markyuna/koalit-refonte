// src/lib/form-styles.ts
//
// Shared Tailwind classes for the auth forms (connexion, inscription,
// mot-de-passe-oublie, reinitialiser-mot-de-passe), matching the same
// input/label look already established in ContactForm/ReturnsForm.

export const authInputClass =
  "w-full rounded-2xl border border-[var(--koalit-border)] bg-white px-4 py-3 text-[var(--koalit-text)] outline-none transition focus:border-[var(--koalit-gold)]";

export const authLabelClass =
  "mb-2 block text-sm font-semibold text-[var(--koalit-blue)]";
