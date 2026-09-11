import { Link } from 'react-router-dom';
import { useFeaturedVendors } from '@/features/vendors/vendors.api';

export const FeaturedVendorsSection = () => {
  const { data: vendors } = useFeaturedVendors(8);

  if (!vendors || vendors.length === 0) {
    return null;
  }

  return (
    <section className="luxury-section luxury-section-light">
      <div className="luxury-container flex items-end justify-between gap-4">
        <div>
          <p className="luxury-kicker">The house selection</p>
          <h2 className="luxury-title mt-3">Featured vendors</h2>
        </div>
        <Link to="/vendors/sell-with-us" className="pb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#F7C87F] hover:text-white">View all</Link>
      </div>
      <div className="luxury-container mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
        {vendors.map((vendor) => (
          <Link
            key={vendor.id}
            to={`/products?vendorId=${vendor.id}`}
            className="flex flex-col items-center justify-center gap-3 bg-[#0d1822] p-6 text-center transition-colors hover:bg-[#162433]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F7C87F]/50 text-lg font-bold text-[#F7C87F]">
              {vendor.businessName.charAt(0).toUpperCase()}
            </span>
            <span className="line-clamp-2 text-sm font-medium text-white">
              {vendor.businessName}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
