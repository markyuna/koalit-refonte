// src/lib/seo.ts

import type { Metadata } from "next";

const siteConfig = {
  name: "Koal’it",
  url: "https://www.koalit.fr",
  description:
    "Literie premium, conseils personnalisés et solutions sommeil adaptées à chaque besoin.",
  locale: "fr_FR",
};

type SeoInput = {
  title: string;
  description?: string | null;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
};

export function generateSeoMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: SeoInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const seoTitle = `${title} | ${siteConfig.name}`;
  const seoDescription = description || siteConfig.description;
  const seoImage = image || `${siteConfig.url}/images/og-default.jpg`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
  };
}

export function generateProductJsonLd(product: {
  name: string;
  description?: string | null;
  slug: string;
  price: number;
  image?: string | null;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? [product.image] : [],
    url: `${siteConfig.url}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Koal’it",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: `https://schema.org/${product.availability || "InStock"}`,
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };
}