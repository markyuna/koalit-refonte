// src/app/(site)/tetes-de-lit/page.tsx

import type { Metadata } from "next";

import CategoryListingPage from "@/components/product/CategoryListingPage";
import { categories } from "@/lib/categories";

const config = categories["tetes-de-lit"];

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
};

export default function TetesDeLitPage() {
  return <CategoryListingPage config={config} />;
}
