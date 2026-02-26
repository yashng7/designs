'use client';

import { forwardRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const DesignSandbox = forwardRef<HTMLDivElement, Props>(function DesignSandbox(
  { children },
  ref
) {
  return (
    <div
      ref={ref}
      className="design-sandbox relative @container"
      style={{
        contain: 'layout style',
        isolation: 'isolate',
      }}
    >
      {children}
    </div>
  );
});
