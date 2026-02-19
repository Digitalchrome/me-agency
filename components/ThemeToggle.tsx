'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Bouton de basculement thème clair/sombre
 * Light/dark theme toggle button
 */
export default function ThemeToggle({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // Éviter le flash de contenu non stylisé
    // Avoid flash of unstyled content
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                className={cn(
                    'p-2 border-3 border-black dark:border-white',
                    'bg-white dark:bg-dark-grey',
                    className
                )}
                aria-label="Toggle theme"
            >
                <div className="w-6 h-6" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
                'p-2 border-3 border-black dark:border-white',
                'bg-white dark:bg-dark-grey',
                'hover:shadow-brutal transition-all duration-150',
                'hover:translate-x-1 hover:translate-y-1',
                className
            )}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                // Sun icon / Icône soleil
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={3}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                // Moon icon / Icône lune
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        strokeWidth={3}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}
