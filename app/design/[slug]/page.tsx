import { notFound } from 'next/navigation';
import {
  isValidSlug,
  getDesignMeta,
  getDesignTokens,
  type DesignSlug,
} from '@/lib/registry';
import { DesignViewer } from '@/components/viewer/design-viewer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isValidSlug(slug)) return { title: 'Not Found' };
  const meta = await getDesignMeta(slug);
  return {
    title: `${meta.name} — Design Showcase`,
    description: meta.description,
  };
}

export default async function DesignPage({ params }: Props) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    notFound();
  }

  const validSlug = slug as DesignSlug;
  const [meta, tokens] = await Promise.all([
    getDesignMeta(validSlug),
    getDesignTokens(validSlug),
  ]);

  return <DesignViewer slug={validSlug} meta={meta} tokens={tokens} />;
}
