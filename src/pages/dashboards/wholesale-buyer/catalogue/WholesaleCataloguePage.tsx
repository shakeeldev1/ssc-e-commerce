import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';

export const WholesaleCataloguePage = () => (
  <div className="space-y-6">
    <header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Wholesale catalogue</p><h1 className="mt-2 text-3xl font-bold text-ink-950">Bulk buying workspace</h1><p className="mt-2 max-w-2xl text-sm text-slate-500">Browse wholesale-eligible products, review minimum order quantities, and build your next bulk order.</p></header>
    <Card className="p-8"><p className="text-sm text-slate-600">The wholesale catalogue endpoint is ready at <span className="font-mono text-xs">/wholesale/variants</span>. Catalogue filters and add-to-wholesale-cart controls belong here in the next implementation step.</p><Link to="/wholesale" className="mt-5 inline-flex text-sm font-semibold text-brand-600">View wholesale information</Link></Card>
  </div>
);
