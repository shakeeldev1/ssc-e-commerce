import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogout } from '@/features/auth/auth.api';

export interface DashboardNavItem {
  to: string;
  label: string;
  end?: boolean;
  icon: string;
}

export interface DashboardNavGroup {
  label: string;
  items: DashboardNavItem[];
}

export interface DashboardConfig {
  eyebrow: string;
  title: string;
  description: string;
  accentClass: string;
  icon: string;
  groups: DashboardNavGroup[];
}

export const DashboardShell = ({ config, children }: { config: DashboardConfig; children: ReactNode }) => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-[72px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white ${config.accentClass}`}>
            {config.icon}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950">{config.title}</p>
            <p className="hidden text-xs text-slate-400 sm:block">{config.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button type="button" onClick={() => navigate('/')} className="hidden rounded-lg px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:block">Visit store</button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="hidden text-right md:block"><p className="text-sm font-semibold text-slate-800">{user?.fullName ?? 'Workspace user'}</p><p className="text-[11px] capitalize text-slate-400">{user?.role?.replaceAll('_', ' ')}</p></div>
            <button type="button" onClick={() => { logout.mutate(); navigate('/'); }} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50">Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden min-h-[calc(100vh-72px)] w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 lg:block">
          <nav className="space-y-7" aria-label={`${config.title} navigation`}>
            {config.groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? `${config.accentClass} text-white shadow-sm` : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}>
                      <span className="flex h-5 w-5 items-center justify-center text-xs opacity-80">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-10 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-semibold">Need assistance?</p>
            <p className="mt-2 text-[11px] leading-5 text-white/55">Visit the support center or contact the SSC team.</p>
            <button type="button" onClick={() => navigate('/contact')} className="mt-3 text-xs font-semibold text-brand-300 hover:text-white">Contact support</button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {config.groups.flatMap((group) => group.items).map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `shrink-0 rounded-full border px-3 py-2 text-xs font-semibold ${isActive ? `${config.accentClass} border-transparent text-white` : 'border-slate-200 bg-white text-slate-600'}`}>{item.label}</NavLink>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};
