import Link from 'next/link';
import Button from '@/components/ui/Button';

/**
 * Page 404 personnalisée
 * Custom 404 page
 */
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center brutal-grid">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto border-6 border-black dark:border-white p-12 bg-white dark:bg-dark-grey">
                    <h1 className="font-editorial text-9xl font-bold mb-4">404</h1>
                    <h2 className="font-mono text-2xl uppercase tracking-wider mb-8">Page Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link href="/">
                        <Button variant="primary">Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
