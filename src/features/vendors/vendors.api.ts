import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import type { FeaturedVendor } from '@/features/vendors/vendors.types';

export const useFeaturedVendors = (limit = 8) =>
  useQuery({
    queryKey: ['vendors', 'featured', limit],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<FeaturedVendor[]>>('/vendors/featured', {
        params: { limit },
      });
      return data.data;
    },
    staleTime: 5 * 60_000,
  });

export interface ApplyVendorInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: 'vendor' | 'wholesale_vendor';
  businessName: string;
  businessType?: string;
  taxId?: string;
  contactPhone: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
}

export const useApplyVendor = () =>
  useMutation({
    mutationFn: async (input: ApplyVendorInput) => {
      const { data } = await apiClient.post<ApiEnvelope<{ email: string; message: string }>>(
        '/vendors/apply',
        input,
      );
      return data.data;
    },
  });
