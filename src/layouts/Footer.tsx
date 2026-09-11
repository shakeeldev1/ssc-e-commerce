import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/auth.store';
import { useCategories } from '@/features/catalog/catalog.api';

const FooterColumn = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold text-white">{title}</h3>
    <ul className="mt-3 space-y-2 text-sm text-slate-400">{children}</ul>
  </div>
);

export const Footer = () => {
  const isAuthenticated = Boolean(useAuthStore((state) => state.accessToken));
  const { data: categories } = useCategories();
  const topCategories = (categories ?? []).filter((c) => c.parentId === null).slice(0, 5);

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-bold text-white">SSC Store</span>
            <p className="mt-3 text-sm text-slate-400">
              The official retail platform for Student Smart Card PAK — everyday essentials with
              exclusive student pricing.
            </p>
          </div>

          <FooterColumn title="Shop">
            <li>
              <Link to="/products" className="hover:text-white">
                All products
              </Link>
            </li>
            <li>
              <Link to="/products?studentOnly=true" className="hover:text-white">
                Student discounts
              </Link>
            </li>
            {topCategories.map((category) => (
              <li key={category.id}>
                <Link to={`/products?categoryId=${category.id}`} className="hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Your account">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/orders" className="hover:text-white">
                    My orders
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-white">
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-white">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white">
                    Create an account
                  </Link>
                </li>
              </>
            )}
          </FooterColumn>

          <FooterColumn title="Why shop with us">
            <li>Cash on delivery available</li>
            <li>Easy returns & exchanges</li>
            <li>Secure checkout</li>
            <li>Discounts for Smart Card holders</li>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Student Smart Card PAK. All rights reserved.
      </div>
    </footer>
  );
};
