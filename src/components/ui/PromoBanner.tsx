import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface PromoBannerProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  tone?: 'ink' | 'gold';
  icon?: ReactNode;
}

export const PromoBanner = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  tone = 'ink',
  icon,
}: PromoBannerProps) => {
  const isGold = tone === 'gold';

  return (
    <section
      className={`flex flex-col items-start justify-between gap-6 rounded-xl p-6 sm:flex-row sm:items-center sm:p-10 ${
        isGold ? 'bg-brand-300 text-ink-950' : 'bg-ink-950 text-white'
      }`}
    >
      <div>
        <span
          className={`text-xs font-semibold tracking-wide uppercase ${isGold ? 'text-ink-800' : 'text-brand-300'}`}
        >
          {eyebrow}
        </span>
        <h2 className="mt-2 text-xl font-bold sm:text-2xl">{title}</h2>
        <p className={`mt-2 max-w-xl text-sm ${isGold ? 'text-ink-800/80' : 'text-white/70'}`}>
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        {icon && <div className={isGold ? 'text-ink-900' : 'text-brand-300'}>{icon}</div>}
        <Link to={ctaHref}>
          <Button variant={isGold ? 'primary' : 'secondary'} size="lg">
            {ctaLabel}
          </Button>
        </Link>
      </div>
    </section>
  );
};
