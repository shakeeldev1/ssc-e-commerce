import { Link } from 'react-router-dom';
import { useCategories } from '@/features/catalog/catalog.api';

const TILE_GRADIENTS = [
  'from-[#162433] to-[#071019] text-white',
  'from-[#55401f] to-[#17130e] text-white',
  'from-[#20313a] to-[#071019] text-white',
  'from-[#3e2c24] to-[#111417] text-white',
  'from-[#243b42] to-[#071019] text-white',
  'from-[#4a3b25] to-[#111417] text-white',
];

const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.169.659 1.591l9.581 9.581c.699.699 1.83.699 2.528 0l7.078-7.078c.699-.699.699-1.829 0-2.528l-9.581-9.581A2.25 2.25 0 0 0 9.568 3Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
  </svg>
);

export const CategoryTiles = () => {
  const { data: categories } = useCategories();
  const topLevel = categories?.filter((c) => c.parentId === null) ?? [];

  if (topLevel.length === 0) {
    return null;
  }

  return (
    <section className="luxury-section luxury-section-light">
      <div className="luxury-container">
        <p className="luxury-kicker">Curated collections</p>
        <h2 className="luxury-title mt-3">Shop by category</h2>
        <p className="mt-3 max-w-xl text-sm text-white/55">Explore considered essentials and everyday luxuries, selected for the way you live, study, and work.</p>
      </div>
      <div className="luxury-container mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {topLevel.slice(0, 12).map((category, index) => (
          <Link
            key={category.id}
            to={`/products?categoryId=${category.id}`}
            className={`flex min-h-32 flex-col items-center justify-center gap-3 rounded-sm border border-white/10 bg-gradient-to-br p-4 text-center shadow-sm transition-transform hover:-translate-y-1 hover:border-[#F7C87F]/50 ${
              TILE_GRADIENTS[index % TILE_GRADIENTS.length]
            }`}
          >
            <TagIcon />
            <span className="line-clamp-2 text-xs font-semibold sm:text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
