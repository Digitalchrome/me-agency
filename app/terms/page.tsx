export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="font-editorial text-6xl md:text-8xl font-bold mb-12 uppercase tracking-tighter">Terms of <br/> Service</h1>
      <div className="max-w-3xl space-y-12 font-mono text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">01. Use of Website</h2>
          <p>
            By accessing this website, you agree to be bound by these terms and conditions.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">02. Intellectual Property</h2>
          <p>
            All content including images and text are the property of ME Modeling Agency or its contributors.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold border-b-2 border-black dark:border-white pb-2 mb-4">03. Booking Terms</h2>
          <p>
             Bookings made through this platform are subject to separate representation agreements.
          </p>
        </section>
      </div>
    </div>
  );
}
