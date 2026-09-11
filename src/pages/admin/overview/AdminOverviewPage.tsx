import { Card } from '@/components/ui/Card';

export const AdminOverviewPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-950">Overview</h1>
        <p className="mt-1 text-sm text-ink-950/60">Admin dashboard metrics are coming soon.</p>
      </div>

      <Card className="p-6 text-sm text-ink-950/60">
        Reporting widgets (orders, revenue, vendor and student activity) will appear here once the
        admin analytics endpoints are built.
      </Card>
    </div>
  );
};
