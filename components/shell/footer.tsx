import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-ruled bg-graphite py-12 px-6">
      <div className="mx-auto max-w-screen-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-tight text-terra">
            DS
          </span>
          <span className="h-3 w-px bg-ruled" aria-hidden />
          <span className="font-display text-sm text-stone">
            Design Showcase Platform
          </span>
        </div>
        
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-wider text-stone">
          <Link href="/" className="hover:text-ivory transition-colors">Gallery</Link>
          <Link href="/patterns/hero" className="hover:text-ivory transition-colors">Patterns</Link>
          <span className="block h-1 w-1 rounded-full bg-ruled" aria-hidden />
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
