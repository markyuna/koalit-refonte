// src/app/(site)/linge-de-lit/page.tsx

import type { Metadata } from "next";

import CategoryListingPage from "@/components/product/CategoryListingPage";
import { categories } from "@/lib/categories";

const config = categories["linge-de-lit"];

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
};

export default function LingeDeLitPage() {
  return <CategoryListingPage config={config} />;
}
