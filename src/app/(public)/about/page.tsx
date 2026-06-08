import { prisma } from "../../../libs/prisma";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "JEDIYWORKS is a new category. A curated creative collective built to execute, not to impress.",
};

export const revalidate = 0;

export default async function AboutPage() {
  const collaborators = await prisma.collaborator.findMany({
    where: { status: "active", profileVisible: true },
    orderBy: { sortOrder: "asc" },
  });

  // Find Jediy for the founder section
  const founder = collaborators.find(c => c.slug === "jediyworks");

  return (
    <div className="bg-[var(--bone)]">
      
      {/* 00. The Simple Version / Manifesto */}
      <section className="py-24 md:py-32 px-6 lg:px-16 border-b border-[var(--warm-gray)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <h1 className="font-serif text-[64px] md:text-[96px] lg:text-[120px] text-[var(--near-black)] font-light leading-[0.9] tracking-[-0.02em] fade-up-enter">
            Nothing left<br />unbuilt.
          </h1>
          <div className="flex flex-col md:flex-row gap-8 md:gap-24 fade-up-enter stagger-1">
            <div className="md:w-1/3">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762]">00 — The Origin</span>
            </div>
            <div className="md:w-2/3 flex flex-col gap-6 font-sans text-[18px] md:text-[20px] text-[var(--near-black)] leading-relaxed text-balance">
              <p>
                The traditional agency model is structurally broken. Bloated overheads, fragmented communication, and junior hands executing senior-level retainers. We refused to inherit that architecture. So we engineered a new one.
              </p>
              <p>
                JEDIYWORKS is an exclusive ecosystem of independent visionaries. We are not an agency; we are a curated collective. We assemble hyper-specialized circles tailored to the exact architectural DNA of your project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 01. The Old Way vs The New Way */}
      <section className="py-24 px-6 lg:px-16 border-b border-[var(--warm-gray)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 fade-up-enter">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)] block">
                01 — The Paradigm Shift
              </span>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* The Old Way */}
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[24px] md:text-[32px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">The Old Way (Agencies)</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-4 items-start">
                    <span className="text-[var(--crimson)] mt-1">×</span>
                    <span className="font-sans text-[15px] text-[#4A4744] leading-relaxed">You pay for massive overhead, office space, and idle employees.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[var(--crimson)] mt-1">×</span>
                    <span className="font-sans text-[15px] text-[#4A4744] leading-relaxed">Pitched by seniors, executed by juniors behind closed doors.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[var(--crimson)] mt-1">×</span>
                    <span className="font-sans text-[15px] text-[#4A4744] leading-relaxed">Slow-moving monoliths constrained by their internal roster.</span>
                  </li>
                </ul>
              </div>

              {/* The New Way */}
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[24px] md:text-[32px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">The New Way (JEDIYWORKS)</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-4 items-start">
                    <span className="text-[var(--aged-gold)] mt-1">✓</span>
                    <span className="font-sans text-[15px] text-[#4A4744] leading-relaxed">Zero overhead. You pay purely for top-tier execution.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[var(--aged-gold)] mt-1">✓</span>
                    <span className="font-sans text-[15px] text-[#4A4744] leading-relaxed">Direct access to the actual independent experts building your product.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-[var(--aged-gold)] mt-1">✓</span>
                    <span className="font-sans text-[15px] text-[#4A4744] leading-relaxed">Agile deployment. We pull the exact minds needed globally.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 02. How It Works (The Orchestration) */}
      <section className="py-24 px-6 lg:px-16 border-b border-[var(--warm-gray)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 fade-up-enter">
            <div className="md:col-span-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)] block">
                02 — The Orchestration
              </span>
            </div>
            <div className="md:col-span-8 flex flex-col gap-8">
              <h2 className="font-serif text-[36px] md:text-[48px] lg:text-[56px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">
                One Gateway. Infinite Capability.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 fade-up-enter stagger-1">
            <div className="flex flex-col gap-4 border-t border-[var(--warm-gray)] pt-6">
              <span className="font-sans text-[13px] text-[#6B6762] uppercase tracking-[0.2em]">Phase I</span>
              <h3 className="font-serif text-[24px] md:text-[32px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">The Mandate</h3>
              <p className="font-sans text-[15px] text-[#4A4744] leading-relaxed">
                You present the vision. We dissect the architectural requirements, constraints, and standard of excellence demanded.
              </p>
            </div>
            <div className="flex flex-col gap-4 border-t border-[var(--warm-gray)] pt-6">
              <span className="font-sans text-[13px] text-[#6B6762] uppercase tracking-[0.2em]">Phase II</span>
              <h3 className="font-serif text-[24px] md:text-[32px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">The Assembly</h3>
              <p className="font-sans text-[15px] text-[#4A4744] leading-relaxed">
                We pull from our curated network of independent creators. We do not use who is available; we deploy who is exactingly right.
              </p>
            </div>
            <div className="flex flex-col gap-4 border-t border-[var(--warm-gray)] pt-6">
              <span className="font-sans text-[13px] text-[#6B6762] uppercase tracking-[0.2em]">Phase III</span>
              <h3 className="font-serif text-[24px] md:text-[32px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">The Execution</h3>
              <p className="font-sans text-[15px] text-[#4A4744] leading-relaxed">
                Seamless production managed through a singular point of accountability. You get collective firepower without the chaos of managing freelancers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 03. Core Philosophy (Big Type) */}
      <section className="py-32 px-6 lg:px-16 bg-[var(--near-black)] text-[var(--bone)]">
        <div className="max-w-5xl mx-auto text-center fade-up-enter">
          <div className="flex flex-col gap-6 items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--aged-gold)" strokeWidth="1" className="mb-4">
              <path d="M12 2L2 22h20L12 2z" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
            <p className="font-serif italic text-[32px] md:text-[48px] font-light leading-[1.2] text-[rgba(242,239,233,0.9)] text-balance">
              "We believe that the greatest work is born when exceptional individuals are given absolute trust, fair equity, and zero bureaucratic friction."
            </p>
            <p className="font-serif italic text-[24px] text-[var(--aged-gold)] border-l-2 border-[var(--aged-gold)] pl-6 my-4">
              When individual mastery suffices, we walk alone. When the vision demands an orchestra, we assemble. JEDIYWORKS is the gateway.
            </p>
            <p>
              This is not a casual collaboration. It is governed by rigorous curation, uncompromising standards, and absolute accountability. We do not assemble whoever is available — we deploy whoever is exactingly right.
            </p>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="py-24 px-6 lg:px-16 bg-[var(--crimson)] text-[var(--bone)] border-t border-[rgba(242,239,233,0.08)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="fade-up-enter">
            <h2 className="font-serif text-[48px] md:text-[56px] font-light leading-none tracking-[-0.01em] mb-6">
              House Rules
            </h2>
            <p className="font-sans text-[16px] text-[rgba(242,239,233,0.75)] max-w-xl">
              These are not taglines. This is the operational protocol. Non-negotiable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-[rgba(242,239,233,0.08)] pt-12 fade-up-enter stagger-1">
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[13px] text-[var(--aged-gold)] uppercase tracking-[0.2em]">01</span>
              <h3 className="font-serif text-[28px] md:text-[36px] font-light leading-[1.1] tracking-[-0.01em]">We do not staff. We curate circles.</h3>
              <p className="font-sans text-[16px] text-[rgba(242,239,233,0.65)] leading-relaxed">
                Every circle is meticulously assembled based on the architectural DNA of the project. We do not care who is available. We only deploy who is exactingly right.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[13px] text-[var(--aged-gold)] uppercase tracking-[0.2em]">02</span>
              <h3 className="font-serif text-[28px] md:text-[36px] font-light leading-[1.1] tracking-[-0.01em]">Absolute credit. Always.</h3>
              <p className="font-sans text-[16px] text-[rgba(242,239,233,0.65)] leading-relaxed">
                You craft it, you sign it. There are no ghosts here. Credit is our truest currency. A creator whose name is honored will always deliver their magnum opus.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[13px] text-[var(--aged-gold)] uppercase tracking-[0.2em]">03</span>
              <h3 className="font-serif text-[28px] md:text-[36px] font-light leading-[1.1] tracking-[-0.01em]">Uncompromising standard.</h3>
              <p className="font-sans text-[16px] text-[rgba(242,239,233,0.65)] leading-relaxed">
                If a mandate diverges from our aesthetic threshold or technical depth—we decline. Exclusivity is not a matter of capital. It is a matter of standard.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[13px] text-[var(--aged-gold)] uppercase tracking-[0.2em]">04</span>
              <h3 className="font-serif text-[28px] md:text-[36px] font-light leading-[1.1] tracking-[-0.01em]">Independent entities. Shared excellence.</h3>
              <p className="font-sans text-[16px] text-[rgba(242,239,233,0.65)] leading-relaxed">
                Every visionary in this ecosystem possesses their own distinct signature. But when we converge, one metric is absolute: the flawlessness of the final output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder / The Network preview */}
      <section className="py-24 px-6 lg:px-16 bg-[var(--bone)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          
          {founder && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 fade-up-enter">
              <div className="md:col-span-4">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)] block">
                  The Founder
                </span>
              </div>
              <div className="md:col-span-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="relative w-32 h-32 md:w-48 md:h-48 shrink-0 bg-[var(--warm-gray)]">
                  {founder.photoUrl ? (
                    <Image src={founder.photoUrl} alt={founder.brandingName} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#E5E2DC]">
                      <span className="font-serif text-[64px] text-[var(--bone)] opacity-50">{founder.brandingName.charAt(0)}</span>
                    </div>
                  )}
                  {/* Logo Badge Overlay for Founder */}
                  {founder.logoUrl && (
                      <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-[var(--near-black)] p-1.5 shadow-lg flex items-center justify-center pointer-events-none">
                        <div className="relative w-full h-full">
                          <Image src={founder.logoUrl} alt="Logo" fill className="object-contain filter brightness-0 invert opacity-90" />
                        </div>
                      </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif text-[36px] md:text-[48px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">{founder.fullName}</h3>
                  <span className="font-sans text-[13px] uppercase tracking-[0.2em] text-[var(--crimson)]">{founder.defaultRole}</span>
                  <p className="font-sans text-[16px] leading-relaxed text-[#4A4744]">
                    {founder.bio || "Curating the ecosystem, orchestrating the execution, and enforcing the highest standard. Every mandate passes through this singular gateway of absolute accountability."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 fade-up-enter stagger-1">
            <div className="md:col-span-4">
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B6762] pt-2 border-t border-[var(--warm-gray)] block">
                The Network
              </span>
            </div>
            <div className="md:col-span-8 flex flex-col gap-10">
              <p className="font-sans text-[16px] leading-relaxed text-[#4A4744]">
                An independent ecosystem of visionaries. No employees. No sub-contractors.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {collaborators.filter(c => c.slug !== "jediyworks").map(c => (
                  <Link key={c.id} href={`/circle/${c.slug}`} className="group flex flex-col gap-3">
                    <div className="relative w-full aspect-[4/5] bg-[var(--warm-gray)] overflow-hidden">
                      {c.photoUrl ? (
                        <Image src={c.photoUrl} alt={c.brandingName} fill className="object-cover transition-all duration-300" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#E5E2DC] group-hover:bg-[var(--warm-gray)] transition-colors">
                          <span className="font-serif text-[48px] text-[var(--bone)]">{c.brandingName.charAt(0)}</span>
                        </div>
                      )}
                      {c.location && (
                          <div className="absolute bottom-4 left-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--bone)] bg-[var(--near-black)]/50 backdrop-blur-sm px-3 py-1">
                            {c.location}
                          </div>
                      )}
                      {/* Logo Badge Overlay on Card Image */}
                      {c.logoUrl && (
                          <div className="absolute bottom-4 right-4 w-8 h-8 md:w-10 md:h-10 bg-[var(--near-black)] p-1.5 shadow-lg flex items-center justify-center pointer-events-none">
                            <div className="relative w-full h-full">
                              <Image src={c.logoUrl} alt="Logo" fill className="object-contain filter brightness-0 invert opacity-90" />
                            </div>
                          </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-[16px] font-medium text-[var(--near-black)] group-hover:text-[var(--crimson)] transition-colors">{c.brandingName}</span>
                      <span className="font-sans text-[12px] text-[#6B6762]">{c.defaultRole}</span>
                       {c.skills && c.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {c.skills.slice(0, 3).map((skill) => (
                                <span key={skill} className="font-sans text-[10px] uppercase tracking-[0.06em] text-[#6B6762] border border-[var(--warm-gray)] px-2 py-0.5">
                                  {skill}
                                </span>
                              ))}
                            </div>
                        )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The Next Move / Dual CTA */}
      <section className="py-24 px-6 lg:px-16 bg-[var(--bone)] border-t border-[var(--warm-gray)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
          
          <div className="flex-1 flex flex-col gap-6 fade-up-enter">
            <h2 className="font-serif text-[36px] md:text-[48px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">
              Initiate a Mandate.
            </h2>
            <p className="font-sans text-[16px] text-[#6B6762] leading-relaxed">
              A disruptive digital infrastructure. A monumental rebranding. Visuals that command authority. Audio that alters perception.
            </p>
            <p className="font-sans text-[16px] text-[#6B6762] leading-relaxed mb-4">
              Detail your vision. We will orchestrate the execution and deploy the exact circle required to build it.
            </p>
            <Link href="/contact" className="btn-primary w-fit mt-auto">
              Start a Project
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col gap-6 fade-up-enter stagger-1">
            <h2 className="font-serif text-[36px] md:text-[48px] text-[var(--near-black)] font-light leading-none tracking-[-0.01em]">
              Join the Ecosystem.
            </h2>
            <p className="font-sans text-[16px] text-[#6B6762] leading-relaxed">
              Architects, designers, filmmakers, audio engineers — if you hold an uncompromising standard and seek an ecosystem that honors your signature.
            </p>
            <p className="font-sans text-[16px] text-[#6B6762] leading-relaxed mb-4">
              Present your magnum opus. We will converse on the rest.
            </p>
            <a href="mailto:hello@jediyworks.com" className="btn-ghost w-fit mt-auto">
              Join the Circle
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}