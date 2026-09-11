import { Link } from 'react-router-dom';
import { HorizontalScroller } from '@/components/ui/HorizontalScroller';
import { Spinner } from '@/components/ui/Spinner';
import { useProducts } from '@/features/catalog/catalog.api';
import type { ListProductsParams } from '@/features/catalog/catalog.types';
import { ProductCard } from '@/features/catalog/ProductCard';

interface ProductRailProps {
  title: string;
  viewAllHref?: string;
  params: ListProductsParams;
}

/** A titled, horizontally-scrolling row of products — the building block for most homepage sections. */
export const ProductRail = ({ title, viewAllHref, params }: ProductRailProps) => {
  const { data, isLoading } = useProducts(params);

  if (isLoading) {
    return (
      <section className="luxury-section">
        <div className="luxury-container">
          <p className="luxury-kicker">Curated for you</p>
          <h2 className="luxury-title mt-3">{title}</h2>
        </div>
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      </section>
    );
  }

  if (!data || data.items.length === 0) {
    return null;
  }

  return (
    <section className="luxury-section">
      <div className="luxury-container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="luxury-kicker">Curated for you</p>
            <h2 className="luxury-title mt-3">{title}</h2>
          </div>
          {viewAllHref && <Link to={viewAllHref} className="pb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#F7C87F] hover:text-white">View all</Link>}
        </div>
      <div className="mt-8">
      <HorizontalScroller>
        {data.items.map((product) => (
          <div key={product.id} className="w-40 shrink-0 sm:w-48">
            <ProductCard product={product} />
          </div>
        ))}
      </HorizontalScroller>
      </div>
      </div>
    </section>
  );
};
