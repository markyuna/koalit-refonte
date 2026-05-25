import Link from "next/link";

export default function CollectionsSection() {
  return (
    <section
      id="collections"
      className="bg-[#111111] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#B89B72]">
              Collections
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Une literie pensée pour chaque façon de dormir.
            </h2>
          </div>

          <Link
            href="#contact"
            className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#111111] transition hover:bg-[#DCCDBE]"
          >
            Être conseillé
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            "Matelas premium",
            "Sommiers élégants",
            "Accessoires sommeil",
          ].map((title) => (
            <div
              key={title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8"
            >
              <div className="mb-8 aspect-[4/3] rounded-[1.5rem] bg-white/10" />

              <h3 className="text-2xl font-semibold">{title}</h3>

              <p className="mt-4 leading-7 text-white/65">
                Une sélection haut de gamme pour améliorer le confort et la
                qualité de vos nuits.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}