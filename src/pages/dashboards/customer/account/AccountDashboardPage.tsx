import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { useCurrentUser } from '@/features/auth/auth.api';

interface AccountTile {
  title: string;
  description: string;
  href?: string;
}

const AVAILABLE_TILES: AccountTile[] = [
  { title: 'My orders', description: 'Track deliveries and view past orders.', href: '/orders' },
  { title: 'My cart', description: 'Review items you’ve added.', href: '/cart' },
];

const COMING_SOON_TILES: AccountTile[] = [
  { title: 'My profile', description: 'Update your personal details.' },
  { title: 'My Smart Card', description: 'View your card, QR code, and renewal status.' },
  { title: 'Wishlist', description: 'Products you’ve saved for later.' },
  { title: 'Addresses', description: 'Manage your saved delivery addresses.' },
  { title: 'Notifications', description: 'Updates about your orders and offers.' },
];

export const AccountDashboardPage = () => {
  const { data: user } = useCurrentUser();

  return (
    <div>
      <PageHeader
        title={`Hello, ${user?.fullName?.split(' ')[0] ?? 'there'}`}
        subtitle="Your account dashboard"
      />

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {AVAILABLE_TILES.map((tile) => (
            <Link key={tile.title} to={tile.href!}>
              <Card className="p-5 hover:shadow-md">
                <h3 className="font-semibold text-ink-950">{tile.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{tile.description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Coming soon
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {COMING_SOON_TILES.map((tile) => (
              <Card key={tile.title} className="p-5 opacity-60">
                <h3 className="font-semibold text-ink-950">{tile.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{tile.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
