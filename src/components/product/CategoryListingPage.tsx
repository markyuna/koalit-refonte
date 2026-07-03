// src/components/product/CategoryListingPage.tsx

import Link from "next/link";

import type { CategoryConfig } from "@/lib/categories";
import ProductCard, { type ProductCardData } from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";

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

  const products = (data ?? []) as unknown as ProductCardData[];

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-32">
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
          <div className="mt-16 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`${config.routeBase}/${product.slug}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
