import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCategories } from '@/features/catalog/catalog.api';

const TILE_GRADIENTS = [
  'from-brand-500 to-brand-700',
  'from-amber-400 to-amber-600',
  'from-emerald-500 to-emerald-700',
  'from-rose-400 to-rose-600',
  'from-violet-500 to-violet-700',
  'from-cyan-500 to-cyan-700',
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
    <section>
      <SectionHeading title="Shop by category" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {topLevel.slice(0, 12).map((category, index) => (
          <Link
            key={category.id}
            to={`/products?categoryId=${category.id}`}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-br p-4 text-center text-white shadow-sm transition-transform hover:scale-[1.03] ${
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
