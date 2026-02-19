'use client';

/**
 * Composant bouton pour l'impression (Client Component)
 * Print button component (Client Component)
 */
export default function PrintButton() {
  return (
    <button 
       onClick={() => window.print()} 
       className="btn-brutal bg-black text-white px-8 py-3"
    >
      Print Card
    </button>
  );
}
