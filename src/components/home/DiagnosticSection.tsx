import Link from "next/link";

export default function DiagnosticSection() {
  return (
    <section
      id="diagnostic"
      className="mx-6 mb-24 rounded-[2.5rem] bg-[#DCCDBE] px-6 py-20 text-center"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#6E5641]">
        Diagnostic sommeil
      </p>

      <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
        Trouvez la literie qui correspond vraiment à votre sommeil.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6E5641]">
        Un accompagnement simple et humain pour comprendre vos besoins et vous
        orienter vers le meilleur choix.
      </p>

      <Link
        href="#contact"
        className="mt-10 inline-flex rounded-full bg-[#111111] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#6E5641]"
      >
        Commencer le diagnostic
      </Link>
    </section>
  );
}