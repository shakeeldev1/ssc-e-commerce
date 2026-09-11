import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope, PaginatedResult } from '@/lib/api-types';
import { useAuthStore } from '@/features/auth/auth.store';
import type { QuoteRequest, WholesaleCartSummary, WholesaleOrder } from '@/features/wholesale/wholesale.types';

const buyerEnabled = (accessToken: string | null, role: string | undefined) =>
  Boolean(accessToken) && role === 'wholesale_buyer';

export const useWholesaleCart = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);
  return useQuery({
    queryKey: ['wholesale', 'cart'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<WholesaleCartSummary>>('/wholesale/cart');
      return data.data;
    },
    enabled: buyerEnabled(accessToken, role),
  });
};

export const useWholesaleOrders = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);
  return useQuery({
    queryKey: ['wholesale', 'orders'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<WholesaleOrder>>>('/wholesale/orders');
      return data.data;
    },
    enabled: buyerEnabled(accessToken, role),
  });
};

export const useMyQuoteRequests = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);
  return useQuery({
    queryKey: ['wholesale', 'quote-requests', 'mine'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<QuoteRequest[]>>('/wholesale/quote-requests/mine');
      return data.data;
    },
    enabled: buyerEnabled(accessToken, role),
  });
};

export interface WholesaleVariant {
  id: string;
  productId: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  compareAtPrice: number | null;
  isActive: boolean;
  isWholesaleEligible: boolean;
  wholesaleMoq: number | null;
  product?: { name: string; images?: Array<{ url: string; isPrimary: boolean }> };
}

export const useWholesaleCatalogue = (search: string, page: number) => useQuery({
  queryKey: ['wholesale', 'catalogue', search, page],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<WholesaleVariant>>>('/wholesale/variants', { params: { search: search || undefined, page, limit: 12 } });
    return data.data;
  },
});

export const useAddWholesaleCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { productVariantId: string; quantity: number }) => {
      const { data } = await apiClient.post<ApiEnvelope<WholesaleCartSummary>>('/wholesale/cart/items', input);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wholesale', 'cart'] }),
  });
};
