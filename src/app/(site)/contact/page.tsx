// src/app/(site)/contact/page.tsx

import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Koa'lit",
  description:
    "Contactez KOALIT pour toute question sur nos matelas, votre commande ou une demande de garantie.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 pb-24 pt-32">
      <section className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
            Contact
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-6xl">
            Parlons de votre sommeil
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Une question sur un produit, une commande en cours ou une
            garantie ? Notre équipe vous répond rapidement.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[var(--koalit-blue)]">
              Envoyez-nous un message
            </h2>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="h-fit rounded-[2rem] bg-[var(--koalit-blue)] p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Nos coordonnées</h2>

            <div className="mt-6 space-y-4 text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <p>3 Chemin du Poirier Charles Guérin, 95520 Osny – France</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a
                  href="mailto:literie1@koalit.fr"
                  className="underline underline-offset-2 hover:text-white"
                >
                  literie1@koalit.fr
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
