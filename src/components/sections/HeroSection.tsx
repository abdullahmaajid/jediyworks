"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) headingRef.current.classList.add("fade-up-enter");
    if (textRef.current) textRef.current.classList.add("fade-up-enter", "stagger-1");
    if (ctaRef.current) ctaRef.current.classList.add("fade-up-enter", "stagger-2");
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end px-6 lg:px-16 pt-[120px] pb-24 overflow-hidden bg-[var(--near-black)]">
      {/* Background Video/Image Container */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="JEDIYWORKS Office"
          fill
          className="object-cover opacity-60 "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--near-black)] via-[var(--near-black)]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-12">
        
        <div className="flex flex-col gap-6 max-w-4xl">
          <h1 
            ref={headingRef}
            className="font-serif text-[56px] md:text-[96px] lg:text-[120px] leading-[0.9] tracking-[-0.02em] font-light text-[var(--bone)] uppercase opacity-0"
          >
            Built by one.<br />
            Executed by many.<br />
            <span className="italic normal-case text-[var(--aged-gold)]">The New Paradigm.</span>
          </h1>
        </div>

        <div className="flex flex-col gap-8 md:max-w-md shrink-0">
          <p 
            ref={textRef}
            className="font-sans text-[15px] md:text-[16px] text-[rgba(242,239,233,0.7)] leading-relaxed opacity-0"
          >
            An exclusive creative collective. We assemble curated ecosystems of independent visionaries to execute uncompromising digital and visual experiences.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 opacity-0"
          >
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--bone)] text-[var(--near-black)] font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 ease-in-out hover:bg-[var(--aged-gold)] hover:text-[var(--bone)]">
              Initiate Mandate
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
