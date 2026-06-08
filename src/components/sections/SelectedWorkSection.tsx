"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@prisma/client";
import { CATEGORY_LABELS } from "../../types";

interface SelectedWorkSectionProps {
  projects: Project[];
}

export default function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
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
        // Add staggering class dynamically
        if (index > 0 && index <= 5) {
          el.classList.add(`stagger-${index}`);
        }
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-[var(--bone)] border-t border-[var(--warm-gray)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <div className="flex justify-between items-end opacity-0 observe-me">
          <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">
            Selected Work
          </h2>
          <Link 
            href="/portofolio" 
            className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--near-black)] border-b border-[var(--warm-gray)] pb-1 hover:border-[var(--near-black)] transition-colors"
          >
            View All Work →
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10">
          {projects.map((project, index) => {
            // Make first item take 7 cols, second take 5 cols, etc.
            const isLarge = index % 3 === 0;
            const gridClass = isLarge 
              ? "md:col-span-7" 
              : "md:col-span-5";

            return (
              <Link 
                key={project.id}
                href={`/portofolio/${project.slug}`}
                className={`group flex flex-col gap-4 opacity-0 observe-me ${gridClass}`}
              >
                <div className="relative w-full aspect-video md:aspect-auto md:h-[400px] overflow-hidden bg-[var(--warm-gray)]">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.thumbnailAlt || project.title}
                      fill
                      className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--crimson)] text-[var(--bone)] transition-all duration-500 group-hover:scale-105">
                      <span className="font-serif italic text-2xl opacity-20">{project.title}</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--crimson)] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-[24px] md:text-[32px] font-light text-[var(--near-black)] leading-none">
                      {project.title}
                    </h3>
                    <span className="font-sans text-[13px] text-[#6B6762] shrink-0 pt-1">
                      {project.year}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] bg-[var(--crimson)] text-[var(--bone)] px-3 py-1">
                      {CATEGORY_LABELS[project.category] || project.category}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="w-full py-20 text-center opacity-0 observe-me">
            <p className="font-serif italic text-xl text-[#6B6762]">Work in progress. Check back soon.</p>
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* Custom cursor for view action on cards */
        .{
          cursor: pointer;
        }
      `}} />
    </section>
  );
}
