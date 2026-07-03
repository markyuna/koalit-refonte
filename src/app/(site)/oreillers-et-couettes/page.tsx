// src/app/(site)/oreillers-et-couettes/page.tsx

import type { Metadata } from "next";

import CategoryListingPage from "@/components/product/CategoryListingPage";
import { categories } from "@/lib/categories";

const config = categories.oreillers;

export const metadata: Metadata = {
  title: config.seoTitle,
  description: config.seoDescription,
};

export default function OreillersEtCouettesPage() {
  return <CategoryListingPage config={config} />;
}
