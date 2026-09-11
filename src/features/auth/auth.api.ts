import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import { useAuthStore } from '@/features/auth/auth.store';
import type { AuthTokens, CurrentUser, UserRole } from '@/features/auth/auth.types';

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: Extract<UserRole, 'student' | 'wholesale_buyer'>;
}

export const useRegister = () =>
  useMutation({
    mutationFn: async (input: RegisterInput) => {
      const { data } = await apiClient.post<ApiEnvelope<{ email: string; message: string }>>(
        '/auth/register',
        input,
      );
      return data.data;
    },
  });

export const useVerifyEmail = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation({
    mutationFn: async (input: { email: string; code: string }) => {
      const { data } = await apiClient.post<ApiEnvelope<AuthTokens>>('/auth/verify-email', input);
      return data.data;
    },
    onSuccess: setTokens,
  });
};

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  return useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      const { data } = await apiClient.post<ApiEnvelope<AuthTokens>>('/auth/login', input);
      return data.data;
    },
    onSuccess: setTokens,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken }).catch(() => undefined);
      }
    },
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
  });
};

const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const { data } = await apiClient.get<ApiEnvelope<CurrentUser>>('/auth/me');
  return data.data;
};

export const useCurrentUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchCurrentUser,
    enabled: Boolean(accessToken),
    retry: false,
    staleTime: 5 * 60_000,
  });
};
