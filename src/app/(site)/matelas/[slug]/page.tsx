// src/app/(site)/matelas/[slug]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  CreditCard,
  Heart,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import ProductGallery from "@/components/product/ProductGallery";
import SizeSelector from "@/components/product/SizeSelector";
import { supabase } from "@/lib/supabase";

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

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-28 sm:px-6 sm:pt-32 md:pb-12 lg:pb-16">
        <Link
          href="/matelas"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#103a63] shadow-sm transition hover:bg-white hover:text-[#d9c45a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux matelas
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
          <ProductGallery
            images={images}
            initialIndex={initialIndex}
            productName={product.name}
            hasPromotion={hasPromotion}
            badgeLabel="Collection Matelas"
          />

          <aside className="rounded-[2rem] bg-white p-6 shadow-sm sm:rounded-[2.5rem] sm:p-8 lg:sticky lg:top-8 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#d9c45a]/15 px-4 py-2 text-sm font-semibold text-[#103a63]">
              <Sparkles className="h-4 w-4" />
              Matelas Premium
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#103a63] sm:text-5xl">
              {product.name}
            </h1>

            {product.short_description && (
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {product.short_description}
              </p>
            )}

            <SizeSelector
              variants={sortedVariants}
              fallbackPrice={product.price}
              fallbackCompareAtPrice={product.compare_at_price}
            />

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#103a63]/10 p-4">
                <BedDouble className="h-5 w-5 text-[#103a63]" />
                <p className="mt-3 text-sm font-bold text-[#103a63]">
                  Confort
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Soutien adapté
                </p>
              </div>

              <div className="rounded-2xl border border-[#103a63]/10 p-4">
                <Ruler className="h-5 w-5 text-[#103a63]" />
                <p className="mt-3 text-sm font-bold text-[#103a63]">
                  Conseil
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Choix guidé
                </p>
              </div>

              <div className="rounded-2xl border border-[#103a63]/10 p-4">
                <ShieldCheck className="h-5 w-5 text-[#103a63]" />
                <p className="mt-3 text-sm font-bold text-[#103a63]">
                  Qualité
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Sélection premium
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-[1.75rem] bg-[#F8F5F0] p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#103a63]" />
                <div>
                  <p className="font-semibold text-[#103a63]">
                    Conseil personnalisé
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Nous vous aidons à choisir le matelas adapté à votre
                    morphologie et à vos habitudes de sommeil.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="mt-1 h-5 w-5 shrink-0 text-[#103a63]" />
                <div>
                  <p className="font-semibold text-[#103a63]">
                    Livraison disponible
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Livraison à domicile selon disponibilité et zone de service.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#103a63]" />
                <div>
                  <p className="font-semibold text-[#103a63]">
                    Qualité sélectionnée
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Des produits choisis pour leur confort, leur soutien et leur
                    durabilité.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#103a63] px-7 py-4 text-center font-semibold text-white shadow-lg shadow-[#103a63]/15 transition hover:-translate-y-0.5 hover:bg-[#0b2c4c]"
              >
                Réserver un essai
              </Link>

              <Link
                href="/quiz-sommeil"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#d9c45a] px-7 py-4 text-center font-bold text-[#103a63] shadow-lg shadow-[#d9c45a]/20 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Quiz sommeil
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-[#103a63]/15 px-5 py-4 text-[#103a63] transition hover:bg-[#103a63] hover:text-white"
                aria-label="Ajouter aux favoris"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm leading-6 text-slate-500">
              <CreditCard className="h-4 w-4 shrink-0" />
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

        <section className="mt-12 overflow-hidden rounded-[2rem] bg-[#103a63] p-7 text-white shadow-xl shadow-[#103a63]/10 sm:rounded-[2.5rem] sm:p-10 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d9c45a]">
                Koa&apos;lit Conseil
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                Vous hésitez entre plusieurs matelas ?
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-white/75">
                Notre équipe vous accompagne pour choisir une literie adaptée à
                votre morphologie, vos habitudes de sommeil et votre niveau de
                confort recherché.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/quiz-sommeil"
                className="inline-flex justify-center rounded-full bg-[#d9c45a] px-7 py-4 text-center font-bold text-[#103a63] transition hover:opacity-90"
              >
                Faire le quiz sommeil
              </Link>

              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full border border-white/20 px-7 py-4 text-center font-semibold text-white transition hover:bg-white hover:text-[#103a63]"
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