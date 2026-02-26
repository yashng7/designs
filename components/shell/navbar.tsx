'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Gallery' },
  { href: '/patterns/hero', label: 'Patterns' },
  { href: '/compare/startup-saas/agency-portfolio', label: 'Compare' },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-ruled bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-tight text-terra">
            DS
          </span>
          <span className="h-3 w-px bg-ruled" aria-hidden />
          <span className="font-display text-sm font-semibold tracking-wide text-ivory">
            Design Showcase
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href.split('/').slice(0, 2).join('/'));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors',
                  isActive
                    ? 'text-terra'
                    : 'text-stone hover:text-ivory'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-terra" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
