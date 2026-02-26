'use client';

import { useEffect, useState, useCallback, type RefObject } from 'react';
import type { ComputedElementInfo } from '@/lib/types';

interface Props {
  sandboxRef: RefObject<HTMLDivElement | null>;
  onHover: (info: ComputedElementInfo | null) => void;
}

function computeInfo(el: HTMLElement, container: HTMLElement): ComputedElementInfo {
  const rect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const style = getComputedStyle(el);

  return {
    tagName: el.tagName.toLowerCase(),
    className: el.className?.toString().slice(0, 120) || '',
    dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
    position: {
      top: Math.round(rect.top - containerRect.top),
      left: Math.round(rect.left - containerRect.left),
    },
    margin: {
      top: parseFloat(style.marginTop),
      right: parseFloat(style.marginRight),
      bottom: parseFloat(style.marginBottom),
      left: parseFloat(style.marginLeft),
    },
    padding: {
      top: parseFloat(style.paddingTop),
      right: parseFloat(style.paddingRight),
      bottom: parseFloat(style.paddingBottom),
      left: parseFloat(style.paddingLeft),
    },
    typography: {
      fontFamily: style.fontFamily.split(',')[0].replace(/"/g, ''),
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      color: style.color,
    },
    background: style.backgroundColor,
    borderRadius: style.borderRadius,
    display: style.display,
  };
}

export function InspectorOverlay({ sandboxRef, onHover }: Props) {
  const [highlight, setHighlight] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const container = sandboxRef.current;
      if (!container) return;

      const target = e.target as HTMLElement;
      if (!container.contains(target) || target === container) {
        setHighlight(null);
        onHover(null);
        return;
      }

      const info = computeInfo(target, container);
      setHighlight({
        top: info.position.top,
        left: info.position.left,
        width: info.dimensions.width,
        height: info.dimensions.height,
      });
      onHover(info);
    },
    [sandboxRef, onHover]
  );

  const handleMouseLeave = useCallback(() => {
    setHighlight(null);
    onHover(null);
  }, [onHover]);

  useEffect(() => {
    const container = sandboxRef.current;
    if (!container) return;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sandboxRef, handleMouseMove, handleMouseLeave]);

  return (
    <div
      className="pointer-events-none absolute z-50"
      data-inspector-ignore
      style={{
        top: highlight?.top ?? 0,
        left: highlight?.left ?? 0,
        width: highlight?.width ?? 0,
        height: highlight?.height ?? 0,
        border: '2px solid #6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.08)',
        opacity: highlight ? 1 : 0,
        transition: 'top 150ms cubic-bezier(0.4,0,0.2,1), left 150ms cubic-bezier(0.4,0,0.2,1), width 150ms cubic-bezier(0.4,0,0.2,1), height 150ms cubic-bezier(0.4,0,0.2,1), opacity 100ms ease-out',
      }}
    >
      <span
        className="absolute -top-6 left-0 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-medium text-white"
        style={{
          whiteSpace: 'nowrap',
          opacity: highlight ? 1 : 0,
          transition: 'opacity 100ms ease-out',
        }}
      >
        {highlight ? `${highlight.width} × ${highlight.height}` : ''}
      </span>
    </div>
  );
}
