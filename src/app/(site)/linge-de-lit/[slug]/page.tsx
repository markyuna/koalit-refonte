// src/app/(site)/linge-de-lit/[slug]/page.tsx

import CategoryDetailPage from "@/components/product/CategoryDetailPage";
import { categories } from "@/lib/categories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LingeDeLitDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories["linge-de-lit"]} slug={slug} />;
}
