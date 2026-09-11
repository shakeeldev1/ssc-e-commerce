import { useState, type FormEvent } from 'react';
import { DashboardPageHeader, DashboardStat } from '@/components/dashboard/DashboardWidgets';
import { Card } from '@/components/ui/Card';
import { useAdminOrderStats, useAdminOrders, useUpdateAdminOrderStatus } from '@/features/admin/admin.api';
import type { OrderStatus } from '@/features/orders/orders.types';
import { formatDate, formatMoney } from '@/lib/format';

const STATUS_OPTIONS: Array<{ value: OrderStatus | ''; label: string }> = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'returned', label: 'Returned' },
];

export const AdminOrdersPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<OrderStatus | ''>('');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminOrders({ search: search || undefined, status: status || undefined, page });
  const { counts } = useAdminOrderStats();
  const updateStatus = useUpdateAdminOrderStatus();
  const totalOrders = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / 8));

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader eyebrow="Order operations" title="Orders" description="Search, review, and move customer orders through the fulfilment lifecycle." action={<button type="button" className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800">Export orders</button>} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStat label="All orders" value={totalOrders} detail="Across every status" icon="▤" tone="blue" />
        <DashboardStat label="In progress" value={counts.processing + counts.confirmed + counts.shipped} detail="Confirmed to shipped" icon="↗" tone="gold" />
        <DashboardStat label="Delivered" value={counts.delivered} detail="Completed orders" icon="✓" tone="green" />
        <DashboardStat label="Needs attention" value={counts.pending + counts.returned} detail="Pending or returned" icon="!" tone="violet" />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div><h2 className="text-base font-bold text-slate-950">Order register</h2><p className="mt-1 text-xs text-slate-400">{data?.total ?? 0} matching orders</p></div>
            <form onSubmit={submitSearch} className="flex w-full gap-2 lg:max-w-md">
              <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search order, invoice, customer..." className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs outline-none placeholder:text-slate-400 focus:border-brand-400 focus:bg-white" />
              <button type="submit" className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800">Search</button>
            </form>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {STATUS_OPTIONS.map((option) => <button key={option.value || 'all'} type="button" onClick={() => { setStatus(option.value); setPage(1); }} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${status === option.value ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400'}`}>{option.label}</button>)}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.15em] text-slate-400"><tr><th className="px-6 py-3 font-semibold">Order</th><th className="px-6 py-3 font-semibold">Customer</th><th className="px-6 py-3 font-semibold">Date</th><th className="px-6 py-3 font-semibold">Payment</th><th className="px-6 py-3 font-semibold">Total</th><th className="px-6 py-3 font-semibold">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{isLoading ? <tr><td colSpan={6} className="px-6 py-14 text-center text-sm text-slate-400">Loading orders...</td></tr> : (data?.items ?? []).map((order) => <tr key={order.id} className="hover:bg-slate-50"><td className="px-6 py-4"><p className="text-sm font-semibold text-slate-950">{order.orderNumber}</p><p className="mt-1 text-[11px] text-slate-400">{order.invoiceNumber}</p></td><td className="px-6 py-4"><p className="text-sm font-medium text-slate-700">{order.shippingAddress.fullName}</p><p className="mt-1 text-[11px] text-slate-400">{order.shippingAddress.city}</p></td><td className="px-6 py-4 text-xs text-slate-500">{formatDate(order.createdAt)}</td><td className="px-6 py-4"><span className="text-xs capitalize text-slate-600">{order.paymentStatus}</span></td><td className="px-6 py-4 text-sm font-bold text-slate-950">{formatMoney(order.totalAmount)}</td><td className="px-6 py-4"><select value={order.status} onChange={(event) => updateStatus.mutate({ orderId: order.id, status: event.target.value as OrderStatus })} disabled={updateStatus.isPending} className={`rounded-lg border-0 px-2.5 py-1.5 text-xs font-semibold capitalize outline-none ${statusTone(order.status)}`} aria-label={`Update status for ${order.orderNumber}`}>{STATUS_OPTIONS.slice(1).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></td></tr>)}{!isLoading && data?.items.length === 0 && <tr><td colSpan={6} className="px-6 py-14 text-center text-sm text-slate-400">No orders match these filters.</td></tr>}</tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 sm:px-6"><p className="text-xs text-slate-400">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Previous</button><button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>
      </Card>
    </div>
  );
};

const statusTone = (status: OrderStatus) => ({ pending: 'bg-amber-50 text-amber-700', confirmed: 'bg-blue-50 text-blue-700', processing: 'bg-violet-50 text-violet-700', shipped: 'bg-cyan-50 text-cyan-700', delivered: 'bg-emerald-50 text-emerald-700', cancelled: 'bg-rose-50 text-rose-700', returned: 'bg-orange-50 text-orange-700' })[status];
