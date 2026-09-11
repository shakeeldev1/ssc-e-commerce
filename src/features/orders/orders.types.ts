export type OrderStatus =
  'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export type PaymentMethod = 'cod' | 'online_stub';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postalCode?: string | null;
  country: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productVariantId: string;
  productName: string;
  sku: string;
  variantAttributes: Record<string, string>;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderStatusHistoryEntry {
  id: string;
  status: OrderStatus;
  note: string | null;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  couponCode: string | null;
  campaignCode: string | null;
  items: OrderItem[];
  statusHistory: OrderStatusHistoryEntry[];
  createdAt: string;
}

export interface CheckoutInput {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  campaignCode?: string;
}
