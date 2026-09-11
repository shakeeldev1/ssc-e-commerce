import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const AdminLayout = () => {
  return (
    <DashboardShell config={{ eyebrow: 'Platform control', title: 'SSC Super Admin', description: 'Operations, governance, and financial oversight', icon: 'A', accentClass: 'bg-slate-950', groups: [{ label: 'Command center', items: [{ to: '/super-admin', label: 'Overview', end: true, icon: '⌂' }, { to: '/super-admin/users', label: 'Users', icon: '◎' }] }, { label: 'Operations', items: [{ to: '/super-admin/orders', label: 'Orders', icon: '▤' }, { to: '/super-admin', label: 'Inventory', icon: '▦' }, { to: '/super-admin', label: 'Vendors', icon: '◇' }] }, { label: 'Finance', items: [{ to: '/super-admin', label: 'Revenue', icon: '$' }, { to: '/super-admin', label: 'Settlements', icon: '◌' }] }] }}>
      <Outlet />
    </DashboardShell>
  );
};
