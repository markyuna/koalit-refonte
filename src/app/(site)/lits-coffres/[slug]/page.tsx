// src/app/(site)/lits-coffres/[slug]/page.tsx

import type { Metadata } from "next";

import CategoryDetailPage from "@/components/product/CategoryDetailPage";
import { categories } from "@/lib/categories";
import { buildProductMetadata, getProductForSeo } from "@/lib/product-seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductForSeo(categories["lits-coffres"].slug, slug);
  return buildProductMetadata(
    product,
    `${categories["lits-coffres"].routeBase}/${slug}`
  );
}

export default async function LitCoffreDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories["lits-coffres"]} slug={slug} />;
}
