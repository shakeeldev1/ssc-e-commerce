import { Outlet } from 'react-router-dom';
import { AdminNavbar } from '@/components/common/admin/AdminNavbar';
import { AdminSidebar } from '@/components/common/admin/AdminSidebar';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100">
      <AdminNavbar />

      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
