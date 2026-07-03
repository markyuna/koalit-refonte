import Image from "next/image";

export default function StorySection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D9C45A]">
          Notre histoire
        </span>

        <h2 className="mt-4 max-w-3xl text-4xl font-bold text-[#103A63] md:text-5xl">
          Bien plus qu&apos;une marque de literie.
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8 text-lg leading-relaxed text-slate-700">
            <p>
              Il y a des marques qui vendent des produits.
              <br />
              Et il y a des marques qui changent des vies.
            </p>

            <p className="font-semibold text-[#103A63]">
              Koa&apos;lit a choisi les deux.
            </p>

            <p>
              Tout a commencé avec une obsession simple : pourquoi
              se réveille-t-on fatigué dans un pays où l&apos;on travaille
              autant ?
            </p>

            <p>
              Un artisan du Val-d&apos;Oise, entouré de tisserands, de
              tapissiers, de passionnés du bien-être, a décidé de créer
              autre chose.
              <br />
              Pas un matelas de plus. Une promesse de vie.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(8,41,71,0.15)] lg:sticky lg:top-24">
            <Image
              src="/images/craftman.webp"
              alt="Un artisan façonnant un matelas Koa'lit à la main dans son atelier"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/koalit-magasin-video-poster.jpg"
              className="aspect-[9/16] w-full max-w-xs rounded-[2rem] bg-[#FCFBF8] object-cover shadow-[0_24px_70px_rgba(8,41,71,0.15)] lg:sticky lg:top-24"
            >
              <source src="/video/koalit-magasin.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="order-1 space-y-8 text-lg leading-relaxed text-slate-700 lg:order-2">
            <p>
              Il a choisi le koala — cet animal qui dort 22 heures par jour —
              non pas par hasard, mais parce que le koala ne dort pas par
              paresse.
              <br />
              Il dort parce qu&apos;il a compris quelque chose que
              l&apos;humain moderne a oublié :
            </p>

            <blockquote className="border-l-4 border-[#D9C45A] pl-6 text-2xl italic text-[#103A63]">
              Le repos est un acte de résistance.
              <br />
              Dormir profondément, c&apos;est vivre pleinement.
            </blockquote>

            <p>
              Et puis un jour, en regardant ses enfants chercher des fruits
              dans un supermarché sans jamais en avoir vu pousser un seul sur
              un arbre... une deuxième obsession est née.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] bg-[#103A63] px-8 py-12 text-center text-white md:px-16">
          <p className="text-2xl font-bold leading-snug md:text-3xl">
            Reconnecter.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/80">
            Les hommes à leur sommeil. Les enfants à la nature. Les villes à
            leurs vergers oubliés.
          </p>
        </div>

        <p className="mt-14 text-center text-xl font-bold text-[#103A63] md:text-2xl">
          Koa&apos;lit n&apos;est pas une marque de literie.
          <br />
          Koa&apos;lit est une marque de reconnexion.
        </p>
      </div>
    </section>
  );
}
