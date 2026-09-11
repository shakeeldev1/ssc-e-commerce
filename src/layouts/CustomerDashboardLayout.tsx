import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CustomerDashboardLayout = () => (
  <DashboardShell config={{ eyebrow: 'Customer workspace', title: 'My SSC', description: 'Your personal shopping and Smart Card workspace', icon: 'S', accentClass: 'bg-slate-950', groups: [{ label: 'Workspace', items: [{ to: '/customer/dashboard', label: 'Overview', end: true, icon: '⌂' }, { to: '/customer/orders', label: 'Orders', icon: '▤' }, { to: '/customer/cart', label: 'Cart', icon: '□' }] }, { label: 'Membership', items: [{ to: '/smart-card', label: 'Smart Card', icon: '◇' }, { to: '/student-benefits', label: 'Benefits', icon: '✦' }] }] }}>
    <Outlet />
  </DashboardShell>
);
