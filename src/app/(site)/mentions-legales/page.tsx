// src/app/(site)/mentions-legales/page.tsx

import type { Metadata } from "next";

import SimplePage from "@/components/shared/SimplePage";

export const metadata: Metadata = {
  title: "Mentions légales | Koa'lit",
  description: "Mentions légales du site Koa'lit.",
};

export default function MentionsLegalesPage() {
  return (
    <SimplePage
      title="Mentions légales"
      description="Le contenu de cette page est en cours de rédaction. Pour toute question concernant les mentions légales de Koa'lit, contactez-nous directement."
    />
  );
}
