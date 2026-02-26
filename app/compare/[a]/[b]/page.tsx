import { notFound } from 'next/navigation';
import {
  isValidSlug,
  getDesignMeta,
  getDesignTokens,
  type DesignSlug,
} from '@/lib/registry';
import { CompareViewer } from '@/components/compare/compare-viewer';

interface Props {
  params: Promise<{ a: string; b: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { a, b } = await params;
  if (!isValidSlug(a) || !isValidSlug(b)) return { title: 'Not Found' };
  const [metaA, metaB] = await Promise.all([getDesignMeta(a), getDesignMeta(b)]);
  return {
    title: `${metaA.name} vs ${metaB.name} — Design Showcase`,
  };
}

export default async function ComparePage({ params }: Props) {
  const { a, b } = await params;

  if (!isValidSlug(a) || !isValidSlug(b)) {
    notFound();
  }

  const slugA = a as DesignSlug;
  const slugB = b as DesignSlug;

  const [metaA, metaB, tokensA, tokensB] = await Promise.all([
    getDesignMeta(slugA),
    getDesignMeta(slugB),
    getDesignTokens(slugA),
    getDesignTokens(slugB),
  ]);

  return (
    <div className="bg-ink min-h-[calc(100vh-3.5rem)]">
      <CompareViewer
        slugA={slugA}
        slugB={slugB}
        metaA={metaA}
        metaB={metaB}
        tokensA={tokensA}
        tokensB={tokensB}
      />
    </div>
  );
}
