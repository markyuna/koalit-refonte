// src/app/(site)/lits-coffres/[slug]/page.tsx

import CategoryDetailPage from "@/components/product/CategoryDetailPage";
import { categories } from "@/lib/categories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LitCoffreDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories["lits-coffres"]} slug={slug} />;
}
