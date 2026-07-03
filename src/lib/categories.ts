// src/lib/categories.ts
//
// Config for product categories that share the generic
// CategoryListingPage / CategoryDetailPage templates. "Matelas" is
// intentionally excluded — it has its own hand-tuned pages.

export type CategoryConfig = {
  slug: string;
  routeBase: string;
  name: string;
  singular: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  seoTitle: string;
  seoDescription: string;
  emptyStateTitle: string;
  emptyStateText: string;
  galleryBadgeLabel: string;
  asideBadgeLabel: string;
};

export const categories: Record<string, CategoryConfig> = {
  sommiers: {
    slug: "sommiers",
    routeBase: "/sommiers",
    name: "Sommiers",
    singular: "sommier",
    heroEyebrow: "Sommiers",
    heroTitle: "La base idéale pour un sommeil plus stable",
    heroDescription:
      "Un bon sommier améliore le maintien, prolonge la durée de vie de votre matelas et participe directement à votre confort nuit après nuit.",
    seoTitle: "Sommiers | Koa'lit",
    seoDescription:
      "Découvrez notre sélection de sommiers Koa'lit pour compléter votre literie et améliorer durablement votre confort de sommeil.",
    emptyStateTitle: "Les sommiers arrivent bientôt",
    emptyStateText:
      "Nous préparons une sélection de sommiers adaptés à différents besoins de confort. En attendant, vous pouvez nous contacter pour recevoir un conseil personnalisé.",
    galleryBadgeLabel: "Collection Sommiers",
    asideBadgeLabel: "Sommier Premium",
  },
  oreillers: {
    slug: "oreillers",
    routeBase: "/oreillers-et-couettes",
    name: "Oreillers et couettes",
    singular: "oreiller",
    heroEyebrow: "Oreillers et couettes",
    heroTitle: "Le détail qui change vos nuits",
    heroDescription:
      "Oreillers et couettes sélectionnés pour compléter votre matelas et offrir un confort enveloppant du premier au dernier sommeil.",
    seoTitle: "Oreillers et couettes | Koa'lit",
    seoDescription:
      "Découvrez notre sélection d'oreillers et de couettes Koa'lit pour compléter votre literie et améliorer votre confort de sommeil.",
    emptyStateTitle: "Les oreillers et couettes arrivent bientôt",
    emptyStateText:
      "Nous préparons une sélection d'oreillers et de couettes adaptés à différents besoins de confort. En attendant, vous pouvez nous contacter pour recevoir un conseil personnalisé.",
    galleryBadgeLabel: "Collection Oreillers et couettes",
    asideBadgeLabel: "Oreiller Premium",
  },
  "lits-coffres": {
    slug: "lits-coffres",
    routeBase: "/lits-coffres",
    name: "Lits coffres",
    singular: "lit coffre",
    heroEyebrow: "Lits coffres",
    heroTitle: "Le rangement en plus, sans compromis sur le confort",
    heroDescription:
      "Nos lits coffres associent gain de place et qualité de couchage, pour une chambre organisée sans sacrifier le confort.",
    seoTitle: "Lits coffres | Koa'lit",
    seoDescription:
      "Découvrez notre sélection de lits coffres Koa'lit, alliant rangement pratique et confort de sommeil.",
    emptyStateTitle: "Les lits coffres arrivent bientôt",
    emptyStateText:
      "Nous préparons une sélection de lits coffres adaptés à différents besoins. En attendant, vous pouvez nous contacter pour recevoir un conseil personnalisé.",
    galleryBadgeLabel: "Collection Lits coffres",
    asideBadgeLabel: "Lit coffre Premium",
  },
  "tetes-de-lit": {
    slug: "tetes-de-lit",
    routeBase: "/tetes-de-lit",
    name: "Têtes de lit",
    singular: "tête de lit",
    heroEyebrow: "Têtes de lit",
    heroTitle: "La touche finale de votre chambre",
    heroDescription:
      "Des têtes de lit pensées pour habiller votre literie avec style, dans des finitions choisies pour durer.",
    seoTitle: "Têtes de lit | Koa'lit",
    seoDescription:
      "Découvrez notre sélection de têtes de lit Koa'lit pour habiller votre chambre avec style.",
    emptyStateTitle: "Les têtes de lit arrivent bientôt",
    emptyStateText:
      "Nous préparons une sélection de têtes de lit adaptées à chaque style de chambre. En attendant, vous pouvez nous contacter pour recevoir un conseil personnalisé.",
    galleryBadgeLabel: "Collection Têtes de lit",
    asideBadgeLabel: "Tête de lit Premium",
  },
  "linge-de-lit": {
    slug: "linge-de-lit",
    routeBase: "/linge-de-lit",
    name: "Linge de lit",
    singular: "linge de lit",
    heroEyebrow: "Linge de lit",
    heroTitle: "Le confort se sent aussi au toucher",
    heroDescription:
      "Draps, housses et parures sélectionnés pour leur douceur et leur durabilité, pour prolonger le confort de votre literie.",
    seoTitle: "Linge de lit | Koa'lit",
    seoDescription:
      "Découvrez notre sélection de linge de lit Koa'lit : draps, housses et parures pour compléter votre literie.",
    emptyStateTitle: "Le linge de lit arrive bientôt",
    emptyStateText:
      "Nous préparons une sélection de linge de lit adapté à chaque style de chambre. En attendant, vous pouvez nous contacter pour recevoir un conseil personnalisé.",
    galleryBadgeLabel: "Collection Linge de lit",
    asideBadgeLabel: "Linge de lit Premium",
  },
};
