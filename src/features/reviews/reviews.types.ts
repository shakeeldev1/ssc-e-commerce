export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
