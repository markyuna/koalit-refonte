import type { MetadataRoute } from "next";

import { categories } from "@/lib/categories";
import { supabase } from "@/lib/supabase";

const baseUrl = "https://www.koalit.fr";

const routeBaseByCategorySlug: Record<string, string> = {
  matelas: "/matelas",
  ...Object.fromEntries(
    Object.values(categories).map((config) => [config.slug, config.routeBase])
  ),
};

// Refresh hourly so products added via the admin show up here without
// waiting for the next deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at, categories!inner ( slug )")
    .eq("is_active", true);

  const productEntries: MetadataRoute.Sitemap = (products ?? []).flatMap(
    (product) => {
      const categorySlug = (
        product as unknown as { categories: { slug: string } }
      ).categories.slug;
      const routeBase = routeBaseByCategorySlug[categorySlug];

      if (!routeBase) return [];

      return [
        {
          url: `${baseUrl}${routeBase}/${product.slug}`,
          lastModified: product.updated_at
            ? new Date(product.updated_at)
            : now,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        },
      ];
    }
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/matelas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sommiers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/oreillers-et-couettes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lits-coffres`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tetes-de-lit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/linge-de-lit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...productEntries,
    {
      url: `${baseUrl}/magasin`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz-sommeil`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portail-des-retours`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/suivre-ma-commande`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/conditions-generales-de-vente`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
