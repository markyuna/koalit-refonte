import Link from "next/link";

export default function DiagnosticSection() {
  return (
    <section
      id="diagnostic"
      className="mx-6 mb-24 overflow-hidden rounded-[2.75rem] bg-[var(--koalit-blue)] px-6 py-20 text-center text-white shadow-[0_40px_120px_rgba(8,41,71,0.25)]"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 inline-flex items-center rounded-full border border-[var(--koalit-gold)]/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-[var(--koalit-gold)] backdrop-blur">
          Diagnostic sommeil
        </div>

        <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          Trouvez la literie qui correspond vraiment à votre sommeil.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
          Un accompagnement simple, humain et personnalisé pour comprendre vos
          besoins et vous orienter vers la solution idéale.
        </p>

        <Link
          href="#contact"
          className="mt-10 inline-flex rounded-full bg-[var(--koalit-gold)] px-8 py-4 text-sm font-bold text-[var(--koalit-blue-dark)] shadow-[0_24px_70px_rgba(217,196,90,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--koalit-gold-hover)]"
        >
          Commencer le diagnostic
        </Link>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/65">
          <span>✓ Gratuit</span>
          <span>✓ Sans engagement</span>
          <span>✓ Conseil personnalisé</span>
        </div>
      </div>
    </section>
  );
}