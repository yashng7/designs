import type { DesignMeta } from '@/lib/types';

export const meta: DesignMeta = {
  slug: 'startup-saas',
  name: 'Soothing SaaS',
  description: 'A calm, breathable aesthetic for well-being and productivity tools. Features soft sage greens, elegant serif headings, and diffused shadows.',
  author: 'Platform Team',
  date: '2024-12-01',
  tags: ['saas', 'soothing', 'organic', 'calm', 'sage'],
  category: 'saas',
  inspiration: 'Oura, Headspace, Calm',
  notes: 'Replaces generic rigid layouts with breathable spacing, pill-shaped elements, and high contrast warm text. Highly responsive and mobile-friendly.',
  layout: {
    type: 'multi-section',
    gridSystem: '12-column implicit',
    maxWidth: '1200px',
  },
  fontStack: {
    heading: 'Playfair Display, Georgia, serif',
    body: 'system-ui, -apple-system, sans-serif',
    mono: 'monospace',
  },
};
