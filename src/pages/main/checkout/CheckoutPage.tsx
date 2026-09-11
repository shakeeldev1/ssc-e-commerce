import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { useCart } from '@/features/cart/cart.api';
import { useCheckoutStore } from '@/features/orders/checkout.store';
import { useCheckout } from '@/features/orders/orders.api';
import { getApiErrorMessage } from '@/lib/api-types';
import { formatMoney } from '@/lib/format';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Required'),
  phone: z.string().min(6, 'Required'),
  line1: z.string().min(3, 'Required'),
  line2: z.string().optional().or(z.literal('')),
  city: z.string().min(2, 'Required'),
  state: z.string().min(2, 'Required'),
  postalCode: z.string().optional().or(z.literal('')),
  paymentMethod: z.enum(['cod', 'online_stub']),
});

type AddressForm = z.infer<typeof addressSchema>;

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading } = useCart();
  const checkout = useCheckout();
  const { couponCode, campaignCode, discountAmount, reset } = useCheckoutStore();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { paymentMethod: 'cod' },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const total = Math.max(0, cart.subtotal - discountAmount);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const order = await checkout.mutateAsync({
        shippingAddress: {
          fullName: values.fullName,
          phone: values.phone,
          line1: values.line1,
          line2: values.line2 || undefined,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode || undefined,
          country: 'Pakistan',
        },
        paymentMethod: values.paymentMethod,
        couponCode: couponCode ?? undefined,
        campaignCode: campaignCode ?? undefined,
      });
      reset();
      navigate(`/orders/${order.id}`, { state: { justPlaced: true } });
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not place your order'));
    }
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <Card className="p-4">
        <h1 className="mb-4 text-lg font-semibold text-slate-900">Shipping details</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {serverError && <Alert tone="error">{serverError}</Alert>}
          <Input label="Full name" {...register('fullName')} error={errors.fullName?.message} />
          <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
          <Input label="Address line 1" {...register('line1')} error={errors.line1?.message} />
          <Input label="Address line 2 (optional)" {...register('line2')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" {...register('city')} error={errors.city?.message} />
            <Input label="State/Province" {...register('state')} error={errors.state?.message} />
          </div>
          <Input label="Postal code (optional)" {...register('postalCode')} />
          <Select label="Payment method" {...register('paymentMethod')}>
            <option value="cod">Cash on delivery</option>
            <option value="online_stub">Online payment</option>
          </Select>

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            Place order
          </Button>
        </form>
      </Card>

      <Card className="h-fit space-y-3 p-4">
        <h2 className="font-semibold text-slate-900">Order summary</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          {cart.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="line-clamp-1 pr-2">
                {item.productVariant.product.name} × {item.quantity}
              </span>
              <span>{formatMoney(item.productVariant.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-1 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatMoney(cart.subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount ({couponCode})</span>
              <span>-{formatMoney(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
