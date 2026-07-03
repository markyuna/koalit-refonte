// src/app/(site)/oreillers-et-couettes/[slug]/page.tsx

import CategoryDetailPage from "@/components/product/CategoryDetailPage";
import { categories } from "@/lib/categories";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OreillerDetailPage({ params }: Props) {
  const { slug } = await params;

  return <CategoryDetailPage config={categories.oreillers} slug={slug} />;
}
