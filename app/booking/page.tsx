export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-6">
          <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-8 uppercase tracking-tighter">Book a <br/> Model</h1>
          <p className="font-mono text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 dark:text-gray-300">
            Professional booking for editorial, fashion, and commercial projects.
            <br/><br/>
            Our team will get back to you within 24 hours with availability and rates.
          </p>
        </div>
        
        <div className="md:col-span-6">
          <form className="space-y-8 bg-zinc-100 dark:bg-zinc-900 p-10 border-3 border-black dark:border-white shadow-brutal">
             <div className="flex flex-col gap-2">
                <label htmlFor="client-name" className="font-mono text-xs font-bold uppercase tracking-widest">Client / Agency</label>
                <input id="client-name" type="text" className="bg-transparent border-b-2 border-black dark:border-white py-2 focus:outline-none focus:border-electric-blue transition-colors font-mono" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="project-type" className="font-mono text-xs font-bold uppercase tracking-widest">Project Type</label>
                <select id="project-type" className="bg-transparent border-b-2 border-black dark:border-white py-2 focus:outline-none focus:border-electric-blue transition-colors font-mono uppercase text-xs">
                  <option>Editorial</option>
                  <option>Commercial</option>
                  <option>Catwalk</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="project-details" className="font-mono text-xs font-bold uppercase tracking-widest">Details</label>
                <textarea id="project-details" className="bg-transparent border-b-2 border-black dark:border-white py-2 h-32 focus:outline-none focus:border-electric-blue transition-colors font-mono" />
              </div>
            <button className="btn-brutal-primary w-full mt-4">Send Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}
