import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './designs/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0d0d0f',
        graphite: '#141416',
        ruled: '#252528',
        stone: '#8a847b',
        ivory: '#f0ece4',
        terra: {
          DEFAULT: '#d4634a',
          light: '#e8856f',
          dark: '#b8503b',
          glow: 'rgba(212, 99, 74, 0.08)',
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
      },
      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      containers: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [containerQueries],
};

export default config;
