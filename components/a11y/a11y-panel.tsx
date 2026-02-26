'use client';

import { useState, useCallback, type RefObject } from 'react';
import type { A11yIssue } from '@/lib/types';
import { analyzeDesign } from '@/lib/a11y-checks';
import { cn } from '@/lib/utils';

interface Props {
  sandboxRef: RefObject<HTMLDivElement | null>;
}

const iconMap: Record<A11yIssue['type'], string> = {
  error: '🔴',
  warning: '🟡',
  info: '🟢',
};

const catLabels: Record<A11yIssue['category'], string> = {
  contrast: 'Contrast',
  heading: 'Headings',
  'alt-text': 'Alt Text',
  aria: 'ARIA',
  focus: 'Focus',
};

export function A11yPanel({ sandboxRef }: Props) {
  const [issues, setIssues] = useState<A11yIssue[] | null>(null);
  const [running, setRunning] = useState(false);

  const runAudit = useCallback(() => {
    const container = sandboxRef.current;
    if (!container) return;
    setRunning(true);
    setTimeout(() => {
      const result = analyzeDesign(container);
      setIssues(result);
      setRunning(false);
    }, 300);
  }, [sandboxRef]);

  const errorCount = issues?.filter((i) => i.type === 'error').length ?? 0;
  const warningCount = issues?.filter((i) => i.type === 'warning').length ?? 0;
  const infoCount = issues ? issues.length - errorCount - warningCount : 0;

  return (
    <div className="space-y-4">
      <button
        onClick={runAudit}
        disabled={running}
        className={cn(
          'w-full rounded-lg py-2.5 text-sm font-semibold transition-colors',
          running
            ? 'cursor-wait bg-neutral-700 text-neutral-400'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        )}
      >
        {running ? 'Analyzing…' : issues ? 'Re-run Audit' : 'Run Accessibility Audit'}
      </button>

      {issues && (
        <>
          {/* Summary */}
          <div className="flex gap-3 rounded-lg bg-neutral-800 p-3">
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-red-400">{errorCount}</div>
              <div className="text-[10px] text-neutral-500">Errors</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-amber-400">{warningCount}</div>
              <div className="text-[10px] text-neutral-500">Warnings</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-xl font-bold text-emerald-400">{infoCount}</div>
              <div className="text-[10px] text-neutral-500">Passed</div>
            </div>
          </div>

          {/* Issue List */}
          <div className="space-y-2">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="rounded-lg border border-neutral-800 bg-neutral-800/50 p-3"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-sm">{iconMap[issue.type]}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase',
                          issue.type === 'error'
                            ? 'bg-red-900/50 text-red-400'
                            : issue.type === 'warning'
                              ? 'bg-amber-900/50 text-amber-400'
                              : 'bg-emerald-900/50 text-emerald-400'
                        )}
                      >
                        {catLabels[issue.category]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-300">{issue.message}</p>
                    {issue.element && (
                      <p className="mt-1 break-all font-mono text-[10px] text-neutral-500">
                        {issue.element}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!issues && !running && (
        <div className="py-8 text-center text-sm text-neutral-500">
          <span className="mb-2 block text-2xl">♿</span>
          Click the button above to run an
          <br />
          accessibility audit on this design.
        </div>
      )}
    </div>
  );
}
