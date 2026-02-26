'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { DesignMeta } from '@/lib/types';
import { staggerContainer, staggerItem } from '@/lib/motion';

const previewImages: Record<string, string> = {
  'startup-saas': '/previews/sass-image.png',
  'agency-portfolio': '/previews/agency-image.png',
};

export function DesignGallery({ designs }: { designs: DesignMeta[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-5xl gap-6 px-6 pb-28 sm:grid-cols-2"
    >
      {designs.map((d) => (
        <motion.div key={d.slug} variants={staggerItem}>
          <Link href={`/design/${d.slug}`} className="group block">
            <div className="overflow-hidden rounded-lg border border-ruled bg-graphite transition-all duration-300 hover:-translate-y-1 hover:border-terra/30 hover:shadow-lg hover:shadow-terra-glow">
              {/* Preview area */}
              <div
                className="relative h-48 border-b border-ruled bg-ink/50 bg-cover bg-top transition-transform duration-500 group-hover:scale-105"
                style={
                  previewImages[d.slug]
                    ? { backgroundImage: `url(${previewImages[d.slug]})` }
                    : undefined
                }
              >
                {!previewImages[d.slug] && (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-4xl font-extralight tracking-wider text-ruled group-hover:text-stone transition-colors duration-300">
                    {d.slug.split('-').map((w) => w[0].toUpperCase()).join('')}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-base font-semibold text-ivory group-hover:text-terra transition-colors duration-300">
                    {d.name}
                  </h3>
                  <span className="rounded border border-ruled px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-stone">
                    {d.category}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone line-clamp-2">
                  {d.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-ruled px-2 py-0.5 font-mono text-[10px] text-stone/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
