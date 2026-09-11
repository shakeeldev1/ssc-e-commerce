import { useState, type FormEvent } from 'react';
import { DashboardPageHeader, DashboardStat } from '@/components/dashboard/DashboardWidgets';
import { Card } from '@/components/ui/Card';
import { useAddWholesaleCartItem, useWholesaleCatalogue } from '@/features/wholesale/wholesale.api';
import { formatMoney } from '@/lib/format';

export const WholesaleCataloguePage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useWholesaleCatalogue(search, page);
  const addToCart = useAddWholesaleCartItem();
  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / 12));
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Wholesale catalogue"
        title="Source at scale"
        description="Browse wholesale-eligible products, confirm minimum quantities, and add stock to your procurement cart."
        action={
          <form onSubmit={submitSearch} className="flex gap-2">
            <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search catalogue..." className="w-44 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-brand-400 sm:w-56" />
            <button type="submit" className="rounded-xl bg-[#8a5b16] px-4 py-2.5 text-xs font-semibold text-white">Search</button>
          </form>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStat label="Available variants" value={data?.total ?? 0} detail="Wholesale eligible" icon="▦" tone="gold" />
        <DashboardStat label="Page" value={`${page} / ${totalPages}`} detail="Catalogue results" icon="#" tone="blue" />
        <DashboardStat label="MOQ aware" value="Yes" detail="Minimums enforced at checkout" icon="✓" tone="green" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading && <Card className="p-10 text-center text-sm text-slate-400 sm:col-span-2 xl:col-span-3">Loading catalogue...</Card>}
        {!isLoading && (data?.items ?? []).map((variant) => {
          const image = variant.product?.images?.find((item) => item.isPrimary) ?? variant.product?.images?.[0];
          return <Card key={variant.id} className="overflow-hidden p-0"><div className="flex aspect-[1.8/1] items-center justify-center bg-slate-100">{image ? <img src={image.url} alt={variant.product?.name ?? variant.sku} className="h-full w-full object-cover" /> : <span className="text-3xl font-bold text-slate-300">{variant.product?.name?.charAt(0) ?? 'P'}</span>}</div><div className="p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">{variant.sku}</p><h2 className="mt-2 line-clamp-2 font-bold text-slate-950">{variant.product?.name ?? 'Wholesale variant'}</h2><div className="mt-4 flex items-end justify-between gap-3"><div><p className="text-lg font-bold text-slate-950">{formatMoney(variant.price)}</p><p className="text-[11px] text-slate-400">MOQ: {variant.wholesaleMoq ?? 1} units</p></div><button type="button" onClick={() => addToCart.mutate({ productVariantId: variant.id, quantity: variant.wholesaleMoq ?? 1 })} disabled={addToCart.isPending} className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50">Add to cart</button></div></div></Card>;
        })}
        {!isLoading && data?.items.length === 0 && <Card className="p-10 text-center text-sm text-slate-400 sm:col-span-2 xl:col-span-3">No wholesale products match your search.</Card>}
      </div>
      <div className="flex items-center justify-between"><p className="text-xs text-slate-400">Page {page} of {totalPages}</p><div className="flex gap-2"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40">Previous</button><button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40">Next</button></div></div>
    </div>
  );
};
