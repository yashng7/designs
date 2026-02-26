'use client';

import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-28">
      {/* Subtle radial warmth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-terra/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-stone"
        >
          Frontend Engineering Platform
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-extralight tracking-tight text-ivory sm:text-6xl lg:text-7xl"
        >
          Design System
          <br />
          <span className="font-semibold text-terra">Showcase</span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 h-px w-24 origin-left bg-ruled"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mt-6 max-w-md font-mono text-sm leading-relaxed text-stone"
        >
          Explore, inspect, and compare frontend designs
          <br />
          across viewports and patterns.
        </motion.p>
      </div>
    </section>
  );
}
