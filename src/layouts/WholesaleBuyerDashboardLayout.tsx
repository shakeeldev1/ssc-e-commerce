import { NavLink, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/wholesale/dashboard', label: 'Overview', end: true },
  { to: '/wholesale/catalogue', label: 'Wholesale catalogue' },
  { to: '/wholesale/orders', label: 'Orders' },
  { to: '/wholesale/quotes', label: 'Quote requests' },
];

export const WholesaleBuyerDashboardLayout = () => (
  <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
    <aside className="w-full shrink-0 lg:w-60">
      <div className="rounded-sm border border-slate-200 bg-white p-3 shadow-sm">
        <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">Wholesale workspace</p>
        <nav className="space-y-1" aria-label="Wholesale buyer dashboard">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `block rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-ink-950 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-ink-950'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
    <section className="min-w-0 flex-1"><Outlet /></section>
  </div>
);
