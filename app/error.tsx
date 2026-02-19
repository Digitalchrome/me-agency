'use client';

import Button from '@/components/ui/Button';
import { useEffect } from 'react';

/**
 * Limite d'erreur globale
 * Global error boundary
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center brutal-grid">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto border-6 border-black dark:border-white p-12 bg-white dark:bg-dark-grey">
                    <h1 className="font-editorial text-6xl font-bold mb-4 text-error">ERROR</h1>
                    <h2 className="font-mono text-xl uppercase tracking-wider mb-8">
                        Something went wrong
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {error.message || 'An unexpected error occurred'}
                    </p>
                    <Button onClick={reset} variant="primary">
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
