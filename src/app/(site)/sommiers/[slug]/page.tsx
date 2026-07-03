// src/app/(site)/sommiers/[slug]/page.tsx

import CategoryDetailPage from "@/components/product/CategoryDetailPage";
import { categories } from "@/lib/categories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SommierDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories.sommiers} slug={slug} />;
}
