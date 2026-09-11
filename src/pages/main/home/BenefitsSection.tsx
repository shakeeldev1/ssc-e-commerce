const BENEFITS = [
  {
    title: 'Exclusive student pricing',
    description: 'Discounted rates on everyday essentials, verified by your card.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 8.25V6a3 3 0 1 1 6 0v2.25M9 8.25h6"
      />
    ),
  },
  {
    title: 'Instant QR verification',
    description: 'Merchants confirm your student status in seconds, online or in person.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.5h4.5v4.5h-4.5v-4.5Zm10.5 0h4.5v4.5h-4.5v-4.5Zm-10.5 10.5h4.5v4.5h-4.5v-4.5ZM14.25 14.25h6v6h-6v-6Z"
      />
    ),
  },
  {
    title: 'One card, every school',
    description: 'Issued through your institution and recognized across the platform.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347M12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814M12 3.493a59.903 59.903 0 0 0-10.399 5.84c.896.248 1.783.52 2.658.814m15.482 0a50.717 50.717 0 0 1 2.658.814M4.26 10.147a50.717 50.717 0 0 0-2.658.814"
      />
    ),
  },
  {
    title: 'Retail + wholesale access',
    description: 'Shop everyday essentials at retail, or buy in bulk on the wholesale marketplace.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.375 3h17.25M4.5 3v16.5A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-1.5V3M9 21V14.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V21"
      />
    ),
  },
];

export const BenefitsSection = () => (
  <section className="luxury-section luxury-section-light">
    <div className="luxury-container">
      <p className="luxury-kicker">Member advantages</p>
      <h2 className="luxury-title mt-3">Why students choose the Smart Card</h2>
    </div>
    <div className="luxury-container mt-8 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {BENEFITS.map((benefit) => (
        <div key={benefit.title} className="bg-[#0d1822] p-6">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-9 w-9 text-[#F7C87F]"
          >
            {benefit.icon}
          </svg>
          <h3 className="mt-5 text-sm font-semibold text-white">{benefit.title}</h3>
          <p className="mt-2 text-xs leading-6 text-white/50">{benefit.description}</p>
        </div>
      ))}
    </div>
  </section>
);
