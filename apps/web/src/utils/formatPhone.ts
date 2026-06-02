export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return '—';
  const cleaned = phone.replace(/\D/g, '');

  // Philippine mobile: 09xxxxxxxxx → 0912 345 6789
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  // With country code: 639xxxxxxxxx → +63 912 345 6789
  if (cleaned.length === 12 && cleaned.startsWith('63')) {
    return `+63 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
}
