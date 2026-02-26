'use client';

import { motion } from 'motion/react';
import type { ViewportMode } from './viewport-controls';
import { viewports } from './viewport-controls';
import { viewportMorphTransition } from '@/lib/motion';
import type { ReactNode } from 'react';

interface Props {
  mode: ViewportMode;
  zoom: number;
  children: ReactNode;
}

export function DeviceFrame({ mode, zoom, children }: Props) {
  const vp = viewports[mode];
  return (
    <div className="flex flex-1 items-start justify-center overflow-auto bg-neutral-950/50 p-4 sm:p-8">
      <div className="w-full max-w-full flex justify-center">
        <motion.div
          animate={{ width: vp.w }}
          transition={viewportMorphTransition}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            height: vp.h,
            maxWidth: `${100 / zoom}%`,
          }}
          className="relative overflow-hidden rounded-lg border border-neutral-700 bg-white shadow-2xl"
        >
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
