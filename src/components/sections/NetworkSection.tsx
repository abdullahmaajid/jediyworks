"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Collaborator } from "@prisma/client";

interface NetworkSectionProps {
  collaborators: Collaborator[];
}

export default function NetworkSection({ collaborators }: NetworkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-enter");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".observe-me");
      elements.forEach((el, index) => {
        if (index > 0 && index <= 5) el.classList.add(`stagger-${index}`);
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-[var(--bone)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <div className="flex justify-between items-end opacity-0 observe-me">
          <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">
            The Network
          </h2>
          <Link 
            href="/circle" 
            className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--near-black)] border-b border-[var(--warm-gray)] pb-1 hover:border-[var(--near-black)] transition-colors hidden md:block"
          >
            Meet the Circle →
          </Link>
        </div>

        {/* Grid / Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 hide-scroll">
          {collaborators.map((collab, index) => (
            <Link 
              key={collab.id}
              href={`/circle/${collab.slug}`}
              className="group flex flex-col gap-4 min-w-[280px] md:min-w-0 snap-start opacity-0 observe-me"
            >
              <div className="relative w-full aspect-[4/5] bg-[var(--warm-gray)] overflow-hidden">
                {collab.photoUrl ? (
                  <Image
                    src={collab.photoUrl}
                    alt={collab.brandingName}
                    fill
                    className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 280px, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#E5E2DC] transition-all duration-300">
                    <span className="font-serif text-[64px] text-[var(--bone)] opacity-50">
                      {collab.brandingName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                {collab.location && (
                    <div className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--bone)] bg-[var(--near-black)]/50 backdrop-blur-sm px-3 py-1">
                      {collab.location}
                    </div>
                )}
                {/* Logo Badge Overlay on Card Image */}
                {collab.logoUrl && (
                    <div className="absolute bottom-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-[var(--near-black)] p-1.5 shadow-lg flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image src={collab.logoUrl} alt="Logo" fill className="object-contain filter brightness-0 invert opacity-90" />
                      </div>
                    </div>
                )}
              </div>
              
              <div className="flex flex-col gap-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-sans text-[15px] md:text-[18px] font-medium text-[var(--near-black)]">
                    {collab.brandingName}
                  </h3>
                  
                  {/* Social Icon (Appears on hover) */}
                  <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--aged-gold)]">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="square" strokeLinejoin="miter" />
                      </svg>
                  </div>
                </div>
                
                {collab.defaultRole && (
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--aged-gold)] font-medium">
                      {collab.defaultRole}
                    </p>
                )}

                {collab.positionLine && (
                  <p className="font-serif italic text-[13px] md:text-[14px] text-[#6B6762] leading-tight">
                    {collab.positionLine}
                  </p>
                )}

                 {collab.skills && collab.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {collab.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="font-sans text-[10px] uppercase tracking-[0.06em] text-[#6B6762] border border-[var(--warm-gray)] px-2 py-0.5">
                            {skill}
                          </span>
                        ))}
                        {collab.skills.length > 3 && (
                          <span className="font-sans text-[10px] text-[#6B6762] px-1 py-0.5">
                            +{collab.skills.length - 3}
                          </span>
                        )}
                      </div>
                  )}

              </div>
            </Link>
          ))}
        </div>
        
        <div className="md:hidden opacity-0 observe-me">
          <Link 
            href="/circle" 
            className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--near-black)] border-b border-[var(--warm-gray)] pb-1"
          >
            Meet the Circle →
          </Link>
        </div>

        {collaborators.length === 0 && (
          <div className="w-full py-12 text-center opacity-0 observe-me">
            <p className="font-serif italic text-xl text-[#6B6762]">The circle is forming.</p>
          </div>
        )}

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
