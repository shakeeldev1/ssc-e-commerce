import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/users', label: 'Users' },
];

export const AdminSidebar = () => {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-ink-900/10 bg-white sm:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-ink-950 text-white' : 'text-ink-950/70 hover:bg-neutral-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
