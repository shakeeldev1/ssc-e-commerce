import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { PageHeader } from '@/components/ui/PageHeader';
import { Select } from '@/components/ui/Select';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useApplyVendor } from '@/features/vendors/vendors.api';
import { getApiErrorMessage } from '@/lib/api-types';

const applySchema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Include an uppercase letter, lowercase letter and a number',
    ),
  phone: z.string().optional().or(z.literal('')),
  role: z.enum(['vendor', 'wholesale_vendor']),
  businessName: z.string().min(2, 'Required'),
  businessType: z.string().optional().or(z.literal('')),
  taxId: z.string().optional().or(z.literal('')),
  contactPhone: z.string().min(6, 'Required'),
  bankAccountName: z.string().min(2, 'Required'),
  bankAccountNumber: z.string().min(4, 'Required'),
  bankName: z.string().min(2, 'Required'),
});

type ApplyForm = z.infer<typeof applySchema>;

export const VendorsSellWithUsPage = () => {
  const applyVendor = useApplyVendor();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyForm>({ resolver: zodResolver(applySchema), defaultValues: { role: 'vendor' } });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const result = await applyVendor.mutateAsync({
        ...values,
        phone: values.phone || undefined,
        businessType: values.businessType || undefined,
        taxId: values.taxId || undefined,
      });
      setSubmittedEmail(result.email);
    } catch (error) {
      setServerError(getApiErrorMessage(error, 'Could not submit your application'));
    }
  });

  return (
    <div>
      <PageHeader
        title="Sell with us"
        subtitle="Join as a retail or wholesale vendor and reach students and businesses across the platform."
      />

      <div className="mx-auto max-w-3xl space-y-12">
        <section className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Why sell with us</h3>
            <p className="mt-1 text-sm text-slate-600">
              Reach a built-in student audience and, if approved, the wholesale/B2B marketplace too.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Simple onboarding</h3>
            <p className="mt-1 text-sm text-slate-600">
              Apply below, verify your email, and our team reviews your application.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold text-ink-950">Requirements</h3>
            <p className="mt-1 text-sm text-slate-600">
              A registered business name and a bank account for settlements. Verification documents
              can be uploaded after approval.
            </p>
          </Card>
        </section>

        <section>
          <SectionHeading title="Vendor application" />
          <Card className="p-6">
            {submittedEmail ? (
              <Alert tone="success">
                Application submitted for <strong>{submittedEmail}</strong> — check your email for a
                verification code, then sign in once your application is approved.
              </Alert>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                {serverError && <Alert tone="error">{serverError}</Alert>}

                <Select label="I want to sell" {...register('role')}>
                  <option value="vendor">Retail — everyday products</option>
                  <option value="wholesale_vendor">Wholesale — bulk/B2B products</option>
                </Select>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Your full name"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                  />
                  <Input label="Phone (optional)" {...register('phone')} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Business name"
                    {...register('businessName')}
                    error={errors.businessName?.message}
                  />
                  <Input
                    label="Business type (optional)"
                    placeholder="Sole proprietorship"
                    {...register('businessType')}
                  />
                  <Input label="Tax ID (optional)" {...register('taxId')} />
                  <Input
                    label="Business contact phone"
                    {...register('contactPhone')}
                    error={errors.contactPhone?.message}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Input
                    label="Bank account name"
                    {...register('bankAccountName')}
                    error={errors.bankAccountName?.message}
                  />
                  <Input
                    label="Bank account number"
                    {...register('bankAccountNumber')}
                    error={errors.bankAccountNumber?.message}
                  />
                  <Input
                    label="Bank name"
                    {...register('bankName')}
                    error={errors.bankName?.message}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  Submit application
                </Button>
              </form>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
};
