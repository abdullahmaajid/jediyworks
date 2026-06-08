"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function TopNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Jakarta', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  const isDarkPage = 
    pathname === "/" || 
    (pathname.startsWith("/portofolio/") && pathname !== "/portofolio") ||
    (pathname.startsWith("/circle/") && pathname !== "/circle");
  const isTransparent = isDarkPage && !scrolled;

  const navLinks = [
    { name: "Work", href: "/portofolio" },
    { name: "Circle", href: "/circle" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 hidden lg:flex justify-center px-6 lg:px-16 ${
        isTransparent ? "bg-transparent py-8" : "bg-[var(--bone)]/90 backdrop-blur-md border-b border-[var(--warm-gray)] py-5"
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        
        {/* Left: Menu Links */}
        <div className="flex-1 flex justify-start items-center">
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative text-[11px] uppercase tracking-[0.15em] transition-all duration-300 font-sans font-medium
                    ${
                      isActive
                        ? (isTransparent ? "text-[var(--bone)]" : "text-[var(--crimson)]")
                        : (isTransparent ? "text-[rgba(242,239,233,0.5)] hover:text-[var(--bone)]" : "text-[#6B6762] hover:text-[var(--near-black)]")
                    }
                  `}
                >
                  {link.name}
                  {isActive && (
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isTransparent ? 'bg-[var(--bone)]' : 'bg-[var(--crimson)]'}`}></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0 flex justify-center items-center">
          <Link href="/" className={`transition-colors duration-300 ${isTransparent ? 'text-[var(--bone)]' : 'text-[var(--crimson)]'}`}>
            <svg className="h-[22px] w-auto" viewBox="0 0 2000 811" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1407.01 398.43C1425.98 618.428 1643.3 636.285 1749.17 532.456C1793.92 488.577 1847.11 427.022 1853.09 433.008C1864.78 444.714 1994.06 574.182 1999.11 579.41C2002.54 582.97 1999.33 584.168 1929.08 656.064C1656.41 935.139 1305.74 799.22 1214.43 544.753C1205.46 519.746 1206.49 512.801 1201.19 518.121C1064.26 655.78 1001.27 721.915 996.615 717.401C922.424 645.365 795.006 509.887 792.221 518.263C787.795 531.569 750.913 685.898 585.912 767.048C445.913 835.903 250.273 825.382 96.0427 679.182C86.519 670.156 0.244714 583.713 0.00380667 580.908C-0.37219 576.51 27.0463 552.325 108.626 470.189C139.33 439.276 149.157 426.891 155.315 433.105C220.324 498.688 314.139 627.957 457.566 584.224C558.187 553.545 672.098 393.914 519.739 239.771C512.739 232.69 432.794 151.808 432.609 150.923C431.897 147.519 581.017 -4.37232 585.88 0.358032C619.204 32.7613 616.912 34.7561 996.27 411.653C1001.69 417.043 1003.66 411.527 1207.31 208.977C1415.65 1.77645 1416.43 -3.47399 1420.79 0.812821C1432.8 12.6038 1568.44 145.83 1568.29 150.784C1568.16 154.861 1468.14 249.763 1449.62 273.205C1413.36 319.12 1407.86 387.882 1407.01 398.43Z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        {/* Right: Functional Elements & CTA */}
        <div className="flex-1 flex justify-end items-center gap-8">
          
          {/* Metadata Block */}
          <div className={`hidden xl:flex flex-col items-end gap-1 font-sans text-[10px] uppercase tracking-[0.15em] ${isTransparent ? 'text-[rgba(242,239,233,0.5)]' : 'text-[#6B6762]'}`}>
            <span className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isTransparent ? 'bg-[var(--bone)]' : 'bg-[var(--crimson)]'} opacity-80 animate-pulse`}></span>
              Accepting Projects
            </span>
            <span>JKT — {time || "..."}</span>
          </div>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className={`
              flex items-center justify-center px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300
              ${isTransparent 
                ? "bg-transparent border border-[var(--bone)] text-[var(--bone)] hover:bg-[var(--bone)] hover:text-[var(--near-black)]" 
                : "bg-[var(--crimson)] border border-[var(--crimson)] text-[var(--bone)] hover:bg-[var(--oxblood)] hover:border-[var(--oxblood)]"
              }
            `}
          >
            Start Project
          </Link>
        </div>

      </div>
    </header>
  );
}
