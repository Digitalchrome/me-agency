/**
 * Component to inject JSON-LD structured data for SEO.
 */
export default function JsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ME Modeling Agency',
    url: 'https://me-agency.com',
    logo: 'https://me-agency.com/icon.png',
    description: "Humanity's modeling agency. Celebrating diversity and making differences our strength.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lille',
      addressRegion: 'Hauts-de-France',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.instagram.com/me_modelingagency',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
