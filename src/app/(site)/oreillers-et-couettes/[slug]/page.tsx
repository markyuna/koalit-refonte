// src/app/(site)/oreillers-et-couettes/[slug]/page.tsx

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
  const product = await getProductForSeo(categories.oreillers.slug, slug);
  return buildProductMetadata(product, `${categories.oreillers.routeBase}/${slug}`);
}

export default async function OreillerDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories.oreillers} slug={slug} />;
}
