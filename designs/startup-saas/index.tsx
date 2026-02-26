'use client';

export function SaaSNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 @sm:px-6 @sm:py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#73937E] text-white @sm:h-8 @sm:w-8">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <span className="text-base font-serif italic text-[#2C3E35] @sm:text-lg">Aura</span>
        </div>
        <div className="hidden items-center gap-8 @md:flex">
          <a className="text-sm font-medium text-[#6B7A70] transition-colors hover:text-[#2C3E35]">Product</a>
          <a className="text-sm font-medium text-[#6B7A70] transition-colors hover:text-[#2C3E35]">Stories</a>
          <a className="text-sm font-medium text-[#6B7A70] transition-colors hover:text-[#2C3E35]">Science</a>
        </div>
        <div className="flex items-center gap-2 @sm:gap-4">
          <button className="hidden text-sm font-medium text-[#2C3E35] @md:block hover:opacity-70 transition-opacity">
            Log in
          </button>
          <button className="rounded-full bg-[#73937E] px-4 py-2 text-xs font-medium text-white shadow-md transition-all hover:bg-[#5E7A67] hover:shadow-lg @sm:px-6 @sm:py-2.5 @sm:text-sm">
            Start Journey
          </button>
        </div>
      </nav>
    </header>
  );
}

export function SaaSHero() {
  return (
    <section className="relative justify-center flex min-h-[70vh] flex-col overflow-hidden bg-[#FAF9F6] px-4 pt-12 pb-16 @sm:px-6 @sm:min-h-[90vh] @sm:pt-24 @sm:pb-24">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-[#E8EFEA] blur-[80px] @sm:h-[500px] @sm:w-[500px] @sm:blur-[100px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[400px] w-[400px] rounded-full bg-[#F0EFEA] blur-[80px] @sm:h-[600px] @sm:w-[600px] @sm:blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4B892]/30 bg-[#FFFFFF]/60 px-3 py-1 text-[10px] tracking-wider text-[#A4B0A7] uppercase backdrop-blur-sm @sm:mb-8 @sm:px-4 @sm:py-1.5 @sm:text-xs">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#D4B892]" />
          Mindful Productivity
        </div>
        <h1 className="font-serif text-3xl font-normal leading-[1.15] tracking-tight text-[#2C3E35] @sm:text-5xl @md:text-6xl @lg:text-7xl @xl:text-8xl">
          Find your <span className="italic text-[#73937E]">focus</span>
          <br className="hidden @sm:block" /> in the noise.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#6B7A70] @sm:mt-8 @sm:text-base @md:text-lg @lg:text-xl">
          A gentle space to organize your thoughts, track your well-being, and work with intention rather than urgency.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 @sm:mt-12 @sm:flex-row @sm:gap-4">
          <button className="w-full rounded-full bg-[#2C3E35] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(44,62,53,0.2)] transition-all hover:-translate-y-1 hover:bg-[#1E2B25] hover:shadow-[0_12px_32px_rgba(44,62,53,0.3)] @sm:w-auto @sm:px-8 @sm:py-4">
            Begin Free Trial
          </button>
          <button className="w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-[#2C3E35] shadow-sm ring-1 ring-[#E8EFEA] transition-all hover:bg-[#F0EFEA] @sm:w-auto @sm:px-8 @sm:py-4">
            Explore Features
          </button>
        </div>
      </div>
    </section>
  );
}

export function SaaSFeatures() {
  const features = [
    { icon: '🌿', title: 'Guided Workflows', desc: 'Gentle prompts to keep you on track without the anxiety of red notifications.' },
    { icon: '🌙', title: 'Rest Modes', desc: 'Automatically wind down your interface to respect your personal boundaries.' },
    { icon: '✨', title: 'Clarity Insights', desc: 'Reflect on your most productive patterns with soft, visual dashboards.' },
  ];
  return (
    <section className="bg-white px-4 py-16 @sm:px-6 @md:py-24 @lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 @sm:mb-16 @md:text-left @md:flex @md:items-end @md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-normal text-[#2C3E35] @sm:text-4xl @md:text-5xl">
              Designed for peace of mind.
            </h2>
            <p className="mt-4 text-sm font-light text-[#6B7A70] @sm:mt-6 @sm:text-base @md:text-lg">
              We stripped away the complexity so you can focus on what matters. No more overwhelming dashboards.
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 @sm:gap-6 @md:grid-cols-2 @lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl bg-[#FAF9F6] p-6 transition-transform duration-500 hover:-translate-y-2 hover:bg-[#F0EFEA] @sm:rounded-[2rem] @sm:p-10">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-[0_4px_16px_rgba(115,147,126,0.08)] @sm:mb-6 @sm:h-14 @sm:w-14 @sm:rounded-2xl @sm:text-2xl">
                {f.icon}
              </div>
              <h3 className="mb-2 font-serif text-xl font-normal text-[#2C3E35] @sm:mb-3 @sm:text-2xl">{f.title}</h3>
              <p className="text-sm font-light leading-relaxed text-[#6B7A70] @sm:text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SaaSPricing() {
  const plans = [
    { name: 'Calm', price: '$8', period: '/mo', desc: 'For individuals seeking focus.', features: ['Unlimited journals', 'Basic insights', 'Offline mode'], cta: 'Start with Calm', featured: false },
    { name: 'Flow', price: '$16', period: '/mo', desc: 'For those building lasting habits.', features: ['Deep focus modes', 'Audio guides', 'Advanced analytics', 'Priority support'], cta: 'Start with Flow', featured: true },
  ];
  
  return (
    <section className="bg-[#FAF9F6] px-4 py-16 @sm:px-6 @md:py-24 @lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-normal text-[#2C3E35] @sm:text-4xl @md:text-5xl">Simple, mindful pricing.</h2>
          <p className="mt-3 text-sm font-light text-[#6B7A70] @sm:mt-4 @sm:text-base @md:text-lg">Choose the pace that feels right to you.</p>
        </div>
        
        <div className="mt-12 grid gap-4 max-w-4xl mx-auto @sm:mt-16 @sm:gap-6 @md:grid-cols-2 @md:gap-8">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all @sm:rounded-[2rem] @sm:p-10 ${p.featured ? 'bg-[#73937E] text-white shadow-[0_20px_40px_rgba(115,147,126,0.2)] z-10' : 'bg-white border border-[#E8EFEA]'}`}>
              <div>
                {p.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D4B892] px-3 py-0.5 text-[10px] font-medium tracking-wider text-white uppercase @sm:-top-4 @sm:px-4 @sm:py-1 @sm:text-xs">Most Selected</div>}
                <h3 className={`font-serif text-xl @sm:text-2xl ${p.featured ? 'text-white' : 'text-[#2C3E35]'}`}>{p.name}</h3>
                <p className={`mt-1.5 text-sm font-light @sm:mt-2 ${p.featured ? 'text-[#E8EFEA]' : 'text-[#6B7A70]'}`}>{p.desc}</p>
                <div className="mt-6 mb-6 @sm:mt-8 @sm:mb-8">
                  <span className="font-serif text-4xl font-normal @sm:text-5xl">{p.price}</span>
                  <span className={`text-xs @sm:text-sm ${p.featured ? 'text-[#E8EFEA]' : 'text-[#A4B0A7]'}`}>{p.period}</span>
                </div>
                <ul className="space-y-3 @sm:space-y-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 @sm:gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.featured ? "text-[#D4B892] shrink-0" : "text-[#73937E] shrink-0"}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className={`text-sm font-light ${p.featured ? 'text-white' : 'text-[#6B7A70]'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`mt-8 w-full rounded-full py-3 text-sm font-medium transition-all @sm:mt-10 @sm:py-4 ${p.featured ? 'bg-white text-[#73937E] hover:bg-[#FAF9F6] shadow-md' : 'bg-[#FAF9F6] text-[#2C3E35] hover:bg-[#E8EFEA]'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SaaSFooter() {
  return (
    <footer className="bg-white px-4 py-10 @sm:px-6 @sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-[#F0EFEA] pt-8 @sm:gap-8 @sm:pt-12 @md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg italic text-[#2C3E35] @sm:text-xl">Aura.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-[#A4B0A7] @sm:gap-6">
          <a className="transition-colors hover:text-[#2C3E35]">Philosophy</a>
          <a className="transition-colors hover:text-[#2C3E35]">Privacy</a>
          <a className="transition-colors hover:text-[#2C3E35]">Terms</a>
        </div>
        <p className="text-xs text-[#A4B0A7] @sm:text-sm">© 2026 Aura Inc.</p>
      </div>
    </footer>
  );
}

export default function StartupSaaS() {
  return (
    <div className="bg-[#FAF9F6] font-[system-ui,-apple-system,sans-serif] selection:bg-[#73937E]/20 text-[#2C3E35]">
      <SaaSNavbar />
      <SaaSHero />
      <SaaSFeatures />
      <SaaSPricing />
      <SaaSFooter />
    </div>
  );
}
