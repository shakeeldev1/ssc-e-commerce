import type { ReactNode } from 'react';

type Tone = 'error' | 'success' | 'info';

const TONE_CLASSES: Record<Tone, string> = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  info: 'border-brand-200 bg-brand-50 text-brand-700',
};

export const Alert = ({ tone = 'info', children }: { tone?: Tone; children: ReactNode }) => {
  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${TONE_CLASSES[tone]}`}>{children}</div>
  );
};
