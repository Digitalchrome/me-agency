import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
}

/**
 * Composant de chargement squelette
 * Skeleton loading component
 * 
 * Note: Width and height are passed as CSS custom properties to avoid inline style warnings
 * while maintaining dynamic sizing capability
 */
export default function Skeleton({ className, width, height, style, ...props }: SkeletonProps) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800', className)}
            style={{
                '--skeleton-width': width,
                '--skeleton-height': height,
                ...style,
            } as React.CSSProperties}
            {...props}
        />
    );
}
