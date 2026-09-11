import { create } from 'zustand';

interface CheckoutState {
  couponCode: string | null;
  campaignCode: string | null;
  discountAmount: number;
  setCoupon: (code: string | null, discountAmount: number) => void;
  setCampaignCode: (code: string | null) => void;
  reset: () => void;
}

/** Transient (non-persisted) state bridging the cart page's coupon preview to checkout. */
export const useCheckoutStore = create<CheckoutState>((set) => ({
  couponCode: null,
  campaignCode: null,
  discountAmount: 0,
  setCoupon: (couponCode, discountAmount) => set({ couponCode, discountAmount }),
  setCampaignCode: (campaignCode) => set({ campaignCode }),
  reset: () => set({ couponCode: null, campaignCode: null, discountAmount: 0 }),
}));
