export default function JoinPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-6">
          <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-8 uppercase tracking-tighter">Become <br/> a Model</h1>
          <p className="font-mono text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 dark:text-gray-300">
            We are always looking for new faces. No matter your height, age, or background. We value uniqueness.
            <br/><br/>
            Please fill out our application form or send your polaroids to: <span className="font-bold underline">applications@me-agency.com</span>
          </p>
        </div>
        
        <div className="md:col-span-6">
          <form className="space-y-8 bg-light-grey dark:bg-zinc-900 p-10 border-3 border-black dark:border-white shadow-brutal">
            {['Full Name', 'Email', 'Location', 'Instagram'].map((label, idx) => (
              <div key={label} className="flex flex-col gap-2">
                <label 
                  htmlFor={`field-${idx}`} 
                  className="font-mono text-xs font-bold uppercase tracking-widest"
                >
                  {label}
                </label>
                <input 
                  id={`field-${idx}`}
                  type="text" 
                  className="bg-transparent border-b-2 border-black dark:border-white py-2 focus:outline-none focus:border-electric-blue transition-colors font-mono" 
                />
              </div>
            ))}
            <button className="btn-brutal-primary w-full mt-4">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  );
}
