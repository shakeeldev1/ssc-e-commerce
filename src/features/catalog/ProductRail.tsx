import { HorizontalScroller } from '@/components/ui/HorizontalScroller';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
      <section>
        <SectionHeading title={title} viewAllHref={viewAllHref} />
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
    <section>
      <SectionHeading title={title} viewAllHref={viewAllHref} />
      <HorizontalScroller>
        {data.items.map((product) => (
          <div key={product.id} className="w-40 shrink-0 sm:w-48">
            <ProductCard product={product} />
          </div>
        ))}
      </HorizontalScroller>
    </section>
  );
};
