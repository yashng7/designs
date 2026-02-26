import type { ComponentType } from 'react';

export interface DesignMeta {
  slug: string;
  name: string;
  description: string;
  author?: string;
  date?: string;
  tags: string[];
  category: 'landing' | 'dashboard' | 'portfolio' | 'saas' | 'ecommerce';
  inspiration?: string;
  notes?: string;
  layout: {
    type: 'single-page' | 'multi-section' | 'grid-based';
    gridSystem?: string;
    maxWidth?: string;
  };
  fontStack: {
    heading: string;
    body: string;
    mono?: string;
  };
}

export interface DesignTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  typography: Record<
    string,
    {
      fontSize: string;
      lineHeight: string;
      fontWeight: string | number;
      letterSpacing?: string;
    }
  >;
  shadows: Record<string, string>;
}

export interface DesignSection {
  id: string;
  name: string;
  type:
    | 'hero'
    | 'navbar'
    | 'features'
    | 'pricing'
    | 'footer'
    | 'testimonials'
    | 'cta'
    | 'stats'
    | 'faq'
    | 'custom';
  component: ComponentType;
  description?: string;
}

export type DesignSections = DesignSection[];

export interface DesignModule {
  Component: ComponentType;
  meta: DesignMeta;
  tokens?: DesignTokens;
  sections?: DesignSections;
}

export interface RegistryEntry {
  slug: string;
  meta: DesignMeta;
  load: () => Promise<DesignModule>;
}

export interface ViewportPreset {
  width: number;
  height: number;
  label: string;
  icon: string;
}

export interface ComputedElementInfo {
  tagName: string;
  className: string;
  dimensions: { width: number; height: number };
  position: { top: number; left: number };
  margin: { top: number; right: number; bottom: number; left: number };
  padding: { top: number; right: number; bottom: number; left: number };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    color: string;
  };
  background: string;
  borderRadius: string;
  display: string;
}

export interface A11yIssue {
  type: 'error' | 'warning' | 'info';
  category: 'contrast' | 'heading' | 'alt-text' | 'aria' | 'focus';
  message: string;
  element?: string;
}
