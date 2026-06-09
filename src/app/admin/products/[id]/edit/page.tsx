// src/app/admin/products/[id]/edit/page.tsx

import { notFound } from "next/navigation";

import ProductForm from "@/components/admin/ProductForm";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      slug,
      short_description,
      description,
      price,
      compare_at_price,
      stock,
      is_featured,
      is_active,
      categories (
        slug
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-8 text-4xl font-bold text-[#103a63]">
          Modifier le produit
        </h1>

        <ProductForm mode="edit" initialProduct={product} />
      </section>
    </main>
  );
}