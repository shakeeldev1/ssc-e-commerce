import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';
import { Spinner } from '@/components/ui/Spinner';

export const AdminProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUser();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (user?.role !== 'super_admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
