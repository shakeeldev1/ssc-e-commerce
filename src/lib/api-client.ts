import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/auth.store';
import type { AuthTokens } from '@/features/auth/auth.types';
import type { ApiEnvelope } from '@/lib/api-types';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const AUTH_ENDPOINTS_TO_SKIP = ['/auth/login', '/auth/register', '/auth/refresh'];

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const { data } = await axios.post<ApiEnvelope<AuthTokens>>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    { refreshToken },
  );
  useAuthStore.getState().setTokens(data.data);
  return data.data.accessToken;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    const shouldAttemptRefresh =
      error.response?.status === 401 &&
      config &&
      !config._retried &&
      !AUTH_ENDPOINTS_TO_SKIP.some((path) => config.url?.includes(path));

    if (!shouldAttemptRefresh) {
      throw error;
    }

    config._retried = true;
    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const accessToken = await refreshPromise;
      config.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient.request(config);
    } catch {
      useAuthStore.getState().logout();
      throw error;
    }
  },
);
