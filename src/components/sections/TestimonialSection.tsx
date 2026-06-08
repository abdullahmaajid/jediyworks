"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@prisma/client";

interface TestimonialSectionProps {
  projectWithTestimonial: Project | null;
}

export default function TestimonialSection({ projectWithTestimonial }: TestimonialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-enter");
            
            // Trigger star fill animation if it's the stars container
            if (entry.target === starsRef.current) {
              const stars = starsRef.current.querySelectorAll(".star-icon");
              stars.forEach((star, index) => {
                // Add staggered animation delay inline
                (star as HTMLElement).style.animationDelay = `${index * 120}ms`;
                star.classList.add("star-fill");
              });
            }
            
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

  if (!projectWithTestimonial || !projectWithTestimonial.reviewQuote) {
    return null; // Don't render section if no testimonial exists
  }

  const rating = projectWithTestimonial.reviewRating || 5;

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-16 bg-[var(--crimson)] text-[var(--bone)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-10">
        
        {/* Stars */}
        <div 
          ref={starsRef as any} 
          className="flex gap-2 observe-me opacity-0"
        >
          {[...Array(5)].map((_, i) => (
            <svg 
              key={i} 
              className={`w-8 h-8 md:w-10 md:h-10 star-icon ${i < rating ? "" : "text-[var(--warm-gray)] opacity-30"}`} 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-serif italic text-[24px] md:text-[36px] leading-tight max-w-3xl observe-me opacity-0">
          "{projectWithTestimonial.reviewQuote}"
        </blockquote>

        {/* Attribution */}
        <div className="flex flex-col gap-1 items-center observe-me opacity-0">
          <p className="font-sans text-[15px] font-medium tracking-wide">
            {projectWithTestimonial.reviewAuthor || "Client"}
          </p>
          <p className="font-sans text-[13px] text-[rgba(242,239,233,0.55)]">
            {projectWithTestimonial.reviewTitle}
            {projectWithTestimonial.clientName ? `, ${projectWithTestimonial.clientName}` : ""}
          </p>
        </div>

        <div className="mt-4 observe-me opacity-0">
          <a href="/portofolio" className="font-sans text-[11px] uppercase tracking-[0.08em] text-[var(--aged-gold)] border-b border-[var(--aged-gold)] pb-1 hover:text-[var(--gold-dim)] transition-colors">
            More reviews on project pages →
          </a>
        </div>

      </div>
    </section>
  );
}
