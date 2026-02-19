import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

/**
 * Variantes de bouton brutaliste
 * Brutalist button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: React.ReactNode;
}

/**
 * Composant bouton avec style brutaliste
 * Button component with brutalist styling
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', children, ...props }, ref) => {
        const variantStyles = {
            primary: 'btn-brutal-primary',
            secondary: 'btn-brutal-secondary',
            ghost: 'border-0 shadow-none hover:shadow-none bg-transparent hover:bg-light-grey dark:hover:bg-gray-800',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'btn-brutal',
                    variantStyles[variant],
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
