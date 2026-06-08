"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[var(--crimson)] pt-28 pb-8 border-t border-[rgba(242,239,233,0.08)] text-[var(--bone)] px-6 lg:px-16 relative overflow-hidden">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 relative z-10">
        
        {/* Brand & Identity */}
        <div className="flex flex-col gap-8 md:col-span-12 lg:col-span-5">
          <Link 
            href="/" 
            className="text-[var(--bone)] hover:text-[var(--aged-gold)] transition-colors duration-500 w-fit"
            aria-label="Jediyworks Homepage"
          >
            <svg 
              className="h-[32px] w-auto transition-transform duration-500 hover:scale-105" 
              viewBox="0 0 2000 811" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M1407.01 398.43C1425.98 618.428 1643.3 636.285 1749.17 532.456C1793.92 488.577 1847.11 427.022 1853.09 433.008C1864.78 444.714 1994.06 574.182 1999.11 579.41C2002.54 582.97 1999.33 584.168 1929.08 656.064C1656.41 935.139 1305.74 799.22 1214.43 544.753C1205.46 519.746 1206.49 512.801 1201.19 518.121C1064.26 655.78 1001.27 721.915 996.615 717.401C922.424 645.365 795.006 509.887 792.221 518.263C787.795 531.569 750.913 685.898 585.912 767.048C445.913 835.903 250.273 825.382 96.0427 679.182C86.519 670.156 0.244714 583.713 0.00380667 580.908C-0.37219 576.51 27.0463 552.325 108.626 470.189C139.33 439.276 149.157 426.891 155.315 433.105C220.324 498.688 314.139 627.957 457.566 584.224C558.187 553.545 672.098 393.914 519.739 239.771C512.739 232.69 432.794 151.808 432.609 150.923C431.897 147.519 581.017 -4.37232 585.88 0.358032C619.204 32.7613 616.912 34.7561 996.27 411.653C1001.69 417.043 1003.66 411.527 1207.31 208.977C1415.65 1.77645 1416.43 -3.47399 1420.79 0.812821C1432.8 12.6038 1568.44 145.83 1568.29 150.784C1568.16 154.861 1468.14 249.763 1449.62 273.205C1413.36 319.12 1407.86 387.882 1407.01 398.43Z" fill="currentColor"/>
            </svg>
          </Link>
          <p className="text-[14px] font-sans text-[var(--bone-dim)] max-w-sm leading-relaxed tracking-wide">
            A creative circle for technology, visual, and audio — curated for what your project actually needs. Built by one, executed by many.
          </p>
        </div>

        {/* Spacer for wider desktop grid layout */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* Navigation */}
        <div className="flex flex-col gap-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--aged-gold)] mb-3 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-[1px] bg-[var(--aged-gold)] opacity-60" />
            Menu
          </h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link 
                href="/portofolio" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">Work</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/circle" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">Circle</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">About</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">Contact</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Inquiries */}
        <div className="flex flex-col gap-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--aged-gold)] mb-3 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-[1px] bg-[var(--aged-gold)] opacity-60" />
            Inquiries
          </h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a 
                href="mailto:hello@jediyworks.com" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">hello@jediyworks.com</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </a>
            </li>
            <li>
              <a 
                href="https://wa.me/6283114977893" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">WhatsApp</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--aged-gold)] mb-3 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-[1px] bg-[var(--aged-gold)] opacity-60" />
            Socials
          </h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a 
                href="https://instagram.com/jediyworks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">Instagram</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </a>
            </li>
            <li>
              <a 
                href="https://youtube.com/@jediyworks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">YouTube</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </a>
            </li>
            <li>
              <a 
                href="https://linkedin.com/company/jediyworks" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-2 text-[14px] font-sans text-[rgba(242,239,233,0.7)] hover:text-[var(--bone)] transition-all duration-300 w-fit"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">LinkedIn</span>
                <span className="inline-block transform opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] text-[var(--aged-gold)]">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-[rgba(242,239,233,0.05)] mt-12 pt-16 relative z-10">
        {/* Massive Typography */}
        <div className="w-full flex justify-center overflow-hidden mb-8 select-none pointer-events-none">
          <h2 className="font-serif text-[13vw] xl:text-[150px] leading-none tracking-[0.08em] uppercase text-[rgba(242,239,233,0.06)] select-none pointer-events-none whitespace-nowrap">
            JEDIYWORKS
          </h2>
        </div>
        
        {/* Copyright & Location & Back to Top */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[11px] tracking-widest text-[rgba(242,239,233,0.45)] font-sans uppercase">
            © {new Date().getFullYear()} JEDIYWORKS. All rights reserved.
          </p>

          <p className="text-[11px] tracking-widest text-[rgba(242,239,233,0.45)] font-sans uppercase flex items-center gap-2 justify-center">
            Based in Yogyakarta, Indonesia
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--aged-gold)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--aged-gold)]"></span>
            </span>
          </p>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[11px] tracking-widest uppercase text-[rgba(242,239,233,0.5)] hover:text-[var(--aged-gold)] transition-colors duration-300"
            aria-label="Scroll to top of the page"
          >
            <span>Back to Top</span>
            <span className="w-5 h-5 rounded-full border border-[rgba(242,239,233,0.2)] group-hover:border-[var(--aged-gold)] flex items-center justify-center transition-colors duration-300">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:-translate-y-0.5 transition-transform duration-300">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
