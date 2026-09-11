import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const FooterColumn = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F7C87F]">{title}</h3>
    <ul className="mt-4 space-y-2.5 text-sm text-white/55">{children}</ul>
  </div>
);

export const Footer = () => {
  return (
    <footer className="border-t border-[#F7C87F]/15 bg-[#05090d] text-white/70">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-10 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="font-serif text-3xl text-white">
              SSC<span className="text-[#F7C87F]">Store</span>
            </span>
            <p className="mt-5 text-sm leading-7 text-white/55">
              The official retail and wholesale marketplace for Student Smart Card PAK — everyday
              essentials, bulk buying, and exclusive pricing for Smart Card holders.
            </p>
            <div className="mt-5 flex gap-2">
              {['f', '◎', '▶', 'X'].map((icon) => (
                <span key={icon} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#132232] text-xs text-white/70">{icon}</span>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li>
              <Link to="/products" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white">Categories</Link>
            </li>
            <li><Link to="/vendors" className="hover:text-white">Vendors</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </FooterColumn>

          <FooterColumn title="Policies">
            <li>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-white">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/returns" className="hover:text-white">Refund Policy</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">FAQ</Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Contact Us">
            <li>
              <a href="tel:+12345678900" className="hover:text-white">+1 234 567 8900</a>
            </li>
            <li>
              <a href="mailto:info@sscstore.com" className="hover:text-white">info@sscstore.com</a>
            </li>
            <li>
              <span>123 Education Lane,</span>
            </li>
            <li><span>New York, NY 10001</span></li>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-[11px] uppercase tracking-[0.14em] text-white/35">
        &copy; {new Date().getFullYear()} Student Smart Card PAK. All rights reserved.
      </div>
    </footer>
  );
};
