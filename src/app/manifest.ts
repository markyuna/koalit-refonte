import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Koa'lit Literie",
    short_name: "Koa'lit",
    description:
      "Literie premium, conseils personnalisés et solutions sommeil adaptées à chaque besoin.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5f0",
    theme_color: "#103a63",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
