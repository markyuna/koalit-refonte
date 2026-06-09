// src/app/(site)/contact/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Koa'lit",
  description:
    "Contactez Koa'lit pour obtenir un conseil personnalisé sur votre literie, votre matelas ou votre projet d'amélioration du sommeil.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 py-24">
      <section className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
            Contact
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-6xl">
            Parlons de votre sommeil
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Vous souhaitez choisir un matelas, améliorer votre confort ou
            bénéficier d’un conseil personnalisé ? L’équipe Koa’lit vous
            accompagne avec une approche simple, humaine et adaptée à vos
            besoins.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <article className="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[var(--koalit-blue)]">
              Nous contacter
            </h2>

            <div className="mt-6 space-y-4 text-neutral-700">
              <p>
                <span className="font-medium text-neutral-950">Email :</span>{" "}
                contact@koalit.fr
              </p>

              <p>
                <span className="font-medium text-neutral-950">Téléphone :</span>{" "}
                À compléter
              </p>

              <p>
                <span className="font-medium text-neutral-950">Adresse :</span>{" "}
                À compléter
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] bg-[var(--koalit-blue)] p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">
              Conseil personnalisé
            </h2>

            <p className="mt-5 leading-7 text-white/80">
              Chaque personne dort différemment. Nous vous aidons à identifier
              le matelas, le sommier ou la solution de literie la plus adaptée à
              votre morphologie, vos habitudes et vos attentes de confort.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}