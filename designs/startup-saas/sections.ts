import type { DesignSection } from '@/lib/types';
import { SaaSNavbar, SaaSHero, SaaSFeatures, SaaSPricing, SaaSFooter } from './index';

export const sections: DesignSection[] = [
  { id: 'navbar', name: 'Navigation Bar', type: 'navbar', component: SaaSNavbar, description: 'Clean top nav with logo, links, and CTA' },
  { id: 'hero', name: 'Hero Section', type: 'hero', component: SaaSHero, description: 'Centered hero with headline, subtext, and dual CTAs' },
  { id: 'features', name: 'Feature Grid', type: 'features', component: SaaSFeatures, description: '3-column feature grid with icons' },
  { id: 'pricing', name: 'Pricing Table', type: 'pricing', component: SaaSPricing, description: '3-tier pricing with featured plan highlight' },
  { id: 'footer', name: 'Footer', type: 'footer', component: SaaSFooter, description: 'Simple footer with links' },
];
