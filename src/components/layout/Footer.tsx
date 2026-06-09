import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--koalit-blue)]/10 bg-[var(--koalit-blue-dark)] px-6 py-12 text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-2xl font-black tracking-tight text-[var(--koalit-gold)]">
            Koa&apos;lit
          </p>

          <p className="mt-3 max-w-md text-sm leading-7 text-white/75">
            Maison française du sommeil premium pensée pour améliorer votre
            confort et votre qualité de vie.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link
            href="mailto:contact@koalit.fr"
            className="rounded-full bg-[var(--koalit-gold)] px-6 py-3 text-sm font-bold text-[var(--koalit-blue-dark)] transition hover:bg-[var(--koalit-gold-hover)]"
          >
            contact@koalit.fr
          </Link>

          <p className="text-xs tracking-wide text-white/50">
            © 2026 Koa&apos;lit. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}