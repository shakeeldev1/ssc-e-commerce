import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@/components/shell/storefront/Footer';
import { Navbar } from '@/components/shell/storefront/Navbar';

export const MainLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />

      <main
        className={`w-full flex-1 ${
          isHomePage ? '' : pathname === '/products' ? '' : 'mx-auto max-w-6xl px-4 py-8 sm:px-6'
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
