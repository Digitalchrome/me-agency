'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Bannière de consentement aux cookies (RGPD)
 * Cookie consent banner (GDPR)
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-8 right-8 z-[100] md:left-auto md:max-w-md"
        >
          <div className="bg-white dark:bg-black border-3 border-black dark:border-white p-6 shadow-brutal">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-2">Cookie Privacy / Confidentialité</h3>
            <p className="text-xs font-mono mb-6 leading-relaxed">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              <br/>
              Nous utilisons des cookies pour améliorer votre expérience.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={accept}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-2 font-mono text-xs font-bold uppercase transition-transform active:scale-95"
              >
                Accept / Accepter
              </button>
              <button 
                onClick={decline}
                className="px-4 py-2 border-2 border-black dark:border-white font-mono text-xs uppercase"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
