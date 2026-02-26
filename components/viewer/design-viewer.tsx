'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { DesignMeta, DesignTokens, ComputedElementInfo } from '@/lib/types';
import { componentLoaders, type DesignSlug } from '@/lib/registry';
import { ViewportControls, type ViewportMode } from './viewport-controls';
import { DeviceFrame } from './device-frame';
import { DesignSandbox } from '@/components/sandbox/design-sandbox';
import { InspectorOverlay } from '@/components/inspector/inspector-overlay';
import { InspectorPanel } from '@/components/inspector/inspector-panel';
import { TokenPanel } from '@/components/tokens/token-panel';
import { MetaPanel } from '@/components/meta/meta-panel';
import { A11yPanel } from '@/components/a11y/a11y-panel';
import { DesignSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type PanelTab = 'tokens' | 'meta' | 'inspector' | 'a11y';

interface Props {
  slug: DesignSlug;
  meta: DesignMeta;
  tokens: DesignTokens | null;
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

export function DesignViewer({ slug, meta, tokens }: Props) {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [zoom, setZoom] = useState(0.6);
  const [prevZoom, setPrevZoom] = useState(0.6);
  const [inspectorOn, setInspectorOn] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState<ComputedElementInfo | null>(null);
  const [activePanel, setActivePanel] = useState<PanelTab | null>('meta');
  const [DesignComp, setDesignComp] = useState<React.ComponentType | null>(null);
  const [loadError, setLoadError] = useState(false);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    setDesignComp(null);
    setLoadError(false);
    componentLoaders[slug]()
      .then((mod) => setDesignComp(() => mod.default))
      .catch(() => setLoadError(true));
  }, [slug]);

  // Auto-fit zoom on mobile
  useEffect(() => {
    if (!isMobile) return;
    const el = viewerRef.current;
    if (!el) return;

    const compute = () => {
      const available = el.clientWidth;
      const usable = available - 32; // padding
      const vpW = 375; // force mobile viewport on small screens
      const fit = Math.min(0.8, Math.max(0.25, usable / vpW));
      setZoom(fit);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  // Force mobile viewport on mobile screens
  useEffect(() => {
    if (isMobile && viewport !== 'mobile') {
      setViewport('mobile');
    }
  }, [isMobile]);

  // Force 100% zoom when inspector is on
  useEffect(() => {
    if (inspectorOn) {
      setPrevZoom(zoom);
      setZoom(1);
    } else {
      setZoom(prevZoom);
    }
  }, [inspectorOn]);

  const togglePanel = useCallback(
    (tab: PanelTab) => setActivePanel((prev) => (prev === tab ? null : tab)),
    []
  );

  const tabs: { key: PanelTab; label: string; icon: React.ReactNode }[] = [
    { key: 'meta', label: 'Meta', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
    { key: 'tokens', label: 'Tokens', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="15.5" r="2.5" /><circle cx="8.5" cy="15.5" r="2.5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10" /></svg> },
    { key: 'inspector', label: 'Inspector', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg> },
    { key: 'a11y', label: 'A11y', icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" y1="8" x2="12" y2="8" /><line x1="3.95" y1="6.06" x2="8.54" y2="14" /><line x1="10.88" y1="21.94" x2="15.46" y2="14" /></svg> },
  ];

  const panelContent = (
    <>
      {/* Panel Tabs */}
      <div className="flex border-b border-ruled">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => togglePanel(t.key)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 px-2 py-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors',
              activePanel === t.key
                ? 'border-b border-terra text-terra'
                : 'text-stone hover:text-ivory'
            )}
          >
            <span className="shrink-0">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === 'meta' && <MetaPanel meta={meta} />}
        {activePanel === 'tokens' && <TokenPanel tokens={tokens} />}
        {activePanel === 'inspector' && <InspectorPanel info={hoveredInfo} />}
        {activePanel === 'a11y' && <A11yPanel sandboxRef={sandboxRef} />}
      </div>
    </>
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ruled bg-graphite px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="font-display text-xs sm:text-sm font-semibold text-ivory truncate">{meta.name}</h2>
          <span className="rounded border border-ruled px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-stone hidden sm:inline">
            {meta.category}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {!isMobile && (
            <ViewportControls
              mode={viewport}
              onModeChange={setViewport}
              zoom={zoom}
              onZoomChange={setZoom}
            />
          )}
          <button
            onClick={() => setInspectorOn((v) => !v)}
            className={cn(
              'rounded-md px-2.5 sm:px-3 py-1.5 font-mono text-xs transition-colors',
              inspectorOn
                ? 'bg-terra text-white'
                : 'border border-ruled text-stone hover:text-ivory'
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg> <span className="hidden sm:inline">Inspect</span>
          </button>
          {/* Mobile panel toggle */}
          {isMobile && (
            <button
              onClick={() => setActivePanel((p) => (p ? null : 'meta'))}
              className={cn(
                'rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors',
                activePanel
                  ? 'bg-terra text-white'
                  : 'border border-ruled text-stone hover:text-ivory'
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> Panel
            </button>
          )}
        </div>
      </div>

      {isMobile ? (
        /* Mobile layout: vertical stack */
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Viewer Area */}
          <div ref={viewerRef} className={cn('flex-1 min-h-0', activePanel ? 'flex-[1_1_50%]' : 'flex-1')}>
            <DeviceFrame mode={viewport} zoom={zoom}>
              <DesignSandbox ref={sandboxRef}>
                {loadError ? (
                  <div className="flex h-full items-center justify-center p-8 text-terra">
                    Failed to load design
                  </div>
                ) : DesignComp ? (
                  <DesignComp />
                ) : (
                  <DesignSkeleton />
                )}
              </DesignSandbox>
              {inspectorOn && (
                <InspectorOverlay
                  sandboxRef={sandboxRef}
                  onHover={setHoveredInfo}
                />
              )}
            </DeviceFrame>
          </div>

          {/* Bottom Panel on Mobile */}
          <AnimatePresence>
            {activePanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: '45vh', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="overflow-hidden border-t border-ruled bg-graphite flex flex-col"
              >
                {panelContent}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Desktop layout: side-by-side */
        <div className="flex flex-1 overflow-hidden">
          {/* Viewer Area */}
          <div ref={viewerRef} className="flex-1 min-w-0">
            <DeviceFrame mode={viewport} zoom={zoom}>
              <DesignSandbox ref={sandboxRef}>
                {loadError ? (
                  <div className="flex h-full items-center justify-center p-8 text-terra">
                    Failed to load design
                  </div>
                ) : DesignComp ? (
                  <DesignComp />
                ) : (
                  <DesignSkeleton />
                )}
              </DesignSandbox>
              {inspectorOn && (
                <InspectorOverlay
                  sandboxRef={sandboxRef}
                  onHover={setHoveredInfo}
                />
              )}
            </DeviceFrame>
          </div>

          {/* Side Panel */}
          <AnimatePresence>
            {activePanel && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="overflow-hidden border-l border-ruled bg-graphite"
              >
                <div className="flex h-full w-[380px] flex-col">
                  {panelContent}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Panel Toggle (when panel is closed) */}
          {!activePanel && (
            <div className="flex flex-col border-l border-ruled bg-graphite">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActivePanel(t.key)}
                  className="px-2.5 py-3 font-mono text-xs text-stone hover:bg-ink hover:text-ivory transition-colors"
                  title={t.label}
                >
                  {t.icon}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
