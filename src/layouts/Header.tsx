import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogout } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';
import { useCart } from '@/features/cart/cart.api';
import { useCategories } from '@/features/catalog/catalog.api';

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.936-4.79 2.436-7.394a.75.75 0 0 0-.735-.906H5.106M7.5 14.25 5.106 5.272M6.75 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(useAuthStore((state) => state.accessToken));
  const { data: user } = useCurrentUser();
  const { data: cart } = useCart();
  const { data: categories } = useCategories();
  const logout = useLogout();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const topCategories = (categories ?? []).filter((c) => c.parentId === null).slice(0, 8);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(search ? `/products?search=${encodeURIComponent(search)}` : '/products');
  };

  return (
    <header className="sticky top-0 z-10 bg-brand-700 text-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <Link to="/" className="shrink-0 text-xl font-extrabold tracking-tight">
          SSC<span className="text-amber-400">Store</span>
        </Link>

        <form onSubmit={onSearch} className="hidden flex-1 sm:block">
          <div className="flex overflow-hidden rounded-md bg-white">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products, brands and more"
              className="w-full px-3 py-2 text-sm text-slate-900 outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-amber-400 px-4 text-slate-900 hover:bg-amber-500"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </form>

        <nav className="ml-auto flex items-center gap-5 text-sm">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="flex flex-col text-left font-medium hover:text-amber-300"
              >
                <span className="text-xs text-brand-100">Hello,</span>
                <span>{user?.fullName?.split(' ')[0] ?? 'Account'}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border border-slate-200 bg-white py-1 text-slate-700 shadow-lg">
                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    My orders
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout.mutate();
                      navigate('/');
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="font-medium hover:text-amber-300">
              Sign in
            </Link>
          )}

          <Link to="/cart" className="relative flex flex-col items-center hover:text-amber-300">
            <CartIcon />
            {cart && cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-900">
                {cart.totalItems}
              </span>
            )}
            <span className="hidden text-xs sm:block">Cart</span>
          </Link>
        </nav>
      </div>

      <form onSubmit={onSearch} className="px-4 pb-3 sm:hidden">
        <div className="flex overflow-hidden rounded-md bg-white">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full px-3 py-2 text-sm text-slate-900 outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-amber-400 px-4 text-slate-900"
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      {topCategories.length > 0 && (
        <div className="no-scrollbar overflow-x-auto border-t border-white/10 bg-brand-800/40">
          <div className="mx-auto flex max-w-6xl gap-5 px-4 py-2 text-sm whitespace-nowrap sm:px-6">
            <Link to="/products" className="font-medium text-white hover:text-amber-300">
              All products
            </Link>
            {topCategories.map((category) => (
              <Link
                key={category.id}
                to={`/products?categoryId=${category.id}`}
                className="text-brand-100 hover:text-amber-300"
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/products?studentOnly=true"
              className="font-medium text-amber-300 hover:text-amber-200"
            >
              Student discounts
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
