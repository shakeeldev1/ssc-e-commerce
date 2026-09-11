import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const QrIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="h-10 w-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 4.5A.75.75 0 0 1 4.5 3.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm-10.5 10.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.25 14.25h2.25v2.25h-2.25v-2.25Zm3.75 3.75h2.25v2.25H18v-2.25Zm-3.75 0h2.25M18 14.25h2.25"
    />
  </svg>
);

export const SmartCardIntro = () => (
  <section className="luxury-section">
    <div className="luxury-container grid gap-10 md:grid-cols-2 md:items-center">
    <div>
      <span className="luxury-kicker">
        The Student Smart Card
      </span>
      <h2 className="luxury-title mt-3">
        One card. Verified identity, real savings.
      </h2>
      <p className="mt-4 max-w-xl leading-7 text-white/55">
        Your Smart Card is issued through your school and links your verified student identity to
        this marketplace — unlocking student-only pricing on everyday essentials, with a QR code
        merchants can check in seconds.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/smart-card">
          <Button size="lg">How the Smart Card works</Button>
        </Link>
        <Link to="/student-benefits">
          <Button variant="outline" size="lg">
            See student benefits
          </Button>
        </Link>
      </div>
    </div>

    {/* A stylized card mockup — no photography needed for a premium look. */}
    <div className="mx-auto w-full max-w-sm rounded-sm border border-[#F7C87F]/30 bg-gradient-to-br from-[#27384a] via-[#0c151e] to-[#05090d] p-7 text-white shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-brand-300 uppercase">
          Smart Card
        </span>
        <QrIcon />
      </div>
      <div className="mt-10 text-lg font-semibold tracking-widest">•••• •••• •••• 4821</div>
      <div className="mt-6 flex items-center justify-between text-xs text-white/60">
        <span>STUDENT SMART CARD PAK</span>
        <span className="rounded-full bg-brand-300/20 px-2 py-0.5 text-brand-200">Active</span>
      </div>
    </div>
    </div>
  </section>
);
