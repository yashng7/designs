'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '@/lib/motion';

const features = [
  {
    title: 'Isolated Execution',
    description: 'Each design module runs in a strict CSS sandbox, ensuring zero style bleed across the application while maintaining perfect fidelity.',
    icon: '◰',
  },
  {
    title: 'Precision Inspector',
    description: 'Hover over any element to reveal its computed box model, typography tokens, and exact rendering dimensions in real-time.',
    icon: '⌖',
  },
  {
    title: 'Token Extraction',
    description: 'Automatically parse and visualize color palettes, spacing ramps, and typography scales from any registered design system.',
    icon: '▤',
  },
  {
    title: 'A11y Analysis',
    description: 'Run automated accessibility audits to catch contrast failures, missing ARIA attributes, and structural heading issues.',
    icon: '◎',
  },
];

export function FeaturesSection() {
  return (
    <section className="border-t border-ruled bg-ink px-6 py-28 relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-graphite/50 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terra mb-4">
            Platform Capabilities
          </p>
          <h2 className="font-display text-3xl font-light text-ivory sm:text-4xl">
            Engineered for <span className="font-semibold">Insight</span>
          </h2>
          <div className="mt-8 h-px w-16 bg-ruled" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="group border border-ruled bg-graphite p-8 transition-colors hover:border-terra/30"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-ruled font-display text-xl text-stone group-hover:text-terra transition-colors">
                {feature.icon}
              </div>
              <h3 className="mb-3 font-display text-lg font-semibold text-ivory">
                {feature.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-stone">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
