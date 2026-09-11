import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';

export interface CouponEvaluation {
  coupon: { id: string; code: string; type: 'percentage' | 'fixed'; value: number };
  discountAmount: number;
}

export const useValidateCoupon = () =>
  useMutation({
    mutationFn: async (code: string) => {
      const { data } = await apiClient.post<ApiEnvelope<CouponEvaluation>>('/coupons/validate', {
        code,
      });
      return data.data;
    },
  });
