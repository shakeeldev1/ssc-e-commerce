import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const WholesaleBuyerDashboardLayout = () => (
  <DashboardShell config={{ eyebrow: 'Wholesale workspace', title: 'SSC Commerce', description: 'Bulk purchasing and procurement management', icon: 'W', accentClass: 'bg-[#8a5b16]', groups: [{ label: 'Procurement', items: [{ to: '/wholesale/dashboard', label: 'Overview', end: true, icon: '⌂' }, { to: '/wholesale/catalogue', label: 'Catalogue', icon: '▦' }, { to: '/wholesale/orders', label: 'Orders', icon: '▤' }] }, { label: 'Negotiation', items: [{ to: '/wholesale/quotes', label: 'Quote requests', icon: '◇' }] }] }}>
    <Outlet />
  </DashboardShell>
);
