import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-stone">
        Error 404
      </p>
      <h1 className="font-display text-5xl font-extralight tracking-tight text-ivory">
        Page Not Found
      </h1>
      <div className="h-px w-16 bg-ruled" />
      <p className="max-w-sm text-sm leading-relaxed text-stone">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-terra px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-terra transition-colors hover:bg-terra hover:text-white"
      >
        Back to Gallery
      </Link>
    </div>
  );
}
