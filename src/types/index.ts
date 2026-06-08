// ─────────────────────────────────────────────
// JEDIYWORKS — Type Definitions
// ─────────────────────────────────────────────

export type ProjectCategory = "client_work" | "experimental";

export type ProjectPillar = "technology" | "creative_visual" | "audio_post" | "spatial_fabrication";

export type ProjectStatus = "draft" | "published";

export type CollaboratorStatus = "active" | "inactive";

export type InboxStatus = "new" | "read" | "archived";

// ─────────────────────────────────────────────
// UI-specific types (extended from Prisma models)
// ─────────────────────────────────────────────

export interface GalleryImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectWithCredits {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  thumbnailUrl: string | null;
  thumbnailAlt: string | null;
  category: string;
  pillar: string;
  clientName: string | null;
  year: number | null;
  duration: string | null;
  liveLink: string | null;
  problem: string | null;
  execution: string | null;
  impact: string | null;
  techStack: string[];
  reviewRating: number | null;
  reviewQuote: string | null;
  reviewAuthor: string | null;
  reviewTitle: string | null;
  galleryImages: GalleryImage[];
  videoEmbeds: string[];
  status: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  credits: CreditWithCollaborator[];
}

export interface CreditWithCollaborator {
  id: string;
  roleInProject: string;
  collaborator: {
    id: string;
    fullName: string;
    alias: string | null;
    brandingName: string;
    slug: string;
    photoUrl: string | null;
    socialIg: string | null;
    socialLinkedin: string | null;
  };
}

export interface CollaboratorWithProjects {
  id: string;
  fullName: string;
  alias: string | null;
  brandingName: string;
  slug: string;
  defaultRole: string | null;
  photoUrl: string | null;
  bio: string | null;
  positionLine: string | null;
  socialIg: string | null;
  socialLinkedin: string | null;
  socialYoutube: string | null;
  status: string;
  profileVisible: boolean;
  credits: CreditWithProject[];
}

export interface CreditWithProject {
  id: string;
  roleInProject: string;
  project: {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    thumbnailUrl: string | null;
    thumbnailAlt: string | null;
    category: string;
    pillar: string;
    year: number | null;
    techStack: string[];
    status: string;
  };
}

// ─────────────────────────────────────────────
// Service Pillars
// ─────────────────────────────────────────────

export interface ServicePillar {
  id: string;
  name: string;
  description: string;
  subServices: string[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "technology",
    name: "Technology & Engineering",
    description:
      "Building the digital infrastructure that powers modern experiences.",
    subServices: [
      "Web & Mobile App Development",
      "UI/UX & Digital Product Design",
      "IoT & Hardware Integration",
      "Custom AI Workflows & Automation",
    ],
  },
  {
    id: "creative_visual",
    name: "Creative & Visual Identity",
    description:
      "Shaping how brands look, move, and feel across every touchpoint.",
    subServices: [
      "Brand Identity & Visual Systems",
      "Cinematic Documentation",
      "Video Production & Visual Storytelling",
    ],
  },
  {
    id: "audio_post",
    name: "Audio & Post-Production",
    description:
      "The dimension most forget, but everyone feels.",
    subServices: [
      "Sound Design & Spatial Audio",
    ],
  },
  {
    id: "spatial_fabrication",
    name: "Spatial & Physical Fabrication",
    description:
      "Translating digital precision into physical reality.",
    subServices: [
      "CAD 3D & Architectural Prototyping",
      "3D Printing & Custom Fabrication",
      "Spatial Design & Event Production",
    ],
  },
];

// ─────────────────────────────────────────────
// Pillar display helpers
// ─────────────────────────────────────────────

export const PILLAR_LABELS: Record<string, string> = {
  technology: "Technology",
  creative_visual: "Creative Production",
  audio_post: "Audio & Post",
  spatial_fabrication: "Spatial & Fabrication",
};

export const CATEGORY_LABELS: Record<string, string> = {
  client_work: "Client Work",
  experimental: "Experimental",
};
