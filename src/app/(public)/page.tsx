import { prisma } from "../../libs/prisma";
import HeroSection from "../../components/sections/HeroSection";
import TrustStrip from "../../components/sections/TrustStrip";
import AboutPreviewSection from "../../components/sections/AboutPreviewSection";
import ManifestoSection from "../../components/sections/ManifestoSection";
import SelectedWorkSection from "../../components/sections/SelectedWorkSection";
import ServicesSection from "../../components/sections/ServicesSection";
import NetworkSection from "../../components/sections/NetworkSection";
import TestimonialSection from "../../components/sections/TestimonialSection";
import InquirySection from "../../components/sections/InquirySection";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Fetch required data from Prisma
  const [featuredProjects, collaborators, testimonialProject] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true, status: "published" },
      include: {
        credits: {
          include: { collaborator: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.collaborator.findMany({
      where: { status: "active", profileVisible: true },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.project.findFirst({
      where: { reviewRating: 5, status: "published" },
      orderBy: { createdAt: 'desc' },
    })
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustStrip />
      <AboutPreviewSection />
      <ManifestoSection />
      <SelectedWorkSection projects={featuredProjects} />
      <ServicesSection />
      <NetworkSection collaborators={collaborators} />
      {testimonialProject && <TestimonialSection projectWithTestimonial={testimonialProject} />}
      <InquirySection />
    </div>
  );
}
