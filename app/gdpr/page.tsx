import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GDPR Compliance',
  description: 'ME Modeling Agency GDPR compliance information and data protection policies.',
};

export default function GDPRPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-16 uppercase tracking-tighter">GDPR</h1>

      <div className="space-y-12 font-mono text-sm uppercase tracking-widest leading-loose">
        <section>
          <h2 className="font-editorial text-3xl font-bold mb-6 normal-case tracking-normal">Data Controller</h2>
          <p>ME Modeling Agency, based in Lille, Hauts-de-France, France, is the data controller for all personal data collected through this website.</p>
        </section>

        <section>
          <h2 className="font-editorial text-3xl font-bold mb-6 normal-case tracking-normal">Your Rights Under GDPR</h2>
          <p className="mb-4">As a data subject in the European Union, you have the following rights:</p>
          <ul className="space-y-3 border-l-4 border-electric-blue pl-6">
            <li><strong>Right of Access</strong> — You can request a copy of all personal data we hold about you.</li>
            <li><strong>Right to Rectification</strong> — You can request correction of inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure</strong> — You can request deletion of your personal data (&quot;right to be forgotten&quot;).</li>
            <li><strong>Right to Restrict Processing</strong> — You can request limitation of how we process your data.</li>
            <li><strong>Right to Data Portability</strong> — You can request your data in a structured, machine-readable format.</li>
            <li><strong>Right to Object</strong> — You can object to processing based on legitimate interests or direct marketing.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-editorial text-3xl font-bold mb-6 normal-case tracking-normal">Data We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-3 border-black dark:border-white p-6">
              <h3 className="font-bold text-base mb-3">Model Applications</h3>
              <p>Name, email, location, social media handles, and submitted photographs for talent evaluation purposes.</p>
            </div>
            <div className="border-3 border-black dark:border-white p-6">
              <h3 className="font-bold text-base mb-3">Booking Requests</h3>
              <p>Client/agency name, project type, and project details for fulfilling booking services.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-editorial text-3xl font-bold mb-6 normal-case tracking-normal">Legal Basis for Processing</h2>
          <p>We process personal data on the basis of: (a) consent given by the data subject, (b) contractual necessity for providing our services, and (c) legitimate interest in operating and improving our agency.</p>
        </section>

        <section>
          <h2 className="font-editorial text-3xl font-bold mb-6 normal-case tracking-normal">Contact the Data Protection Officer</h2>
          <p>For any GDPR-related inquiries, please contact our DPO at <strong>dpo@me-agency.com</strong>.</p>
          <p className="mt-4">You also have the right to lodge a complaint with the French data protection authority (CNIL).</p>
        </section>

        <div className="pt-12 border-t-3 border-black dark:border-white flex gap-6">
          <Link href="/privacy" className="underline hover:text-electric-blue transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="underline hover:text-electric-blue transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
