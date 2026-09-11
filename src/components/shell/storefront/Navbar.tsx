import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogout } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/features/cart/cart.api';
import type { CartSummary } from '@/features/cart/cart.types';
import { useCategories } from '@/features/catalog/catalog.api';
import { formatMoney } from '@/lib/format';

const CartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.936-4.79 2.436-7.394a.75.75 0 0 0-.735-.906H5.106M7.5 14.25 5.106 5.272M6.75 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6l12 12M18 6 6 18"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6 9 6 6 6-6"
    />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" />
    <path strokeLinecap="round" d="m16 16 4 4" />
  </svg>
);

const UTILITY_LINKS = [
  { to: '/track-order', label: 'Track your order' },
  { to: '/vendors/sell-with-us', label: 'Sell with us' },
  { to: '/schools', label: 'Schools & institutions' },
  { to: '/faq', label: 'Help' },
];

const PRIMARY_NAV = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/student-benefits', label: 'Features' },
  { to: '/products', label: 'Categories' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/blog', label: 'Blog' },
  { to: '/pages', label: 'Pages' },
  { to: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = Boolean(
    useAuthStore((state) => state.accessToken),
  );

  const { data: user } = useCurrentUser();
  const { data: cart } = useCart();
  const { data: categories } = useCategories();
  const logout = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const topCategories = (categories ?? [])
    .filter((category) => category.parentId === null)
    .slice(0, 6);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setAccountMenuOpen(false);
  };

  const handleLogout = () => {
    setAccountMenuOpen(false);
    setMenuOpen(false);

    logout.mutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
  };

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setAccountMenuOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05090d] text-white shadow-2xl shadow-black/30">
      {/* =========================================================
          UTILITY BAR
      ========================================================= */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex h-[62px] w-full max-w-[1440px] items-center gap-5 px-4 sm:px-8 lg:px-12">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="mr-3 flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/5 hover:text-[#F7C97F] md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            className="shrink-0 font-serif text-xl tracking-tight sm:text-2xl"
          >
            SSC<span className="text-[#F7C97F]">Store</span>
          </Link>

          <button type="button" className="hidden text-white/40 transition-colors hover:text-[#F7C87F] lg:block" aria-label="Go back" onClick={() => navigate(-1)}>
            ‹
          </button>

          <form onSubmit={handleSearch} className="hidden min-w-0 flex-1 sm:block sm:max-w-[430px]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products..."
                className="h-9 w-full rounded-full border border-[#294056] bg-[#0b1927] px-10 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#F7C87F]/70"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/45"><SearchIcon /></span>
            </label>
          </form>

          {/* Desktop Primary Navigation */}
          <nav
            className="hidden"
            aria-label="Main navigation"
          >
            {PRIMARY_NAV.map((link) => {
              const active = isActive(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative py-6 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? 'text-[#F7C97F]'
                      : 'text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 hover:text-[#F7C97F]'
                  }`}
                >
                  {link.label}

                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#F7C97F]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Account */}
            {isAuthenticated ? (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() =>
                    setAccountMenuOpen((open) => !open)
                  }
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/5"
                  aria-expanded={accountMenuOpen}
                  aria-haspopup="menu"
                >
                    <div className="flex flex-col">
                    <span className="text-[11px] leading-tight text-white/50">
                      Hello,
                    </span>

                    <span className="max-w-[110px] truncate text-sm font-medium text-white">
                      {user?.fullName?.split(' ')[0] ?? 'Account'}
                    </span>
                  </div>

                  <ChevronDownIcon />
                </button>

                {accountMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-3 w-52 overflow-hidden rounded-sm border border-[#F7C87F]/25 bg-[#101820] py-1 text-white shadow-xl"
                    role="menu"
                  >
                    <Link
                      to="/customer/dashboard"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-[#F7C87F]"
                      role="menuitem"
                    >
                      My Dashboard
                    </Link>

                    <Link
                      to="/customer/orders"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-[#F7C87F]"
                      role="menuitem"
                    >
                      My Orders
                    </Link>

                    <div className="my-1 border-t border-white/10" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={logout.isPending}
                      className="block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/5 hover:text-[#F7C87F] disabled:cursor-not-allowed disabled:opacity-50"
                      role="menuitem"
                    >
                      {logout.isPending ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden text-[11px] text-white/80 transition-colors hover:text-[#F7C97F] sm:block"
              >
                Login <span className="text-white/35">|</span> Register
              </Link>
            )}

            {/* Cart */}
            <button
              type="button"
              onClick={() => (isAuthenticated ? setCartOpen(true) : navigate('/login'))}
              className="relative flex items-center gap-2 rounded-md px-2 py-1.5 text-white/90 transition-colors hover:bg-white/5 hover:text-[#F7C97F]"
              aria-label={`Cart${
                cart?.totalItems ? `, ${cart.totalItems} items` : ''
              }`}
            >
              <div className="relative">
                <CartIcon />

                {cart && cart.totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F7C97F] px-1 text-[10px] font-bold leading-none text-[#000208]">
                    {cart.totalItems > 99 ? '99+' : cart.totalItems}
                  </span>
                )}
              </div>

              <span className="hidden text-[11px] font-medium sm:block">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-white/10 md:block">
        <nav className="mx-auto flex h-10 w-full max-w-[1440px] items-center gap-8 px-4 sm:px-8 lg:px-12" aria-label="Main navigation">
          {PRIMARY_NAV.map((link) => (
            <Link key={link.label} to={link.to} className={`text-[10px] font-medium transition-colors hover:text-[#F7C87F] ${isActive(link.to) ? 'text-[#F7C87F]' : 'text-white/75'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* =========================================================
          MOBILE MENU
      ========================================================= */}
      {menuOpen && (
        <div className="border-b border-white/10 bg-[#000208] md:hidden">
          <nav
            className="mx-auto max-w-7xl px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            {/* Main Links */}
            <div className="space-y-1">
              {PRIMARY_NAV.map((link) => {
                const active = isActive(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenus}
                    className={`block rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#F7C97F]/10 text-[#F7C97F]'
                        : 'text-white/85 hover:bg-white/5 hover:text-[#F7C97F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                to="/offers"
                onClick={closeMenus}
                className="block rounded-md px-3 py-3 text-sm font-semibold text-[#F7C97F] transition-colors hover:bg-white/5"
              >
                Offers
              </Link>
            </div>

            {/* Categories */}
            {topCategories.length > 0 && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                  Categories
                </p>

                <div className="space-y-1">
                  {topCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/products?categoryId=${category.id}`}
                      onClick={closeMenus}
                      className="block rounded-md px-3 py-2.5 text-sm text-white/65 transition-colors hover:bg-white/5 hover:text-[#F7C97F]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Account */}
            <div className="mt-4 border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 pb-2">
                    <p className="text-xs text-white/40">Signed in as</p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {user?.fullName ?? 'Account'}
                    </p>
                  </div>

                  <Link
                    to="/account"
                    onClick={closeMenus}
                    className="block rounded-md px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-[#F7C97F]"
                  >
                    My Dashboard
                  </Link>

                  <Link
                    to="/customer/orders"
                    onClick={closeMenus}
                    className="block rounded-md px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-[#F7C97F]"
                  >
                    My Orders
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="block w-full rounded-md px-3 py-2.5 text-left text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-[#F7C97F] disabled:opacity-50"
                  >
                    {logout.isPending ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="block rounded-md bg-[#F7C97F] px-3 py-3 text-center text-sm font-semibold text-[#000208] transition-colors hover:bg-[#eab96b]"
                >
                  Sign in
                </Link>
              )}
            </div>

            {/* Mobile Utility Links */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Quick Links
              </p>

              <div className="space-y-1">
                {UTILITY_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenus}
                    className="block rounded-md px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-[#F7C97F]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} />}
    </header>
  );
};

const CartDrawer = ({ cart, onClose }: { cart?: CartSummary; onClose: () => void }) => {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button type="button" aria-label="Close cart" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#F7C87F]/20 bg-[#0b151e] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div><p className="luxury-kicker">Your selection</p><h2 className="mt-1 font-serif text-2xl">Shopping cart</h2></div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/65 hover:border-[#F7C87F] hover:text-[#F7C87F]">Close</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {!cart || cart.items.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><p className="font-serif text-2xl">Your cart is empty</p><p className="mt-2 max-w-xs text-sm leading-6 text-white/45">Add something useful and it will appear here instantly.</p><Link to="/products" onClick={onClose} className="mt-6 rounded-sm bg-[#F7C87F] px-5 py-3 text-xs font-bold text-[#071019]">Browse products</Link></div> : <div className="space-y-4">{cart.items.map((item) => <div key={item.id} className="flex gap-3 border-b border-white/10 pb-4"><div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-[#172633]">{item.productVariant.product.images[0] ? <img src={item.productVariant.product.images[0].url} alt={item.productVariant.product.name} className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-2xl text-white/30">{item.productVariant.product.name.charAt(0)}</span>}</div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-semibold">{item.productVariant.product.name}</p><p className="mt-1 text-sm font-bold text-[#F7C87F]">{formatMoney(item.productVariant.price)}</p><div className="mt-2 flex items-center gap-2"><button type="button" onClick={() => updateItem.mutate({ variantId: item.productVariantId, quantity: Math.max(1, item.quantity - 1) })} className="h-6 w-6 rounded border border-white/15 text-xs">-</button><span className="min-w-5 text-center text-xs">{item.quantity}</span><button type="button" onClick={() => updateItem.mutate({ variantId: item.productVariantId, quantity: item.quantity + 1 })} className="h-6 w-6 rounded border border-white/15 text-xs">+</button><button type="button" onClick={() => removeItem.mutate(item.productVariantId)} className="ml-2 text-[11px] text-white/40 hover:text-red-300">Remove</button></div></div></div>)}</div>}
        </div>
        {cart && cart.items.length > 0 && <div className="border-t border-white/10 px-5 py-5"><div className="flex items-center justify-between"><span className="text-sm text-white/55">Subtotal</span><span className="text-lg font-bold text-[#F7C87F]">{formatMoney(cart.subtotal)}</span></div><div className="mt-4 grid grid-cols-2 gap-3"><Link to="/customer/cart" onClick={onClose} className="rounded-sm border border-white/20 px-4 py-3 text-center text-xs font-semibold text-white hover:border-[#F7C87F]">View cart</Link><Link to="/customer/checkout" onClick={onClose} className="rounded-sm bg-[#F7C87F] px-4 py-3 text-center text-xs font-bold text-[#071019]">Checkout</Link></div></div>}
      </aside>
    </div>
  );
};