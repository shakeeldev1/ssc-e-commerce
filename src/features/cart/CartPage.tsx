import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/features/cart/cart.api';
import type { CartItem } from '@/features/cart/cart.types';
import { useValidateCoupon } from '@/features/coupons/coupons.api';
import { useCheckoutStore } from '@/features/orders/checkout.store';
import { getApiErrorMessage } from '@/lib/api-types';
import { formatMoney } from '@/lib/format';

const CartLine = ({ item }: { item: CartItem }) => {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const image = item.productVariant.product.images.find((img) => img.isPrimary);
  const attributeSummary = Object.values(item.productVariant.attributes).join(' / ');

  return (
    <div className="flex gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-slate-100">
        {image ? (
          <img src={image.url} alt="" className="h-full w-full rounded-md object-cover" />
        ) : (
          <span className="text-xl font-semibold text-slate-300">
            {item.productVariant.product.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Link
          to={`/products/${item.productVariant.product.id}`}
          className="text-sm font-medium text-slate-800 hover:text-brand-600"
        >
          {item.productVariant.product.name}
        </Link>
        {attributeSummary && <span className="text-xs text-slate-400">{attributeSummary}</span>}
        <span className="text-sm font-semibold text-slate-900">
          {formatMoney(item.productVariant.price)}
        </span>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem.mutate(item.productVariantId)}
          className="text-xs text-slate-400 hover:text-red-600"
        >
          Remove
        </button>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) =>
            updateItem.mutate({
              variantId: item.productVariantId,
              quantity: Math.max(1, Number(e.target.value)),
            })
          }
          className="w-16 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-brand-500"
        />
      </div>
    </div>
  );
};

export const CartPage = () => {
  const { data: cart, isLoading } = useCart();
  const navigate = useNavigate();
  const validateCoupon = useValidateCoupon();
  const { couponCode, discountAmount, setCoupon } = useCheckoutStore();
  const [couponInput, setCouponInput] = useState(couponCode ?? '');
  const [couponError, setCouponError] = useState<string | null>(null);

  const applyCoupon = async () => {
    if (!couponInput) return;
    setCouponError(null);
    try {
      const result = await validateCoupon.mutateAsync(couponInput);
      setCoupon(couponInput, result.discountAmount);
    } catch (error) {
      setCoupon(null, 0);
      setCouponError(getApiErrorMessage(error, 'Invalid coupon code'));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-500">Your cart is empty.</p>
        <Link to="/products" className="mt-4 inline-block font-medium text-brand-600">
          Continue shopping
        </Link>
      </div>
    );
  }

  const total = Math.max(0, cart.subtotal - discountAmount);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <Card className="p-4">
        <h1 className="mb-2 text-lg font-semibold text-slate-900">Your cart ({cart.totalItems})</h1>
        {cart.items.map((item) => (
          <CartLine key={item.id} item={item} />
        ))}
      </Card>

      <Card className="h-fit space-y-4 p-4">
        <h2 className="font-semibold text-slate-900">Order summary</h2>

        <div className="flex gap-2">
          <Input
            placeholder="Coupon code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <Button variant="outline" onClick={applyCoupon} isLoading={validateCoupon.isPending}>
            Apply
          </Button>
        </div>
        {couponError && <Alert tone="error">{couponError}</Alert>}
        {couponCode && discountAmount > 0 && (
          <Alert tone="success">
            Coupon "{couponCode}" applied: -{formatMoney(discountAmount)}
          </Alert>
        )}

        <div className="space-y-1 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatMoney(cart.subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-{formatMoney(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
          Proceed to checkout
        </Button>
      </Card>
    </div>
  );
};
