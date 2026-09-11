import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const AboutPage = () => (
  <div>
    <PageHeader
      title="About Student Smart Card PAK"
      subtitle="Connecting verified student identity to real savings, retail, and wholesale."
    />

    <div className="mx-auto max-w-3xl space-y-12">
      <section>
        <SectionHeading title="What we do" />
        <p className="text-slate-600">
          Student Smart Card PAK issues a physical Smart Card through partner schools, colleges and
          universities, then extends it into a full marketplace. Card holders get verified discounts
          on everyday essentials, while the platform also runs a normal open retail store and a
          wholesale/B2B marketplace — anyone can shop, students simply get an additional advantage.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-ink-950">Our mission</h3>
          <p className="mt-2 text-sm text-slate-600">
            Make everyday shopping more affordable for students, while giving schools a simple way
            to extend real, verifiable benefits to the people they serve.
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-ink-950">Our vision</h3>
          <p className="mt-2 text-sm text-slate-600">
            A single trusted card that works everywhere a student shops — from daily essentials to
            bulk purchases for schools and institutions.
          </p>
        </div>
      </section>

      <section>
        <SectionHeading title="Why Student Smart Card" />
        <ul className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <li className="rounded-lg bg-neutral-100 p-4">
            <strong className="block text-ink-950">Verified, not guessed</strong>
            Every discount is tied to a real card issued through a real institution.
          </li>
          <li className="rounded-lg bg-neutral-100 p-4">
            <strong className="block text-ink-950">One platform, two markets</strong>A normal retail
            storefront plus a dedicated wholesale/B2B marketplace.
          </li>
          <li className="rounded-lg bg-neutral-100 p-4">
            <strong className="block text-ink-950">Built for institutions</strong>
            Schools can bring Smart Card benefits to their students without building anything
            themselves.
          </li>
          <li className="rounded-lg bg-neutral-100 p-4">
            <strong className="block text-ink-950">Open to everyone</strong>
            No card, no problem — anyone can register and shop; students simply save more.
          </li>
        </ul>
      </section>
    </div>
  </div>
);
