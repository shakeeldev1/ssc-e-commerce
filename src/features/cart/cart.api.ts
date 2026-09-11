import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import { useAuthStore } from '@/features/auth/auth.store';
import type { CartSummary } from '@/features/cart/cart.types';

const CART_KEY = ['cart'];

export const useCart = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: CART_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<CartSummary>>('/cart');
      return data.data;
    },
    enabled: Boolean(accessToken),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { productVariantId: string; quantity: number }) => {
      const { data } = await apiClient.post<ApiEnvelope<CartSummary>>('/cart/items', input);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { variantId: string; quantity: number }) => {
      const { data } = await apiClient.patch<ApiEnvelope<CartSummary>>(
        `/cart/items/${input.variantId}`,
        { quantity: input.quantity },
      );
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variantId: string) => {
      const { data } = await apiClient.delete<ApiEnvelope<CartSummary>>(`/cart/items/${variantId}`);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CART_KEY }),
  });
};
