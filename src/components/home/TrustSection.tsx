export default function TrustSection() {
  const items = [
    "Conseil personnalisé",
    "Essai possible",
    "Livraison accompagnée",
    "Produits sélectionnés",
  ];

  return (
    <section
      id="confiance"
      className="bg-[var(--koalit-blue-dark)] py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[var(--koalit-gold)]">
              Confiance
            </p>

            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Une expérience rassurante du premier conseil à la livraison.
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-white/70">
              Chaque étape est pensée pour offrir un accompagnement humain,
              transparent et professionnel afin de vous aider à trouver la
              literie parfaitement adaptée à vos besoins.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={item}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[var(--koalit-gold)]/40 hover:bg-white/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--koalit-gold)] text-sm font-bold text-[var(--koalit-blue-dark)]">
                  0{index + 1}
                </div>

                <p className="text-lg font-semibold text-white">{item}</p>

                <div className="mt-4 h-px w-12 bg-[var(--koalit-gold)] transition-all duration-300 group-hover:w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}