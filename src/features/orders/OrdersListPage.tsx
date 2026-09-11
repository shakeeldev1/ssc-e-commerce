import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useMyOrders } from '@/features/orders/orders.api';
import { OrderStatusBadge } from '@/features/orders/OrderStatusBadge';
import { formatDate, formatMoney } from '@/lib/format';

export const OrdersListPage = () => {
  const { data, isLoading } = useMyOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-500">You haven't placed any orders yet.</p>
        <Link to="/products" className="mt-4 inline-block font-medium text-brand-600">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">My orders</h1>
      {data.items.map((order) => (
        <Link key={order.id} to={`/orders/${order.id}`}>
          <Card className="flex items-center justify-between p-4 hover:shadow-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">{order.orderNumber}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <span className="text-xs text-slate-400">{formatDate(order.createdAt)}</span>
            </div>
            <span className="font-semibold text-slate-900">{formatMoney(order.totalAmount)}</span>
          </Card>
        </Link>
      ))}
    </div>
  );
};
