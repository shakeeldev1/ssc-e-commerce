import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { useCurrentUser } from '@/features/auth/auth.api';
import { useMyQuoteRequests, useWholesaleCart, useWholesaleOrders } from '@/features/wholesale/wholesale.api';
import { formatDate, formatMoney } from '@/lib/format';

export const WholesaleBuyerOverviewPage = () => {
  const { data: user } = useCurrentUser();
  const { data: cart } = useWholesaleCart();
  const { data: orders } = useWholesaleOrders();
  const { data: quotes } = useMyQuoteRequests();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Wholesale buyer dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-ink-950">Welcome, {user?.fullName?.split(' ')[0] ?? 'buyer'}</h1>
        <p className="mt-2 text-sm text-slate-500">Manage bulk purchasing, quote requests, and wholesale orders.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Cart items" value={cart?.totalItems ?? 0} href="/wholesale/catalogue" />
        <Metric label="Wholesale orders" value={orders?.total ?? 0} href="/wholesale/orders" />
        <Metric label="Open quote requests" value={quotes?.filter((quote) => quote.status === 'open').length ?? 0} href="/wholesale/quotes" />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Order activity</p><h2 className="mt-2 text-xl font-bold text-ink-950">Recent wholesale orders</h2></div>
          <Link to="/wholesale/orders" className="text-sm font-semibold text-brand-600">View all</Link>
        </div>
        <div className="mt-6 divide-y divide-slate-100">
          {(orders?.items ?? []).slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div><p className="font-semibold text-ink-950">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{formatDate(order.createdAt)}</p></div>
              <div className="text-right"><p className="font-semibold text-ink-950">{formatMoney(order.totalAmount)}</p><p className="mt-1 text-xs capitalize text-slate-500">{order.status}</p></div>
            </div>
          ))}
          {(!orders || orders.items.length === 0) && <p className="py-8 text-sm text-slate-500">No wholesale orders yet.</p>}
        </div>
      </Card>
    </div>
  );
};

const Metric = ({ label, value, href }: { label: string; value: number; href: string }) => (
  <Link to={href}><Card className="p-5 transition-transform hover:-translate-y-0.5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold text-ink-950">{value}</p></Card></Link>
);
