import { DesignSkeleton } from '@/components/ui/skeleton';

export default function DesignLoading() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-ink">
      <DesignSkeleton />
    </div>
  );
}
