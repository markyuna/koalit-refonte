export default function ExperienceSection() {
  const items = [
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
  ];

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[var(--koalit-cream)] py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,196,90,0.10),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[var(--koalit-gold)]">
            L’expérience Koa&apos;lit
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-[var(--koalit-blue-dark)] md:text-6xl">
            Bien dormir n’est pas un luxe.
            <br />
            C’est une fondation.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[var(--koalit-text)]">
            Koa&apos;lit accompagne chaque client dans le choix d’une literie adaptée
            à son corps, à ses habitudes et à son rythme de vie.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[2rem] border border-[var(--koalit-blue)]/10 bg-white p-8 shadow-[0_20px_60px_rgba(8,41,71,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(8,41,71,0.14)]"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--koalit-gold)] to-[var(--koalit-blue)]" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--koalit-blue-soft)] text-lg font-bold text-[var(--koalit-blue)]">
                0{index + 1}
              </div>

              <h3 className="text-xl font-semibold text-[var(--koalit-blue-dark)]">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-[var(--koalit-text)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}