import { Outlet } from 'react-router-dom';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const AdminLayout = () => {
  return (
    <DashboardShell config={{ eyebrow: 'Platform control', title: 'SSC Admin', description: 'Operations, governance, and financial oversight', icon: 'A', accentClass: 'bg-slate-950', groups: [{ label: 'Command center', items: [{ to: '/admin', label: 'Overview', end: true, icon: '⌂' }, { to: '/admin/users', label: 'Users', icon: '◎' }] }, { label: 'Operations', items: [{ to: '/admin', label: 'Orders', icon: '▤' }, { to: '/admin', label: 'Inventory', icon: '▦' }, { to: '/admin', label: 'Vendors', icon: '◇' }] }, { label: 'Finance', items: [{ to: '/admin', label: 'Revenue', icon: '$' }, { to: '/admin', label: 'Settlements', icon: '◌' }] }] }}>
      <Outlet />
    </DashboardShell>
  );
};
