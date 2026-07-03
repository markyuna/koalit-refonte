// src/app/(site)/tetes-de-lit/[slug]/page.tsx

import CategoryDetailPage from "@/components/product/CategoryDetailPage";
import { categories } from "@/lib/categories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TeteDeLitDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories["tetes-de-lit"]} slug={slug} />;
}
