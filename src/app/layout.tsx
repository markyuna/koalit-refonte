import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
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
    "Découvrez Koa'lit, spécialiste de la literie premium. Matelas et conseils personnalisés pour améliorer durablement votre sommeil.",

  keywords: [
    "literie",
    "matelas",
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
  },

  twitter: {
    card: "summary_large_image",
    title: "Koa'lit Literie",
    description:
      "Literie premium et accompagnement personnalisé pour un sommeil réparateur.",
  },

  alternates: {
    canonical: "https://www.koalit.fr",
  },
};

export const viewport: Viewport = {
  themeColor: "#103a63",
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
        <LocalBusinessSchema />
        {children}
      </body>
    </html>
  );
}