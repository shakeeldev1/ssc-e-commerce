import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const SchoolsPage = () => (
  <div>
    <PageHeader
      title="Schools, colleges & universities"
      subtitle="Bring Smart Card benefits to your students."
    />

    <div className="mx-auto max-w-3xl space-y-12">
      <section>
        <SectionHeading title="Partnership overview" />
        <p className="text-slate-600">
          Student Smart Card PAK partners with schools, colleges and universities to issue Smart
          Cards to their students. Once your institution is onboarded, your students can activate
          their cards and start using their benefits on this platform.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <h3 className="font-semibold text-ink-950">Registration & onboarding</h3>
          <p className="mt-1 text-sm text-slate-600">
            Our team works with your institution to get set up in the region/district/institution
            directory.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-ink-950">Smart Card management</h3>
          <p className="mt-1 text-sm text-slate-600">
            Cards are issued per student and activated by the student themselves — no manual data
            entry on your end.
          </p>
        </Card>
        <Card className="p-5">
          <h3 className="font-semibold text-ink-950">Student benefits</h3>
          <p className="mt-1 text-sm text-slate-600">
            Your students get access to student-only pricing across the retail marketplace,
            automatically.
          </p>
        </Card>
      </section>

      <div className="rounded-xl bg-ink-950 p-8 text-center text-white">
        <h2 className="text-lg font-bold">Interested in a school partnership?</h2>
        <p className="mt-2 text-sm text-white/70">
          Reach out and our team will walk you through onboarding your institution.
        </p>
        <Link to="/contact">
          <Button variant="secondary" size="lg" className="mt-4">
            Contact our partnerships team
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
