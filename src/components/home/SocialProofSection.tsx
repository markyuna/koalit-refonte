// src/components/home/SocialProofSection.tsx

import { Award, ShieldCheck, Sparkles, Star } from "lucide-react";

const reviews = [
  {
    name: "Claire M.",
    location: "Paris",
    text: "Un accompagnement très professionnel et une vraie différence sur la qualité du sommeil. On sent immédiatement le niveau de conseil.",
  },
  {
    name: "Antoine R.",
    location: "Boulogne",
    text: "L’expérience est rassurante du début à la fin. Le choix du matelas a été simple, clair et parfaitement adapté.",
  },
  {
    name: "Sophie L.",
    location: "Levallois",
    text: "Une literie de grande qualité, avec un confort digne d’un hôtel. Le service humain fait toute la différence.",
  },
];

const stats = [
  { value: "4.8/5", label: "Satisfaction client" },
  { value: "+15 ans", label: "Expertise sommeil" },
  { value: "100%", label: "Conseil personnalisé" },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Achat rassurant",
    text: "Un accompagnement clair avant chaque décision.",
  },
  {
    icon: Award,
    title: "Sélection premium",
    text: "Des produits choisis pour leur confort et leur durabilité.",
  },
  {
    icon: Sparkles,
    title: "Expérience haut de gamme",
    text: "Une approche pensée pour améliorer vos nuits durablement.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F5F0] px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,155,114,0.18),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(110,86,65,0.12),transparent_34%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCCDBE] bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#6E5641] shadow-[0_16px_50px_rgba(17,17,17,0.05)] backdrop-blur-xl">
              <Star className="h-3.5 w-3.5 fill-[#B89B72] text-[#B89B72]" />
              Preuve sociale
            </div>

            <h2 className="max-w-3xl text-4xl font-semibold leading-[1] tracking-[-0.04em] text-[#111111] md:text-6xl">
              Une expérience pensée pour inspirer confiance dès le premier
              contact.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#6E5641]">
              Koalit accompagne chaque client avec une approche humaine,
              experte et rassurante pour choisir une literie réellement adaptée
              à ses besoins.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-white/70 bg-white/65 p-6 shadow-[0_24px_70px_rgba(17,17,17,0.06)] backdrop-blur-xl"
              >
                <p className="text-3xl font-semibold tracking-tight text-[#111111]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6E5641]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="group rounded-[2.25rem] border border-white/70 bg-white/70 p-7 shadow-[0_28px_90px_rgba(17,17,17,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-[#B89B72] text-[#B89B72]"
                  />
                ))}
              </div>

              <p className="text-base leading-8 text-[#111111]">
                “{review.text}”
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-[#E8E5E0] pt-5">
                <div>
                  <p className="font-semibold text-[#111111]">{review.name}</p>
                  <p className="mt-1 text-sm text-[#9D8D7C]">
                    {review.location}
                  </p>
                </div>

                <div className="rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-white">
                  Avis client
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[2rem] border border-[#E8E5E0] bg-white/45 p-7 backdrop-blur-xl"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111111] text-white shadow-[0_18px_45px_rgba(17,17,17,0.16)]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold text-[#111111]">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-[#6E5641]">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}