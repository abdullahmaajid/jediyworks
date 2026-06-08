import { prisma } from "../../../../libs/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../../../components/cards/ProjectCard";
import ScrollObserver from "../../../../components/ui/ScrollObserver";
import ShareBar from "../../../../components/ui/ShareBar";
import AsymmetricalGallery from "../../../../components/ui/AsymmetricalGallery";
import { CATEGORY_LABELS, PILLAR_LABELS } from "../../../../types";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary || "Case study by JEDIYWORKS.",
    openGraph: {
      images: project.thumbnailUrl ? [project.thumbnailUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug, status: "published" },
    include: {
      credits: {
        include: {
          collaborator: true,
        },
      },
    },
  });

  if (!project) notFound();

  // Parse gallery images
  const galleryImages = Array.isArray(project.galleryImages)
    ? project.galleryImages as Array<{ url: string; alt: string; width?: number; height?: number }>
    : [];

  // Fetch next published project (chronologically after this one)
  const nextProject = await prisma.project.findFirst({
    where: {
      status: "published",
      createdAt: { gt: project.createdAt },
    },
    orderBy: { createdAt: "asc" },
    select: { slug: true, title: true, pillar: true },
  });

  // Fallback: if no newer project, wrap to the oldest one
  const fallbackNext = !nextProject
    ? await prisma.project.findFirst({
        where: { status: "published", slug: { not: project.slug } },
        orderBy: { createdAt: "asc" },
        select: { slug: true, title: true, pillar: true },
      })
    : null;

  const nextProjectLink = nextProject || fallbackNext;

  return (
    <article className="bg-[var(--bone)] min-h-screen">
      <ScrollObserver />

      {/* Hero Visual */}
      <div className="relative w-full h-[60vh] md:h-[80vh] bg-[var(--crimson)]">
        {project.thumbnailUrl && (
          <Image
            src={project.thumbnailUrl}
            alt={project.thumbnailAlt || project.title}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--crimson)] to-transparent opacity-80" />

        <div className="absolute bottom-0 left-0 w-full px-6 lg:px-16 pb-12">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 fade-up-enter">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="tag-client-work bg-[rgba(242,239,233,0.1)] text-[var(--bone)] border-none">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
              <span className={`tag-${project.pillar.replace('_', '-')} bg-[rgba(242,239,233,0.15)] text-[var(--bone)]`}>
                {PILLAR_LABELS[project.pillar] || project.pillar}
              </span>
            </div>

            <h1 className="font-serif text-[64px] md:text-[84px] lg:text-[110px] text-[var(--bone)] font-light leading-[0.9] tracking-[-0.02em]">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Reading Content (Constrained for optimal line length & UX) */}
      <div className="px-6 lg:px-16 py-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-24">

        {/* Back Link */}
        <div className="fade-up-enter -mb-12">
          <Link href="/portofolio" className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] hover:text-[var(--crimson)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
            Back to Work
          </Link>
        </div>

        {/* Metadata Table + Scope of Work */}
        <div className="flex flex-col gap-10 fade-up-enter stagger-1">
          {/* Primary metadata row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[var(--warm-gray)]">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Client</span>
              <span className="font-sans text-[15px] text-[var(--near-black)] font-medium">{project.clientName || "—"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Year</span>
              <span className="font-sans text-[15px] text-[var(--near-black)] font-medium">{project.year || "—"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Duration</span>
              <span className="font-sans text-[15px] text-[var(--near-black)] font-medium">{project.duration || "—"}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Live Link</span>
              {project.liveLink ? (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] text-[var(--crimson)] font-medium underline underline-offset-4 hover:text-[var(--oxblood)]">
                  View Site ↗
                </a>
              ) : (
                <span className="font-sans text-[15px] text-[var(--near-black)] font-medium">—</span>
              )}
            </div>
          </div>

          {/* Scope of Work */}
          {project.scopeOfWork && project.scopeOfWork.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Scope of Work</span>
              <div className="flex flex-wrap gap-3">
                {project.scopeOfWork.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-[var(--warm-gray)] bg-transparent text-[var(--near-black)] font-sans text-[10px] tracking-[0.2em] uppercase font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        {project.summary && (
          <div className="fade-up-enter stagger-2">
            <p className="font-serif text-[24px] md:text-[32px] lg:text-[40px] font-light leading-[1.3] text-[var(--near-black)]">
              {project.summary}
            </p>
          </div>
        )}

        {/* Blueprint: Problem / Strategy / Execution / Impact */}
        <div className="flex flex-col gap-16">
          {project.problem && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <h2 className="md:col-span-4 font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)]">
                The Problem
              </h2>
              <div className="md:col-span-8 font-sans text-[16px] leading-relaxed text-[#4A4744] whitespace-pre-wrap">
                {project.problem}
              </div>
            </div>
          )}

          {/* THE STRATEGY — The Thinking Behind the Work */}
          {project.strategy && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <h2 className="md:col-span-4 font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--crimson)] pt-2 border-t border-[var(--crimson)]">
                The Strategy
              </h2>
              <div className="md:col-span-8 font-sans text-[16px] leading-relaxed text-[#4A4744] whitespace-pre-wrap">
                {project.strategy}
              </div>
            </div>
          )}

          {project.execution && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <h2 className="md:col-span-4 font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)]">
                The Execution
              </h2>
              <div className="md:col-span-8 font-sans text-[16px] leading-relaxed text-[#4A4744] whitespace-pre-wrap">
                {project.execution}
              </div>
            </div>
          )}

          {project.impact && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <h2 className="md:col-span-4 font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)]">
                The Impact
              </h2>
              <div className="md:col-span-8 font-sans text-[16px] leading-relaxed text-[#4A4744] whitespace-pre-wrap">
                {project.impact}
              </div>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-[var(--warm-gray)] text-[var(--near-black)] font-mono text-[13px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Credits / Network */}
        {project.credits && project.credits.length > 0 && (
          <div className="flex flex-col gap-8 py-16 border-t border-[var(--warm-gray)]">
            <h2 className="font-serif text-[32px] text-[var(--near-black)]">Network on this Project</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.credits.map((credit) => (
                <Link
                  key={credit.id}
                  href={`/circle/${credit.collaborator.slug}`}
                  className="flex items-center gap-4 p-4 border border-[var(--warm-gray)] hover:border-[var(--near-black)] transition-colors group"
                >
                  <div className="relative w-12 h-12 overflow-hidden bg-[var(--warm-gray)] shrink-0">
                    {credit.collaborator.photoUrl ? (
                      <Image
                        src={credit.collaborator.photoUrl}
                        alt={credit.collaborator.brandingName}
                        fill
                        className="object-cover transition-all duration-300"
                        sizes="48px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[var(--crimson)] text-[var(--bone)]">
                        {credit.collaborator.brandingName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[15px] font-medium text-[var(--near-black)]">
                      {credit.collaborator.brandingName}
                    </span>
                    <span className="font-sans text-[12px] text-[#6B6762]">
                      {credit.roleInProject}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Review (Pure Typographic Pull-Quote) */}
        {project.reviewQuote && (
          <div className="py-24 flex flex-col items-center text-center gap-10">
            <div className="flex gap-2 text-[var(--crimson)]">
              {[...Array(project.reviewRating || 5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="font-serif italic text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] text-[var(--near-black)] max-w-4xl mx-auto">
              &ldquo;{project.reviewQuote}&rdquo;
            </blockquote>
            <div className="flex flex-col gap-1 mt-4">
              <span className="font-sans text-[13px] uppercase tracking-[0.2em] font-medium text-[var(--near-black)]">{project.reviewAuthor}</span>
              <span className="font-sans text-[12px] text-[#6B6762]">{project.reviewTitle}</span>
            </div>
          </div>
        )}

        </div>
      </div>

      {/* Visual Content & Footer (Expanded to 7xl) */}
      <div className="px-6 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Gallery</h2>
            <div className="pt-8">
              <AsymmetricalGallery images={galleryImages} />
            </div>
          </div>
        )}

        {/* Next Project Navigation */}
        {nextProjectLink && (
          <Link
            href={`/portofolio/${nextProjectLink.slug}`}
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-12 border-t border-[var(--warm-gray)] hover:border-[var(--near-black)] transition-colors duration-300"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Next Project</span>
              <span className="font-serif text-[32px] md:text-[48px] leading-none text-[var(--near-black)] group-hover:text-[var(--crimson)] transition-colors duration-300">
                {nextProjectLink.title}
              </span>
            </div>
            <div className="shrink-0 w-14 h-14 flex items-center justify-center border border-[var(--near-black)] group-hover:bg-[var(--near-black)] group-hover:text-[var(--bone)] transition-all duration-300 text-[var(--near-black)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </div>
          </Link>
        )}

        </div>
      </div>

      <ShareBar />
    </article>
  );
}
