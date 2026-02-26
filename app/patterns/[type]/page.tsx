import { PatternViewer } from '@/components/patterns/pattern-viewer';

const validTypes = [
  'hero',
  'navbar',
  'features',
  'pricing',
  'footer',
  'testimonials',
  'cta',
  'stats',
  'faq',
];

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  return {
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Patterns — Design Showcase`,
  };
}

export default async function PatternsPage({ params }: Props) {
  const { type } = await params;

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-terra">
            Component Comparison
          </p>
          <h1 className="font-display text-4xl font-light text-ivory">
            {type.charAt(0).toUpperCase() + type.slice(1)} <span className="font-semibold text-stone">Patterns</span>
          </h1>
          <div className="mt-6 h-px w-12 bg-ruled" />
          <p className="mt-6 font-body text-sm text-stone max-w-xl line-clamp-2">
            Explore and compare how different design systems approach the &quot;{type}&quot; architectural pattern.
          </p>

          {/* Pattern type selector */}
          <div className="mt-8 flex flex-wrap gap-2">
            {validTypes.map((t) => (
              <a
                key={t}
                href={`/patterns/${t}`}
                className={`rounded border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  t === type
                    ? 'border-terra bg-terra text-white'
                    : 'border-ruled text-stone hover:border-stone hover:text-ivory'
                }`}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

        {/* Pattern comparison */}
        <PatternViewer type={type} />
      </div>
    </main>
  );
}
