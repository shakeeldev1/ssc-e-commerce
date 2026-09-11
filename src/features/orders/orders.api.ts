import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope, PaginatedResult } from '@/lib/api-types';
import type { CheckoutInput, Order, OrderStatus } from '@/features/orders/orders.types';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CheckoutInput) => {
      const { data } = await apiClient.post<ApiEnvelope<Order>>('/orders', input);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useMyOrders = (status?: OrderStatus) =>
  useQuery({
    queryKey: ['orders', 'mine', status],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<Order>>>('/orders', {
        params: { status },
      });
      return data.data;
    },
  });

export const useOrder = (id: string | undefined) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Order>>(`/orders/${id}`);
      return data.data;
    },
    enabled: Boolean(id),
  });
