export default function MissionSection() {
  return (
    <section className="bg-[#103A63] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9C45A]">
            Notre mission
          </span>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              Offrir le meilleur sommeil possible.
            </h2>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">
                Conception française
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">
                Fabrication portugaise
              </span>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-white/80">
              Tout en réveillant les consciences sur la nature, le partage et
              le vivant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
