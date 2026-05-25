export default function TrustSection() {
  return (
    <section
      id="confiance"
      className="mx-auto max-w-7xl px-6 py-24 md:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#B89B72]">
            Confiance
          </p>

          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Une expérience rassurante du premier conseil à la livraison.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            "Conseil personnalisé",
            "Essai possible",
            "Livraison accompagnée",
            "Produits sélectionnés",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[2rem] border border-[#E8E5E0] bg-white/60 p-7"
            >
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}