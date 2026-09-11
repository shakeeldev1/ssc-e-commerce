import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope, PaginatedResult } from '@/lib/api-types';
import type { Order } from '@/features/orders/orders.types';
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

export const useAdminOrders = () => useQuery({
  queryKey: ['admin', 'orders'],
  queryFn: async () => {
    const { data } = await apiClient.get<ApiEnvelope<PaginatedResult<Order>>>('/orders/admin', { params: { page: 1, limit: 8 } });
    return data.data;
  },
});

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
