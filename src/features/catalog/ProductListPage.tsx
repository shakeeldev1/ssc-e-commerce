import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { useBrands, useCategories, useProducts } from '@/features/catalog/catalog.api';
import { ProductCard } from '@/features/catalog/ProductCard';

const PAGE_LIMIT = 20;

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const search = searchParams.get('search') ?? '';
  const categoryId = searchParams.get('categoryId') ?? '';
  const brandId = searchParams.get('brandId') ?? '';
  const studentOnly = searchParams.get('studentOnly') === 'true';

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const { data, isLoading, isError } = useProducts({
    page,
    limit: PAGE_LIMIT,
    search: search || undefined,
    categoryId: categoryId || undefined,
    brandId: brandId || undefined,
    isStudentDiscountEligible: studentOnly || undefined,
  });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page');
    setSearchParams(next);
  };

  const goToPage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;
  const selectedCategoryName = categories?.find((c) => c.id === categoryId)?.name;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          {selectedCategoryName ?? (studentOnly ? 'Student discount deals' : 'All products')}
        </h1>
        {data && <p className="text-sm text-slate-500">{data.total} products found</p>}
      </div>

      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
          <Input
            label="Search"
            placeholder="Search products..."
            defaultValue={search}
            onBlur={(e) => updateParam('search', e.target.value)}
            className="col-span-2 sm:col-span-1"
          />
          <Select
            label="Category"
            value={categoryId}
            onChange={(e) => updateParam('categoryId', e.target.value)}
          >
            <option value="">All categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Select
            label="Brand"
            value={brandId}
            onChange={(e) => updateParam('brandId', e.target.value)}
          >
            <option value="">All brands</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Select>
          <label className="flex items-end gap-2 pb-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={studentOnly}
              onChange={(e) => updateParam('studentOnly', e.target.checked ? 'true' : '')}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Student discount only
          </label>
        </div>
      </Card>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {isError && <p className="py-16 text-center text-red-600">Could not load products.</p>}

      {data && data.items.length === 0 && (
        <p className="py-16 text-center text-slate-500">No products match your filters.</p>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
