export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.koalit.fr/#business",
    name: "Koa'lit Literie",
    image: "https://www.koalit.fr/og-image.jpg",
    url: "https://www.koalit.fr",
    telephone: "+33134412273",
    email: "literie1@koalit.fr",

    address: {
      "@type": "PostalAddress",
      streetAddress: "3 chemin du Poirier Charles Guérin",
      postalCode: "95520",
      addressLocality: "Osny",
      addressCountry: "FR",
    },

    areaServed: {
      "@type": "Country",
      name: "France",
    },

    priceRange: "€€€",

    description:
      "Magasin de literie premium à Osny. Matelas, sommiers, oreillers et conseils personnalisés pour améliorer durablement votre sommeil.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}