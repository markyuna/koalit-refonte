import Link from "next/link";

export default function AboutCta() {
  return (
    <section className="bg-[#FCFBF8] px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[#103A63] px-8 py-16 text-center text-white">
        <h2 className="text-4xl font-bold md:text-5xl">
          Prêt à transformer vos nuits ?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
          Découvrez notre sélection de matelas, sommiers et solutions de sommeil
          adaptées à votre confort.
        </p>

        <Link
          href="/matelas"
          className="mt-8 inline-flex rounded-full bg-[#D9C45A] px-8 py-4 text-sm font-bold text-[#082947] transition hover:bg-[#E6D36F]"
        >
          Découvrir nos produits
        </Link>
      </div>
    </section>
  );
}