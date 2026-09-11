import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import { useAuthStore } from '@/features/auth/auth.store';
import type { SmartCard, StudentProfile } from '@/features/students/students.types';

const STUDENT_PROFILE_KEY = ['students', 'me'];
const SMART_CARD_KEY = ['students', 'me', 'card'];

export const useStudentProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);

  return useQuery({
    queryKey: STUDENT_PROFILE_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<StudentProfile>>('/students/me');
      return data.data;
    },
    enabled: Boolean(accessToken) && role === 'student',
  });
};

export const useSmartCard = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.user?.role);

  return useQuery({
    queryKey: SMART_CARD_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<SmartCard>>('/students/me/card');
      return data.data;
    },
    enabled: Boolean(accessToken) && role === 'student',
  });
};

export const useRenewSmartCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<ApiEnvelope<SmartCard>>('/students/me/card/renew');
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SMART_CARD_KEY }),
  });
};
