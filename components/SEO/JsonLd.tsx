/**
 * Component to inject JSON-LD structured data for SEO.
 */
export default function JsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ME Modeling Agency',
    url: 'https://me-agency.com',
    logo: 'https://me-agency.com/logo.png',
    description: "Humanity's modeling agency. Celebrating diversity and making differences our strength.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lille',
      addressRegion: 'Hauts-de-France',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://instagram.com/me_agency',
      'https://twitter.com/me_agency',
      'https://linkedin.com/company/me-agency',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
