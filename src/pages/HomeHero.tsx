import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const HomeHero = () => (
  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-6 py-14 text-white sm:px-12 sm:py-20">
    {/* Decorative background shapes — no external images needed. */}
    <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10" />
    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-brand-900/20" />
    <div className="pointer-events-none absolute top-10 right-1/4 h-24 w-24 rotate-12 rounded-2xl bg-amber-400/20" />

    <div className="relative mx-auto max-w-2xl text-center">
      <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
        Smart Card holders save more
      </span>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Shop more, save more</h1>
      <p className="mx-auto mt-3 max-w-lg text-brand-50 sm:text-lg">
        Everyday essentials, school supplies and top brands — with exclusive discounts for students
        carrying a Smart Card.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/products">
          <Button variant="secondary" size="lg">
            Start shopping
          </Button>
        </Link>
        <Link to="/products?studentOnly=true">
          <Button variant="outlineLight" size="lg">
            View student deals
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
