import type { DesignMeta, DesignTokens, DesignSection } from './types';

export const designSlugs = ['startup-saas', 'agency-portfolio'] as const;
export type DesignSlug = (typeof designSlugs)[number];

export function isValidSlug(slug: string): slug is DesignSlug {
  return (designSlugs as readonly string[]).includes(slug);
}

const metaLoaders: Record<DesignSlug, () => Promise<{ meta: DesignMeta }>> = {
  'startup-saas': () => import('@/designs/startup-saas/meta'),
  'agency-portfolio': () => import('@/designs/agency-portfolio/meta'),
};

const tokenLoaders: Record<DesignSlug, () => Promise<{ tokens: DesignTokens }>> = {
  'startup-saas': () => import('@/designs/startup-saas/tokens'),
  'agency-portfolio': () => import('@/designs/agency-portfolio/tokens'),
};

export const componentLoaders: Record<
  DesignSlug,
  () => Promise<{ default: React.ComponentType }>
> = {
  'startup-saas': () => import('@/designs/startup-saas'),
  'agency-portfolio': () => import('@/designs/agency-portfolio'),
};

export const sectionLoaders: Record<
  DesignSlug,
  () => Promise<{ sections: DesignSection[] }>
> = {
  'startup-saas': () => import('@/designs/startup-saas/sections'),
  'agency-portfolio': () => import('@/designs/agency-portfolio/sections'),
};

export async function getDesignMeta(slug: DesignSlug): Promise<DesignMeta> {
  const mod = await metaLoaders[slug]();
  return mod.meta;
}

export async function getDesignTokens(slug: DesignSlug): Promise<DesignTokens | null> {
  try {
    const mod = await tokenLoaders[slug]();
    return mod.tokens;
  } catch {
    return null;
  }
}

export async function getAllDesignMetas(): Promise<DesignMeta[]> {
  return Promise.all(designSlugs.map((slug) => getDesignMeta(slug)));
}
