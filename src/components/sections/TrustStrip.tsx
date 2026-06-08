export default function TrustStrip() {
  return (
    <div className="w-full bg-[var(--bone)] border-b border-[var(--warm-gray)] flex justify-center">
      <div className="w-full max-w-7xl px-6 lg:px-16 py-8 flex items-center justify-center gap-16 overflow-hidden">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--near-black)] shrink-0 flex items-center gap-4">
          Trusted by <span className="w-1 h-1 rounded-full bg-[var(--crimson)]"></span>
        </span>
      
      <div className="flex gap-16 overflow-x-auto no-scrollbar items-center opacity-70 text-[var(--near-black)] pointer-events-none select-none">
        <span className="font-serif text-2xl font-semibold tracking-widest whitespace-nowrap">ALPHA</span>
        <span className="font-sans font-black tracking-tighter text-xl whitespace-nowrap">NEXUS</span>
        <span className="font-mono text-lg whitespace-nowrap">SYNTHCORE</span>
        <span className="font-serif italic font-bold text-3xl whitespace-nowrap">Aura</span>
        <span className="font-sans uppercase tracking-[0.4em] font-normal text-sm whitespace-nowrap">VANGUARD</span>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </div>
    </div>
  );
}
