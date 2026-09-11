import { Link, Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  <div className="min-h-screen bg-[#f5f7fa] text-slate-950">
    <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-[#05090d] p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full border border-[#F7C87F]/20" />
        <div className="pointer-events-none absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full border border-[#F7C87F]/10" />
        <div className="relative z-10">
          <Link to="/" className="font-serif text-3xl tracking-tight">SSC<span className="text-[#F7C87F]">Store</span></Link>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">Student Smart Card PAK</p>
        </div>
        <div className="relative z-10 max-w-md">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F7C87F]">A better way to shop</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-white">Everything you need, in one trusted place.</h1>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">Shop smarter with verified student benefits, reliable delivery, and a marketplace built around your everyday needs.</p>
        </div>
        <p className="relative z-10 text-xs text-white/35">Secure access to your SSC account</p>
      </aside>

      <main className="flex min-h-screen flex-col px-5 py-6 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl tracking-tight text-slate-950 lg:hidden">SSC<span className="text-[#c48a2c]">Store</span></Link>
          <Link to="/" className="ml-auto text-xs font-semibold text-slate-500 transition-colors hover:text-slate-950">Back to store</Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
            <Outlet />
          </div>
        </div>
        <p className="text-center text-[11px] text-slate-400">© {new Date().getFullYear()} Student Smart Card PAK</p>
      </main>
    </div>
  </div>
);
