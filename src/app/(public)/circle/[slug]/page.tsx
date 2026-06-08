import { prisma } from "../../../../libs/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../../../components/cards/ProjectCard";
import ScrollObserver from "../../../../components/ui/ScrollObserver";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const collaborator = await prisma.collaborator.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!collaborator) return {};

  return {
    title: `${collaborator.brandingName} — The Circle`,
    description: collaborator.positionLine || `Profile of ${collaborator.brandingName} in JEDIYWORKS.`,
    openGraph: {
      images: collaborator.photoUrl ? [collaborator.photoUrl] : [],
    },
  };
}

export default async function CollaboratorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const collaborator = await prisma.collaborator.findUnique({
    where: { slug: resolvedParams.slug, profileVisible: true },
    include: {
      credits: {
        include: {
          project: true,
        },
      },
    },
  });

  if (!collaborator) notFound();

  const creditedProjects = collaborator.credits
    .filter(c => c.project.status === "published")
    .map(c => ({
      ...c.project,
      roleInProject: c.roleInProject,
    }));

  // Fetch another collaborator for the "Meet Another Mind" section
  const nextCollaborator = await prisma.collaborator.findFirst({
    where: { 
      profileVisible: true,
      NOT: { slug: resolvedParams.slug }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <article className="bg-[var(--bone)] min-h-screen">
      <ScrollObserver />

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="relative w-full h-[60vh] md:h-[80vh] bg-[var(--near-black)]">
        {/* Background Image — uses bannerUrl (separate from avatar) */}
        {(collaborator.bannerUrl || collaborator.photoUrl) && (
          <Image
            src={collaborator.bannerUrl || collaborator.photoUrl!}
            alt={collaborator.brandingName}
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--near-black)] to-transparent opacity-80" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 w-full px-6 lg:px-16 pb-12">
          <div className="max-w-7xl mx-auto w-full flex items-start gap-6 md:gap-10 fade-up-enter">

            {/* Avatar — square 1:1, on the LEFT, top-aligned with tags */}
            <div className="relative shrink-0">
              <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 border-2 border-[rgba(242,239,233,0.2)] overflow-hidden bg-[var(--warm-gray)]">
                {collaborator.photoUrl ? (
                  <Image
                    src={collaborator.photoUrl}
                    alt={collaborator.brandingName}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 80px, 128px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--crimson)]">
                    <span className="font-serif text-[36px] text-[var(--bone)]">
                      {collaborator.brandingName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Logo Badge Overlay */}
              {collaborator.logoUrl && (
                <div className="absolute -bottom-3 -right-3 w-12 h-12 md:w-16 md:h-16 bg-[var(--near-black)] border border-[rgba(242,239,233,0.2)] p-2 shadow-xl flex items-center justify-center pointer-events-none">
                  <div className="relative w-full h-full">
                    <Image src={collaborator.logoUrl} alt={`${collaborator.brandingName} Logo`} fill className="object-contain filter brightness-0 invert opacity-90" />
                  </div>
                </div>
              )}
            </div>

            {/* Typography */}
            <div className="flex flex-col gap-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {collaborator.defaultRole && (
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] bg-[rgba(242,239,233,0.1)] text-[var(--bone)] px-3 py-1">
                    {collaborator.defaultRole}
                  </span>
                )}
                {collaborator.location && (
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] bg-[rgba(242,239,233,0.15)] text-[var(--bone)] px-3 py-1">
                    Based in {collaborator.location}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="font-serif text-[64px] md:text-[84px] lg:text-[110px] text-[var(--bone)] font-light leading-[0.9] tracking-[-0.02em]">
                {collaborator.brandingName}
              </h1>

              {collaborator.fullName !== collaborator.brandingName && (
                <p className="font-serif italic text-[20px] md:text-[24px] text-[rgba(242,239,233,0.7)] mt-2">
                  {collaborator.fullName}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Profile Meta ────────────────────────────────────── */}
      <div className="px-6 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Back Link */}
        <div className="fade-up-enter -mb-8">
          <Link href="/circle" className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.15em] text-[#6B6762] hover:text-[var(--crimson)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
            Back to Circle
          </Link>
        </div>

        {/* Position line + Socials row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-12 border-b border-[var(--warm-gray)]">
          <div className="max-w-xl">
            {collaborator.positionLine && (
              <p className="font-serif italic text-[24px] md:text-[32px] lg:text-[40px] text-[#4A4744] leading-[1.3]">
                &ldquo;{collaborator.positionLine}&rdquo;
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0 flex-wrap">
            {collaborator.personalWebsite && (
              <a
                href={collaborator.personalWebsite}
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                className="w-11 h-11 flex items-center justify-center border border-[var(--warm-gray)] text-[var(--near-black)] hover:border-[var(--near-black)] hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
                </svg>
              </a>
            )}
            {collaborator.socialIg && (
              <a
                href={`https://instagram.com/${collaborator.socialIg.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-11 h-11 flex items-center justify-center border border-[var(--warm-gray)] text-[var(--near-black)] hover:border-[var(--near-black)] hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            )}
            {collaborator.socialLinkedin && (
              <a
                href={collaborator.socialLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-11 h-11 flex items-center justify-center border border-[var(--warm-gray)] text-[var(--near-black)] hover:border-[var(--near-black)] hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}
            {collaborator.socialYoutube && (
              <a
                href={collaborator.socialYoutube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-11 h-11 flex items-center justify-center border border-[var(--warm-gray)] text-[var(--near-black)] hover:border-[var(--near-black)] hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Bio & Skills */}
        <div className="flex flex-col gap-12">
          {collaborator.bio && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <h2 className="md:col-span-4 font-sans text-[11px] uppercase tracking-[0.08em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)]">
                About
              </h2>
              <div className="md:col-span-8 font-sans text-[16px] leading-relaxed text-[#4A4744] whitespace-pre-wrap">
                {collaborator.bio}
              </div>
            </div>
          )}

          {collaborator.skills && collaborator.skills.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <h2 className="md:col-span-4 font-sans text-[11px] uppercase tracking-[0.08em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)]">
                Capabilities
              </h2>
              <div className="md:col-span-8 flex flex-wrap gap-2">
                {collaborator.skills.map((skill) => (
                  <span key={skill} className="font-sans text-[13px] uppercase tracking-[0.1em] text-[var(--near-black)] border border-[var(--warm-gray)] px-4 py-2 bg-[var(--bone)]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        </div>
      </div>

      {/* Credited Works */}
      <div className="px-6 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex items-end justify-between border-t border-[var(--warm-gray)] pt-12">
            <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">Credited Works</h2>
            <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-[#6B6762]">
              {creditedProjects.length} project{creditedProjects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {creditedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {creditedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project as any} index={index} />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 border border-[var(--warm-gray)] flex justify-center text-center">
              <p className="font-serif italic text-lg text-[#6B6762]">
                No published projects yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Meet Another Mind Navigation */}
      {nextCollaborator && (
        <div className="px-6 lg:px-16 pb-20">
          <div className="max-w-7xl mx-auto">
            <Link
              href={`/circle/${nextCollaborator.slug}`}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-12 border-t border-[var(--warm-gray)] hover:border-[var(--near-black)] transition-colors duration-300"
            >
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">Meet Another Mind</span>
                <span className="font-serif text-[32px] md:text-[48px] leading-none text-[var(--near-black)] group-hover:text-[var(--crimson)] transition-colors duration-300">
                  {nextCollaborator.brandingName}
                </span>
              </div>
              <div className="shrink-0 w-14 h-14 flex items-center justify-center border border-[var(--near-black)] group-hover:bg-[var(--near-black)] group-hover:text-[var(--bone)] transition-all duration-300 text-[var(--near-black)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}

      <ScrollObserver />
    </article>
  );
}
