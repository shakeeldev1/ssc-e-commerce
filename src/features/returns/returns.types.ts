export type ReturnRequestType = 'return' | 'exchange';
export type ReturnRequestStatus = 'requested' | 'approved' | 'rejected';

export interface ReturnRequest {
  id: string;
  orderChannel: 'retail' | 'wholesale';
  orderId: string;
  orderNumber: string;
  buyerUserId: string;
  type: ReturnRequestType;
  reason: string;
  restock: boolean;
  orderItemId: string | null;
  replacementVariantId: string | null;
  status: ReturnRequestStatus;
  decisionNote: string | null;
  createdAt: string;
}

export interface CreateReturnRequestInput {
  orderId: string;
  orderChannel: 'retail' | 'wholesale';
  type: ReturnRequestType;
  reason: string;
}
