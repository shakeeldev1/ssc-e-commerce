import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope, PaginatedResult } from '@/lib/api-types';
import type { Order, OrderStatus } from '@/features/orders/orders.types';
import type { VendorProfile } from '@/features/vendors/vendors.types';

interface InventoryAlert {
  id: string;
  productVariantId: string;
  availableQuantity: number;
  lowStockThreshold: number;
  productVariant?: { product?: { name: string } };
}

interface ReturnRequest {
  id: string;
  orderNumber: string;
  orderChannel: string;
  type: string;
  reason: string;
  status: string;
  createdAt: string;
}

export interface NetRevenueReport {
  periodStart: string;
  periodEnd: string;
  orderCount: number;
  grossRevenue: number;
  totalRefunds: number;
  totalCommissions: number;
  netRevenue: number;
}

export interface AdminUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export interface AdminUserFilters {
  search?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const useAdminUsers = (filters: AdminUserFilters = {}) => useQuery({
  queryKey: ['admin', 'users', filters],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<AdminUser>>>('/users', { params: { page: filters.page ?? 1, limit: filters.limit ?? 12, ...filters } });
    return data.data;
  },
});

export interface AdminOrderFilters {
  status?: OrderStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export const useAdminOrders = (filters: AdminOrderFilters = {}) => useQuery({
  queryKey: ['admin', 'orders', filters],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<Order>>>('/orders/admin', { params: { page: filters.page ?? 1, limit: filters.limit ?? 8, ...filters } });
    return data.data;
  },
});

export const useAdminOrderStats = () => {
  const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'];
  const queries = useQueries({ queries: statuses.map((status) => ({ queryKey: ['admin', 'orders', 'stats', status], queryFn: async () => { const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<Order>>>('/orders/admin', { params: { status, page: 1, limit: 1 } }); return data.data.total; } })) });
  return { counts: Object.fromEntries(statuses.map((status, index) => [status, queries[index]?.data ?? 0])) as Record<OrderStatus, number>, isLoading: queries.some((query) => query.isLoading) };
};

export const useUpdateAdminOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { orderId: string; status: OrderStatus; note?: string }) => {
      const { data } = await apiClient.patch<ApiEnvelope<Order>>(`/orders/${input.orderId}/status`, { status: input.status, note: input.note });
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  });
};

export const useAdminVendors = () => useQuery({
  queryKey: ['admin', 'vendors'],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<VendorProfile[]>>('/vendors');
    return data.data;
  },
});

export const useLowStock = () => useQuery({
  queryKey: ['admin', 'inventory', 'low-stock'],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<InventoryAlert[]>>('/inventory/low-stock');
    return data.data;
  },
});

export const useAdminReturns = () => useQuery({
  queryKey: ['admin', 'returns'],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<ReturnRequest[]>>('/returns');
    return data.data;
  },
});

export const useNetRevenue = () => {
  const endDate = new Date().toISOString().slice(0, 10);
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const startDate = start.toISOString().slice(0, 10);
  return useQuery({
    queryKey: ['admin', 'finance', 'net-revenue', startDate, endDate],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiEnvelope<NetRevenueReport>>('/finance/net-revenue', { params: { startDate, endDate } });
      return data.data;
    },
  });
};
