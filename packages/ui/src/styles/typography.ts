export const fontFamily = {
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
} as const;

export const fontSize = {
  xs:   { size: '0.75rem',  lineHeight: '1rem' },
  sm:   { size: '0.875rem', lineHeight: '1.25rem' },
  base: { size: '1rem',     lineHeight: '1.5rem' },
  lg:   { size: '1.125rem', lineHeight: '1.75rem' },
  xl:   { size: '1.25rem',  lineHeight: '1.75rem' },
  '2xl':{ size: '1.5rem',   lineHeight: '2rem' },
  '3xl':{ size: '1.875rem', lineHeight: '2.25rem' },
  '4xl':{ size: '2.25rem',  lineHeight: '2.5rem' },
} as const;

export const fontWeight = {
  normal:   '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
} as const;

export const letterSpacing = {
  tight:   '-0.025em',
  normal:  '0',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
} as const;

export const typography = { fontFamily, fontSize, fontWeight, letterSpacing } as const;
