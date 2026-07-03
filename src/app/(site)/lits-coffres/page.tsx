// src/app/(site)/lits-coffres/page.tsx

import type { Metadata } from "next";

import CategoryListingPage from "@/components/product/CategoryListingPage";
import { categories } from "@/lib/categories";

const config = categories["lits-coffres"];

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
};

export default function LitsCoffresPage() {
  return <CategoryListingPage config={config} />;
}
