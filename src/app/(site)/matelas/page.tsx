// src/app/(site)/matelas/page.tsx

import type { Metadata } from "next";

import ProductCard, {
  type ProductCardData,
} from "@/components/product/ProductCard";
import { supabase } from "@/lib/supabase";

// Always fetch fresh product data -- without this, Next.js statically
// generates this page at build time and admin changes (new products,
// price updates, etc.) would never appear until the next deploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Matelas | Koa'lit",
  description:
    "Découvrez notre sélection de matelas Koa'lit : Cassiopée, Stella, Lyre, Librea. Un équilibre entre confort, soutien et durabilité pour un sommeil réparateur.",
  alternates: {
    canonical: "/matelas",
  },
};

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
      brand_color,
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

  const products = (data ?? []) as unknown as (ProductCardData & {
    brand_color: string | null;
  })[];

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-32">
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
          <div className="mt-16 grid items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                href={`/matelas/${product.slug}`}
                brandColor={product.brand_color}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
