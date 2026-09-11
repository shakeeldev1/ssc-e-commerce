import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductRail } from '@/features/catalog/ProductRail';

export const StudentBenefitsPage = () => (
  <div>
    <PageHeader
      title="Student benefits"
      subtitle="What your Smart Card unlocks across the marketplace."
    />

    <div className="space-y-12">
      <section className="mx-auto max-w-3xl">
        <SectionHeading title="How your benefits work" />
        <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-ink-950">Student discounts</h3>
            <p className="mt-1">
              Eligible products are marked with a student-discount badge and priced lower
              automatically once you're signed in.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-ink-950">Merchant offers</h3>
            <p className="mt-1">
              Vendors on the marketplace can opt individual products into the student-discount
              programme.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-ink-950">Partner benefits</h3>
            <p className="mt-1">
              Your institution's partnership with Student Smart Card PAK is what makes these
              benefits available in the first place.
            </p>
          </div>
        </div>
      </section>

      <ProductRail
        title="Available offers for students"
        viewAllHref="/products?studentOnly=true"
        params={{ page: 1, limit: 16, isStudentDiscountEligible: true }}
      />
    </div>
  </div>
);
