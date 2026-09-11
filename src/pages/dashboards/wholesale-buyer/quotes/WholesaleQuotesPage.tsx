import { Card } from '@/components/ui/Card';
import { useMyQuoteRequests } from '@/features/wholesale/wholesale.api';
import { formatDate } from '@/lib/format';

export const WholesaleQuotesPage = () => {
  const { data: quotes } = useMyQuoteRequests();
  return <div className="space-y-6"><header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">RFQ workspace</p><h1 className="mt-2 text-3xl font-bold text-ink-950">Quote requests</h1></header><div className="space-y-3">{(quotes ?? []).map((quote) => <Card key={quote.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold text-ink-950">{quote.productVariant?.product?.name ?? 'Wholesale product request'}</p><p className="mt-1 text-xs text-slate-400">Quantity: {quote.requestedQuantity} · {formatDate(quote.createdAt)}</p></div><span className="text-xs font-semibold capitalize text-brand-700">{quote.status}</span></Card>)}{(!quotes || quotes.length === 0) && <Card className="p-8 text-sm text-slate-500">No quote requests yet.</Card>}</div></div>;
};
