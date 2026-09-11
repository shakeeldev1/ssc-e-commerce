import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Product } from '@/features/catalog/catalog.types';
import { formatMoney } from '@/lib/format';

const priceRange = (product: Product): { price: number; compareAt: number | null } | null => {
  const activeVariants = product.variants.filter((v) => v.isActive);
  if (activeVariants.length === 0) return null;
  const cheapest = activeVariants.reduce((min, v) => (v.price < min.price ? v : min));
  return { price: cheapest.price, compareAt: cheapest.compareAtPrice };
};

export const ProductCard = ({ product }: { product: Product }) => {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const pricing = priceRange(product);

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
        <div className="flex aspect-square items-center justify-center bg-slate-100">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <span className="text-4xl font-semibold text-slate-300">
              {product.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          {product.brand && <span className="text-xs text-slate-400">{product.brand.name}</span>}
          <h3 className="line-clamp-2 text-sm font-medium text-slate-800">{product.name}</h3>
          <div className="mt-auto flex items-center gap-2 pt-1">
            {pricing ? (
              <>
                <span className="text-base font-bold text-slate-900">
                  {formatMoney(pricing.price)}
                </span>
                {pricing.compareAt && pricing.compareAt > pricing.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatMoney(pricing.compareAt)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-slate-400">Unavailable</span>
            )}
          </div>
          {product.isStudentDiscountEligible && <Badge tone="info">Student discount</Badge>}
        </div>
      </Card>
    </Link>
  );
};
