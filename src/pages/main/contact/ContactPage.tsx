import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { useSubmitContactMessage } from '@/features/contact/contact.api';
import { getApiErrorMessage } from '@/lib/api-types';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().optional().or(z.literal('')),
  message: z.string().min(5, 'Tell us a bit more'),
});

type ContactForm = z.infer<typeof contactSchema>;

export const ContactPage = () => {
  const submitMessage = useSubmitContactMessage();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await submitMessage.mutateAsync({
        ...values,
        phone: values.phone || undefined,
        subject: values.subject || undefined,
      });
      setSent(true);
      reset();
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not send your message'));
    }
  });

  return (
    <div>
      <PageHeader
        title="Contact us"
        subtitle="Questions about orders, wholesale, or partnering with us — we're here to help."
      />

      <div className="mx-auto max-w-xl">
        <Card className="p-6">
          {sent ? (
            <Alert tone="success">
              Thanks for reaching out — our team will get back to you soon.
            </Alert>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {serverError && <Alert tone="error">{serverError}</Alert>}
              <Input label="Full name" {...register('fullName')} error={errors.fullName?.message} />
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input label="Phone (optional)" {...register('phone')} />
              <Input label="Subject (optional)" {...register('subject')} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                />
                {errors.message && (
                  <span className="text-xs text-red-600">{errors.message.message}</span>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                Send message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
