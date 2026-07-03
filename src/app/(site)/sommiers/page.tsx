// src/app/(site)/sommiers/page.tsx

import type { Metadata } from "next";

import CategoryListingPage from "@/components/product/CategoryListingPage";
import { categories } from "@/lib/categories";

const config = categories.sommiers;

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
};

export default function SommiersPage() {
  return <CategoryListingPage config={config} />;
}
