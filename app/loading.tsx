import Skeleton from '@/components/ui/Skeleton';

/**
 * État de chargement pour la page d'accueil
 * Loading state for home page
 */
export default function Loading() {
    return (
        <div className="brutal-grid min-h-screen">
            <div className="container mx-auto px-4 py-12">
                {/* Hero skeleton / Squelette héro */}
                <div className="mb-16">
                    <Skeleton height="120px" width="400px" className="mb-4" />
                    <Skeleton height="24px" width="300px" />
                </div>

                {/* Grid skeleton / Squelette de grille */}
                <div className="anti-grid">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="model-card">
                            <Skeleton height="600px" />
                            <div className="p-4">
                                <Skeleton height="24px" width="60%" className="mb-2" />
                                <Skeleton height="16px" width="40%" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
