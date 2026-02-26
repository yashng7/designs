import type { DesignTokens } from '@/lib/types';

export const tokens: DesignTokens = {
  colors: {
    primary: '#73937E', // Sage Green
    'primary-hover': '#5E7A67',
    'primary-light': '#E8EFEA',
    background: '#FAF9F6', // Off-white/Sand
    surface: '#FFFFFF',
    'surface-alt': '#F0EFEA', // Slightly darker warm gray
    'text-primary': '#2C3E35', // Deep Forest Green
    'text-secondary': '#6B7A70', // Muted Leaf
    'text-muted': '#A4B0A7',
    border: '#E8EFEA',
    accent: '#D4B892', // Warm Sand/Gold
    success: '#82A18D',
    error: '#C68B8B',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '24px',
    lg: '36px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '96px',
    section: '120px',
  },
  radius: {
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  typography: {
    display: { fontSize: '72px', lineHeight: '1.1', fontWeight: '400' },
    h1: { fontSize: '56px', lineHeight: '1.1', fontWeight: '400' },
    h2: { fontSize: '40px', lineHeight: '1.2', fontWeight: '400' },
    h3: { fontSize: '28px', lineHeight: '1.3', fontWeight: '400' },
    body: { fontSize: '18px', lineHeight: '1.7', fontWeight: '300' },
    small: { fontSize: '15px', lineHeight: '1.6', fontWeight: '400' },
  },
  shadows: {
    sm: '0 4px 12px rgba(115, 147, 126, 0.04)',
    md: '0 8px 24px rgba(115, 147, 126, 0.08)',
    lg: '0 16px 40px rgba(115, 147, 126, 0.12)',
    xl: '0 24px 64px rgba(115, 147, 126, 0.16)',
  },
};
