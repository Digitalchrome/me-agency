import Link from 'next/link';

/**
 * Footer component for ME Modeling Agency
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-3 border-black dark:border-white py-12 bg-light-grey dark:bg-dark-grey">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-editorial text-3xl font-bold mb-4">ME</h3>
            <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
              Humanity's modeling agency. Celebrating diversity and making
              differences our strength. Leading the industry in authentic representation.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/me_modelingagency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold text-xs"
              >
                IG
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider mb-6 font-bold">Agency</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-black dark:hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/agency" className="hover:text-black dark:hover:text-white transition-colors">The Agency</Link>
              </li>
              <li>
                <Link href="/#roster" className="hover:text-black dark:hover:text-white transition-colors">Our Models</Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-black dark:hover:text-white transition-colors">Journal</Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-black dark:hover:text-white transition-colors">Discover / Index</Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-black dark:hover:text-white transition-colors">Become a Model</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-black dark:hover:text-white transition-colors">Book a Model</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-wider mb-6 font-bold">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/gdpr" className="hover:text-black dark:hover:text-white transition-colors">GDPR Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t-2 border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            © {currentYear} ME Modeling Agency. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">
            Handcrafted in Lille, France
          </p>
        </div>
      </div>
    </footer>
  );
}
