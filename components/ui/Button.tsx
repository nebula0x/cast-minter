import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                {
                    'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 hover:scale-105':
                        variant === 'primary',
                    'glass-hover': variant === 'secondary',
                    'hover:bg-muted': variant === 'ghost',
                    'px-4 py-2 text-sm': size === 'sm',
                    'px-6 py-3 text-base': size === 'md',
                    'px-8 py-4 text-lg': size === 'lg',
                },
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : icon ? (
                icon
            ) : null}
            {children}
        </button>
    );
}
