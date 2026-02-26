import type { DesignMeta } from '@/lib/types';

export const meta: DesignMeta = {
  slug: 'agency-portfolio',
  name: 'Futuristic Agency',
  description: 'A brutalist, high-tech portfolio aesthetic featuring monospace typography, 0px border radius, striking cyan/magenta neon over deep void black.',
  author: 'Platform Team',
  date: '2024-12-01',
  tags: ['agency', 'futuristic', 'cyberpunk', 'brutalist', 'dark-mode'],
  category: 'portfolio',
  inspiration: 'Awwwards, Cyberpunk 2077, High-tech brutalism',
  notes: 'Replaces standard soft web design with aggressive geometric layouts. Employs harsh shadows, glitch-inspired hover states, and stark grids.',
  layout: {
    type: 'full-width',
    gridSystem: 'css-grid asymmetric',
    maxWidth: 'none',
  },
  fontStack: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    mono: '"Space Mono", "JetBrains Mono", monospace',
  },
};
