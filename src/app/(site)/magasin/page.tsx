// src/app/(site)/magasin/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  CalendarCheck,
  Clock,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Magasin de literie à Osny | Koa'lit",
  description:
    "Découvrez le magasin Koa'lit Literie à Osny. Conseils personnalisés, matelas, sommiers et solutions de literie adaptées à chaque profil.",
};

const storeInfos = [
  {
    icon: MapPin,
    title: "Adresse",
    text: "3 chemin du Poirier Charles Guérin, 95520 Osny",
  },
  {
    icon: Phone,
    title: "Téléphone",
    text: "01 34 41 22 73",
  },
  {
    icon: Clock,
    title: "Horaires",
    text: "Ouvert 7j/7, du lundi au samedi de 10h à 19h et le dimanche de 10h à 18h.",
  },
];

const openingHours = [
  { day: "Lundi", hours: "10h à 19h" },
  { day: "Mardi", hours: "10h à 19h" },
  { day: "Mercredi", hours: "10h à 19h" },
  { day: "Jeudi", hours: "10h à 19h" },
  { day: "Vendredi", hours: "10h à 19h" },
  { day: "Samedi", hours: "10h à 19h" },
  { day: "Dimanche", hours: "10h à 18h" },
];

const profiles = [
  {
    icon: UsersRound,
    title: "Futurs parents & jeunes couples",
    text: "Un soutien morphologique pour des nuits parfois courtes, mais vraiment réparatrices.",
  },
  {
    icon: ShieldCheck,
    title: "Séniors 60+",
    text: "Des technologies pensées pour soulager les articulations et faciliter le lever.",
  },
  {
    icon: Baby,
    title: "Femmes enceintes",
    text: "Une ergonomie spécifique pour apaiser les tensions et retrouver un sommeil plus serein.",
  },
  {
    icon: UserRound,
    title: "Jeunes actifs & célibataires",
    text: "Le confort absolu allié au design pour mieux récupérer et booster vos journées.",
  },
];

export default function MagasinPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--koalit-cream)]">
      <section className="relative px-6 pb-16 pt-28 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,196,90,0.24),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(16,58,99,0.14),transparent_34%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--koalit-gold)]/40 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[var(--koalit-blue)] shadow-sm backdrop-blur">
                <Sparkles size={15} className="text-[var(--koalit-gold)]" />
                Magasin Koa&apos;lit Osny
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-5xl xl:text-6xl">
                Essayez votre literie avant de choisir
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
                Chez Koa&apos;lit, votre matelas ne devrait pas être un
                standard, mais le prolongement de votre santé. Venez découvrir
                nos matelas, sommiers et solutions de literie dans un espace
                pensé pour vous accompagner avec des conseils simples, humains
                et personnalisés.
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
                  className="inline-flex items-center justify-center rounded-full border border-[var(--koalit-blue)]/20 bg-white/75 px-7 py-4 text-sm font-bold text-[var(--koalit-blue)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Faire le quiz sommeil
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[var(--koalit-blue)]">
                <span className="rounded-full bg-white/75 px-4 py-2 shadow-sm">
                  Conseil personnalisé
                </span>
                <span className="rounded-full bg-white/75 px-4 py-2 shadow-sm">
                  Essai en magasin
                </span>
                <span className="rounded-full bg-white/75 px-4 py-2 shadow-sm">
                  Ouvert 7j/7
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-5 -top-5 hidden h-32 w-32 rounded-full bg-[var(--koalit-gold)]/30 blur-2xl lg:block" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-3 shadow-[0_24px_90px_rgba(8,41,71,0.16)] backdrop-blur-xl">
                <div className="relative aspect-[17/9] overflow-hidden rounded-[2rem]">
                  <Image
                    src="/images/koalit-magasin-store.webp"
                    alt="Façade du magasin Koa'lit Literie à Osny"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--koalit-blue-dark)]/20 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/45 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--koalit-blue)] shadow-sm backdrop-blur-md sm:left-5 sm:top-5">
                    Koa&apos;lit Literie Osny
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {storeInfos.map((info) => {
              const Icon = info.icon;

              return (
                <article
                  key={info.title}
                  className="rounded-[1.8rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(8,41,71,0.08)] backdrop-blur"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--koalit-blue-soft)] text-[var(--koalit-blue)]">
                    <Icon size={21} />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold text-[var(--koalit-blue)]">
                    {info.title}
                  </h2>

                  <p className="mt-3 leading-7 text-neutral-700">{info.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-[0_20px_70px_rgba(8,41,71,0.08)] backdrop-blur">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--koalit-gold)]/25 text-[var(--koalit-blue)]">
              <HeartPulse size={26} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.28em] text-[var(--koalit-gold)]">
              À propos du magasin
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-4xl">
              Une literie pensée pour votre récupération
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-neutral-700">
              <p>
                Parce que chaque profil est unique, nous ne vendons pas
                simplement de la literie, nous concevons votre récupération.
              </p>

              <p>
                Notre rôle est de vous aider à choisir une solution réellement
                adaptée à votre morphologie, à vos habitudes de sommeil et à vos
                besoins de confort au quotidien.
              </p>
            </div>

            <div className="mt-8 rounded-[1.8rem] bg-[var(--koalit-blue)] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--koalit-gold)]">
                Conseil en magasin
              </p>

              <p className="mt-3 text-lg font-medium leading-7">
                Prenez le temps d’essayer, de comparer et de poser vos
                questions avant de choisir votre literie.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {profiles.map((profile) => {
              const Icon = profile.icon;

              return (
                <article
                  key={profile.title}
                  className="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(8,41,71,0.1)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--koalit-blue-soft)] text-[var(--koalit-blue)]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-[var(--koalit-blue)]">
                    {profile.title}
                  </h3>

                  <p className="mt-3 leading-7 text-neutral-700">
                    {profile.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/85 shadow-[0_24px_90px_rgba(8,41,71,0.1)] backdrop-blur lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[var(--koalit-blue)] p-8 text-white md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[var(--koalit-gold)]">
              <CalendarCheck size={26} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.28em] text-[var(--koalit-gold)]">
              Horaires d&apos;ouverture
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Koa&apos;lit Literie Osny vous accueille 7j/7
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-white/78">
              Passez en magasin pour découvrir les modèles, comparer les
              conforts et bénéficier d’un accompagnement personnalisé.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--koalit-gold)] px-7 py-4 text-sm font-bold text-[var(--koalit-blue-dark)] transition hover:-translate-y-0.5 hover:bg-[var(--koalit-gold-hover)]"
              >
                Réserver un essai
                <ArrowRight size={18} />
              </Link>

              <a
                href="tel:+33134412273"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                Appeler
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="space-y-3">
              {openingHours.map((item) => (
                <div
                  key={item.day}
                  className="flex items-center justify-between rounded-2xl border border-[var(--koalit-blue)]/10 bg-[var(--koalit-cream)]/70 px-5 py-4"
                >
                  <span className="font-semibold text-[var(--koalit-blue)]">
                    {item.day}
                  </span>

                  <span className="text-sm font-bold text-neutral-700">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.8rem] border border-[var(--koalit-gold)]/35 bg-[var(--koalit-gold)]/15 p-5">
              <p className="text-sm font-semibold text-[var(--koalit-blue)]">
                Adresse
              </p>

              <p className="mt-2 leading-7 text-neutral-700">
                3 chemin du Poirier Charles Guérin, 95520 Osny
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}