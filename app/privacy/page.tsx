export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="font-editorial text-6xl md:text-8xl font-bold mb-12 uppercase tracking-tighter">Privacy <br/> Policy</h1>
      <div className="max-w-3xl space-y-12 font-mono text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">01. Data Collection / Collecte des données</h2>
          <p>
            At ME Modeling Agency, we value your privacy. We collect minimal data necessary for booking and portfolio management.
            <br/>
            À ME Modeling Agency, nous accordons une grande importance à votre vie privée. Nous collectons le minimum de données nécessaires à la gestion des réservations et des portfolios.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">02. GDPR Compliance / Conformité RGPD</h2>
          <p>
            We adhere to EU data protection rules. You have the right to access, rectify, or delete your personal information at any time.
            <br/>
            Nous respectons les règles européennes de protection des données. Vous avez le droit d'accéder, de rectifier ou de supprimer vos informations personnelles à tout moment.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">03. Contact</h2>
          <p>
            For any privacy-related inquiries, please contact: privacy@me-agency.com
          </p>
        </section>
      </div>
    </div>
  );
}
