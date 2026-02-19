import Skeleton from '@/components/ui/Skeleton';

/**
 * État de chargement pour la page de détail du modèle
 * Loading state for model detail page
 */
export default function Loading() {
    return (
        <div className="brutal-grid min-h-screen">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Cover image skeleton / Squelette image de couverture */}
                    <Skeleton height="800px" />

                    {/* Info skeleton / Squelette d'informations */}
                    <div>
                        <Skeleton height="80px" width="80%" className="mb-4" />
                        <div className="flex gap-4 mb-8">
                            <Skeleton height="40px" width="150px" />
                            <Skeleton height="40px" width="150px" />
                        </div>
                        <Skeleton height="60px" className="mb-8" />
                        <Skeleton height="400px" />
                    </div>
                </div>

                {/* Tabs skeleton / Squelette d'onglets */}
                <Skeleton height="50px" className="mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} height="400px" />
                    ))}
                </div>
            </div>
        </div>
    );
}
