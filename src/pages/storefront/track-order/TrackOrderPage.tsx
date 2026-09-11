import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/features/auth/auth.store';
import { useMyOrders } from '@/features/orders/orders.api';
import { OrderStatusBadge } from '@/features/orders/OrderStatusBadge';
import { formatDate } from '@/lib/format';

export const TrackOrderPage = () => {
  const isAuthenticated = Boolean(useAuthStore((state) => state.accessToken));

  if (!isAuthenticated) {
    return (
      <div>
        <PageHeader
          title="Track your order"
          subtitle="Sign in to see your order status and delivery updates."
        />
        <div className="mx-auto max-w-md text-center">
          <Link to="/login" state={{ from: '/track-order' }}>
            <Button size="lg">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return <TrackOrderList />;
};

const TrackOrderList = () => {
  const { data, isLoading } = useMyOrders();

  return (
    <div>
      <PageHeader title="Track your order" subtitle="Live status for every order you've placed." />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {data && data.items.length === 0 && (
        <p className="py-16 text-center text-slate-500">You have no orders to track yet.</p>
      )}

      <div className="mx-auto max-w-2xl space-y-3">
        {data?.items.map((order) => (
          <Link key={order.id} to={`/customer/orders/${order.id}`}>
            <Card className="flex items-center justify-between p-4 hover:shadow-md">
              <div>
                <span className="font-medium text-slate-800">{order.orderNumber}</span>
                <span className="ml-2 text-xs text-slate-400">{formatDate(order.createdAt)}</span>
              </div>
              <OrderStatusBadge status={order.status} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
