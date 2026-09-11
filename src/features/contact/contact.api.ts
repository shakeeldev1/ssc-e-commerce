import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';

export interface ContactMessageInput {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const useSubmitContactMessage = () =>
  useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      const { data } = await apiClient.post<ApiEnvelope<{ id: string }>>('/contact', input);
      return data.data;
    },
  });
