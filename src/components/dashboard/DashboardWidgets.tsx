import type { ReactNode } from 'react';

export const DashboardPageHeader = ({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) => (
  <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p></div>
    {action}
  </header>
);

export const DashboardStat = ({ label, value, detail, icon, tone = 'gold' }: { label: string; value: string | number; detail?: string; icon: string; tone?: 'gold' | 'blue' | 'green' | 'violet' }) => {
  const tones = { gold: 'bg-amber-50 text-amber-700', blue: 'bg-blue-50 text-blue-700', green: 'bg-emerald-50 text-emerald-700', violet: 'bg-violet-50 text-violet-700' };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{value}</p></div><span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${tones[tone]}`}>{icon}</span></div>{detail && <p className="mt-3 text-xs text-slate-400">{detail}</p>}</div>;
};

export const DashboardPanel = ({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) => <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="text-base font-bold text-slate-950">{title}</h2>{subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}</div>{action}</div><div className="mt-5">{children}</div></section>;

export const DashboardBarChart = ({ values }: { values: Array<{ label: string; value: number }> }) => { const maximum = Math.max(...values.map((item) => item.value), 1); return <div className="flex h-44 items-end gap-2 sm:gap-4">{values.map((item) => <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-2"><div className="relative flex h-32 w-full items-end justify-center"><div className="w-full max-w-8 rounded-t-md bg-[#17283a] transition-all hover:bg-[#c48a2c]" style={{ height: `${Math.max((item.value / maximum) * 100, 5)}%` }} title={`${item.label}: ${item.value}`} /></div><span className="text-[10px] text-slate-400">{item.label}</span></div>)}</div>; };
