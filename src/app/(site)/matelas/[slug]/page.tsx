// src/app/(site)/matelas/[slug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  CreditCard,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import { supabase } from "@/lib/supabase";
import {
  buildProductJsonLd,
  buildProductMetadata,
  getProductForSeo,
} from "@/lib/product-seo";

type ProductImage = {
  image_url: string;
  alt: string | null;
  is_cover: boolean | null;
  position: number | null;
};

type ProductVariant = {
  id: string;
  dimension: string;
  price: number;
  compare_at_price: number | null;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number | null;
  compare_at_price: number | null;
  is_active: boolean | null;
  product_images: ProductImage[] | null;
  product_variants: ProductVariant[] | null;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function getGalleryImages(images: ProductImage[] | null) {
  if (!images || images.length === 0) return [];

  return [...images].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0)
  );
}

function getCoverIndex(images: ProductImage[]) {
  const index = images.findIndex((image) => image.is_cover);
  return index === -1 ? 0 : index;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductForSeo("matelas", slug);
  return buildProductMetadata(product, `/matelas/${slug}`);
}

export default async function MatelasDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      short_description,
      description,
      price,
      compare_at_price,
      is_active,
      categories!inner (
        slug
      ),
      product_images (
        image_url,
        alt,
        is_cover,
        position
      ),
      product_variants (
        id,
        dimension,
        price,
        compare_at_price
      )
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("categories.slug", "matelas")
    .order("position", { referencedTable: "product_images", ascending: true })
    .single();

  if (error || !data) {
    console.error("Erreur chargement fiche matelas:", error);
    notFound();
  }

  const product = data as unknown as Product;

  const images = getGalleryImages(product.product_images);
  const initialIndex = getCoverIndex(images);

  const variants = product.product_variants ?? [];
  const sortedVariants = [...variants].sort((a, b) => a.price - b.price);
  const primaryPrice = sortedVariants[0]?.price ?? product.price;
  const primaryCompareAtPrice =
    sortedVariants[0]?.compare_at_price ?? product.compare_at_price;

  const hasPromotion =
    primaryCompareAtPrice !== null &&
    primaryPrice !== null &&
    primaryCompareAtPrice > primaryPrice;

  const jsonLd = buildProductJsonLd(product, `/matelas/${slug}`, primaryPrice);

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-8 pt-28 sm:px-6 sm:pt-32 md:pb-12 lg:pb-16">
        <Link
          href="/matelas"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#103a63] shadow-sm transition hover:bg-white hover:text-[#d9c45a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux matelas
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <div>
            <ProductGallery
              images={images}
              initialIndex={initialIndex}
              productName={product.name}
              hasPromotion={hasPromotion}
              badgeLabel="Collection Matelas"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#103a63]/10 bg-white p-4">
                <BedDouble className="h-4 w-4 text-[#103a63]" />
                <p className="mt-2 text-sm font-bold text-[#103a63]">
                  Confort
                </p>
                <p className="mt-0.5 text-xs leading-4 text-slate-500">
                  Soutien adapté
                </p>
              </div>

              <div className="rounded-xl border border-[#103a63]/10 bg-white p-4">
                <Ruler className="h-4 w-4 text-[#103a63]" />
                <p className="mt-2 text-sm font-bold text-[#103a63]">
                  Conseil
                </p>
                <p className="mt-0.5 text-xs leading-4 text-slate-500">
                  Choix guidé
                </p>
              </div>

              <div className="rounded-xl border border-[#103a63]/10 bg-white p-4">
                <ShieldCheck className="h-4 w-4 text-[#103a63]" />
                <p className="mt-2 text-sm font-bold text-[#103a63]">
                  Qualité
                </p>
                <p className="mt-0.5 text-xs leading-4 text-slate-500">
                  Sélection premium
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-6 lg:sticky lg:top-8 lg:p-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9c45a]/15 px-3 py-1.5 text-xs font-semibold text-[#103a63]">
              <Sparkles className="h-3.5 w-3.5" />
              Matelas Premium
            </span>

            <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-[#103a63] sm:text-3xl">
              {product.name}
            </h1>

            {product.short_description && (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {product.short_description}
              </p>
            )}

            <ProductPurchasePanel
              variants={sortedVariants}
              fallbackPrice={product.price}
              fallbackCompareAtPrice={product.compare_at_price}
              productId={product.id}
              productName={product.name}
              href={`/matelas/${product.slug}`}
              imageUrl={images[0]?.image_url ?? null}
            />

            <div className="mt-5 space-y-3 rounded-2xl bg-[#F8F5F0] p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#103a63]" />
                <div>
                  <p className="text-sm font-semibold text-[#103a63]">
                    Conseil personnalisé
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-600">
                    Nous vous aidons à choisir le matelas adapté à votre
                    morphologie et à vos habitudes de sommeil.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#103a63]" />
                <div>
                  <p className="text-sm font-semibold text-[#103a63]">
                    Livraison disponible
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-600">
                    Livraison à domicile selon disponibilité et zone de service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#103a63]" />
                <div>
                  <p className="text-sm font-semibold text-[#103a63]">
                    Qualité sélectionnée
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-600">
                    Des produits choisis pour leur confort, leur soutien et leur
                    durabilité.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs leading-5 text-slate-500">
              <CreditCard className="h-3.5 w-3.5 shrink-0" />
              Paiement sécurisé disponible en magasin ou à distance.
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-[2rem] bg-white p-6 shadow-sm sm:rounded-[2.5rem] sm:p-8 lg:p-10">
            <span className="inline-flex rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-semibold text-[#103a63]">
              Les avantages
            </span>

            <h2 className="mt-5 text-2xl font-bold text-[#103a63]">
              Pourquoi choisir ce matelas ?
            </h2>

            <div className="mt-7 space-y-5">
              {[
                "Un soutien pensé pour favoriser un meilleur alignement du corps.",
                "Un confort adapté aux besoins du sommeil quotidien.",
                "Une sélection premium pour une expérience durable.",
                "Un accompagnement en magasin pour choisir le bon niveau de fermeté.",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d9c45a]" />
                  <p className="leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] bg-white p-6 shadow-sm sm:rounded-[2.5rem] sm:p-8 lg:p-10">
            <span className="inline-flex rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-semibold text-[#103a63]">
              Description
            </span>

            <h2 className="mt-5 text-2xl font-bold text-[#103a63]">
              Détails du produit
            </h2>

            {product.description ? (
              <div className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-600">
                {product.description}
              </div>
            ) : (
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Ce produit fait partie de notre sélection de literie premium.
                Sa fiche détaillée est en cours de préparation. Pour obtenir
                plus d’informations sur ses dimensions, son confort, sa fermeté
                ou sa disponibilité, contactez notre équipe.
              </p>
            )}
          </section>
        </div>

        <section className="mt-8 overflow-hidden rounded-[1.5rem] bg-[#103a63] p-5 text-white shadow-xl shadow-[#103a63]/10 sm:rounded-2xl sm:p-6">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d9c45a]">
                Koa&apos;lit Conseil
              </span>

              <h2 className="mt-2 text-xl font-bold leading-tight md:text-2xl">
                Vous hésitez entre plusieurs matelas ?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                Notre équipe vous accompagne pour choisir une literie adaptée à
                votre morphologie, vos habitudes de sommeil et votre niveau de
                confort recherché.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row md:justify-end">
              <Link
                href="/quiz-sommeil"
                className="inline-flex justify-center rounded-full bg-[#d9c45a] px-5 py-3 text-center text-sm font-bold text-[#103a63] transition hover:opacity-90"
              >
                Faire le quiz sommeil
              </Link>

              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-[#103a63]"
              >
                Parler à un conseiller
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}