export const cssVars = {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  cardForeground: 'hsl(var(--card-foreground))',
  popover: 'hsl(var(--popover))',
  popoverForeground: 'hsl(var(--popover-foreground))',
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  secondary: 'hsl(var(--secondary))',
  secondaryForeground: 'hsl(var(--secondary-foreground))',
  muted: 'hsl(var(--muted))',
  mutedForeground: 'hsl(var(--muted-foreground))',
  accent: 'hsl(var(--accent))',
  accentForeground: 'hsl(var(--accent-foreground))',
  destructive: 'hsl(var(--destructive))',
  destructiveForeground: 'hsl(var(--destructive-foreground))',
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
} as const;

export const semanticColors = {
  success: {
    DEFAULT: 'hsl(142 76% 36%)',
    foreground: 'hsl(0 0% 100%)',
    subtle: 'hsl(142 76% 95%)',
  },
  warning: {
    DEFAULT: 'hsl(38 92% 50%)',
    foreground: 'hsl(0 0% 100%)',
    subtle: 'hsl(38 92% 95%)',
  },
  danger: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
    subtle: 'hsl(0 84% 97%)',
  },
  info: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
    subtle: 'hsl(221 83% 97%)',
  },
  neutral: {
    DEFAULT: 'hsl(var(--muted-foreground))',
    foreground: 'hsl(var(--foreground))',
    subtle: 'hsl(var(--muted))',
  },
} as const;

export type SemanticColor = keyof typeof semanticColors;
