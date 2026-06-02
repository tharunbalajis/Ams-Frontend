import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, FormField, Input } from '@ams/ui';
import { otpVerificationSchema, type OTPVerificationFormValues } from '../../schemas/security.schema';
import type { VerificationResult } from '../../types/verification.types';

export interface OTPVerificationProps {
  visitorId?:  string;
  onVerify:    (payload: OTPVerificationFormValues) => void;
  result?:     VerificationResult;
  isPending?:  boolean;
}

export function OTPVerification({ visitorId, onVerify, result, isPending }: OTPVerificationProps) {
  const form = useForm<OTPVerificationFormValues>({
    resolver:      zodResolver(otpVerificationSchema),
    defaultValues: { visitorId: visitorId ?? '', otp: '' },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>OTP Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onVerify)} className="space-y-4" noValidate>
          {!visitorId && (
            <FormField control={form.control} name="visitorId" label="Visitor ID" required>
              {(field) => (
                <Input
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Visitor ID"
                  disabled={isPending}
                />
              )}
            </FormField>
          )}

          <FormField control={form.control} name="otp" label="OTP (6 digits)" required>
            {(field) => (
              <Input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="000000"
                className="text-center tracking-widest text-lg"
                disabled={isPending}
              />
            )}
          </FormField>

          <Button type="submit" loading={isPending} className="w-full">
            Verify OTP
          </Button>
        </form>

        {result && (
          <div className={`rounded-md p-3 text-sm ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-medium">{result.success ? 'OTP Verified' : 'Verification Failed'}</p>
            <p>{result.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
