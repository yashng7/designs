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
      <section id="designs" className="pt-24 pb-12 w-full flex flex-col items-center">
        <h2 className="mb-8 font-display text-2xl tracking-wide text-ivory text-center">Featured Designs</h2>
        <DesignGallery designs={designs} />
      </section>
    </main>
  );
}
