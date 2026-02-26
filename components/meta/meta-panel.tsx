'use client';

import type { DesignMeta } from '@/lib/types';

interface Props {
  meta: DesignMeta;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-neutral-300">{value}</dd>
    </div>
  );
}

export function MetaPanel({ meta }: Props) {
  return (
    <dl className="space-y-4">
      <Field label="Name" value={meta.name} />
      <Field label="Description" value={meta.description} />
      <Field label="Author" value={meta.author} />
      <Field label="Date" value={meta.date} />
      <Field label="Category" value={meta.category} />
      <Field label="Inspiration" value={meta.inspiration} />
      <Field label="Notes" value={meta.notes} />

      {/* Layout */}
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Layout
        </dt>
        <dd className="mt-1 space-y-1 rounded bg-neutral-800 p-3 text-xs">
          <div className="flex justify-between">
            <span className="text-neutral-500">Type</span>
            <span className="text-neutral-300">{meta.layout.type}</span>
          </div>
          {meta.layout.gridSystem && (
            <div className="flex justify-between">
              <span className="text-neutral-500">Grid</span>
              <span className="text-neutral-300">{meta.layout.gridSystem}</span>
            </div>
          )}
          {meta.layout.maxWidth && (
            <div className="flex justify-between">
              <span className="text-neutral-500">Max Width</span>
              <span className="font-mono text-neutral-300">{meta.layout.maxWidth}</span>
            </div>
          )}
        </dd>
      </div>

      {/* Font Stack */}
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Font Stack
        </dt>
        <dd className="mt-1 space-y-1 rounded bg-neutral-800 p-3 text-xs">
          <div className="flex justify-between">
            <span className="text-neutral-500">Heading</span>
            <span className="text-neutral-300">{meta.fontStack.heading}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Body</span>
            <span className="text-neutral-300">{meta.fontStack.body}</span>
          </div>
          {meta.fontStack.mono && (
            <div className="flex justify-between">
              <span className="text-neutral-500">Mono</span>
              <span className="font-mono text-neutral-300">{meta.fontStack.mono}</span>
            </div>
          )}
        </dd>
      </div>

      {/* Tags */}
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Tags
        </dt>
        <dd className="mt-1.5 flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
