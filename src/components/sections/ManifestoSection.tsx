import Image from "next/image";

export default function ManifestoSection() {
  return (
    <section className="relative w-full bg-[var(--crimson)] text-[var(--bone)] py-32 lg:py-48 px-6 lg:px-16 overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Script text floating top-left */}
      <p className="absolute top-16 left-[6%] lg:left-[10%] font-script text-[48px] md:text-[64px] text-[var(--aged-gold)] transform rotate-[-4deg] opacity-90 z-20 hidden md:block">
        the standard is uncompromising
      </p>

      <div className="absolute bottom-16 right-[15%] w-[180px] aspect-square opacity-80 border-2 border-[rgba(242,239,233,0.2)] rotate-[4deg] hidden md:block">
        <Image 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
          alt="Abstract 2"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute top-1/3 right-[8%] w-[100px] aspect-[4/5] opacity-60 border border-[rgba(242,239,233,0.2)] rotate-[-12deg] hidden lg:block">
        <Image 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80"
          alt="Abstract 3"
          fill
          className="object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        <h2 className="font-serif text-[48px] md:text-[72px] lg:text-[84px] leading-[1.05] tracking-tight font-normal mb-8 uppercase">
          A CURATED COLLECTIVE<br />
          FOR THOSE WHO REFUSE<br />
          <span className="italic font-medium text-[var(--aged-gold)]">TO COMPROMISE</span><br />
          ON CRAFT.
        </h2>
        
        <p className="font-sans text-[17px] md:text-[19px] text-[rgba(242,239,233,0.75)] max-w-2xl leading-relaxed text-balance">
          Elevate your execution standard. We curate the exact minds necessary to build the projects you envision, ensuring the output remains flawless.
        </p>

      </div>
    </section>
  );
}
