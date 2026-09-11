import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import type { ProductReview } from '@/features/reviews/reviews.types';

export const useProductReviews = (productId: string | undefined) =>
  useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<ProductReview[]>>(
        `/catalog/products/${productId}/reviews`,
      );
      return data.data;
    },
    enabled: Boolean(productId),
  });

export const useSubmitReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { rating: number; comment?: string }) => {
      const { data } = await apiClient.post<ApiEnvelope<ProductReview>>(
        `/catalog/products/${productId}/reviews`,
        input,
      );
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reviews', productId] }),
  });
};
