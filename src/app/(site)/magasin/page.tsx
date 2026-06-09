// src/app/(site)/magasin/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Magasin | Koa'lit",
  description:
    "Découvrez le magasin Koa'lit et profitez d'un conseil personnalisé pour choisir votre matelas, sommier ou solution de literie.",
};

const infos = [
  {
    icon: MapPin,
    title: "Adresse",
    text: "Adresse du magasin à compléter",
  },
  {
    icon: Phone,
    title: "Téléphone",
    text: "Numéro à compléter",
  },
  {
    icon: Clock,
    title: "Horaires",
    text: "Horaires d'ouverture à compléter",
  },
];

export default function MagasinPage() {
  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 py-28">
      <section className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
              Magasin Koa&apos;lit
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-6xl">
              Essayez votre literie avant de choisir
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
              Venez découvrir nos matelas, sommiers et solutions de literie dans
              un espace pensé pour vous accompagner avec des conseils simples,
              humains et personnalisés.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--koalit-gold)] px-7 py-4 text-sm font-bold text-[var(--koalit-blue-dark)] shadow-[0_18px_45px_rgba(217,196,90,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--koalit-gold-hover)]"
              >
                Réserver un essai
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/quiz-sommeil"
                className="inline-flex items-center justify-center rounded-full border border-[var(--koalit-blue)]/20 bg-white/70 px-7 py-4 text-sm font-bold text-[var(--koalit-blue)] transition hover:bg-white"
              >
                Faire le quiz sommeil
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(8,41,71,0.12)] backdrop-blur-xl">
            <div className="flex min-h-[380px] items-center justify-center rounded-[2rem] bg-[linear-gradient(135deg,rgba(16,58,99,0.12),rgba(217,196,90,0.2))] p-8 text-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--koalit-blue)]/60">
                  Espace conseil
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-[var(--koalit-blue)]">
                  Votre confort se choisit avec précision
                </h2>

                <p className="mt-4 text-neutral-700">
                  Ajoutez ici une photo du magasin, de l’espace literie ou d’un
                  conseiller Koa&apos;lit.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {infos.map((info) => {
            const Icon = info.icon;

            return (
              <article
                key={info.title}
                className="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--koalit-blue-soft)] text-[var(--koalit-blue)]">
                  <Icon size={22} />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-[var(--koalit-blue)]">
                  {info.title}
                </h2>

                <p className="mt-3 leading-7 text-neutral-700">{info.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}