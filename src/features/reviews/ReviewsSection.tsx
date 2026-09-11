import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth/auth.store';
import { useProductReviews, useSubmitReview } from '@/features/reviews/reviews.api';
import { StarRating } from '@/features/reviews/StarRating';
import { getApiErrorMessage } from '@/lib/api-types';
import { formatDate } from '@/lib/format';

export const ReviewsSection = ({ productId }: { productId: string }) => {
  const isAuthenticated = Boolean(useAuthStore((state) => state.accessToken));
  const { data: reviews } = useProductReviews(productId);
  const submitReview = useSubmitReview(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(
    null,
  );

  const onSubmit = async () => {
    if (rating === 0) {
      setFeedback({ tone: 'error', message: 'Choose a star rating first' });
      return;
    }
    try {
      await submitReview.mutateAsync({ rating, comment: comment || undefined });
      setFeedback({ tone: 'success', message: 'Thanks! Your review will appear once approved.' });
      setRating(0);
      setComment('');
    } catch (error) {
      setFeedback({
        tone: 'error',
        message: getApiErrorMessage(error, 'Could not submit your review'),
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Reviews</h2>

      {reviews && reviews.length === 0 && (
        <p className="text-sm text-slate-500">No reviews yet — be the first to write one.</p>
      )}

      <div className="space-y-4">
        {reviews?.map((review) => (
          <div key={review.id} className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <StarRating value={review.rating} />
              <span className="text-xs text-slate-400">{formatDate(review.createdAt)}</span>
            </div>
            {review.comment && <p className="mt-1 text-sm text-slate-700">{review.comment}</p>}
          </div>
        ))}
      </div>

      {isAuthenticated && (
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-800">Write a review</h3>
          <p className="mt-1 text-xs text-slate-500">
            Only available if you've received this product in a delivered order.
          </p>
          <div className="mt-3">
            <StarRating value={rating} onChange={setRating} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience (optional)"
            rows={3}
            className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          />
          {feedback && (
            <div className="mt-3">
              <Alert tone={feedback.tone}>{feedback.message}</Alert>
            </div>
          )}
          <Button className="mt-3" size="sm" isLoading={submitReview.isPending} onClick={onSubmit}>
            Submit review
          </Button>
        </div>
      )}
    </div>
  );
};
