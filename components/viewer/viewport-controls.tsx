'use client';

import { cn } from '@/lib/utils';

export type ViewportMode = 'mobile' | 'tablet' | 'desktop';

const SmartphoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const TabletIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export const viewports: Record<ViewportMode, { w: number; h: number; label: string; icon: React.ReactNode }> = {
  mobile: { w: 375, h: 812, label: 'Mobile', icon: <SmartphoneIcon /> },
  tablet: { w: 768, h: 1024, label: 'Tablet', icon: <TabletIcon /> },
  desktop: { w: 1440, h: 900, label: 'Desktop', icon: <MonitorIcon /> },
};

interface Props {
  mode: ViewportMode;
  onModeChange: (m: ViewportMode) => void;
  zoom: number;
  onZoomChange: (z: number) => void;
}

export function ViewportControls({ mode, onModeChange, zoom, onZoomChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      {(Object.keys(viewports) as ViewportMode[]).map((key) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2 sm:px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors',
            mode === key
              ? 'bg-terra text-white'
              : 'border border-ruled text-stone hover:text-ivory'
          )}
        >
          <span className="sm:hidden">{viewports[key].icon}</span>
          <span className="hidden sm:inline-flex items-center gap-1.5">{viewports[key].icon} {viewports[key].label}</span>
        </button>
      ))}
      <div className="ml-1 sm:ml-2 flex items-center gap-1 rounded-md border border-ruled px-1">
        <button
          onClick={() => onZoomChange(Math.max(0.25, zoom - 0.1))}
          className="px-1.5 py-1 font-mono text-xs text-stone hover:text-ivory"
        >
          −
        </button>
        <span className="min-w-[2.5rem] sm:min-w-[3rem] text-center font-mono text-[11px] text-ivory">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
          className="px-1.5 py-1 font-mono text-xs text-stone hover:text-ivory"
        >
          +
        </button>
      </div>
    </div>
  );
}
