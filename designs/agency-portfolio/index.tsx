'use client';

export function AgencyNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#222222] bg-[#050505]/90 px-4 py-3 backdrop-blur-md @sm:px-6 @sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3 @sm:gap-4">
          <div className="flex h-8 w-8 items-center justify-center bg-[#00F0FF] text-base font-black text-black @sm:h-10 @sm:w-10 @sm:text-xl">
            //
          </div>
          <span className="font-mono text-base font-bold tracking-tighter text-white @sm:text-xl">
            NEXUS<span className="text-[#FF003C]">_</span>
          </span>
        </div>
        <div className="hidden items-center gap-8 @md:flex">
          <a className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#888888] transition-colors hover:text-[#00F0FF]">Database_</a>
          <a className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#888888] transition-colors hover:text-[#00F0FF]">Protocols_</a>
          <a className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#888888] transition-colors hover:text-[#00F0FF]">Nodes_</a>
        </div>
        <button className="relative bg-transparent border border-[#00F0FF] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00F0FF] transition-all hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] @sm:px-6 @sm:py-2 @sm:text-xs">
          <span className="hidden @sm:inline">[ INITIALIZE ]</span>
          <span className="@sm:hidden">[ INIT ]</span>
        </button>
      </div>
    </nav>
  );
}

export function AgencyHero() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-4 py-16 min-h-[70vh] flex items-center @sm:px-6 @sm:min-h-[90vh] @md:py-32">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <div className="mb-4 flex items-center gap-3 @sm:mb-6 @sm:gap-4">
            <span className="h-px w-8 bg-[#FF003C] @sm:w-12" />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF003C] @sm:text-xs">
              System.Status(Online)
            </p>
          </div>
          <h1 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white @sm:text-5xl @md:text-7xl @lg:text-8xl @xl:text-[120px]">
            Digital
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #00F0FF' }}>Frontier</span>
            <br />
            Architects.
          </h1>
          <div className="mt-8 flex flex-col gap-6 @sm:mt-12 @md:flex-row @md:gap-8 @md:items-end @md:justify-between w-full">
            <p className="max-w-md font-mono text-xs leading-relaxed text-[#888888] @sm:text-sm">
              We engineer hyper-scaled digital experiences for entities demanding extreme performance and aggressive geometric precision.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#00F0FF] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_#FF003C] @sm:px-8 @sm:py-4 @sm:text-sm">
                Execute.Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AgencyFeatures() {
  const services = [
    { num: '0x01', title: 'Cybernetic Branding', desc: 'Aggressive visual identities forged for the next generation of the web.' },
    { num: '0x02', title: 'Neural Interfaces', desc: 'High-density UI/UX design with extreme contrast and rapid interaction loops.' },
    { num: '0x03', title: 'WebGL Constructs', desc: 'Immersive, hardware-accelerated 3D environments run directly in-browser.' },
  ];
  return (
    <section className="border-t border-[#222222] bg-[#0A0A0A] px-4 py-16 @sm:px-6 @md:py-24 @lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 mb-12 @sm:gap-12 @sm:mb-20 @md:flex-row @md:items-end @md:justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white @sm:text-5xl @lg:text-7xl">
            Core <br />
            <span className="text-[#00F0FF]">Protocols.</span>
          </h2>
          <p className="font-mono text-xs text-[#888888] max-w-xs @sm:text-sm">
            / / Uploading service manifests to the main grid.
          </p>
        </div>
        
        <div className="grid gap-4 @sm:gap-8 @lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.num} className="group relative border border-[#222222] bg-[#050505] p-6 transition-all hover:border-[#00F0FF] hover:bg-[#0A0A0A] @sm:p-8">
              {/* Accents */}
              <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[#222222] group-hover:border-[#00F0FF] m-2 transition-colors @sm:h-4 @sm:w-4" />
              <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#222222] group-hover:border-[#00F0FF] m-2 transition-colors @sm:h-4 @sm:w-4" />

              <span className="mb-6 block font-mono text-base font-bold text-[#FF003C] @sm:mb-8 @sm:text-lg">{s.num}</span>
              <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-white group-hover:text-[#00F0FF] transition-colors @sm:mb-4 @sm:text-2xl">{s.title}</h3>
              <p className="font-mono text-xs leading-relaxed text-[#888888] @sm:text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgencyPricing() {
  const nodes = [
    { id: 'SYS.01', client: 'NeuroLink', desc: 'Direct-to-cortex interface web portal.', color: '#00F0FF' },
    { id: 'SYS.02', client: 'Void Corp', desc: 'Dark-web localized commerce platform.', color: '#FF003C' },
    { id: 'SYS.03', client: 'SynthWave', desc: 'Audio-reactive streaming architecture.', color: '#00FF41' },
    { id: 'SYS.04', client: 'Zion Mainframe', desc: 'High-security defense grid UI.', color: '#FFFFFF' },
  ];
  return (
    <section className="border-t border-[#222222] bg-[#050505] px-4 py-16 @sm:px-6 @md:py-24 @lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 border-l-4 border-[#00F0FF] pl-4 @sm:mb-16 @sm:pl-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white @sm:text-4xl @md:text-6xl">
            Active Nodes
          </h2>
          <p className="mt-2 font-mono text-xs text-[#888888] @sm:text-sm">[ Recent Deployments ]</p>
        </div>
        
        <div className="grid gap-0 border border-[#222222] grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4">
          {nodes.map((n) => (
            <div key={n.id} className="group flex flex-col justify-between border-b border-[#222222] p-6 transition-all hover:bg-[#0A0A0A] last:border-b-0 @sm:p-8 @sm:border-r @sm:last:border-r-0 @lg:border-b-0">
              <div>
                <span className="font-mono text-xs font-bold" style={{ color: n.color }}>{n.id}</span>
                <h3 className="mt-3 text-lg font-bold uppercase tracking-tight text-white group-hover:text-[#00F0FF] @sm:mt-4 @sm:text-xl">{n.client}</h3>
              </div>
              <p className="mt-6 font-mono text-[10px] text-[#444444] group-hover:text-[#888888] transition-colors @sm:mt-8 @sm:text-xs">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgencyFooter() {
  return (
    <footer className="border-t border-[#222222] bg-[#000000] px-4 py-8 @sm:px-6 @sm:py-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 @sm:gap-8 @md:flex-row @md:items-end">
        <div>
          <span className="font-mono text-xl font-black tracking-tighter text-white @sm:text-2xl">
            NEXUS<span className="text-[#FF003C]">_</span>
          </span>
          <p className="mt-3 max-w-xs font-mono text-[10px] text-[#444444] @sm:mt-4 @sm:text-xs">
            End of line. Connection terminated. Safe mode active.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-wider text-[#888888] @sm:gap-x-12 @sm:gap-y-4 @sm:text-xs">
          <a className="hover:text-[#00F0FF] hover:underline cursor-pointer transition-colors">Twitter_X</a>
          <a className="hover:text-[#00F0FF] hover:underline cursor-pointer transition-colors">GitHub_REPO</a>
          <a className="hover:text-[#00F0FF] hover:underline cursor-pointer transition-colors">Discord_NET</a>
          <a className="hover:text-[#00F0FF] hover:underline cursor-pointer transition-colors">Tor_HIDDEN</a>
        </div>
      </div>
      
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#222222] pt-6 flex flex-col gap-2 font-mono text-[9px] text-[#444444] @sm:flex-row @sm:justify-between @sm:mt-16 @sm:pt-8 @sm:text-[10px]">
        <span>SYS.DATE: 2026.11.04</span>
        <span>SECURITY: LEVEL_4</span>
      </div>
    </footer>
  );
}

export default function AgencyPortfolio() {
  return (
    <div className="bg-[#050505] font-[system-ui,-apple-system,sans-serif] selection:bg-[#FF003C] selection:text-white text-white">
      <AgencyNavbar />
      <AgencyHero />
      <AgencyFeatures />
      <AgencyPricing />
      <AgencyFooter />
    </div>
  );
}
