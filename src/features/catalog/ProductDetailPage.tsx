import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAddToCart } from '@/features/cart/cart.api';
import { useProduct } from '@/features/catalog/catalog.api';
import type { ProductVariant } from '@/features/catalog/catalog.types';
import { ReviewsSection } from '@/features/reviews/ReviewsSection';
import { getApiErrorMessage } from '@/lib/api-types';
import { formatMoney } from '@/lib/format';

const findMatchingVariant = (
  variants: ProductVariant[],
  selection: Record<string, string>,
): ProductVariant | undefined =>
  variants.find((variant) =>
    Object.entries(selection).every(([key, value]) => variant.attributes[key] === value),
  );

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id);
  const addToCart = useAddToCart();

  const [selection, setSelection] = useState<Record<string, string>>({});
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(
    null,
  );

  const attributeOptions = useMemo(() => {
    if (!product) return {};
    const options: Record<string, Set<string>> = {};
    for (const variant of product.variants) {
      for (const [key, value] of Object.entries(variant.attributes)) {
        options[key] ??= new Set();
        options[key].add(value);
      }
    }
    return options;
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return <p className="py-24 text-center text-red-600">Product not found.</p>;
  }

  const activeVariants = product.variants.filter((v) => v.isActive);
  const selectedVariant =
    activeVariants.length === 1
      ? activeVariants[0]
      : findMatchingVariant(activeVariants, selection);
  const images = product.images.length > 0 ? product.images : [];

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      setFeedback({ tone: 'error', message: 'Please choose all options first' });
      return;
    }
    try {
      await addToCart.mutateAsync({ productVariantId: selectedVariant.id, quantity });
      setFeedback({ tone: 'success', message: 'Added to cart' });
    } catch (error) {
      setFeedback({ tone: 'error', message: getApiErrorMessage(error, 'Could not add to cart') });
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-slate-100">
            {images[activeImage] ? (
              <img
                src={images[activeImage].url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-6xl font-semibold text-slate-300">
                {product.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 overflow-hidden rounded-md border-2 ${
                    index === activeImage ? 'border-brand-500' : 'border-transparent'
                  }`}
                >
                  <img src={image.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {product.brand && <span className="text-sm text-slate-500">{product.brand.name}</span>}
          <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          {product.isStudentDiscountEligible && <Badge tone="info">Student discount</Badge>}

          <div className="flex items-baseline gap-3">
            {selectedVariant ? (
              <>
                <span className="text-3xl font-bold text-slate-900">
                  {formatMoney(selectedVariant.price)}
                </span>
                {selectedVariant.compareAtPrice &&
                  selectedVariant.compareAtPrice > selectedVariant.price && (
                    <span className="text-lg text-slate-400 line-through">
                      {formatMoney(selectedVariant.compareAtPrice)}
                    </span>
                  )}
              </>
            ) : (
              <span className="text-lg text-slate-500">Select options to see price</span>
            )}
          </div>

          {Object.entries(attributeOptions).map(([key, values]) => (
            <div key={key}>
              <span className="text-sm font-medium capitalize text-slate-700">{key}</span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {[...values].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSelection((prev) => ({ ...prev, [key]: value }))}
                    className={`rounded-md border px-3 py-1.5 text-sm ${
                      selection[key] === value
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500"
            />
            <Button onClick={handleAddToCart} isLoading={addToCart.isPending} size="lg">
              Add to cart
            </Button>
          </div>

          {feedback && <Alert tone={feedback.tone}>{feedback.message}</Alert>}

          {product.description && (
            <p className="whitespace-pre-line pt-2 text-sm text-slate-600">{product.description}</p>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-slate-800">Specifications</h3>
              <dl className="mt-2 divide-y divide-slate-100 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1.5">
                    <dt className="text-slate-500">{key}</dt>
                    <dd className="text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      <ReviewsSection productId={product.id} />
    </div>
  );
};
