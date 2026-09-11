import { Card } from '@/components/ui/Card';

export const AdminUsersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-950">Users</h1>
        <p className="mt-1 text-sm text-ink-950/60">User management is coming soon.</p>
      </div>

      <Card className="p-6 text-sm text-ink-950/60">
        A searchable list of students, vendors and institution accounts will appear here once the
        admin user-management endpoints are built.
      </Card>
    </div>
  );
};
