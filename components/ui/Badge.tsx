import { cn } from '@/lib/utils';
import { STATUS_COLORS } from '@/lib/constants';
import type { ModelStatus } from '@/lib/types';

export interface BadgeProps {
    status: ModelStatus;
    className?: string;
}

/**
 * Badge de statut pour les modèles
 * Status badge for models
 */
export default function Badge({ status, className }: BadgeProps) {
    const colorClass = STATUS_COLORS[status];

    return (
        <span className={cn('status-badge', colorClass, 'text-white', className)}>
            {status}
        </span>
    );
}
