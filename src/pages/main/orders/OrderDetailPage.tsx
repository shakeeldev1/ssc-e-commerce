import { useLocation, useParams } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useOrder } from '@/features/orders/orders.api';
import { OrderStatusBadge } from '@/features/orders/OrderStatusBadge';
import { ReturnRequestForm } from '@/features/returns/ReturnRequestForm';
import { formatDate, formatMoney } from '@/lib/format';

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const justPlaced = Boolean((location.state as { justPlaced?: boolean } | null)?.justPlaced);
  const { data: order, isLoading, isError } = useOrder(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !order) {
    return <p className="py-24 text-center text-red-600">Order not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {justPlaced && <Alert tone="success">Your order has been placed successfully!</Alert>}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Order {order.orderNumber}</h1>
          <span className="text-sm text-slate-500">Placed on {formatDate(order.createdAt)}</span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <Card className="p-4">
        <h2 className="mb-3 font-semibold text-slate-900">Items</h2>
        <ul className="divide-y divide-slate-100">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 text-sm">
              <div>
                <p className="font-medium text-slate-800">{item.productName}</p>
                <p className="text-xs text-slate-400">
                  {item.sku}
                  {Object.values(item.variantAttributes).length > 0 &&
                    ` · ${Object.values(item.variantAttributes).join(' / ')}`}{' '}
                  × {item.quantity}
                </p>
              </div>
              <span className="font-medium text-slate-800">{formatMoney(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatMoney(order.subtotal)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-{formatMoney(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatMoney(order.totalAmount)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 font-semibold text-slate-900">Shipping address</h2>
        <p className="text-sm text-slate-700">
          {order.shippingAddress.fullName} · {order.shippingAddress.phone}
          <br />
          {order.shippingAddress.line1}
          {order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''}
          <br />
          {order.shippingAddress.city}, {order.shippingAddress.state}
          {order.shippingAddress.postalCode ? ` ${order.shippingAddress.postalCode}` : ''}
        </p>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 font-semibold text-slate-900">Order tracking</h2>
        <ul className="space-y-2">
          {order.statusHistory.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <OrderStatusBadge status={entry.status} />
                {entry.note && <span className="text-slate-500">{entry.note}</span>}
              </div>
              <span className="text-xs text-slate-400">{formatDate(entry.createdAt)}</span>
            </li>
          ))}
        </ul>
      </Card>

      {order.status === 'delivered' && (
        <Card className="p-4">
          <h2 className="mb-3 font-semibold text-slate-900">Need to return this order?</h2>
          <ReturnRequestForm orderId={order.id} />
        </Card>
      )}
    </div>
  );
};
