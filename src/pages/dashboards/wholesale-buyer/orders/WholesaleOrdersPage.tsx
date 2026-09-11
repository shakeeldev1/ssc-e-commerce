import { Card } from '@/components/ui/Card';
import { useWholesaleOrders } from '@/features/wholesale/wholesale.api';
import { formatDate, formatMoney } from '@/lib/format';

export const WholesaleOrdersPage = () => {
  const { data } = useWholesaleOrders();
  return <div className="space-y-6"><header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Wholesale orders</p><h1 className="mt-2 text-3xl font-bold text-ink-950">Order history</h1></header><div className="space-y-3">{(data?.items ?? []).map((order) => <Card key={order.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold text-ink-950">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{formatDate(order.createdAt)} · <span className="capitalize">{order.status}</span></p></div><p className="font-semibold text-ink-950">{formatMoney(order.totalAmount)}</p></Card>)}{(!data || data.items.length === 0) && <Card className="p-8 text-sm text-slate-500">No wholesale orders yet.</Card>}</div></div>;
};
