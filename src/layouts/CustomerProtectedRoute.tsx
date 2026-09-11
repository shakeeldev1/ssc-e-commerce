import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';
import { useCurrentUser } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';

export const CustomerProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUser();

  if (!accessToken) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (isLoading) return <div className="flex min-h-screen items-center justify-center"><Spinner /></div>;
  if (user?.role !== 'student') return <RoleHomeRedirect role={user?.role} />;

  return <Outlet />;
};

const RoleHomeRedirect = ({ role }: { role?: string }) => {
  if (role === 'super_admin') return <Navigate to="/super-admin" replace />;
  if (role === 'vendor' || role === 'wholesale_vendor') return <Navigate to="/vendor/dashboard" replace />;
  if (role === 'wholesale_buyer') return <Navigate to="/wholesale/dashboard" replace />;
  return <Navigate to="/" replace />;
};
