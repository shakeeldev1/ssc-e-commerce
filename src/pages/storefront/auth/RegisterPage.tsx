import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useRegister } from '@/features/auth/auth.api';
import { getApiErrorMessage } from '@/lib/api-types';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Include an uppercase letter, lowercase letter and a number',
    ),
  role: z.enum(['student', 'wholesale_buyer']),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const result = await registerMutation.mutateAsync({
        ...values,
        phone: values.phone || undefined,
      });
      navigate('/verify-email', { state: { email: result.email } });
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not create your account'));
    }
  });

  return (
    <div className="mx-auto max-w-md">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c48a2c]">Join SSC</p>
      <h1 className="mt-3 font-serif text-4xl text-slate-950">Create your account</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Students and wholesale buyers can sign up here. Already have a card? You can link it after
        verifying your email.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {serverError && <Alert tone="error">{serverError}</Alert>}

        <Input
          label="Full name"
          placeholder="Ayesha Khan"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone (optional)"
          placeholder="+923001234567"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          {...register('password')}
          error={errors.password?.message}
        />
        <Select label="I am a" {...register('role')} error={errors.role?.message}>
          <option value="student">Student</option>
          <option value="wholesale_buyer">Wholesale buyer</option>
        </Select>

        <Button type="submit" variant="secondary" className="w-full" isLoading={isSubmitting} size="lg">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </div>
  );
};
