// src/app/(site)/portail-des-retours/page.tsx

import type { Metadata } from "next";

import SimplePage from "@/components/shared/SimplePage";

export const metadata: Metadata = {
  title: "Portail des retours | Koa'lit",
  description: "Effectuez une demande de retour pour votre commande Koa'lit.",
};

export default function PortailDesRetoursPage() {
  return (
    <SimplePage
      title="Portail des retours"
      description="Le portail de retour en ligne arrive bientôt. En attendant, notre équipe peut traiter votre demande de retour directement."
    />
  );
}
