import type { Product, ProductVariant } from '@/features/catalog/catalog.types';

export interface CartItem {
  id: string;
  userId: string;
  productVariantId: string;
  productVariant: ProductVariant & { product: Product };
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}
