import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { useAddToCart } from '@/features/cart/cart.api';
import type { Product } from '@/features/catalog/catalog.types';
import { formatMoney } from '@/lib/format';

export const ProductCard = ({ product }: { product: Product }) => {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];
  const activeVariant = product.variants.filter((variant) => variant.isActive).sort((a, b) => a.price - b.price)[0];
  const pricing = activeVariant ? { price: activeVariant.price, compareAt: activeVariant.compareAtPrice } : null;
  const addToCart = useAddToCart();

  return (
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-md !border-[#2b3b49] !bg-[#172633] !text-white shadow-none transition-all hover:-translate-y-1 hover:!border-[#F7C87F]/60 hover:shadow-xl hover:shadow-black/30">
        {product.isStudentDiscountEligible && <span className="absolute left-2 top-2 z-10 rounded-sm bg-[#F7C87F] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#071019]">Student deal</span>}
        <Link to={`/products/${product.id}`} className="flex aspect-[0.95] items-center justify-center !bg-[#1e3040]">
          {primaryImage ? <img src={primaryImage.url} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <span className="text-4xl font-semibold text-white/30">{product.name.charAt(0).toUpperCase()}</span>}
        </Link>
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          {product.brand && <span className="text-[9px] uppercase tracking-[0.12em] text-white/45">{product.brand.name}</span>}
          <Link to={`/products/${product.id}`} className="line-clamp-2 text-sm font-semibold text-white hover:text-[#F7C87F]">{product.name}</Link>
          <div className="mt-auto flex items-center gap-2 pt-2">
            {pricing ? (
              <>
                <span className="text-base font-bold text-white">
                  {formatMoney(pricing.price)}
                </span>
                {pricing.compareAt && pricing.compareAt > pricing.price && (
                    <span className="text-xs text-white/35 line-through">
                    {formatMoney(pricing.compareAt)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-white/35">Unavailable</span>
            )}
          </div>
          <button type="button" disabled={!activeVariant || addToCart.isPending} onClick={() => activeVariant && addToCart.mutate({ productVariantId: activeVariant.id, quantity: 1 })} className="mt-2 inline-flex w-full items-center justify-center rounded-sm border border-[#F7C87F]/60 px-3 py-2 text-[10px] font-bold text-[#F7C87F] transition-colors hover:bg-[#F7C87F] hover:text-[#071019] disabled:cursor-not-allowed disabled:border-white/15 disabled:text-white/30">{addToCart.isPending ? 'Adding...' : activeVariant ? 'Add to Cart' : 'Unavailable'}</button>
        </div>
      </Card>
  );
};
