// src/app/(site)/conditions-generales-de-vente/page.tsx

import type { Metadata } from "next";

import SimplePage from "@/components/shared/SimplePage";

export const metadata: Metadata = {
  title: "Conditions générales de vente | Koa'lit",
  description: "Conditions générales de vente du site Koa'lit.",
};

export default function ConditionsGeneralesDeVentePage() {
  return (
    <SimplePage
      title="Conditions générales de vente"
      description="Le contenu de cette page est en cours de rédaction. Pour toute question concernant nos conditions générales de vente, contactez-nous directement."
    />
  );
}
