import type { MetadataRoute } from "next";

const baseUrl = "https://www.koalit.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/compte",
        "/connexion",
        "/inscription",
        "/mot-de-passe-oublie",
        "/reinitialiser-mot-de-passe",
        "/panier",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}