import type { OrderStatus, PaymentMethod, PaymentStatus, ShippingAddress } from '@/features/orders/orders.types';

export interface WholesaleCartLine {
  item: {
    id: string;
    buyerUserId: string;
    productVariantId: string;
    quantity: number;
    productVariant?: { product?: { name: string } };
  };
  unitPrice: number;
  lineTotal: number;
}

export interface WholesaleCartSummary {
  lines: WholesaleCartLine[];
  subtotal: number;
  totalItems: number;
}

export interface WholesaleOrder {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  buyerUserId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  subtotal: number;
  totalAmount: number;
  items: Array<{ id: string; productVariantId: string; productName: string; quantity: number; unitPrice: number; lineTotal: number }>;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  buyerUserId: string;
  productVariantId: string;
  productVariant?: { product?: { name: string } };
  requestedQuantity: number;
  message: string | null;
  status: 'open' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
}
