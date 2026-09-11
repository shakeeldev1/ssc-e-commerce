import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { DashboardBarChart, DashboardPageHeader, DashboardStat } from '@/components/dashboard/DashboardWidgets';
import { useCurrentUser } from '@/features/auth/auth.api';
import { useIncomingQuoteRequests, useMyProducts, useVendorProfile } from '@/features/vendors/vendors.api';

export const VendorOverviewPage = () => {
  const { data: user } = useCurrentUser();
  const { data: vendor } = useVendorProfile();
  const { data: products } = useMyProducts();
  const { data: quotes } = useIncomingQuoteRequests();

  return (
    <div className="space-y-8">
      <DashboardPageHeader eyebrow="Vendor dashboard" title={`Good to see you, ${user?.fullName?.split(' ')[0] ?? 'partner'}`} description="Monitor your catalogue and respond to wholesale demand." action={<Link to="/vendor/products" className="rounded-xl bg-[#176b61] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#12574f]">Manage catalogue</Link>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat label="Catalogue items" value={products?.length ?? 0} detail="Owned products" icon="▦" tone="green" />
        <DashboardStat label="Incoming RFQs" value={quotes?.filter((quote) => quote.status === 'open').length ?? 0} detail="Buyer demand" icon="◇" tone="gold" />
        <DashboardStat label="Application status" value={vendor?.status ?? 'pending'} detail="Business verification" icon="○" tone="blue" />
      </div>
      <Card className="p-6"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Catalogue performance</p><h2 className="mt-2 text-xl font-bold text-slate-950">Product mix</h2></div><div className="mt-6"><DashboardBarChart values={[{ label: 'Active', value: products?.filter((product) => product.isActive).length ?? 0 }, { label: 'Draft', value: products?.filter((product) => !product.isActive).length ?? 0 }, { label: 'RFQs', value: quotes?.length ?? 0 }]} /></div></Card>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Catalogue health</p><h2 className="mt-2 text-xl font-bold text-ink-950">Your products</h2></div><Link to="/vendor/products" className="text-sm font-semibold text-brand-600">Manage</Link></div><div className="mt-6 divide-y divide-slate-100">{(products ?? []).slice(0, 5).map((product) => <div key={product.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="font-semibold text-ink-950">{product.name}</p><p className="mt-1 text-xs text-slate-400">{product.variants.length} variant{product.variants.length === 1 ? '' : 's'}</p></div><span className={`text-xs font-semibold ${product.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{product.isActive ? 'Active' : 'Inactive'}</span></div>)}{(!products || products.length === 0) && <p className="py-8 text-sm text-slate-500">Your catalogue is empty.</p>}</div></Card>
        <Card className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Business profile</p><h2 className="mt-2 text-xl font-bold text-ink-950">{vendor?.businessName ?? 'Profile pending'}</h2><dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Type</dt><dd className="font-medium text-ink-950">{vendor?.businessType ?? 'Not specified'}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Status</dt><dd className="font-medium capitalize text-brand-700">{vendor?.status ?? 'Pending'}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Documents</dt><dd className="font-medium text-ink-950">{vendor?.documents.length ?? 0}</dd></div></dl><Link to="/vendor/profile" className="mt-6 inline-flex text-sm font-semibold text-brand-600">View profile</Link></Card>
      </div>
    </div>
  );
};

