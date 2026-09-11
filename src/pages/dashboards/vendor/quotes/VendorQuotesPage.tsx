import { Card } from '@/components/ui/Card';
import { useIncomingQuoteRequests } from '@/features/vendors/vendors.api';
import { formatDate } from '@/lib/format';

export const VendorQuotesPage = () => {
  const { data: quotes } = useIncomingQuoteRequests();
  return <div className="space-y-6"><header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Wholesale demand</p><h1 className="mt-2 text-3xl font-bold text-ink-950">Incoming RFQs</h1><p className="mt-2 text-sm text-slate-500">Review buyer requests against your wholesale-eligible products.</p></header><div className="space-y-3">{(quotes ?? []).map((quote) => <Card key={quote.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold text-ink-950">{quote.productVariant?.product?.name ?? 'Product request'}</p><p className="mt-1 text-xs text-slate-400">Quantity: {quote.requestedQuantity} · {formatDate(quote.createdAt)}</p></div><span className="text-xs font-semibold capitalize text-brand-700">{quote.status}</span></Card>)}{(!quotes || quotes.length === 0) && <Card className="p-8 text-sm text-slate-500">No incoming quote requests.</Card>}</div></div>;
};
