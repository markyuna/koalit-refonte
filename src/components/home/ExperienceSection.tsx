export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 py-24 md:py-32"
    >
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#B89B72]">
          L’expérience Koalit
        </p>

        <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Bien dormir n’est pas un luxe. C’est une fondation.
        </h2>

        <p className="mt-6 text-lg leading-8 text-[#6E5641]">
          Koalit accompagne chaque client dans le choix d’une literie adaptée à
          son corps, à ses habitudes et à son rythme de vie.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {[
          {
            title: "Confort sur mesure",
            text: "Une sélection pensée pour offrir un soutien précis et une sensation de repos profond.",
          },
          {
            title: "Matières premium",
            text: "Des matériaux choisis pour leur durabilité, leur douceur et leur qualité de finition.",
          },
          {
            title: "Conseil expert",
            text: "Un accompagnement humain pour guider chaque client vers la meilleure solution.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-[2rem] border border-[#E8E5E0] bg-white/55 p-8 shadow-[0_20px_60px_rgba(17,17,17,0.06)]"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>

            <p className="mt-4 leading-7 text-[#6E5641]">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}