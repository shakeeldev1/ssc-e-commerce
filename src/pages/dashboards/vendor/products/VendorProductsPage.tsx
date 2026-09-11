import { Card } from '@/components/ui/Card';
import { useMyProducts } from '@/features/vendors/vendors.api';

export const VendorProductsPage = () => {
  const { data: products } = useMyProducts();
  return <div className="space-y-6"><header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Catalogue</p><h1 className="mt-2 text-3xl font-bold text-ink-950">My products</h1><p className="mt-2 text-sm text-slate-500">Manage the products and variants owned by your vendor account.</p></header><div className="space-y-3">{(products ?? []).map((product) => <Card key={product.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold text-ink-950">{product.name}</p><p className="mt-1 text-xs text-slate-400">{product.variants.length} variants · {product.isActive ? 'Active' : 'Inactive'}</p></div><span className="text-xs text-slate-500">{product.category?.name ?? 'Uncategorised'}</span></Card>)}{(!products || products.length === 0) && <Card className="p-8 text-sm text-slate-500">No products have been added yet.</Card>}</div></div>;
};
