const DEFAULT_CURRENCY = 'PHP';
const DEFAULT_LOCALE   = 'en-PH';

export function formatCurrency(
  amount: number | null | undefined,
  currency = DEFAULT_CURRENCY,
  locale   = DEFAULT_LOCALE,
): string {
  if (amount == null || isNaN(amount)) return '—';
  return new Intl.NumberFormat(locale, {
    style:                 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(value: number | null | undefined, options?: Intl.NumberFormatOptions): string {
  if (value == null || isNaN(value)) return '—';
  return new Intl.NumberFormat('en-US', options).format(value);
}

export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value == null || isNaN(value)) return '—';
  return `${value.toFixed(decimals)}%`;
}
