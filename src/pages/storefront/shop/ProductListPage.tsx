import { useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useBrands, useCategories, useProducts } from '@/features/catalog/catalog.api';
import { ProductCard } from '@/features/catalog/ProductCard';

const PAGE_LIMIT = 18;

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';
  const categoryId = searchParams.get('categoryId') ?? '';
  const brandId = searchParams.get('brandId') ?? '';
  const studentOnly = searchParams.get('studentOnly') === 'true';
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data, isLoading, isError } = useProducts({ page, limit: PAGE_LIMIT, search: search || undefined, categoryId: categoryId || undefined, brandId: brandId || undefined, isStudentDiscountEligible: studentOnly || undefined });
  const selectedCategoryName = categories?.find((category) => category.id === categoryId)?.name;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    next.delete('page');
    setSearchParams(next);
  };
  const goToPage = (nextPage: number) => { const next = new URLSearchParams(searchParams); next.set('page', String(nextPage)); setSearchParams(next); };

  return <div className="min-h-screen bg-[#071019] text-white">
    <section className="border-b border-white/10 bg-[#0d1a25] px-5 py-12 text-center sm:py-16"><p className="luxury-kicker">Curated marketplace</p><h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl">{selectedCategoryName ?? (studentOnly ? 'Student discount deals' : 'Shop products')}</h1><p className="mt-3 text-xs text-white/45">Home <span className="px-2 text-[#F7C87F]">›</span> Shop</p></section>
    <div className="mx-auto flex w-full max-w-[1440px] gap-8 px-4 py-8 sm:px-8 lg:px-12">
      <aside className={`${mobileFiltersOpen ? 'block' : 'hidden'} fixed inset-x-4 top-24 z-30 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1822] p-5 shadow-2xl lg:static lg:block lg:max-h-none lg:w-56 lg:shrink-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
        <div className="flex items-center justify-between lg:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Categories</p><button type="button" onClick={() => setMobileFiltersOpen(false)} className="text-xs text-white/50 lg:hidden">Close</button></div>
        <div className="mt-4 space-y-1 border-b border-white/10 pb-5"><button type="button" onClick={() => updateParam('categoryId', '')} className={`block w-full rounded px-2 py-1.5 text-left text-xs ${!categoryId ? 'bg-[#F7C87F]/15 text-[#F7C87F]' : 'text-white/55 hover:text-white'}`}>All categories</button>{(categories ?? []).filter((category) => category.parentId === null).slice(0, 12).map((category) => <button key={category.id} type="button" onClick={() => updateParam('categoryId', category.id)} className={`block w-full rounded px-2 py-1.5 text-left text-xs ${categoryId === category.id ? 'bg-[#F7C87F]/15 text-[#F7C87F]' : 'text-white/55 hover:text-white'}`}>{category.name}</button>)}</div>
        <FilterSection title="Brands">{(brands ?? []).slice(0, 8).map((brand) => <label key={brand.id} className="flex items-center gap-2 py-1.5 text-xs text-white/55"><input type="radio" name="brand" checked={brandId === brand.id} onChange={() => updateParam('brandId', brand.id)} className="accent-[#F7C87F]" />{brand.name}</label>)}</FilterSection>
        <FilterSection title="Student benefits"><label className="flex items-center gap-2 text-xs text-white/60"><input type="checkbox" checked={studentOnly} onChange={(event) => updateParam('studentOnly', event.target.checked ? 'true' : '')} className="accent-[#F7C87F]" />Student discount eligible</label></FilterSection>
      </aside>

      <main className="min-w-0 flex-1"><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-serif text-2xl text-white">{selectedCategoryName ?? 'All products'}</h2><p className="mt-1 text-xs text-white/40">{data?.total ?? 0} products found</p></div><button type="button" onClick={() => setMobileFiltersOpen(true)} className="w-fit rounded border border-white/15 px-3 py-2 text-xs text-white/70 lg:hidden">Filters</button></div>{search && <div className="mb-5 flex items-center gap-2 rounded border border-[#F7C87F]/20 bg-[#F7C87F]/5 px-3 py-2 text-xs text-[#F7C87F]">Searching for “{search}”<button type="button" onClick={() => updateParam('search', '')} className="ml-auto text-white/60">Clear</button></div>}{isLoading && <div className="flex justify-center py-20"><Spinner size="lg" /></div>}{isError && <Card className="border-red-900/50 bg-[#1b1114] p-10 text-center text-sm text-red-300">Could not load products.</Card>}{data && data.items.length === 0 && <Card className="border-white/10 bg-[#0d1822] p-16 text-center"><p className="font-serif text-2xl text-white">No products found</p><p className="mt-2 text-sm text-white/45">Try another category or clear your filters.</p><button type="button" onClick={() => setSearchParams({})} className="mt-5 rounded bg-[#F7C87F] px-5 py-2.5 text-xs font-bold text-[#071019]">Clear all filters</button></Card>}{data && data.items.length > 0 && <><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">{data.items.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="mt-8 flex items-center justify-center gap-4"><Button variant="outlineLight" size="sm" disabled={page <= 1} onClick={() => goToPage(page - 1)}>Previous</Button><span className="text-xs text-white/45">Page {page} of {totalPages}</span><Button variant="outlineLight" size="sm" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>Next</Button></div></>}</main>
    </div>
  </div>;
};

const FilterSection = ({ title, children }: { title: string; children: ReactNode }) => <div className="border-b border-white/10 py-5"><h3 className="mb-3 text-xs font-bold text-white">{title}</h3>{children}</div>;
