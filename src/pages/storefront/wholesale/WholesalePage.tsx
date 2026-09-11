import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const WholesalePage = () => (
  <div>
    <PageHeader
      title="Wholesale Marketplace"
      subtitle="Bulk pricing, minimum order quantities, and quote-based ordering for businesses, resellers and institutions."
    />

    <div className="mx-auto max-w-3xl space-y-12">
      <section>
        <SectionHeading title="How wholesale buying works" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Minimum order quantities</h3>
            <p className="mt-1 text-sm text-slate-600">
              Wholesale-eligible products carry a minimum order quantity (MOQ) — the smallest
              quantity you can buy per line.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Bulk & negotiated pricing</h3>
            <p className="mt-1 text-sm text-slate-600">
              Prices step down at higher quantities, and approved buyers can receive buyer-specific
              negotiated rates.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Request for quotation (RFQ)</h3>
            <p className="mt-1 text-sm text-slate-600">
              Need a custom quantity or price? Submit an RFQ directly to the vendor for that
              product.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Vendor quotations</h3>
            <p className="mt-1 text-sm text-slate-600">
              The vendor responds with a fixed price, quantity and validity window — accept it to
              place your order at that exact rate.
            </p>
          </Card>
        </div>
      </section>

      <div className="rounded-xl bg-brand-300 p-8 text-center text-ink-950">
        <h2 className="text-lg font-bold">Ready to buy in bulk?</h2>
        <p className="mt-2 text-sm text-ink-800/80">
          Register as a wholesale buyer to start requesting quotes and ordering at wholesale prices.
        </p>
        <Link to="/register">
          <Button size="lg" className="mt-4">
            Register as a wholesale buyer
          </Button>
        </Link>
      </div>

      <section>
        <SectionHeading title="Sell on the wholesale marketplace" />
        <p className="text-slate-600">
          Vendors can also list wholesale-eligible products, set pricing tiers, and respond to buyer
          RFQs.{' '}
          <Link
            to="/vendors/sell-with-us"
            className="font-medium text-brand-600 hover:text-brand-700"
          >
            Apply as a wholesale vendor
          </Link>
          .
        </p>
      </section>
    </div>
  </div>
);
