import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { cn } from '../../styles/theme';

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TTransformedValues extends FieldValues | undefined = undefined,
> {
  // Accept both the 2-generic (old) and 3-generic (new) Control shapes
  control: Control<TFieldValues, unknown, TTransformedValues>;
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: (field: {
    value: unknown;
    onChange: (...args: unknown[]) => void;
    onBlur: () => void;
    ref: React.Ref<unknown>;
    disabled?: boolean;
  }) => React.ReactNode;
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  control,
  name,
  label,
  description,
  required,
  className,
  children,
}: FormFieldProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      control={control as Control<TFieldValues>}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn('flex flex-col gap-1.5', className)}>
          {label && (
            <LabelPrimitive.Root
              htmlFor={name}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                fieldState.error && 'text-destructive',
              )}
            >
              {label}
              {required && <span className="ml-0.5 text-destructive">*</span>}
            </LabelPrimitive.Root>
          )}
          {children(field as Parameters<typeof children>[0])}
          {description && !fieldState.error && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {fieldState.error && (
            <p className="text-xs text-destructive">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export { FormField };
