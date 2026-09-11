import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Slide = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: 'Latest Collection',
    title: 'Everything You Need for School',
    description:
      'Discover high-quality school essentials, stationery, books and more — all in one place.',
    primaryLabel: 'Shop Now',
    primaryLink: '/products',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    eyebrow: 'Smart Card Exclusive',
    title: 'Shop More. Save More.',
    description:
      'Get exclusive discounts on everyday essentials, school supplies and more with your Smart Card.',
    primaryLabel: 'Explore Deals',
    primaryLink: '/products?studentOnly=true',
    image:
      'https://images.unsplash.com/photo-1601598851547-4302969d9f5a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    eyebrow: 'Wholesale Shopping',
    title: 'Better Prices. Bigger Savings.',
    description:
      'Buy in larger quantities and unlock competitive wholesale pricing for your business or institution.',
    primaryLabel: 'Explore Wholesale',
    primaryLink: '/wholesale',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=85',
  },
];

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
  </svg>
);

export const HomeHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[activeIndex];

  const goToNext = () => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      goToNext();
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative min-h-[580px] w-full overflow-hidden bg-[#030712] text-white selection:bg-[#E2A746] selection:text-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Radial Glow & Sub-mesh Effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#E2A746]/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-blue-900/10 blur-[140px]" />

      <div className="mx-auto max-w-[1380px] px-6 py-12 lg:px-12">
        <div className="relative grid min-h-[480px] items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Text Column */}
          <div className="z-10 lg:col-span-5">
            {/* Kicker Tag */}
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#E2A746]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E2A746]">
                {activeSlide.eyebrow}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              {activeSlide.title}
            </h1>

            {/* Slide Description */}
            <p className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
              {activeSlide.description}
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={activeSlide.primaryLink}
                className="group inline-flex items-center gap-2 rounded-lg bg-[#E2A746] px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-[#f0b453] hover:shadow-lg hover:shadow-[#E2A746]/20"
              >
                <span>{activeSlide.primaryLabel}</span>
                <ArrowRightIcon />
              </Link>

              {activeSlide.secondaryLabel && activeSlide.secondaryLink && (
                <Link
                  to={activeSlide.secondaryLink}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-700 hover:bg-slate-800"
                >
                  {activeSlide.secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900 shadow-2xl">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="h-full w-full object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent" />
            </div>

            {/* Carousel Navigation Controls - Positioned underneath the image */}
            <div className="mt-4 flex items-center justify-between">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 bg-[#E2A746]'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};