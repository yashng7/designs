import { GallerySkeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-28 relative">
      <div className="mb-16 opacity-30">
        <div className="h-4 w-40 bg-ruled animate-pulse mb-6" />
        <div className="h-16 w-96 bg-ruled animate-pulse" />
      </div>
      <GallerySkeleton />
    </div>
  );
}
