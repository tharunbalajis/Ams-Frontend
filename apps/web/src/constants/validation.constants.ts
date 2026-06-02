export const REGEX = {
  EMAIL:        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PH:     /^(\+63|0)[0-9]{10}$/,
  URL:          /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  NUMBERS_ONLY: /^\d+$/,
  ALPHA:        /^[a-zA-Z]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
} as const;

export const LENGTH = {
  NAME_MIN:         2,
  NAME_MAX:         100,
  EMAIL_MAX:        255,
  PASSWORD_MIN:     8,
  PASSWORD_MAX:     100,
  PHONE_MAX:        15,
  ADDRESS_MAX:      500,
  DESCRIPTION_MAX:  2000,
  NOTES_MAX:        5000,
} as const;

export const FILE = {
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const,
  ALLOWED_DOC_TYPES:   [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ] as const,
  MAX_SIZE_MB: 10,
  MAX_SIZE:    10 * 1024 * 1024,
} as const;
