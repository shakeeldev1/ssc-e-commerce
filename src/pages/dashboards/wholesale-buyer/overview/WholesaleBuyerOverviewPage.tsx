import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { DashboardBarChart, DashboardPageHeader, DashboardStat } from '@/components/dashboard/DashboardWidgets';
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
      <DashboardPageHeader eyebrow="Wholesale buyer dashboard" title={`Welcome, ${user?.fullName?.split(' ')[0] ?? 'buyer'}`} description="Manage bulk purchasing, quote requests, and wholesale orders." action={<Link to="/wholesale/catalogue" className="rounded-xl bg-[#8a5b16] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6f4d17]">Browse catalogue</Link>} />

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat label="Cart items" value={cart?.totalItems ?? 0} detail="Bulk items ready" icon="□" tone="gold" />
        <DashboardStat label="Wholesale orders" value={orders?.total ?? 0} detail="All-time orders" icon="▤" tone="blue" />
        <DashboardStat label="Open quote requests" value={quotes?.filter((quote) => quote.status === 'open').length ?? 0} detail="Awaiting response" icon="◇" tone="violet" />
      </div>

      <Card className="p-6"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Procurement pulse</p><h2 className="mt-2 text-xl font-bold text-slate-950">Order status</h2></div><div className="mt-6"><DashboardBarChart values={['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status) => ({ label: status.slice(0, 3), value: orders?.items.filter((order) => order.status === status).length ?? 0 }))} /></div></Card>

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

