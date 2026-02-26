import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { DesignGallery } from '@/components/home/design-gallery';
import { getAllDesignMetas } from '@/lib/registry';

export default async function HomePage() {
  const designs = await getAllDesignMetas();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <DesignGallery designs={designs} />
    </main>
  );
}
