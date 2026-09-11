import { Card } from '@/components/ui/Card';
import { useVendorProfile } from '@/features/vendors/vendors.api';

export const VendorProfilePage = () => {
  const { data: vendor } = useVendorProfile();
  return <div className="space-y-6"><header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Business profile</p><h1 className="mt-2 text-3xl font-bold text-ink-950">Vendor profile</h1></header><Card className="max-w-2xl p-6"><dl className="grid gap-5 sm:grid-cols-2">{[['Business name', vendor?.businessName], ['Business type', vendor?.businessType], ['Tax ID', vendor?.taxId], ['Contact phone', vendor?.contactPhone], ['Bank', vendor?.bankName], ['Application status', vendor?.status]].map(([label, value]) => <div key={label}><dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</dt><dd className="mt-2 text-sm font-medium capitalize text-ink-950">{value ?? 'Not provided'}</dd></div>)}</dl><p className="mt-8 border-t border-slate-100 pt-5 text-sm text-slate-500">Documents on file: {vendor?.documents.length ?? 0}. Document upload and profile editing will use the existing vendor endpoints in the next form workflow step.</p></Card></div>;
};
