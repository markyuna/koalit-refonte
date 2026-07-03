export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#103A63] py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80">
          À propos de Koa&apos;lit
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-white md:text-7xl">
          Dormir mieux.
          <br />
          Vivre mieux.
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
          Depuis le Val-d&apos;Oise, Koa&apos;lit accompagne les familles vers
          un sommeil plus sain, plus confortable et plus réparateur.
        </p>
      </div>
    </section>
  );
}