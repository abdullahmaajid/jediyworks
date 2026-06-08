import Image from "next/image";
import Link from "next/link";

export default function AboutPreviewSection() {
  return (
    <section className="w-full bg-[var(--bone)] py-24 lg:py-32 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Overlapping Editorial Images */}
        <div className="w-full lg:w-[45%] relative min-h-[500px] flex items-center justify-center">
          {/* Main Large Image */}
          <div className="relative w-[75%] aspect-[3/4] z-10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <Image 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt="Jediyworks Director"
              fill
              className="object-cover transition-all duration-700"
            />
          </div>
          
          {/* Overlapping Small Image (Bottom Right) */}
          <div className="absolute -bottom-8 -right-4 w-[45%] aspect-[4/5] z-20 shadow-xl border-4 border-[var(--bone)] rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image 
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80"
              alt="Abstract work preview"
              fill
              className="object-cover"
            />
          </div>

          {/* Small polaroid-style image (top-left) */}
          <div className="absolute top-[5%] -left-[5%] w-[30%] aspect-square z-20 border-4 border-[var(--bone)] -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-lg hidden md:block">
            <Image 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
              alt="Dashboard preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Right: Typography and Script */}
        <div className="w-full lg:w-[55%] flex flex-col items-start mt-12 lg:mt-0">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6762] mb-6">
            Hi, We&apos;re
          </p>
          
          {/* Signature-style handwriting font */}
          <h2 className="font-serif text-[42px] md:text-[64px] font-normal leading-none text-[var(--crimson)] italic mb-6">
            Jediyworks
          </h2>
          
          <p className="font-sans text-[16px] md:text-[17px] text-[var(--near-black)] leading-relaxed max-w-xl mb-8">
            We orchestrate the highest standard of execution. From complex digital infrastructures to cinematic visual identities, we curate the exact talent required for the vision. No compromises. Just pure craftsmanship.
          </p>
          
          <Link href="/about" className="inline-flex items-center justify-center px-10 py-4 bg-[var(--crimson)] text-[var(--bone)] font-sans text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-300 ease-in-out hover:bg-[var(--near-black)]">
            Meet The Circle
          </Link>
        </div>
        
      </div>
    </section>
  );
}
