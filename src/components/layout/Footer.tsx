import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[#E8E5E0] bg-[#F8F5F0] px-6 py-12"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-2xl font-semibold text-[#111111]">Koalit</p>

          <p className="mt-3 max-w-md text-sm leading-7 text-[#6E5641]">
            Maison française du sommeil premium pensée pour améliorer votre
            confort et votre qualité de vie.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link
            href="mailto:contact@koalit.fr"
            className="rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6E5641]"
          >
            contact@koalit.fr
          </Link>

          <p className="text-xs tracking-wide text-[#9D8D7C]">
            © 2026 Koalit. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}