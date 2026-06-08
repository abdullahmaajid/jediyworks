"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectCard from "../../../components/cards/ProjectCard";
import { CATEGORY_LABELS, PILLAR_LABELS } from "../../../types";
import type { Project } from "@prisma/client";

// This is a client component because it has interactive filtering.
// It receives initial projects from the server component.

export default function PortfolioClient({ initialProjects }: { initialProjects: Project[] }) {
  const [activeTab, setActiveTab] = useState<"all" | "client_work" | "experimental">("all");
  const [activePillar, setActivePillar] = useState<"all" | "technology" | "creative_visual" | "audio_post">("all");
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const gridRef = useRef<HTMLDivElement>(null);

  // Compute filter counts
  const tabCounts = useMemo(() => ({
    all: initialProjects.length,
    client_work: initialProjects.filter(p => p.category === "client_work").length,
    experimental: initialProjects.filter(p => p.category === "experimental").length,
  }), [initialProjects]);

  const pillarCounts = useMemo(() => {
    const base = activeTab === "all" ? initialProjects : initialProjects.filter(p => p.category === activeTab);
    return {
      all: base.length,
      technology: base.filter(p => p.pillar === "technology").length,
      creative_visual: base.filter(p => p.pillar === "creative_visual").length,
      audio_post: base.filter(p => p.pillar === "audio_post").length,
    };
  }, [initialProjects, activeTab]);

  useEffect(() => {
    // Reset animations when filters change
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".observe-me");
      cards.forEach((card) => {
        card.classList.remove("fade-up-enter");
        card.classList.add("opacity-0");
      });
    }

    // Filter logic
    const filtered = initialProjects.filter((project) => {
      const tabMatch = activeTab === "all" || project.category === activeTab;
      const pillarMatch = activePillar === "all" || project.pillar === activePillar;
      return tabMatch && pillarMatch;
    });

    setFilteredProjects(filtered);

    // Re-trigger animations
    setTimeout(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".observe-me");
        cards.forEach((card) => card.classList.add("fade-up-enter"));
      }
    }, 50);
  }, [activeTab, activePillar, initialProjects]);

  const featuredProject = filteredProjects[0];
  const restProjects = filteredProjects.slice(1);

  return (
    <div className="py-24 px-6 lg:px-16 min-h-[90vh]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* ── Header Block ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[var(--warm-gray)] pb-10">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-[64px] md:text-[84px] lg:text-[110px] font-light tracking-[-0.02em] leading-[0.9] text-[var(--near-black)]">
              Selected Work
            </h1>
            <p className="font-sans text-[14px] text-[#6B6762] max-w-md">
              A curated selection of {initialProjects.length} projects across client engagements and experimental explorations.
            </p>
          </div>
          
          {/* Category Tabs — inline with header */}
          <div className="flex gap-6 shrink-0">
            {([
              { id: "all", label: "All" },
              { id: "client_work", label: "Client Work" },
              { id: "experimental", label: "Experimental" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-sans text-[13px] md:text-[14px] font-medium pb-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id 
                    ? "text-[var(--near-black)] border-b-2 border-[var(--aged-gold)]" 
                    : "text-[#6B6762] border-b-2 border-transparent hover:text-[var(--near-black)]"}
                `}
              >
                {tab.label} <span className="text-[11px] opacity-50">({tabCounts[tab.id]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Pillar Chips ─────────────────────────────────── */}
        <div className="flex gap-3 flex-wrap -mt-6">
          {([
            { id: "all", label: "All" },
            { id: "technology", label: "Technology" },
            { id: "creative_visual", label: "Creative Production" },
            { id: "audio_post", label: "Audio & Post" },
            { id: "spatial_fabrication", label: "Spatial & Fabrication" }
          ] as const).map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActivePillar(chip.id)}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] px-4 py-2 transition-all whitespace-nowrap
                ${activePillar === chip.id 
                  ? "bg-[var(--crimson)] text-[var(--bone)]" 
                  : "bg-transparent border border-[var(--warm-gray)] text-[#6B6762] hover:border-[var(--near-black)] hover:text-[var(--near-black)]"}
              `}
            >
              {chip.label} ({pillarCounts[chip.id]})
            </button>
          ))}
        </div>

        {/* ── Featured Project (First Card, Full Width) ──── */}
        {featuredProject && (
          <div ref={gridRef}>
            <Link
              href={`/portofolio/${featuredProject.slug}`}
              className="group flex flex-col gap-6 opacity-0 observe-me stagger-1"
            >
              <div className="relative w-full aspect-[16/7] bg-[var(--warm-gray)] overflow-hidden">
                {featuredProject.thumbnailUrl ? (
                  <Image
                    src={featuredProject.thumbnailUrl}
                    alt={featuredProject.thumbnailAlt || featuredProject.title}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--crimson)] text-[var(--bone)] transition-all duration-300">
                    <span className="font-serif italic text-4xl opacity-20">{featuredProject.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-[var(--crimson)] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />
                
                {/* Featured Number Badge */}
                <div className="absolute top-6 left-6 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--bone)] bg-[var(--near-black)]/60 backdrop-blur-sm px-4 py-2">
                  01 — Featured
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-[28px] md:text-[36px] font-normal text-[var(--near-black)] leading-tight">
                    {featuredProject.title}
                  </h3>
                  <p className="font-sans text-[14px] text-[#6B6762] max-w-lg line-clamp-2">
                    {featuredProject.summary}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-sans text-[13px] text-[#6B6762]">{featuredProject.year}</span>
                  <div className="flex gap-2">
                    <span className="tag-client-work">
                      {CATEGORY_LABELS[featuredProject.category] || featuredProject.category}
                    </span>
                    <span className={`tag-${featuredProject.pillar.replace('_', '-')}`}>
                      {PILLAR_LABELS[featuredProject.pillar] || featuredProject.pillar}
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* ── Rest of Projects (2-col Grid) ──────────── */}
            {restProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-16">
                {restProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index + 1} displayIndex={index + 2} />
                ))}
              </div>
            )}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="w-full py-24 flex justify-center fade-up-enter">
            <p className="font-serif italic text-xl text-[#6B6762] text-center">
              Nothing here yet. But we&apos;re always building something.
            </p>
          </div>
        )}

        {/* ── Bottom CTA Block ─────────────────────────────── */}
        <div className="border-t border-[var(--warm-gray)] pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-[32px] md:text-[48px] text-[var(--near-black)] leading-none">
                Have a project in mind?
              </h2>
              <p className="font-sans text-[14px] text-[#6B6762] max-w-md">
                We&apos;re always looking for the next challenge. Let&apos;s build something extraordinary together.
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--near-black)] border border-[var(--near-black)] px-8 py-4 hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-300 shrink-0"
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
