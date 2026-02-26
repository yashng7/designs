'use client';

import { ErrorFallback } from '@/components/ui/error-fallback';

export default function DesignError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center p-8">
      <ErrorFallback error={error} reset={reset} />
    </div>
  );
}
