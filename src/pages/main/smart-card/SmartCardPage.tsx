import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const SmartCardPage = () => (
  <div>
    <PageHeader
      title="The Student Smart Card"
      subtitle="A verified student identity, issued through your school, that unlocks real savings."
    />

    <div className="mx-auto max-w-3xl space-y-12">
      <section>
        <SectionHeading title="What is the Smart Card?" />
        <p className="text-slate-600">
          The Student Smart Card is a physical card issued to you through your school, college or
          university. Once activated on this platform, it links your verified student identity to
          your account here — unlocking student-only pricing and a QR code merchants can check
          instantly.
        </p>
      </section>

      <section>
        <SectionHeading title="Benefits" />
        <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <li className="rounded-lg bg-neutral-100 p-4">Discounted pricing on eligible products</li>
          <li className="rounded-lg bg-neutral-100 p-4">Instant QR-code identity verification</li>
          <li className="rounded-lg bg-neutral-100 p-4">One account across retail and wholesale</li>
          <li className="rounded-lg bg-neutral-100 p-4">Recognized across partner institutions</li>
        </ul>
      </section>

      <section>
        <SectionHeading title="Eligibility" />
        <p className="text-slate-600">
          Any student at a partner school, college or university can receive a card. Your
          institution issues the physical card; you activate it here to start using it online.
        </p>
      </section>

      <section>
        <SectionHeading title="Activation process" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { step: '1', text: 'Enter your card number and email to receive a one-time code.' },
            {
              step: '2',
              text: 'Verify the code — your card and profile are linked automatically.',
            },
            { step: '3', text: 'Set a password and start shopping with your student discount.' },
          ].map((item) => (
            <Card key={item.step} className="p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-sm font-bold text-brand-300">
                {item.step}
              </span>
              <p className="mt-3 text-sm text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Renewal, replacement & QR verification" />
        <p className="text-slate-600">
          Cards can be renewed before they expire, or reported lost and replaced, from your account
          once signed in. Each active card carries a unique QR code that merchants and partner
          checkouts can scan to verify eligibility on the spot.
        </p>
      </section>

      <div className="rounded-xl bg-ink-950 p-8 text-center text-white">
        <h2 className="text-lg font-bold">Manage your Smart Card</h2>
        <p className="mt-2 text-sm text-white/70">
          Sign in to activate a new card, renew, or check your QR code.
        </p>
        <Link to="/account">
          <Button variant="secondary" size="lg" className="mt-4">
            Go to my account
          </Button>
        </Link>
      </div>
    </div>
  </div>
);
