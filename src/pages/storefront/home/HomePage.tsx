import { AppDownloadSection } from '@/pages/storefront/home/AppDownloadSection';
import { BenefitsSection } from '@/pages/storefront/home/BenefitsSection';
import { FeaturedVendorsSection } from '@/pages/storefront/home/FeaturedVendorsSection';
import { HomeHero } from '@/pages/storefront/home/HomeHero';
import { HowItWorks } from '@/pages/storefront/home/HowItWorks';
import { SmartCardIntro } from '@/pages/storefront/home/SmartCardIntro';
import { CategoryTiles } from '@/features/catalog/CategoryTiles';
import { ProductRail } from '@/features/catalog/ProductRail';

export const HomePage = () => {
  return (
    <div className="home-page w-full overflow-hidden bg-[#071019]">
      <HomeHero />
      <SmartCardIntro />
      <BenefitsSection />
      <HowItWorks />
      <ProductRail
        title="Student discount deals"
        viewAllHref="/products?studentOnly=true"
        params={{ page: 1, limit: 12, isStudentDiscountEligible: true }}
      />

      <ProductRail
        title="Featured products"
        viewAllHref="/products"
        params={{ page: 1, limit: 12 }}
      />

      <CategoryTiles />

      <FeaturedVendorsSection />

      <AppDownloadSection />
    </div>
  );
};
