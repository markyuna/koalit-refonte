// src/app/(site)/reinitialiser-mot-de-passe/page.tsx

import type { Metadata } from "next";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe | Koa'lit",
  description: "Choisissez un nouveau mot de passe pour votre compte Koa'lit.",
  robots: { index: false, follow: false },
};

export default function ReinitialiserMotDePassePage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-[440px]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
          Mon compte
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)]">
          Réinitialiser le mot de passe
        </h1>

        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
          <ResetPasswordForm />
        </div>
      </section>
    </main>
  );
}
