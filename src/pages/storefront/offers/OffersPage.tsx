import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from '@/features/catalog/ProductRail';

export const OffersPage = () => (
  <div>
    <PageHeader
      title="Offers & discounts"
      subtitle="Student pricing, merchant promotions, and coupon codes — all in one place."
    />

    <div className="space-y-12">
      <ProductRail
        title="Student offers"
        viewAllHref="/products?studentOnly=true"
        params={{ page: 1, limit: 16, isStudentDiscountEligible: true }}
      />

      <section className="mx-auto max-w-3xl">
        <SectionHeading title="Have a coupon code?" />
        <p className="text-slate-600">
          Add items to your cart, then enter your coupon code there to see the discount applied
          before you check out.
        </p>
      </section>

      <ProductRail
        title="Featured products"
        viewAllHref="/products"
        params={{ page: 1, limit: 16 }}
      />
    </div>
  </div>
);
