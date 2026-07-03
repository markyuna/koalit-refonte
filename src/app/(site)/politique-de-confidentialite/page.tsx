// src/app/(site)/politique-de-confidentialite/page.tsx

import type { Metadata } from "next";

import SimplePage from "@/components/shared/SimplePage";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Koa'lit",
  description: "Politique de confidentialité du site Koa'lit.",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <SimplePage
      title="Politique de confidentialité"
      description="Le contenu de cette page est en cours de rédaction. Pour toute question concernant la protection de vos données personnelles, contactez-nous directement."
    />
  );
}
