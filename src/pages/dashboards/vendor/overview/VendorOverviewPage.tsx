import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { useCurrentUser } from '@/features/auth/auth.api';
import { useIncomingQuoteRequests, useMyProducts, useVendorProfile } from '@/features/vendors/vendors.api';

export const VendorOverviewPage = () => {
  const { data: user } = useCurrentUser();
  const { data: vendor } = useVendorProfile();
  const { data: products } = useMyProducts();
  const { data: quotes } = useIncomingQuoteRequests();

  return (
    <div className="space-y-8">
      <header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Vendor dashboard</p><h1 className="mt-2 text-3xl font-bold text-ink-950">Good to see you, {user?.fullName?.split(' ')[0] ?? 'partner'}</h1><p className="mt-2 text-sm text-slate-500">Monitor your catalogue and respond to wholesale demand.</p></header>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Catalogue items" value={products?.length ?? 0} href="/vendor/products" />
        <Metric label="Incoming RFQs" value={quotes?.filter((quote) => quote.status === 'open').length ?? 0} href="/vendor/quotes" />
        <Metric label="Application status" value={vendor?.status ?? 'pending'} href="/vendor/profile" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Catalogue health</p><h2 className="mt-2 text-xl font-bold text-ink-950">Your products</h2></div><Link to="/vendor/products" className="text-sm font-semibold text-brand-600">Manage</Link></div><div className="mt-6 divide-y divide-slate-100">{(products ?? []).slice(0, 5).map((product) => <div key={product.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="font-semibold text-ink-950">{product.name}</p><p className="mt-1 text-xs text-slate-400">{product.variants.length} variant{product.variants.length === 1 ? '' : 's'}</p></div><span className={`text-xs font-semibold ${product.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{product.isActive ? 'Active' : 'Inactive'}</span></div>)}{(!products || products.length === 0) && <p className="py-8 text-sm text-slate-500">Your catalogue is empty.</p>}</div></Card>
        <Card className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">Business profile</p><h2 className="mt-2 text-xl font-bold text-ink-950">{vendor?.businessName ?? 'Profile pending'}</h2><dl className="mt-6 space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Type</dt><dd className="font-medium text-ink-950">{vendor?.businessType ?? 'Not specified'}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Status</dt><dd className="font-medium capitalize text-brand-700">{vendor?.status ?? 'Pending'}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Documents</dt><dd className="font-medium text-ink-950">{vendor?.documents.length ?? 0}</dd></div></dl><Link to="/vendor/profile" className="mt-6 inline-flex text-sm font-semibold text-brand-600">View profile</Link></Card>
      </div>
    </div>
  );
};

const Metric = ({ label, value, href }: { label: string; value: number | string; href: string }) => <Link to={href}><Card className="p-5 transition-transform hover:-translate-y-0.5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold capitalize text-ink-950">{value}</p></Card></Link>;
