// src/components/product/CategoryListingPage.tsx

import Image from "next/image";
import Link from "next/link";

import type { CategoryConfig } from "@/lib/categories";
import {
  formatPrice,
  getCoverImage,
  getDisplayPricing,
  type ProductImage,
  type ProductVariant,
} from "@/lib/product-helpers";
import { supabase } from "@/lib/supabase";

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

type Props = {
  config: CategoryConfig;
};

export default async function CategoryListingPage({ config }: Props) {
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
    .eq("categories.slug", config.slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Erreur chargement ${config.slug}:`, error);
  }

  const products = (data ?? []) as unknown as Product[];

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-medium text-[#103a63]">
            Collection {config.name}
          </span>

          <h1 className="mt-6 text-5xl font-bold text-[#103a63] md:text-6xl">
            {config.heroTitle}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {config.heroDescription}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="mt-16 rounded-[2rem] bg-white p-10 shadow-sm">
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-semibold text-[#103a63]">
                {config.emptyStateTitle}
              </h2>

              <p className="mt-4 max-w-xl text-slate-500">
                {config.emptyStateText}
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full bg-[#103a63] px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Nous contacter
              </Link>
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

              const href = `${config.routeBase}/${product.slug}`;

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link
                    href={href}
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
                    <Link href={href}>
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
                      href={href}
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
