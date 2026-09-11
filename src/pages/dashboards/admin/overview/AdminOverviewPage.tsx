import { Card } from '@/components/ui/Card';
import { DashboardBarChart, DashboardPageHeader, DashboardStat } from '@/components/dashboard/DashboardWidgets';
import { useAdminOrders, useAdminReturns, useAdminVendors, useLowStock, useNetRevenue } from '@/features/admin/admin.api';
import { formatDate, formatMoney } from '@/lib/format';

export const AdminOverviewPage = () => {
  const { data: orders } = useAdminOrders();
  const { data: vendors } = useAdminVendors();
  const { data: lowStock } = useLowStock();
  const { data: returns } = useAdminReturns();
  const { data: revenue } = useNetRevenue();
  const pendingVendors = vendors?.filter((vendor) => vendor.status === 'pending') ?? [];
  const openReturns = returns?.filter((request) => request.status === 'requested') ?? [];

  return (
    <div className="space-y-8">
      <DashboardPageHeader eyebrow="Platform operations" title="Admin overview" description="A clear view of the areas that need attention across SSC." action={<button type="button" className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800">Download report</button>} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat label="30-day net revenue" value={formatMoney(revenue?.netRevenue ?? 0)} detail="After refunds and commissions" icon="$" tone="gold" />
        <DashboardStat label="Orders" value={orders?.total ?? 0} detail="Across retail channels" icon="▤" tone="blue" />
        <DashboardStat label="Pending vendors" value={pendingVendors.length} detail="Require review" icon="◇" tone="violet" />
        <DashboardStat label="Low-stock items" value={lowStock?.length ?? 0} detail="Below threshold" icon="!" tone="green" />
      </div>

      <Card className="p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Performance</p><h2 className="mt-2 text-xl font-bold text-slate-950">Order volume</h2><p className="mt-1 text-xs text-slate-400">Recent orders grouped by status</p></div><span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">Live data</span></div><div className="mt-6"><DashboardBarChart values={['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((status) => ({ label: status.slice(0, 3), value: orders?.items.filter((order) => order.status === status).length ?? 0 }))} /></div></Card>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Order operations</p><h2 className="mt-2 text-xl font-bold text-ink-950">Recent orders</h2></div><span className="text-xs text-slate-400">Latest 8</span></div>
          <div className="mt-6 divide-y divide-slate-100">{(orders?.items ?? []).map((order) => <div key={order.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="font-semibold text-ink-950">{order.orderNumber}</p><p className="mt-1 text-xs text-slate-400">{formatDate(order.createdAt)}</p></div><div className="text-right"><p className="font-semibold text-ink-950">{formatMoney(order.totalAmount)}</p><p className="mt-1 text-xs capitalize text-slate-500">{order.status}</p></div></div>)}{(!orders || orders.items.length === 0) && <p className="py-8 text-sm text-slate-500">No orders found.</p>}</div>
        </Card>
        <Card className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Finance summary</p><h2 className="mt-2 text-xl font-bold text-ink-950">Last 30 days</h2><dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between"><dt className="text-slate-500">Gross revenue</dt><dd className="font-semibold text-ink-950">{formatMoney(revenue?.grossRevenue ?? 0)}</dd></div><div className="flex justify-between"><dt className="text-slate-500">Refunds</dt><dd className="font-semibold text-ink-950">{formatMoney(revenue?.totalRefunds ?? 0)}</dd></div><div className="flex justify-between border-t border-slate-100 pt-4"><dt className="text-slate-500">Net revenue</dt><dd className="font-bold text-brand-700">{formatMoney(revenue?.netRevenue ?? 0)}</dd></div></dl></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AttentionCard title="Vendor approvals" count={pendingVendors.length} items={pendingVendors.slice(0, 3).map((vendor) => vendor.businessName)} />
        <AttentionCard title="Returns to review" count={openReturns.length} items={openReturns.slice(0, 3).map((request) => request.orderNumber)} />
        <AttentionCard title="Low-stock alerts" count={lowStock?.length ?? 0} items={(lowStock ?? []).slice(0, 3).map((item) => item.productVariant?.product?.name ?? item.productVariantId)} />
      </div>
    </div>
  );
};

const AttentionCard = ({ title, count, items }: { title: string; count: number; items: string[] }) => <Card className="p-6"><div className="flex items-center justify-between"><h2 className="font-bold text-ink-950">{title}</h2><span className="rounded-full bg-brand-100 px-2 py-1 text-xs font-bold text-brand-700">{count}</span></div><div className="mt-5 space-y-3">{items.map((item) => <p key={item} className="truncate text-sm text-slate-600">{item}</p>)}{items.length === 0 && <p className="text-sm text-slate-400">Nothing needs attention.</p>}</div></Card>;
