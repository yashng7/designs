'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import type { DesignMeta, DesignTokens } from '@/lib/types';
import { componentLoaders, type DesignSlug } from '@/lib/registry';
import { TokenDiff } from '@/components/tokens/token-diff';
import {
  ViewportControls,
  type ViewportMode,
  viewports,
} from '@/components/viewer/viewport-controls';
import { viewportMorphTransition } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { DesignSkeleton } from '@/components/ui/skeleton';

type CompareTab = 'visual' | 'tokens';

interface Props {
  slugA: DesignSlug;
  slugB: DesignSlug;
  metaA: DesignMeta;
  metaB: DesignMeta;
  tokensA: DesignTokens | null;
  tokensB: DesignTokens | null;
}

function useContainerZoom(containerRef: React.RefObject<HTMLDivElement | null>, vpWidth: number, isMobile: boolean) {
  const [autoZoom, setAutoZoom] = useState(0.45);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const available = el.clientWidth;
      // On mobile (stacked), full width minus padding; on desktop, half width minus padding/divider
      const usable = isMobile ? available - 48 : (available - 64) / 2;
      const fit = Math.min(0.6, Math.max(0.2, usable / vpWidth));
      setAutoZoom(fit);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, vpWidth, isMobile]);

  return autoZoom;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

export function CompareViewer({ slugA, slugB, metaA, metaB, tokensA, tokensB }: Props) {
  const [tab, setTab] = useState<CompareTab>('visual');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [manualZoom, setManualZoom] = useState<number | null>(null);
  const [CompA, setCompA] = useState<React.ComponentType | null>(null);
  const [CompB, setCompB] = useState<React.ComponentType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const vp = viewports[viewport];
  const autoZoom = useContainerZoom(containerRef, vp.w, isMobile);
  const zoom = manualZoom ?? autoZoom;

  useEffect(() => {
    componentLoaders[slugA]()
      .then((m) => setCompA(() => m.default))
      .catch(() => {});
    componentLoaders[slugB]()
      .then((m) => setCompB(() => m.default))
      .catch(() => {});
  }, [slugA, slugB]);

  // Reset manual zoom when viewport mode or screen size changes
  useEffect(() => {
    setManualZoom(null);
  }, [viewport, isMobile]);

  const tabs: { key: CompareTab; label: string; icon: React.ReactNode }[] = [
    { key: 'visual', label: 'Visual', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg> },
    { key: 'tokens', label: 'Tokens', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="15.5" r="2.5" /><circle cx="8.5" cy="15.5" r="2.5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10" /></svg> },
  ];

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-ink">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ruled bg-graphite px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="font-display text-xs sm:text-sm font-semibold text-ivory truncate">
            {metaA.name} <span className="font-light text-stone mx-1">vs</span> {metaB.name}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors',
                tab === t.key
                  ? 'bg-terra text-white'
                  : 'border border-ruled text-stone hover:border-stone hover:text-ivory'
              )}
            >
              <span className="shrink-0 opacity-70">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
          {tab === 'visual' && (
            <>
              <div className="h-5 w-px bg-ruled mx-0.5 hidden sm:block" />
              <ViewportControls
                mode={viewport}
                onModeChange={setViewport}
                zoom={zoom}
                onZoomChange={setManualZoom}
              />
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {tab === 'visual' ? (
        <div
          ref={containerRef}
          className={cn(
            'flex flex-1 gap-4 overflow-auto p-4 sm:p-6',
            isMobile ? 'flex-col items-center' : 'flex-row'
          )}
        >
          {/* Design A */}
          <div className={cn('flex flex-col items-center min-w-0', !isMobile && 'flex-1')}>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-stone">{metaA.name}</p>
            <div
              className="relative flex-shrink-0"
              style={{
                width: Math.min(vp.w * zoom, containerRef.current ? containerRef.current.clientWidth - 48 : vp.w * zoom),
                height: vp.h * zoom,
              }}
            >
              <motion.div
                animate={{ width: vp.w }}
                transition={viewportMorphTransition}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  height: vp.h,
                }}
                className="overflow-hidden border border-ruled bg-white shadow-2xl shadow-ink"
              >
                <div className="h-full overflow-y-auto @container">
                  {CompA ? <CompA /> : <DesignSkeleton />}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Divider */}
          <div className={cn(
            'shrink-0 bg-ruled',
            isMobile ? 'h-px w-full' : 'w-px'
          )} />

          {/* Design B */}
          <div className={cn('flex flex-col items-center min-w-0', !isMobile && 'flex-1')}>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-stone">{metaB.name}</p>
            <div
              className="relative flex-shrink-0"
              style={{
                width: Math.min(vp.w * zoom, containerRef.current ? containerRef.current.clientWidth - 48 : vp.w * zoom),
                height: vp.h * zoom,
              }}
            >
              <motion.div
                animate={{ width: vp.w }}
                transition={viewportMorphTransition}
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  height: vp.h,
                }}
                className="overflow-hidden border border-ruled bg-white shadow-2xl shadow-ink"
              >
                <div className="h-full overflow-y-auto @container">
                  {CompB ? <CompB /> : <DesignSkeleton />}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto max-w-3xl border border-ruled bg-graphite rounded-lg p-4 sm:p-6 shadow-xl shadow-ink">
            <TokenDiff
              tokensA={tokensA}
              tokensB={tokensB}
              nameA={metaA.name}
              nameB={metaB.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
