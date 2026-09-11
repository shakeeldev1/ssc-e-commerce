import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogout } from '@/features/auth/auth.api';

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  return (
    <header className="flex h-14 items-center justify-between border-b border-ink-900/10 bg-ink-950 px-4 text-white sm:px-6">
      <Link to="/admin" className="text-lg font-extrabold tracking-tight">
        SSC<span className="text-brand-300">Admin</span>
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-white/70">{user?.fullName}</span>
        <button
          onClick={() => {
            logout.mutate();
            navigate('/');
          }}
          className="font-medium hover:text-brand-300"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};
