import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope, PaginatedResult } from '@/lib/api-types';
import type {
  Brand,
  Category,
  ListProductsParams,
  Product,
} from '@/features/catalog/catalog.types';

export const useProducts = (params: ListProductsParams) =>
  useQuery({
    queryKey: ['catalog', 'products', params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<Product>>>(
        '/catalog/products',
        { params },
      );
      return data.data;
    },
  });

export const useProduct = (idOrSlug: string | undefined) =>
  useQuery({
    queryKey: ['catalog', 'products', idOrSlug],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Product>>(`/catalog/products/${idOrSlug}`);
      return data.data;
    },
    enabled: Boolean(idOrSlug),
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['catalog', 'categories'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Category[]>>('/catalog/categories');
      return data.data;
    },
    staleTime: 5 * 60_000,
  });

export const useBrands = () =>
  useQuery({
    queryKey: ['catalog', 'brands'],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<Brand[]>>('/catalog/brands');
      return data.data;
    },
    staleTime: 5 * 60_000,
  });
