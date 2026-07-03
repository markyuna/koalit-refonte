import Link from "next/link";

const collections = [
  {
    title: "Matelas premium",
    description:
      "Des matelas haut de gamme pensés pour soutenir le corps, améliorer la récupération et offrir un confort durable.",
  },
  {
    title: "Confort sur-mesure",
    description:
      "Ferme, équilibré ou moelleux : une gamme de matelas pensée pour s'adapter à chaque morphologie et chaque habitude de sommeil.",
  },
  {
    title: "Accessoires sommeil",
    description:
      "Oreillers, protections et accessoires sélectionnés pour créer une expérience de sommeil complète.",
  },
];

export default function CollectionsSection() {
  return (
    <section
      id="collections"
      className="bg-[var(--koalit-blue-dark)] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[var(--koalit-gold)]">
              Collections
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Une literie pensée pour chaque façon de dormir.
            </h2>
          </div>

          <Link
            href="#contact"
            className="rounded-full bg-[var(--koalit-gold)] px-7 py-4 text-sm font-bold text-[var(--koalit-blue-dark)] shadow-[0_18px_55px_rgba(217,196,90,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--koalit-gold-hover)]"
          >
            Être conseillé
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <div
              key={collection.title}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--koalit-gold)]/50 hover:bg-white/[0.09]"
            >
              <div className="mb-8 flex aspect-[4/3] items-center justify-center rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(217,196,90,0.20),rgba(255,255,255,0.08),rgba(16,58,99,0.45))]">
                <div className="h-16 w-16 rounded-full border border-[var(--koalit-gold)]/40 bg-[var(--koalit-gold)]/20 shadow-[0_0_50px_rgba(217,196,90,0.25)] transition duration-300 group-hover:scale-110" />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {collection.title}
              </h3>

              <p className="mt-4 leading-7 text-white/65">
                {collection.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}