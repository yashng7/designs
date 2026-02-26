import type { DesignSection } from '@/lib/types';
import { AgencyNavbar, AgencyHero, AgencyFeatures, AgencyPricing, AgencyFooter } from './index';

export const sections: DesignSection[] = [
  { id: 'navbar', name: 'Navigation', type: 'navbar', component: AgencyNavbar, description: 'Dark nav with amber CTA' },
  { id: 'hero', name: 'Hero Section', type: 'hero', component: AgencyHero, description: 'Bold hero with stats' },
  { id: 'features', name: 'Services List', type: 'features', component: AgencyFeatures, description: 'Numbered service list' },
  { id: 'pricing', name: 'Selected Work', type: 'pricing', component: AgencyPricing, description: 'Portfolio grid' },
  { id: 'footer', name: 'Footer', type: 'footer', component: AgencyFooter, description: 'Minimal dark footer' },
];
