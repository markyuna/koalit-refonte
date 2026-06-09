const values = [
  {
    title: "Nature",
    text: "Des matériaux sélectionnés avec soin pour respecter votre confort et l’environnement.",
  },
  {
    title: "Accompagnement",
    text: "Chaque client bénéficie de conseils personnalisés pour trouver la literie adaptée à ses besoins.",
  },
  {
    title: "Qualité",
    text: "Des produits pensés pour offrir un confort durable et un soutien optimal nuit après nuit.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9C45A]">
          Nos valeurs
        </span>

        <h2 className="mt-4 max-w-3xl text-4xl font-bold text-[#103A63]">
          Une literie choisie avec exigence, pour mieux dormir chaque nuit.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[2rem] border border-slate-100 bg-[#FCFBF8] p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-[#103A63]">
                {value.title}
              </h3>

              <p className="mt-4 leading-relaxed text-slate-600">
                {value.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}