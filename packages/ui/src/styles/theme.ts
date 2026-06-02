import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cssVars, semanticColors } from './colors';
import { layout, spacing } from './spacing';
import { typography } from './typography';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const theme = {
  colors: { ...cssVars, semantic: semanticColors },
  spacing,
  layout,
  typography,
} as const;

export type Theme = typeof theme;
