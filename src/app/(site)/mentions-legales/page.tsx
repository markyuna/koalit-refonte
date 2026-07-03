// src/app/(site)/mentions-legales/page.tsx

import type { Metadata } from "next";

import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales | Koa'lit",
  description:
    "Mentions légales du site KOALIT : identité de l'éditeur, hébergement, propriété intellectuelle et droit applicable.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      sections={[
        {
          heading: "Propriétaire du site",
          blocks: [
            {
              type: "paragraph",
              text: "KOALIT\n3 Chemin du Poirier Charles Guérin, 95520 Osny\nhttps://koalit.fr",
            },
          ],
        },
        {
          heading: "Immatriculation",
          blocks: [
            {
              type: "list",
              items: [
                "SIRET : 98783599800012",
                "TVA Intracommunautaire : FR90987835998",
                "RCS : Pontoise 987 835 998",
                "Capital social : 2 000 euros",
              ],
            },
          ],
        },
        {
          heading: "Création du site",
          blocks: [
            {
              type: "paragraph",
              text: "RB Végétal\nCréation et conception du site, contenu éditorial et expertise SEO : Diane Brenda LACAM\n16 RUE GEORGES DUHAMEL, 95300 HÉROUVILLE-EN-VEXIN – France\nSARL au capital de 12 000 € – RCS Pontoise 499 331 908",
            },
          ],
        },
        {
          heading: "Hébergement",
          blocks: [
            {
              type: "paragraph",
              text: "OVH\nSiège social : 2 rue Kellermann 59100 Roubaix – France\nDirecteur de la publication : Octave KLABA",
            },
          ],
        },
        {
          heading: "Droits d'auteur et propriété intellectuelle",
          blocks: [
            {
              type: "paragraph",
              text: "Le site https://koalit.fr est la propriété de KOALIT. Tous les éléments du site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) sont protégés par le droit d'auteur, des marques ou des brevets. Leur reproduction ou utilisation, même partielle, est strictement interdite sans autorisation préalable écrite de KOALIT.",
            },
          ],
        },
        {
          heading: "Hyperliens",
          blocks: [
            {
              type: "paragraph",
              text: "KOALIT décline toute responsabilité concernant le contenu et le fonctionnement des sites externes liés depuis ce site. L'utilisateur est invité à faire preuve de prudence lors de la consultation de ces liens.",
            },
          ],
        },
        {
          heading: "Droit applicable",
          blocks: [
            {
              type: "paragraph",
              text: "Le site et son contenu sont régis par la loi française. Tout litige en relation avec l'utilisation du site https://koalit.fr est soumis au droit français.",
            },
          ],
        },
      ]}
    />
  );
}
