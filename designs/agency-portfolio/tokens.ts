import type { DesignTokens } from '@/lib/types';

export const tokens: DesignTokens = {
  colors: {
    primary: '#00F0FF', // Cyber Cyan
    'primary-hover': '#00C3D0',
    'primary-light': '#E5FDFF',
    background: '#050505', // Deep Void
    surface: '#0A0A0A',
    'surface-alt': '#141414',
    'text-primary': '#FFFFFF',
    'text-secondary': '#888888',
    'text-muted': '#444444',
    border: '#222222',
    accent: '#FF003C', // Neon Magenta
    success: '#00FF41', // Matrix Green
    error: '#FF003C',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
    '2xl': '96px',
    '3xl': '128px',
    section: '160px',
  },
  radius: {
    sm: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px',
    full: '0px', // Brutalist zero radius
  },
  typography: {
    display: { fontSize: '80px', lineHeight: '1', fontWeight: '900' },
    h1: { fontSize: '64px', lineHeight: '1', fontWeight: '800' },
    h2: { fontSize: '48px', lineHeight: '1.1', fontWeight: '800' },
    h3: { fontSize: '32px', lineHeight: '1.2', fontWeight: '700' },
    body: { fontSize: '16px', lineHeight: '1.5', fontWeight: '400' },
    small: { fontSize: '12px', lineHeight: '1.4', fontWeight: '500' },
  },
  shadows: {
    sm: '0 0 10px rgba(0, 240, 255, 0.2)',
    md: '0 0 20px rgba(0, 240, 255, 0.4)',
    lg: '4px 4px 0px rgba(255, 0, 60, 1)', // Harsh offset shadow
    xl: '0 0 40px rgba(0, 240, 255, 0.6)',
  },
};
