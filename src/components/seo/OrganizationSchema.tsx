export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Koa'lit",
    url: "https://www.koalit.fr",
    logo: "https://www.koalit.fr/logo.png",
    description:
      "Spécialiste de la literie premium et du conseil personnalisé pour un sommeil réparateur.",
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