// src/lib/product-seo.ts
//
// Shared by every product detail route (matelas + the 5 generic
// categories) to generate per-product <title>/description and
// Product JSON-LD. Wrapped in React's cache() so generateMetadata and
// the page component -- which both need this data -- share one query
// per request instead of hitting Supabase twice.

import { cache } from "react";
import type { Metadata } from "next";

import { supabase } from "@/lib/supabase";
import {
  getCoverIndex,
  getGalleryImages,
  type ProductImage,
} from "@/lib/product-helpers";

const SITE_URL = "https://www.koalit.fr";

export type SeoProduct = {
  name: string;
  short_description: string | null;
  description: string | null;
  price: number | null;
  compare_at_price: number | null;
  product_images: ProductImage[] | null;
  product_variants: { price: number }[] | null;
};

export const getProductForSeo = cache(
  async (categorySlug: string, slug: string): Promise<SeoProduct | null> => {
    const { data } = await supabase
      .from("products")
      .select(
        `
        name,
        short_description,
        description,
        price,
        compare_at_price,
        categories!inner ( slug ),
        product_images ( image_url, alt, is_cover, position ),
        product_variants ( price )
      `
      )
      .eq("slug", slug)
      .eq("is_active", true)
      .eq("categories.slug", categorySlug)
      .single();

    return data as unknown as SeoProduct | null;
  }
);

export function buildProductMetadata(
  product: SeoProduct | null,
  path: string
): Metadata {
  if (!product) return {};

  const images = getGalleryImages(product.product_images);
  const cover = images[images.length > 0 ? getCoverIndex(images) : 0];

  const description =
    product.short_description ??
    `Découvrez ${product.name}, disponible chez Koa'lit. Conseil personnalisé et livraison disponible.`;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: product.name,
      description,
      url: path,
      type: "website",
      images: cover
        ? [{ url: cover.image_url, alt: cover.alt ?? product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: cover ? [cover.image_url] : undefined,
    },
  };
}

export function buildProductJsonLd(
  product: SeoProduct,
  path: string,
  primaryPrice: number | null
) {
  const images = getGalleryImages(product.product_images);
  const url = `${SITE_URL}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description ?? product.description ?? undefined,
    image: images.map((image) => image.image_url),
    url,
    brand: {
      "@type": "Brand",
      name: "Koa'lit",
    },
    offers:
      primaryPrice !== null
        ? {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: primaryPrice,
            availability: "https://schema.org/InStock",
            url,
          }
        : undefined,
  };
}
