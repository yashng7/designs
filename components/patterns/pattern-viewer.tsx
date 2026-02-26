'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { designSlugs, sectionLoaders, type DesignSlug } from '@/lib/registry';
import type { DesignSection } from '@/lib/types';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface LoadedSection {
  slug: DesignSlug;
  section: DesignSection;
}

interface Props {
  type: string;
}

export function PatternViewer({ type }: Props) {
  const [sections, setSections] = useState<LoadedSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      designSlugs.map(async (slug) => {
        try {
          const mod = await sectionLoaders[slug]();
          const match = mod.sections.find((s) => s.type === type);
          if (match) return { slug, section: match };
          return null;
        } catch {
          return null;
        }
      })
    ).then((results) => {
      setSections(results.filter((r): r is LoadedSection => r !== null));
      setLoading(false);
    });
  }, [type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-stone font-mono text-sm uppercase tracking-wider">
        <div className="mr-3 h-4 w-4 animate-spin rounded-sm border border-ruled border-t-terra" />
        Loading patterns…
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="py-24 text-center border border-ruled bg-graphite rounded-lg">
        <span className="mb-4 block text-3xl font-light text-terra">×</span>
        <h3 className="font-display text-lg font-light text-ivory">No patterns found</h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-stone">
          No designs have a &quot;{type}&quot; section defined.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-12"
    >
      {sections.map(({ slug, section }) => {
        const SectionComponent = section.component;
        return (
          <motion.div key={slug} variants={staggerItem}>
            <div className="mb-4 flex items-center gap-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-terra">{slug}</h3>
              <span className="rounded border border-ruled bg-ink px-2 py-0.5 font-mono text-[10px] uppercase text-stone">
                {section.name}
              </span>
              {section.description && (
                <span className="font-mono text-[10px] text-stone/70">— {section.description}</span>
              )}
            </div>
            <div
              className={`relative overflow-hidden rounded-lg border border-ruled bg-ink ${section.type === 'navbar' ? 'min-h-[140px]' : ''}`}
              style={{ contain: 'layout style paint', isolation: 'isolate' }}
            >
              <SectionComponent />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
