import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useVerifyEmail } from '@/features/auth/auth.api';
import { getApiErrorMessage } from '@/lib/api-types';

const verifySchema = z.object({
  code: z.string().length(6, 'Enter the 6-digit code'),
});

type VerifyForm = z.infer<typeof verifySchema>;

export const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? '';
  const verifyEmail = useVerifyEmail();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyForm>({ resolver: zodResolver(verifySchema) });

  if (!email) {
    return (
      <div className="mx-auto max-w-md text-center">
        <Alert tone="error">
          We don't know which email to verify. Please register again or sign in.
        </Alert>
      </div>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await verifyEmail.mutateAsync({ email, code: values.code });
      navigate('/');
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'That code did not work'));
    }
  });

  return (
    <div className="mx-auto max-w-md">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c48a2c]">One final step</p>
      <h1 className="mt-3 font-serif text-4xl text-slate-950">Verify your email</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        We sent a 6-digit code to <span className="font-medium text-slate-700">{email}</span>.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {serverError && <Alert tone="error">{serverError}</Alert>}
        <Input
          label="Verification code"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          {...register('code')}
          error={errors.code?.message}
        />
        <Button type="submit" variant="secondary" className="w-full" isLoading={isSubmitting} size="lg">
          Verify & continue
        </Button>
      </form>
    </div>
  );
};
