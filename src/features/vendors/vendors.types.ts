export interface FeaturedVendor {
  id: string;
  businessName: string;
  businessType: string | null;
}

export type VendorStatus = 'pending' | 'approved' | 'rejected' | 'suspended' | 'blocked' | 'deactivated';

export interface VendorProfile {
  id: string;
  userId: string;
  businessName: string;
  businessType: string | null;
  taxId: string | null;
  contactPhone: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  status: VendorStatus;
  rejectionReason: string | null;
  approvedAt: string | null;
  documents: Array<{ id: string; type: string; createdAt: string }>;
}
