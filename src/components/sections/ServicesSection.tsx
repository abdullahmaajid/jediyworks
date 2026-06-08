"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICE_PILLARS } from "../../types";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default on mobile

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
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-[var(--crimson)] text-[var(--bone)] border-y border-[rgba(242,239,233,0.08)]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <div className="opacity-0 observe-me">
          <h2 className="font-serif text-[28px] md:text-[48px] font-normal leading-none mb-6">
            The Playgrounds
          </h2>
          <p className="font-sans text-[16px] text-[rgba(242,239,233,0.75)] max-w-2xl leading-relaxed">
            We operate within four distinct pillars. We choose to be extraordinary at a select few disciplines, rather than adequate at many.
          </p>
        </div>

        {/* Desktop: Horizontal Grid, Mobile: Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 lg:gap-8">
          {SERVICE_PILLARS.map((pillar, index) => (
            <div 
              key={pillar.id}
              className={`
                group flex flex-col py-8 lg:p-10 opacity-0 observe-me
                border-b lg:border border-[rgba(242,239,233,0.15)]
              `}
            >
              {/* Mobile Header (Clickable for accordion) */}
              <button 
                className="lg:pointer-events-none w-full text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-sans text-[13px] text-[var(--aged-gold)] uppercase tracking-[0.08em]">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif text-[28px] md:text-[32px] leading-tight">
                    {pillar.name}
                  </h3>
                </div>
                
                <div className="lg:hidden text-[rgba(242,239,233,0.45)]">
                  {openIndex === index ? "−" : "+"}
                </div>
              </button>

              <div 
                className={`
                  flex-col gap-6 mt-6 overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndex === index ? "flex max-h-[500px] opacity-100" : "hidden lg:flex lg:max-h-[500px] lg:opacity-100 max-h-0 opacity-0"}
                `}
              >
                <p className="font-sans text-[14px] text-[rgba(242,239,233,0.45)] leading-relaxed">
                  {pillar.description}
                </p>
                
                <ul className="flex flex-col gap-3 mt-2">
                  {pillar.subServices.map((service, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[var(--aged-gold)] text-xs mt-1">■</span>
                      <span className="font-sans text-[15px] text-[rgba(242,239,233,0.85)]">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
