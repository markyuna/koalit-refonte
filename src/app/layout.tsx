import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import OrganizationSchema from "@/components/seo/OrganizationSchema";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.koalit.fr"),

  title: {
    default: "Koa'lit Literie",
    template: "%s | Koa'lit",
  },

  description:
    "Découvrez Koa'lit, spécialiste de la literie premium. Matelas, sommiers et conseils personnalisés pour améliorer durablement votre sommeil.",

  keywords: [
    "literie",
    "matelas",
    "sommier",
    "oreiller",
    "sommeil",
    "literie premium",
    "magasin literie",
    "conseil sommeil",
    "matelas haut de gamme",
    "Koa'lit",
  ],

  authors: [{ name: "Koa'lit" }],
  creator: "Koa'lit",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Koa'lit Literie",
    description:
      "Literie premium et accompagnement personnalisé pour un sommeil réparateur.",
    url: "https://www.koalit.fr",
    siteName: "Koa'lit",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Koa'lit Literie",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Koa'lit Literie",
    description:
      "Literie premium et accompagnement personnalisé pour un sommeil réparateur.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://www.koalit.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F8F5F0] text-[#111111]">
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}