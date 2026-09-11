export const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="-mx-4 -mt-8 mb-10 bg-ink-950 px-4 py-12 text-center text-white sm:-mx-6 sm:px-6">
    <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
    {subtitle && <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">{subtitle}</p>}
  </div>
);
