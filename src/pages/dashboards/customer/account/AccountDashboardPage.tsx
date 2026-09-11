import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useCurrentUser } from '@/features/auth/auth.api';
import { useCart } from '@/features/cart/cart.api';
import { useMyOrders } from '@/features/orders/orders.api';
import { useSmartCard, useStudentProfile } from '@/features/students/students.api';
import { formatDate, formatMoney } from '@/lib/format';

export const AccountDashboardPage = () => {
  const { data: user } = useCurrentUser();
  const { data: cart } = useCart();
  const { data: orders, isLoading: ordersLoading } = useMyOrders();
  const { data: profile } = useStudentProfile();
  const { data: card } = useSmartCard();

  const recentOrders = orders?.items.slice(0, 3) ?? [];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Customer dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-ink-950">Hello, {user?.fullName?.split(' ')[0] ?? 'there'}</h1>
        <p className="mt-2 text-sm text-slate-500">Your account, smart card, and shopping activity in one place.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardMetric label="Orders" value={orders?.total?.toString() ?? '0'} href="/orders" />
        <DashboardMetric label="Cart items" value={cart?.totalItems?.toString() ?? '0'} href="/cart" />
        <DashboardMetric label="Smart Card" value={card?.status ?? 'Not linked'} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Recent orders</p>
              <h2 className="mt-2 text-xl font-bold text-ink-950">Your latest activity</h2>
            </div>
            <Link to="/orders" className="text-sm font-semibold text-brand-600 hover:text-brand-700">View all</Link>
          </div>
          {ordersLoading ? <div className="flex justify-center py-10"><Spinner /></div> : recentOrders.length === 0 ? (
            <p className="py-10 text-sm text-slate-500">No orders yet. Start with something useful.</p>
          ) : (
            <div className="mt-6 divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <Link key={order.id} to={`/orders/${order.id}`} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <div><p className="font-semibold text-ink-950">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{formatDate(order.createdAt)}</p></div>
                  <div className="text-right"><p className="font-semibold text-ink-950">{formatMoney(order.totalAmount)}</p><p className="mt-1 text-xs capitalize text-slate-500">{order.status}</p></div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Student profile</p>
          <h2 className="mt-2 text-xl font-bold text-ink-950">{profile?.studentIdNumber ?? 'Profile pending'}</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Email</dt><dd className="truncate font-medium text-ink-950">{user?.email}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Institution</dt><dd className="font-medium text-ink-950">{profile?.externalInstitutionName ?? 'Not connected'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Card status</dt><dd className="font-medium capitalize text-brand-700">{card?.status ?? 'Not linked'}</dd></div>
          </dl>
          <Link to="/smart-card" className="mt-6 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700">Manage Smart Card</Link>
        </Card>
      </div>
    </div>
  );
};

const DashboardMetric = ({ label, value, href }: { label: string; value: string; href?: string }) => {
  const content = <Card className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold capitalize text-ink-950">{value}</p></Card>;
  return href ? <Link to={href} className="block hover:-translate-y-0.5">{content}</Link> : content;
};
