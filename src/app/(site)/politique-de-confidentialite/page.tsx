// src/app/(site)/politique-de-confidentialite/page.tsx

import type { Metadata } from "next";

import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Koa'lit",
  description:
    "Politique de confidentialité de KOALIT : collecte, utilisation et protection de vos données personnelles conformément au RGPD.",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Confidentialité"
      title="Politique de confidentialité"
      sections={[
        {
          heading: "Qui sommes-nous ?",
          blocks: [
            {
              type: "paragraph",
              text: "KOALIT\n3 Chemin du Poirier Charles Guérin, 95520 Osny – France\nhttps://koalit.fr",
            },
          ],
        },
        {
          heading: "Collecte et utilisation des données personnelles",
          blocks: [
            {
              type: "list",
              intro: "Nous collectons vos données personnelles dans les cas suivants :",
              items: [
                "Création de compte client : Nous recueillons vos informations d'identification et de contact pour gérer votre compte, exécuter vos commandes et communiquer avec vous.",
                "Formulaires de contact : Nous collectons vos coordonnées et le contenu de votre message pour répondre à vos demandes.",
                "Demande de garantie supplémentaire : Nous recueillons vos informations personnelles et les détails de votre achat pour enregistrer l'extension de garantie.",
                "Utilisation du chatbot : Nous collectons vos données personnelles et vos préférences pour vous recommander le matelas le plus adapté.",
                "Prospection commerciale : Avec votre consentement, nous utilisons vos coordonnées pour vous informer sur nos produits.",
              ],
            },
          ],
        },
        {
          heading: "Bases légales des traitements",
          blocks: [
            {
              type: "list",
              intro: "Selon les cas, le traitement de vos données est basé sur :",
              items: [
                "L'exécution d'un contrat ou de mesures précontractuelles",
                "Notre intérêt légitime",
                "Votre consentement (pour la prospection électronique)",
              ],
            },
          ],
        },
        {
          heading: "Destinataires de vos données",
          blocks: [
            {
              type: "paragraph",
              text: "Vos données sont destinées à nos services internes, nos magasins franchisés (si nécessaire), et à des prestataires techniques (hébergement, CRM). Elles peuvent être communiquées à des tiers (expert-comptable, avocat) en cas de nécessité légale.",
            },
          ],
        },
        {
          heading: "Durée de conservation",
          blocks: [
            {
              type: "paragraph",
              text: "Nous conservons vos données pour la durée nécessaire aux finalités poursuivies, augmentée des délais de prescription légale applicables.",
            },
          ],
        },
        {
          heading: "Vos droits",
          blocks: [
            {
              type: "list",
              intro: "Conformément à la réglementation, vous disposez des droits suivants :",
              items: [
                "Accès, rectification, effacement de vos données",
                "Limitation du traitement",
                "Opposition au traitement",
                "Portabilité des données",
                "Retrait du consentement",
                "Directives post-mortem",
              ],
            },
            {
              type: "paragraph",
              text: "Pour exercer ces droits, contactez-nous à : literie1@koalit.fr",
              linkEmail: "literie1@koalit.fr",
            },
          ],
        },
        {
          heading: "Cookies",
          blocks: [
            {
              type: "paragraph",
              text: "Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez les gérer via le module accessible sur notre site ou dans les paramètres de votre navigateur.",
            },
          ],
        },
        {
          heading: "Sécurité",
          blocks: [
            {
              type: "paragraph",
              text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles.",
            },
          ],
        },
      ]}
    />
  );
}
