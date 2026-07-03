// src/app/admin/products/[id]/edit/page.tsx

import { notFound } from "next/navigation";

import ProductForm from "@/components/admin/ProductForm";
import ProductImagesManager from "@/components/admin/ProductImagesManager";
import ProductVariantsManager from "@/components/admin/ProductVariantsManager";
import { supabase } from "@/lib/supabase";

type ProductImage = {
  id: string;
  image_url: string;
  alt: string | null;
  is_cover: boolean | null;
  position: number | null;
};

type ProductVariant = {
  id: string;
  dimension: string;
  price: number;
  compare_at_price: number | null;
  position: number | null;
};

type ProductCategory =
  | {
      slug: string;
    }
  | {
      slug: string;
    }[]
  | null;

type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: number | null;
  compare_at_price: number | null;
  stock: number | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  categories: ProductCategory;
  product_images: ProductImage[] | null;
  product_variants: ProductVariant[] | null;
};

type InitialProduct = Omit<Product, "categories"> & {
  categories: { slug: string } | null;
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function normalizeCategory(category: ProductCategory): { slug: string } | null {
  if (Array.isArray(category)) {
    return category[0] ?? null;
  }

  return category;
}

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
      ),
      product_images (
        id,
        image_url,
        alt,
        is_cover,
        position
      ),
      product_variants (
        id,
        dimension,
        price,
        compare_at_price,
        position
      )
    `
    )
    .eq("id", id)
    .order("position", {
      referencedTable: "product_images",
      ascending: true,
    })
    .order("position", {
      referencedTable: "product_variants",
      ascending: true,
    })
    .maybeSingle();

  if (error || !product) {
    notFound();
  }

  const typedProduct = product as unknown as Product;

  const initialProduct: InitialProduct = {
    ...typedProduct,
    categories: normalizeCategory(typedProduct.categories),
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-8 text-4xl font-bold text-[#103a63]">
          Modifier le produit
        </h1>

        <ProductForm mode="edit" initialProduct={initialProduct} />

        <ProductVariantsManager
          productId={typedProduct.id}
          variants={typedProduct.product_variants ?? []}
        />

        <ProductImagesManager
          productId={typedProduct.id}
          productSlug={typedProduct.slug}
          images={typedProduct.product_images ?? []}
        />
      </section>
    </main>
  );
}