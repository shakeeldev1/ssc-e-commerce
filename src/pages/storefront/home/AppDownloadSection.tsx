export const AppDownloadSection = () => (
  <section className="luxury-section">
    <div className="luxury-container flex flex-col items-center justify-between gap-8 border border-[#F7C87F]/20 bg-[#0d1822] p-8 text-center sm:flex-row sm:p-12 sm:text-left">
    <div>
      <span className="luxury-kicker">
        Coming soon
      </span>
      <h2 className="luxury-title mt-3 text-2xl">The SSC Store mobile app</h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
        We're building a mobile app for faster shopping, card verification, and order tracking on
        the go. For now, this website works great on your phone's browser.
      </p>
    </div>
    <div className="flex gap-3 opacity-60">
      <div className="rounded-sm border border-white/20 px-5 py-2.5 text-sm font-medium text-white/50">
        App Store — soon
      </div>
      <div className="rounded-sm border border-white/20 px-5 py-2.5 text-sm font-medium text-white/50">
        Google Play — soon
      </div>
    </div>
    </div>
  </section>
);
