import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import type { CreateReturnRequestInput, ReturnRequest } from '@/features/returns/returns.types';

export const useMyReturnRequests = () =>
  useQuery({
    queryKey: ['returns', 'mine'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<ReturnRequest[]>>('/returns/mine');
      return data.data;
    },
  });

export const useCreateReturnRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateReturnRequestInput) => {
      const { data } = await apiClient.post<ApiEnvelope<ReturnRequest>>('/returns', input);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['returns', 'mine'] }),
  });
};
