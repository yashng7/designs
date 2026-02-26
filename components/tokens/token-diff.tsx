'use client';

import type { DesignTokens } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  tokensA: DesignTokens | null;
  tokensB: DesignTokens | null;
  nameA: string;
  nameB: string;
}

type DiffStatus = 'same' | 'diff' | 'only-a' | 'only-b';

interface DiffItem {
  key: string;
  valA?: string;
  valB?: string;
  status: DiffStatus;
}

function diffRecords(
  a: Record<string, string> | undefined,
  b: Record<string, string> | undefined
): DiffItem[] {
  const allKeys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  const results: DiffItem[] = [];

  allKeys.forEach((key) => {
    const valA = a?.[key];
    const valB = b?.[key];
    if (valA && valB) {
      results.push({ key, valA, valB, status: valA === valB ? 'same' : 'diff' });
    } else if (valA) {
      results.push({ key, valA, status: 'only-a' });
    } else {
      results.push({ key, valB, status: 'only-b' });
    }
  });

  return results;
}

const statusColors: Record<DiffStatus, string> = {
  same: 'text-stone',
  diff: 'text-terra',
  'only-a': 'text-ivory opacity-60',
  'only-b': 'text-ivory',
};

export function TokenDiff({ tokensA, tokensB, nameA, nameB }: Props) {
  if (!tokensA || !tokensB) {
    return (
      <div className="py-12 text-center font-mono text-xs uppercase tracking-wider text-stone">
        Both designs need tokens defined for comparison.
      </div>
    );
  }

  const colorDiff = diffRecords(tokensA.colors, tokensB.colors);
  const spacingDiff = diffRecords(tokensA.spacing, tokensB.spacing);
  const radiusDiff = diffRecords(tokensA.radius, tokensB.radius);
  const shadowDiff = diffRecords(tokensA.shadows, tokensB.shadows);

  const sections = [
    { label: 'Colors', items: colorDiff, isColor: true },
    { label: 'Spacing', items: spacingDiff, isColor: false },
    { label: 'Radius', items: radiusDiff, isColor: false },
    { label: 'Shadows', items: shadowDiff, isColor: false },
  ];

  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-wider">
        <span className="text-stone">▣ Match</span>
        <span className="text-terra">▣ Modified</span>
        <span className="text-ivory opacity-60">▣ Only {nameA}</span>
        <span className="text-ivory">▣ Only {nameB}</span>
      </div>

      <div className="h-px w-full bg-ruled" />

      {sections.map((section) => (
        <div key={section.label}>
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-terra">
            {section.label}
          </h4>
          <div className="space-y-1">
            {section.items.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 rounded border border-ruled bg-ink px-3 py-2 text-xs"
              >
                <span className={cn('w-32 shrink-0 font-mono text-[11px]', statusColors[item.status])}>
                  {item.key}
                </span>

                <div className="flex flex-1 items-center gap-2">
                  {item.valA !== undefined && (
                    <div className="flex items-center gap-2">
                      {section.isColor && (
                        <span
                          className="inline-block h-3.5 w-3.5 rounded-sm border border-ruled shadow-inner"
                          style={{ backgroundColor: item.valA }}
                        />
                      )}
                      <span className="font-mono text-[11px] text-stone">{item.valA}</span>
                    </div>
                  )}

                  {item.status === 'diff' && <span className="font-mono text-[10px] text-ruled">--&gt;</span>}

                  {item.valB !== undefined && item.status !== 'same' && (
                    <div className="flex items-center gap-2">
                      {section.isColor && (
                        <span
                          className="inline-block h-3.5 w-3.5 rounded-sm border border-ruled shadow-inner"
                          style={{ backgroundColor: item.valB }}
                        />
                      )}
                      <span className="font-mono text-[11px] text-ivory">{item.valB}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
