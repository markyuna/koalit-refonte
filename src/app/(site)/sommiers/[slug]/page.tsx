// src/app/(site)/sommiers/[slug]/page.tsx

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
  const product = await getProductForSeo(categories.sommiers.slug, slug);
  return buildProductMetadata(product, `${categories.sommiers.routeBase}/${slug}`);
}

export default async function SommierDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories.sommiers} slug={slug} />;
}
