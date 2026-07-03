// src/app/(site)/matelas/page.tsx

import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase";

type ProductImage = {
  image_url: string;
  alt: string | null;
  is_cover: boolean | null;
};

type ProductVariant = {
  price: number;
  compare_at_price: number | null;
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
  product_variants: ProductVariant[] | null;
};

function formatPrice(price: number | null) {
  if (price === null) return null;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function getCoverImage(images: ProductImage[] | null) {
  if (!images || images.length === 0) return null;

  return images.find((image) => image.is_cover) ?? images[0];
}

function getDisplayPricing(product: Product) {
  const variants = product.product_variants ?? [];

  if (variants.length === 0) {
    return {
      price: product.price,
      compareAtPrice: product.compare_at_price,
      fromVariants: false,
    };
  }

  const cheapest = variants.reduce((lowest, variant) =>
    variant.price < lowest.price ? variant : lowest
  );

  return {
    price: cheapest.price,
    compareAtPrice: cheapest.compare_at_price,
    fromVariants: true,
  };
}

export default async function MatelasPage() {
  const { data, error } = await supabase
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
      categories!inner (
        slug
      ),
      product_images (
        image_url,
        alt,
        is_cover
      ),
      product_variants (
        price,
        compare_at_price
      )
    `
    )
    .eq("is_active", true)
    .eq("categories.slug", "matelas")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement matelas:", error);
  }

  const products = (data ?? []) as unknown as Product[];

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-medium text-[#103a63]">
            Collection Matelas
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[#103a63] md:text-6xl">
            Nos matelas
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Découvrez notre sélection de matelas conçus pour offrir un
            équilibre parfait entre confort, soutien et durabilité. Chaque
            modèle est pensé pour améliorer la qualité de votre sommeil.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 rounded-[2rem] bg-white p-10 shadow-sm">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-semibold text-[#103a63]">
                Catalogue en préparation
              </h2>

              <p className="mt-4 max-w-xl text-slate-500">
                Les produits seront affichés ici automatiquement depuis
                Supabase. Vous pourrez bientôt consulter les fiches détaillées
                de chaque matelas.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const coverImage = getCoverImage(product.product_images);
              const pricing = getDisplayPricing(product);
              const price = formatPrice(pricing.price);
              const compareAtPrice = formatPrice(pricing.compareAtPrice);

              const hasPromotion =
                pricing.compareAtPrice !== null &&
                pricing.price !== null &&
                pricing.compareAtPrice > pricing.price;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    href={`/matelas/${product.slug}`}
                    className="block"
                    aria-label={`Découvrir ${product.name}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#efe8db]">
                      {coverImage ? (
                        <Image
                          src={coverImage.image_url}
                          alt={coverImage.alt ?? product.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-8 text-center text-slate-400">
                          Image en préparation
                        </div>
                      )}

                      {hasPromotion && (
                        <span className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white">
                          Promo
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-7">
                    <Link href={`/matelas/${product.slug}`}>
                      <h2 className="text-2xl font-bold text-[#103a63] transition hover:text-[#d9c45a]">
                        {product.name}
                      </h2>
                    </Link>

                    {product.short_description && (
                      <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                        {product.short_description}
                      </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-end gap-3">
                      {price && (
                        <p className="text-3xl font-bold text-[#103a63]">
                          {pricing.fromVariants ? `Dès ${price}` : price}
                        </p>
                      )}

                      {compareAtPrice && hasPromotion && (
                        <p className="pb-1 text-lg text-slate-400 line-through">
                          {compareAtPrice}
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/matelas/${product.slug}`}
                      className="mt-7 inline-flex rounded-full bg-[#103a63] px-6 py-3 font-semibold text-white transition hover:bg-[#0b2c4c]"
                    >
                      Découvrir
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}