import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,155,114,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(110,86,65,0.18),transparent_35%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-32 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#B89B72]">
            Maison française du sommeil
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-[#111111] md:text-7xl lg:text-8xl">
            Le sommeil devient une expérience premium.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#6E5641]">
            Découvrez une literie haut de gamme pensée pour transformer vos
            nuits en véritables moments de récupération, de confort et de
            sérénité.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#collections"
              className="rounded-full bg-[#111111] px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_20px_60px_rgba(17,17,17,0.18)] transition hover:-translate-y-0.5 hover:bg-[#6E5641]"
            >
              Découvrir la collection
            </Link>

            <Link
              href="#diagnostic"
              className="rounded-full border border-[#DCCDBE] bg-white/50 px-7 py-4 text-center text-sm font-semibold text-[#111111] backdrop-blur transition hover:bg-white"
            >
              Diagnostic sommeil gratuit
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#DCCDBE] shadow-[0_40px_100px_rgba(17,17,17,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1400&auto=format&fit=crop"
              alt="Chambre premium"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-8 left-6 right-6 rounded-3xl border border-white/60 bg-white/75 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-sm font-medium text-[#111111]">
              Confort hôtelier, matériaux nobles et accompagnement personnalisé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}