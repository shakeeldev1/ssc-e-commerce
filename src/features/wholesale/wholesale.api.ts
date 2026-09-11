import { useQuery } from '@tanstack/react-query';
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
