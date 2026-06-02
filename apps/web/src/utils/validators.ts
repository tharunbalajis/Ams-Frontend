import { REGEX, LENGTH } from '@/constants/validation.constants';

export const isValidEmail    = (v: string) => REGEX.EMAIL.test(v);
export const isValidPhonePH  = (v: string) => REGEX.PHONE_PH.test(v);
export const isValidUrl      = (v: string) => REGEX.URL.test(v);
export const isNumeric       = (v: string) => REGEX.NUMBERS_ONLY.test(v);
export const isAlphanumeric  = (v: string) => REGEX.ALPHANUMERIC.test(v);

export function isRequired(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim().length > 0;
  return true;
}

export const isMinLength  = (v: string, min: number) => v.length >= min;
export const isMaxLength  = (v: string, max: number) => v.length <= max;
export const isValidName  = (v: string) => v.trim().length >= LENGTH.NAME_MIN && v.trim().length <= LENGTH.NAME_MAX;
export const isValidPassword = (v: string) => v.length >= LENGTH.PASSWORD_MIN;
