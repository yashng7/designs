'use client';

import type { ComputedElementInfo } from '@/lib/types';

interface Props {
  info: ComputedElementInfo | null;
}

function BoxModelViz({ info }: { info: ComputedElementInfo }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-neutral-800 p-4">
      <span className="mb-1 text-[10px] uppercase text-orange-400">margin</span>
      <div className="flex items-center gap-2 text-xs text-orange-300">
        <span>{info.margin.top}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-orange-300">{info.margin.left}</span>
        <div className="rounded border border-green-600 bg-green-900/30 p-2">
          <span className="mb-0.5 block text-center text-[10px] uppercase text-green-400">
            padding
          </span>
          <div className="flex flex-col items-center gap-0.5 text-xs text-green-300">
            <span>{info.padding.top}</span>
            <div className="flex items-center gap-3">
              <span>{info.padding.left}</span>
              <div className="rounded bg-blue-800 px-3 py-1 text-[10px] text-blue-200">
                {info.dimensions.width} × {info.dimensions.height}
              </div>
              <span>{info.padding.right}</span>
            </div>
            <span>{info.padding.bottom}</span>
          </div>
        </div>
        <span className="text-xs text-orange-300">{info.margin.right}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-orange-300">
        <span>{info.margin.bottom}</span>
      </div>
    </div>
  );
}

export function InspectorPanel({ info }: Props) {
  if (!info) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-sm text-neutral-500">
        <span className="mb-2 text-2xl">🔍</span>
        Enable inspector and hover over elements
        <br />
        to see their computed styles.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Element Tag */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Element
        </label>
        <div className="mt-1 rounded bg-neutral-800 px-3 py-2 font-mono text-sm text-indigo-400">
          &lt;{info.tagName}&gt;
        </div>
        {info.className && (
          <p className="mt-1 break-all font-mono text-[11px] text-neutral-500">{info.className}</p>
        )}
      </div>

      {/* Box Model */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Box Model
        </label>
        <div className="mt-1">
          <BoxModelViz info={info} />
        </div>
      </div>

      {/* Typography */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Typography
        </label>
        <div className="mt-1 space-y-1 rounded bg-neutral-800 p-3 text-xs">
          <Row label="Font" value={info.typography.fontFamily} />
          <Row label="Size" value={info.typography.fontSize} />
          <Row label="Weight" value={info.typography.fontWeight} />
          <Row label="Line Height" value={info.typography.lineHeight} />
          <Row
            label="Color"
            value={info.typography.color}
            swatch={info.typography.color}
          />
        </div>
      </div>

      {/* Visual */}
      <div>
        <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Visual
        </label>
        <div className="mt-1 space-y-1 rounded bg-neutral-800 p-3 text-xs">
          <Row label="Background" value={info.background} swatch={info.background} />
          <Row label="Border Radius" value={info.borderRadius} />
          <Row label="Display" value={info.display} />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  swatch,
}: {
  label: string;
  value: string;
  swatch?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-neutral-500">{label}</span>
      <div className="flex items-center gap-1.5">
        {swatch && (
          <span
            className="inline-block h-3 w-3 rounded border border-neutral-600"
            style={{ backgroundColor: swatch }}
          />
        )}
        <span className="font-mono text-neutral-300">{value}</span>
      </div>
    </div>
  );
}
