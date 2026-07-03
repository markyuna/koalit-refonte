// src/app/(site)/lits-coffres/page.tsx

import type { Metadata } from "next";

import CategoryListingPage from "@/components/product/CategoryListingPage";
import { categories } from "@/lib/categories";

const config = categories["lits-coffres"];

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
};

// Always fetch fresh product data -- see matelas/page.tsx for why.
export const dynamic = "force-dynamic";

export default function LitsCoffresPage() {
  return <CategoryListingPage config={config} />;
}
