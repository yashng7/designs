'use client';

export function ErrorFallback({
  error,
  reset,
}: {
  error?: Error;
  reset?: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 rounded-none border border-ruled bg-graphite p-12">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-terra">
        System Error
      </div>
      <h3 className="font-display text-2xl font-light text-ivory">
        Something went <span className="font-semibold text-terra">wrong</span>
      </h3>
      <div className="h-px w-12 bg-ruled" />
      <p className="max-w-md text-center font-body text-sm text-stone leading-relaxed">
        {error?.message || 'An unexpected error occurred while loading this content or executing this view.'}
      </p>
      {reset && (
        <button
          onClick={reset}
          className="mt-4 rounded border border-terra px-6 py-2.5 font-mono text-[11px] uppercase tracking-wider text-terra transition-colors hover:bg-terra hover:text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
