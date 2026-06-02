import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, FormField, Input } from '@ams/ui';
import { qrVerificationSchema, type QRVerificationFormValues } from '../../schemas/security.schema';
import type { VerificationResult } from '../../types/verification.types';

export interface QRScannerProps {
  onVerify:   (payload: QRVerificationFormValues) => void;
  result?:    VerificationResult;
  isPending?: boolean;
}

export function QRScanner({ onVerify, result, isPending }: QRScannerProps) {
  const form = useForm<QRVerificationFormValues>({
    resolver:      zodResolver(qrVerificationSchema),
    defaultValues: { qrCode: '', gateId: '' },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onVerify)} className="space-y-4" noValidate>
          <FormField control={form.control} name="qrCode" label="QR Code" required>
            {(field) => (
              <Input
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Scan or enter QR code"
                disabled={isPending}
              />
            )}
          </FormField>

          <FormField control={form.control} name="gateId" label="Gate">
            {(field) => (
              <Input
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Gate number (optional)"
                disabled={isPending}
              />
            )}
          </FormField>

          <Button type="submit" loading={isPending} className="w-full">
            Verify QR Code
          </Button>
        </form>

        {result && (
          <div className={`rounded-md p-3 text-sm ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="font-medium">{result.success ? 'Verified' : 'Verification Failed'}</p>
            <p>{result.message}</p>
            {result.visitorName && <p className="mt-1">Visitor: {result.visitorName}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
