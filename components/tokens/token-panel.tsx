'use client';

import type { DesignTokens } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type TokenCategory = 'colors' | 'spacing' | 'radius' | 'typography' | 'shadows';

const categoryIcons: Record<TokenCategory, { label: string; icon: React.ReactNode }> = {
  colors: {
    label: 'Colors',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="15.5" r="2.5" />
        <circle cx="8.5" cy="15.5" r="2.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10" />
      </svg>
    ),
  },
  spacing: {
    label: 'Spacing',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 6H3" />
        <path d="M21 12H9" />
        <path d="M21 18H7" />
      </svg>
    ),
  },
  radius: {
    label: 'Radius',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
      </svg>
    ),
  },
  typography: {
    label: 'Typography',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  shadows: {
    label: 'Shadows',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
};

interface Props {
  tokens: DesignTokens | null;
}

export function TokenPanel({ tokens }: Props) {
  const [cat, setCat] = useState<TokenCategory>('colors');

  if (!tokens) {
    return (
      <div className="py-16 text-center text-sm text-neutral-500">
        No tokens defined for this design.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1">
        {(Object.keys(categoryIcons) as TokenCategory[]).map((key) => (
          <button
            key={key}
            onClick={() => setCat(key)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
              cat === key
                ? 'bg-terra text-white'
                : 'bg-ink text-stone hover:text-ivory'
            )}
          >
            {categoryIcons[key].icon}
            {categoryIcons[key].label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {cat === 'colors' &&
          Object.entries(tokens.colors).map(([name, value]) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded bg-ink px-3 py-2.5"
            >
              <span
                className="h-8 w-8 shrink-0 rounded-md border border-ruled"
                style={{ backgroundColor: value }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-ivory">{name}</p>
                <p className="font-mono text-[11px] text-stone">{value}</p>
              </div>
            </div>
          ))}

        {cat === 'spacing' &&
          Object.entries(tokens.spacing).map(([name, value]) => (
            <div key={name} className="rounded bg-ink px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ivory">{name}</span>
                <span className="font-mono text-[11px] text-stone">{value}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ruled">
                <div
                  className="h-full rounded-full bg-terra"
                  style={{ width: `min(${parseFloat(value) * 1.5}px, 100%)` }}
                />
              </div>
            </div>
          ))}

        {cat === 'radius' &&
          Object.entries(tokens.radius).map(([name, value]) => (
            <div
              key={name}
              className="flex items-center gap-3 rounded bg-ink px-3 py-2.5"
            >
              <div
                className="h-10 w-10 shrink-0 border-2 border-terra bg-terra/10"
                style={{ borderRadius: value }}
              />
              <div>
                <p className="text-xs font-medium text-ivory">{name}</p>
                <p className="font-mono text-[11px] text-stone">{value}</p>
              </div>
            </div>
          ))}

        {cat === 'typography' &&
          Object.entries(tokens.typography).map(([name, value]) => (
            <div key={name} className="rounded bg-ink px-3 py-3">
              <p className="text-xs font-medium text-ivory">{name}</p>
              <p
                className="mt-1 text-ivory/80"
                style={{
                  fontSize: `min(${parseFloat(value.fontSize) * 0.5}px, 28px)`,
                  fontWeight: Number(value.fontWeight),
                  lineHeight: value.lineHeight,
                }}
              >
                The quick brown fox
              </p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[10px] text-stone">
                <span>{value.fontSize}</span>
                <span>w{value.fontWeight}</span>
                <span>lh {value.lineHeight}</span>
                {value.letterSpacing && <span>ls {value.letterSpacing}</span>}
              </div>
            </div>
          ))}

        {cat === 'shadows' &&
          Object.entries(tokens.shadows).map(([name, value]) => (
            <div key={name} className="rounded bg-ink px-3 py-2.5">
              <p className="text-xs font-medium text-ivory">{name}</p>
              <div className="mt-2 flex justify-center py-3">
                <div
                  className="h-12 w-24 rounded-lg bg-ruled"
                  style={{ boxShadow: value }}
                />
              </div>
              <p className="mt-1 break-all font-mono text-[10px] text-stone">{value}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
