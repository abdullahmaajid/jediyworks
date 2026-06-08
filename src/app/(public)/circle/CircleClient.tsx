"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Collaborator } from "@prisma/client";

// ── Role category mapping ───────────────────────────────
type RoleCategory = "all" | "technology" | "creative" | "strategy";

function classifyRole(role: string | null): RoleCategory {
  if (!role) return "strategy";
  const r = role.toLowerCase();
  if (r.includes("engineer") || r.includes("developer") || r.includes("tech")) return "technology";
  if (r.includes("designer") || r.includes("photographer") || r.includes("3d") || r.includes("motion") || r.includes("brand")) return "creative";
  return "strategy"; // Copywriter, Music, Director, etc.
}

const ROLE_LABELS: Record<RoleCategory, string> = {
  all: "All",
  technology: "Engineering",
  creative: "Design & Visual",
  strategy: "Strategy & Production",
};

export default function CircleClient({ collaborators }: { collaborators: Collaborator[] }) {
  const [activeRole, setActiveRole] = useState<RoleCategory>("all");
  const [filtered, setFiltered] = useState(collaborators);
  const gridRef = useRef<HTMLDivElement>(null);

  // Compute filter counts
  const roleCounts = useMemo(() => ({
    all: collaborators.length,
    technology: collaborators.filter(c => classifyRole(c.defaultRole) === "technology").length,
    creative: collaborators.filter(c => classifyRole(c.defaultRole) === "creative").length,
    strategy: collaborators.filter(c => classifyRole(c.defaultRole) === "strategy").length,
  }), [collaborators]);

  useEffect(() => {
    // Reset animations
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".observe-me");
      cards.forEach((card) => {
        card.classList.remove("fade-up-enter");
        card.classList.add("opacity-0");
      });
    }

    const result = activeRole === "all"
      ? collaborators
      : collaborators.filter(c => classifyRole(c.defaultRole) === activeRole);
    setFiltered(result);

    // Re-trigger animations
    setTimeout(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".observe-me");
        cards.forEach((card) => card.classList.add("fade-up-enter"));
      }
    }, 50);
  }, [activeRole, collaborators]);

  const featuredMember = filtered[0];
  const restMembers = filtered.slice(1);

  return (
    <div className="py-24 px-6 lg:px-16 min-h-[90vh]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* ── Header Block (Horizontal Split — consistent with /portofolio) ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[var(--warm-gray)] pb-10">
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-[64px] md:text-[84px] lg:text-[110px] font-light tracking-[-0.02em] leading-[0.9] text-[var(--near-black)]">
              The Circle
            </h1>
            <p className="font-sans text-[16px] md:text-[18px] text-[#6B6762] leading-relaxed max-w-lg">
              A curated collective of {collaborators.length} independent creators — bound by standard, driven by craft, zero hierarchy.
            </p>
          </div>

          {/* Member count badge — right side */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">
              {collaborators.length} Members
            </span>
            <div className="w-px h-4 bg-[var(--warm-gray)]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--aged-gold)]">
              Active Collective
            </span>
          </div>
        </div>

        {/* ── Role Filter Chips ────────────────────────────── */}
        <div className="flex gap-3 flex-wrap -mt-6">
          {(Object.keys(ROLE_LABELS) as RoleCategory[]).map((roleKey) => (
            <button
              key={roleKey}
              onClick={() => setActiveRole(roleKey)}
              className={`font-sans text-[11px] uppercase tracking-[0.08em] px-4 py-2 transition-all whitespace-nowrap
                ${activeRole === roleKey
                  ? "bg-[var(--crimson)] text-[var(--bone)]"
                  : "bg-transparent border border-[var(--warm-gray)] text-[#6B6762] hover:border-[var(--near-black)] hover:text-[var(--near-black)]"}
              `}
            >
              {ROLE_LABELS[roleKey]} ({roleCounts[roleKey]})
            </button>
          ))}
        </div>

        {/* ── Content Area ─────────────────────────────────── */}
        <div ref={gridRef}>

          {/* ── Featured Member (Full-Width Card) ──────────── */}
          {featuredMember && (
            <Link
              href={`/circle/${featuredMember.slug}`}
              className="group flex flex-col md:flex-row gap-0 opacity-0 observe-me stagger-1 mb-16"
            >
              {/* Portrait */}
              <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:min-h-[480px] bg-[var(--warm-gray)] overflow-hidden">
                {featuredMember.photoUrl ? (
                  <Image
                    src={featuredMember.photoUrl}
                    alt={featuredMember.brandingName}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#E5E2DC] transition-all duration-500">
                    <span className="font-serif text-[120px] text-[var(--bone)] opacity-50">
                      {featuredMember.brandingName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                
                {/* Logo Badge Overlay on Featured Card Image */}
                {featuredMember.logoUrl && (
                    <div className="absolute bottom-6 right-6 w-12 h-12 md:w-16 md:h-16 bg-[var(--near-black)] p-2 shadow-2xl flex items-center justify-center pointer-events-none">
                      <div className="relative w-full h-full">
                        <Image src={featuredMember.logoUrl} alt="Logo" fill className="object-contain filter brightness-0 invert opacity-90" />
                      </div>
                    </div>
                )}
              </div>

              {/* Info Panel */}
              <div className="w-full md:w-1/2 bg-[var(--near-black)] flex flex-col justify-between p-8 md:p-12 lg:p-16">
                <div className="flex flex-col gap-6">
                  {/* Role + Location tags */}
                  <div className="flex flex-wrap gap-2">
                    {featuredMember.defaultRole && (
                      <span className="font-sans text-[11px] uppercase tracking-[0.2em] bg-[rgba(242,239,233,0.1)] text-[var(--bone)] px-3 py-1">
                        {featuredMember.defaultRole}
                      </span>
                    )}
                    {featuredMember.location && (
                      <span className="font-sans text-[11px] uppercase tracking-[0.2em] bg-[rgba(242,239,233,0.06)] text-[rgba(242,239,233,0.5)] px-3 py-1">
                        {featuredMember.location}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2 className="font-serif text-[48px] md:text-[72px] lg:text-[84px] text-[var(--bone)] font-light leading-none tracking-[-0.01em]">
                    {featuredMember.brandingName}
                  </h2>

                  {/* Position Line */}
                  {featuredMember.positionLine && (
                    <p className="font-serif italic text-[16px] md:text-[18px] text-[rgba(242,239,233,0.5)] leading-relaxed max-w-sm">
                      &ldquo;{featuredMember.positionLine}&rdquo;
                    </p>
                  )}

                  {/* Skills */}
                  {featuredMember.skills && featuredMember.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {featuredMember.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="font-sans text-[10px] uppercase tracking-[0.1em] text-[rgba(242,239,233,0.4)] border border-[rgba(242,239,233,0.1)] px-3 py-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow CTA */}
                <div className="flex items-center gap-3 mt-8 md:mt-0">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[rgba(242,239,233,0.4)] group-hover:text-[var(--aged-gold)] transition-colors duration-300">
                    View Profile
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center border border-[rgba(242,239,233,0.2)] group-hover:bg-[var(--bone)] group-hover:border-[var(--bone)] transition-all duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[rgba(242,239,233,0.5)] group-hover:text-[var(--near-black)] transition-all duration-300 group-hover:translate-x-0.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* ── Rest of Members (3-col Grid) ───────────────── */}
          {restMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
              {restMembers.map((collaborator, index) => (
                <Link
                  key={collaborator.id}
                  href={`/circle/${collaborator.slug}`}
                  className={`group flex flex-col gap-4 opacity-0 observe-me stagger-${((index + 1) % 5) + 1}`}
                >
                  <div className="relative w-full aspect-[4/5] bg-[var(--warm-gray)] overflow-hidden">
                    {collaborator.photoUrl ? (
                      <Image
                        src={collaborator.photoUrl}
                        alt={collaborator.brandingName}
                        fill
                        className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#E5E2DC] transition-all duration-500">
                        <span className="font-serif text-[80px] text-[var(--bone)] opacity-50">
                          {collaborator.brandingName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

                    {/* Location badge overlay */}
                    {collaborator.location && (
                      <div className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--bone)] bg-[var(--near-black)]/50 backdrop-blur-sm px-3 py-1">
                        {collaborator.location}
                      </div>
                    )}
                    
                    {/* Logo Badge Overlay on Card Image */}
                    {collaborator.logoUrl && (
                        <div className="absolute bottom-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-[var(--near-black)] p-1.5 shadow-lg flex items-center justify-center pointer-events-none">
                          <div className="relative w-full h-full">
                            <Image src={collaborator.logoUrl} alt="Logo" fill className="object-contain filter brightness-0 invert opacity-90" />
                          </div>
                        </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-[28px] md:text-[36px] font-light text-[var(--near-black)] leading-none tracking-[-0.01em]">
                        {collaborator.brandingName}
                      </h3>
                      <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--aged-gold)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="square" strokeLinejoin="miter" />
                        </svg>
                      </div>
                    </div>

                    {collaborator.defaultRole && (
                      <p className="font-sans text-[12px] uppercase tracking-[0.08em] text-[var(--aged-gold)] font-medium">
                        {collaborator.defaultRole}
                      </p>
                    )}

                    {collaborator.positionLine && (
                      <p className="font-serif italic text-[14px] text-[#6B6762] leading-tight mt-0.5">
                        {collaborator.positionLine}
                      </p>
                    )}

                    {/* Skills mini-chips */}
                    {collaborator.skills && collaborator.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {collaborator.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="font-sans text-[10px] uppercase tracking-[0.06em] text-[#6B6762] border border-[var(--warm-gray)] px-2 py-0.5">
                            {skill}
                          </span>
                        ))}
                        {collaborator.skills.length > 3 && (
                          <span className="font-sans text-[10px] text-[#6B6762] px-1 py-0.5">
                            +{collaborator.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="w-full py-24 flex justify-center fade-up-enter">
            <p className="font-serif italic text-xl text-[#6B6762] text-center">
              No members in this discipline yet.
            </p>
          </div>
        )}

        {/* ── Bottom CTA Block ─────────────────────────────── */}
        <div className="border-t border-[var(--warm-gray)] pt-16 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-[32px] md:text-[48px] text-[var(--near-black)] leading-none">
                Work with the Circle
              </h2>
              <p className="font-sans text-[14px] text-[#6B6762] max-w-md">
                Have a project that demands absolute excellence? Let&apos;s assemble the right minds.
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
    </div>
  );
}
