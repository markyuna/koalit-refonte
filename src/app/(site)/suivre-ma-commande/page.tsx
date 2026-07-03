// src/app/(site)/suivre-ma-commande/page.tsx

import type { Metadata } from "next";

import SimplePage from "@/components/shared/SimplePage";

export const metadata: Metadata = {
  title: "Suivre ma commande | Koa'lit",
  description: "Suivez l'état de votre commande Koa'lit.",
};

export default function SuivreMaCommandePage() {
  return (
    <SimplePage
      title="Suivre ma commande"
      description="Le suivi de commande en ligne arrive bientôt. En attendant, notre équipe peut vous renseigner directement sur l'état de votre commande."
    />
  );
}
