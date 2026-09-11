import { useRef, type ReactNode } from 'react';

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const HorizontalScroller = ({ children }: { children: ReactNode }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <div className="group/rail relative">
      <button
        type="button"
        onClick={() => scrollBy('left')}
        aria-label="Scroll left"
        className="absolute top-1/2 left-0 z-1 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:text-brand-600 group-hover/rail:flex"
      >
        <ChevronLeft />
      </button>

      <div
        ref={trackRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-1 pb-1"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollBy('right')}
        aria-label="Scroll right"
        className="absolute top-1/2 right-0 z-1 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:text-brand-600 group-hover/rail:flex"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
