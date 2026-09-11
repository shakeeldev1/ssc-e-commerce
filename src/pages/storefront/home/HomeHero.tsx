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
    eyebrow: 'Smart Card Exclusive',
    title: 'Shop More. Save More.',
    description:
      'Get exclusive discounts on everyday essentials, school supplies and more with your Smart Card.',
    primaryLabel: 'Shop Now',
    primaryLink: '/products',
    secondaryLabel: 'Student Deals',
    secondaryLink: '/products?studentOnly=true',
    image:
      'https://images.unsplash.com/photo-1601598851547-4302969d9f5a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    eyebrow: 'Back to School',
    title: 'Everything You Need for School',
    description:
      'Discover stationery, school essentials and everyday products at great prices.',
    primaryLabel: 'Shop School Supplies',
    primaryLink: '/products',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9 5 7 7-7 7"
    />
  </svg>
);

export const HomeHero = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[activeIndex];

  const goToNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-[#05090d]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#F7C97F]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#F7C97F]/5 blur-3xl" />

      <div className="w-full">
        <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[560px]">
          {/* Slide content */}
          <div
            key={activeSlide.id}
            className="mx-auto grid min-h-[620px] w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-6 py-16 sm:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:px-16"
          >
            {/* Left Content */}
            <div className="relative z-10 max-w-xl">
              <span className="luxury-kicker inline-flex border-l border-[#F7C97F] pl-3">
                {activeSlide.eyebrow}
              </span>

              <h1 className="mt-6 max-w-xl font-serif text-5xl font-normal leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                {activeSlide.title}
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
                {activeSlide.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={activeSlide.primaryLink}
                  className="inline-flex items-center justify-center rounded-sm bg-[#F7C97F] px-7 py-3.5 text-sm font-bold text-[#000208] transition-all duration-200 hover:bg-[#fff]"
                >
                  {activeSlide.primaryLabel}
                </Link>

                {activeSlide.secondaryLabel &&
                  activeSlide.secondaryLink && (
                    <Link
                      to={activeSlide.secondaryLink}
                      className="inline-flex items-center justify-center rounded-sm border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-[#F7C97F] hover:text-[#F7C97F]"
                    >
                      {activeSlide.secondaryLabel}
                    </Link>
                  )}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden h-[460px] lg:block">
              {/* Image frame */}
              <div className="absolute inset-0 overflow-hidden rounded-sm border border-white/10">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="h-full w-full object-cover"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#000208]/60 via-transparent to-transparent" />
              </div>

              {/* Decorative border */}
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full rounded-sm border border-[#F7C97F]/25" />
            </div>

            {/* Mobile Image */}
            <div className="relative h-[260px] overflow-hidden rounded-xl lg:hidden">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#000208]/70 to-transparent" />
            </div>
          </div>

          {/* Previous Button */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:border-[#F7C97F]/50 hover:bg-[#F7C97F] hover:text-[#000208] sm:flex"
          >
            <ArrowLeftIcon />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 p-3 text-white backdrop-blur-sm transition-all hover:border-[#F7C97F]/50 hover:bg-[#F7C97F] hover:text-[#000208] sm:flex"
          >
            <ArrowRightIcon />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-[#F7C97F]'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};