import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useCreateReturnRequest } from '@/features/returns/returns.api';
import { getApiErrorMessage } from '@/lib/api-types';

export const ReturnRequestForm = ({ orderId }: { orderId: string }) => {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; message: string } | null>(
    null,
  );
  const createRequest = useCreateReturnRequest();

  const onSubmit = async () => {
    if (reason.trim().length < 3) {
      setFeedback({ tone: 'error', message: 'Tell us a bit more about why you want to return it' });
      return;
    }
    try {
      await createRequest.mutateAsync({ orderId, orderChannel: 'retail', type: 'return', reason });
      setFeedback({
        tone: 'success',
        message: 'Return request submitted — we will review it shortly.',
      });
      setReason('');
    } catch (error) {
      setFeedback({
        tone: 'error',
        message: getApiErrorMessage(error, 'Could not submit the return request'),
      });
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Why are you returning this order?"
        rows={3}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
      />
      {feedback && <Alert tone={feedback.tone}>{feedback.message}</Alert>}
      <Button size="sm" variant="outline" onClick={onSubmit} isLoading={createRequest.isPending}>
        Request return
      </Button>
    </div>
  );
};
