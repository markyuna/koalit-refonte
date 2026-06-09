// src/app/(site)/sommiers/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

type ProductImage = {
  image_url: string;
  alt: string | null;
  is_cover: boolean | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  price: number | null;
  compare_at_price: number | null;
  is_active: boolean | null;
  product_images: ProductImage[] | null;
};

export const metadata: Metadata = {
  title: "Sommiers | Koa'lit",
  description:
    "Découvrez notre sélection de sommiers Koa'lit pour compléter votre literie et améliorer durablement votre confort de sommeil.",
};

function formatPrice(price: number | null) {
  if (!price) return null;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function getCoverImage(images: ProductImage[] | null) {
  if (!images || images.length === 0) return null;

  return images.find((image) => image.is_cover) ?? images[0];
}

export default async function SommiersPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      short_description,
      price,
      compare_at_price,
      is_active,
      product_images (
        image_url,
        alt,
        is_cover
      )
    `
    )
    .eq("is_active", true)
    .eq("category", "sommiers")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement sommiers:", error);
  }

  return (
    <main className="min-h-screen bg-[var(--koalit-cream)] px-6 py-28">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--koalit-gold)]">
            Sommiers
          </p>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--koalit-blue)] md:text-6xl">
            La base idéale pour un sommeil plus stable
          </h1>

          <p className="mt-6 text-lg leading-8 text-neutral-700">
            Un bon sommier améliore le maintien, prolonge la durée de vie de
            votre matelas et participe directement à votre confort nuit après
            nuit.
          </p>
        </div>

        {products && products.length > 0 ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const coverImage = getCoverImage(product.product_images);
              const price = formatPrice(product.price);
              const compareAtPrice = formatPrice(product.compare_at_price);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(8,41,71,0.12)]"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      {coverImage ? (
                        <Image
                          src={coverImage.image_url}
                          alt={coverImage.alt ?? product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[var(--koalit-blue-soft)] text-sm font-semibold text-[var(--koalit-blue)]">
                          Image bientôt disponible
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-[var(--koalit-blue)]">
                        {product.name}
                      </h2>

                      {product.short_description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600">
                          {product.short_description}
                        </p>
                      )}

                      <div className="mt-5 flex items-end gap-3">
                        {price && (
                          <p className="text-lg font-bold text-[var(--koalit-blue)]">
                            {price}
                          </p>
                        )}

                        {compareAtPrice && (
                          <p className="text-sm text-neutral-400 line-through">
                            {compareAtPrice}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-14 rounded-[2rem] border border-white/70 bg-white/80 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-[var(--koalit-blue)]">
              Les sommiers arrivent bientôt
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-neutral-700">
              Nous préparons une sélection de sommiers adaptés à différents
              besoins de confort. En attendant, vous pouvez nous contacter pour
              recevoir un conseil personnalisé.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-full bg-[var(--koalit-gold)] px-7 py-4 text-sm font-bold text-[var(--koalit-blue-dark)] transition hover:bg-[var(--koalit-gold-hover)]"
            >
              Demander conseil
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}