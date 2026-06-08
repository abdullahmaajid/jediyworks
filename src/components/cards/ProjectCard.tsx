"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LABELS, PILLAR_LABELS } from "../../types";
import type { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project & {
    // Optional role to display if rendered inside a circle profile
    roleInProject?: string;
  };
  index?: number;
  displayIndex?: number; // The visual number to show (01, 02, etc.)
}

export default function ProjectCard({ project, index = 0, displayIndex }: ProjectCardProps) {
  const numberLabel = displayIndex !== undefined
    ? String(displayIndex).padStart(2, "0")
    : String(index + 1).padStart(2, "0");

  return (
    <Link 
      href={`/portofolio/${project.slug}`}
      className={`group flex flex-col gap-4 opacity-0 observe-me stagger-${(index % 5) + 1}`}
    >
      <div className="relative w-full aspect-video bg-[var(--warm-gray)] overflow-hidden">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.thumbnailAlt || project.title}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--crimson)] text-[var(--bone)] transition-all duration-300 group-hover:scale-105">
            <span className="font-serif italic text-2xl opacity-20">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-[var(--crimson)] opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none" />
        
        {/* Project Number Badge */}
        <div className="absolute top-4 left-4 font-sans text-[11px] tracking-[0.2em] text-[var(--bone)] bg-[var(--near-black)]/50 backdrop-blur-sm px-3 py-1">
          {numberLabel}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:-translate-y-2">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-serif text-[24px] md:text-[32px] font-light text-[var(--near-black)] leading-none tracking-[-0.01em]">
            {project.title}
          </h3>
          <span className="font-sans text-[13px] text-[#6B6762] shrink-0 pt-1">
            {project.year}
          </span>
        </div>
        
        {project.roleInProject && (
          <p className="font-sans text-[13px] text-[var(--aged-gold)] uppercase tracking-[0.2em] font-medium">
            {project.roleInProject}
          </p>
        )}
        
        <p className="font-sans text-[13px] text-[#6B6762] line-clamp-2">
          {project.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="tag-client-work">
            {CATEGORY_LABELS[project.category] || project.category}
          </span>
          <span className={`tag-${project.pillar.replace('_', '-')}`}>
            {PILLAR_LABELS[project.pillar] || project.pillar}
          </span>
        </div>
      </div>
    </Link>
  );
}
