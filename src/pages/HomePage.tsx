import { TrustBadges } from '@/components/ui/TrustBadges';
import { useCategories } from '@/features/catalog/catalog.api';
import { CategoryTiles } from '@/features/catalog/CategoryTiles';
import { ProductRail } from '@/features/catalog/ProductRail';
import { HomeHero } from '@/pages/HomeHero';

const MAX_CATEGORY_RAILS = 4;

export const HomePage = () => {
  const { data: categories } = useCategories();
  const topLevelCategories = (categories ?? []).filter((c) => c.parentId === null);

  return (
    <div className="space-y-12">
      <HomeHero />
      <TrustBadges />
      <CategoryTiles />

      <ProductRail
        title="Student discount deals"
        viewAllHref="/products?studentOnly=true"
        params={{ page: 1, limit: 12, isStudentDiscountEligible: true }}
      />

      <ProductRail title="New arrivals" viewAllHref="/products" params={{ page: 1, limit: 12 }} />

      {topLevelCategories.slice(0, MAX_CATEGORY_RAILS).map((category) => (
        <ProductRail
          key={category.id}
          title={`Shop ${category.name}`}
          viewAllHref={`/products?categoryId=${category.id}`}
          params={{ page: 1, limit: 12, categoryId: category.id }}
        />
      ))}
    </div>
  );
};
