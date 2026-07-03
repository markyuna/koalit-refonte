// src/app/(site)/mot-de-passe-oublie/page.tsx

import type { Metadata } from "next";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Mot de passe oublié | Koa'lit",
  description: "Réinitialisez le mot de passe de votre compte Koa'lit.",
  robots: { index: false, follow: false },
};

export default function MotDePasseOubliePage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-[440px]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
          Mon compte
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)]">
          Mot de passe oublié
        </h1>

        <p className="mt-4 leading-7 text-neutral-700">
          Indiquez votre adresse e-mail, nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>

        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
