import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import { useAuthStore } from '@/features/auth/auth.store';
import type { Product } from '@/features/catalog/catalog.types';
import type { FeaturedVendor, VendorProfile } from '@/features/vendors/vendors.types';

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

const vendorEnabled = (accessToken: string | null, role: string | undefined) =>
  Boolean(accessToken) && (role === 'vendor' || role === 'wholesale_vendor');

export const useVendorProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);
  return useQuery({
    queryKey: ['vendors', 'me'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<VendorProfile>>('/vendors/me');
      return data.data;
    },
    enabled: vendorEnabled(accessToken, role),
  });
};

export const useMyProducts = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);
  return useQuery({
    queryKey: ['catalog', 'products', 'mine'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Product[]>>('/catalog/products/mine');
      return data.data;
    },
    enabled: vendorEnabled(accessToken, role),
  });
};

export const useIncomingQuoteRequests = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);
  return useQuery({
    queryKey: ['wholesale', 'quote-requests', 'incoming'],
        queryFn: async () => {
          const { data } = await apiClient.get<ApiEnvelope<Array<{ id: string; requestedQuantity: number; status: string; createdAt: string; productVariant?: { product?: { name: string } } }>>>('/wholesale/quote-requests/incoming');
      return data.data;
    },
    enabled: vendorEnabled(accessToken, role),
  });
};
