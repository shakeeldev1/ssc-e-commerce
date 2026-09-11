import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Spinner } from '@/components/ui/Spinner';

type Variant = 'primary' | 'secondary' | 'outline' | 'outlineLight' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  // Institutional navy — the default action everywhere.
  primary: 'bg-ink-950 text-white hover:bg-ink-800 disabled:bg-ink-600',
  // Solid gold — reserved for the one or two most premium/highlighted CTAs per screen.
  secondary: 'bg-brand-300 text-ink-950 hover:bg-brand-400 disabled:bg-brand-100',
  outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  // For placement on a dark background (e.g. the homepage hero) — a translucent gold-tinted outline.
  outlineLight: 'border border-brand-300/50 bg-white/10 text-white hover:bg-white/20',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner size="sm" />}
      {children}
    </button>
  );
};
