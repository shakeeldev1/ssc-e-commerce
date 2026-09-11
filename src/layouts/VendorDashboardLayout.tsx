import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const VendorDashboardLayout = () => (
  <DashboardShell config={{ eyebrow: 'Partner workspace', title: 'SSC Vendor Hub', description: 'Catalogue, wholesale demand, and business operations', icon: 'V', accentClass: 'bg-[#176b61]', groups: [{ label: 'Operations', items: [{ to: '/vendor/dashboard', label: 'Overview', end: true, icon: '⌂' }, { to: '/vendor/products', label: 'My catalogue', icon: '▦' }, { to: '/vendor/quotes', label: 'Incoming RFQs', icon: '◇' }] }, { label: 'Account', items: [{ to: '/vendor/profile', label: 'Business profile', icon: '○' }] }] }}>
    <Outlet />
  </DashboardShell>
);
