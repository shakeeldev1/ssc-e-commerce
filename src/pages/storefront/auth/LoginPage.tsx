import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLogin } from '@/features/auth/auth.api';
import { useAuthStore } from '@/features/auth/auth.store';
import type { CurrentUser } from '@/features/auth/auth.types';
import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope } from '@/lib/api-types';
import { getApiErrorMessage } from '@/lib/api-types';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();
  const setUser = useAuthStore((state) => state.setUser);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await login.mutateAsync(values);
      const { data } = await apiClient.get<ApiEnvelope<CurrentUser>>('/auth/me');
      setUser(data.data);
      const destinations: Record<string, string> = {
        super_admin: '/super-admin',
        vendor: '/vendor/dashboard',
        wholesale_vendor: '/vendor/dashboard',
        wholesale_buyer: '/wholesale/dashboard',
        student: '/customer/dashboard',
      };
      const requestedPath = (location.state as { from?: string } | null)?.from;
      const destination = requestedPath && requestedPath !== '/orders' && requestedPath !== '/admin'
        ? requestedPath
        : destinations[data.data.role] ?? '/';
      navigate(destination, { replace: true });
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not sign you in'));
    }
  });

  return (
    <div className="mx-auto max-w-md">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c48a2c]">Welcome back</p>
      <h1 className="mt-3 font-serif text-4xl text-slate-950">Sign in to SSC</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">Access your orders, Smart Card benefits, and personalized workspace.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {serverError && <Alert tone="error">{serverError}</Alert>}
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" variant="secondary" className="w-full" isLoading={isSubmitting} size="lg">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">
          Create one
        </Link>
      </p>
    </div>
  );
};
