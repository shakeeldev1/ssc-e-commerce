import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CustomerDashboardLayout = () => (
  <DashboardShell config={{ eyebrow: 'Customer workspace', title: 'My SSC', description: 'Your personal shopping and Smart Card workspace', icon: 'S', accentClass: 'bg-slate-950', groups: [{ label: 'Workspace', items: [{ to: '/account', label: 'Overview', end: true, icon: '⌂' }, { to: '/orders', label: 'Orders', icon: '▤' }, { to: '/cart', label: 'Cart', icon: '□' }] }, { label: 'Membership', items: [{ to: '/smart-card', label: 'Smart Card', icon: '◇' }, { to: '/student-benefits', label: 'Benefits', icon: '✦' }] }] }}>
    <Outlet />
  </DashboardShell>
);
