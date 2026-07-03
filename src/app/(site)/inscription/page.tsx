// src/app/(site)/inscription/page.tsx

import type { Metadata } from "next";

import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Créer un compte | Koa'lit",
  description: "Créez votre compte Koa'lit.",
  robots: { index: false, follow: false },
};

export default function InscriptionPage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-[440px]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
          Mon compte
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)]">
          Créer un compte
        </h1>

        <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
          <SignUpForm />
        </div>
      </section>
    </main>
  );
}
