"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "/portofolio" },
    { name: "Circle", href: "/circle" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-[48px] bg-[var(--bone)] border-b border-[var(--warm-gray)] flex items-center justify-between px-4 z-40">
        <Link href="/">
          <svg className="h-[20px] w-auto text-[var(--near-black)]" viewBox="0 0 2000 811" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1407.01 398.43C1425.98 618.428 1643.3 636.285 1749.17 532.456C1793.92 488.577 1847.11 427.022 1853.09 433.008C1864.78 444.714 1994.06 574.182 1999.11 579.41C2002.54 582.97 1999.33 584.168 1929.08 656.064C1656.41 935.139 1305.74 799.22 1214.43 544.753C1205.46 519.746 1206.49 512.801 1201.19 518.121C1064.26 655.78 1001.27 721.915 996.615 717.401C922.424 645.365 795.006 509.887 792.221 518.263C787.795 531.569 750.913 685.898 585.912 767.048C445.913 835.903 250.273 825.382 96.0427 679.182C86.519 670.156 0.244714 583.713 0.00380667 580.908C-0.37219 576.51 27.0463 552.325 108.626 470.189C139.33 439.276 149.157 426.891 155.315 433.105C220.324 498.688 314.139 627.957 457.566 584.224C558.187 553.545 672.098 393.914 519.739 239.771C512.739 232.69 432.794 151.808 432.609 150.923C431.897 147.519 581.017 -4.37232 585.88 0.358032C619.204 32.7613 616.912 34.7561 996.27 411.653C1001.69 417.043 1003.66 411.527 1207.31 208.977C1415.65 1.77645 1416.43 -3.47399 1420.79 0.812821C1432.8 12.6038 1568.44 145.83 1568.29 150.784C1568.16 154.861 1468.14 249.763 1449.62 273.205C1413.36 319.12 1407.86 387.882 1407.01 398.43Z" fill="currentColor"/>
          </svg>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="text-[var(--near-black)] p-1"
          aria-label="Open Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-[var(--crimson)]/85 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-[80vw] max-w-[300px] bg-[var(--crimson)] z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <div className="h-[48px] border-b border-[rgba(242,239,233,0.08)] flex items-center px-6">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <h1 className="font-serif text-xl text-[var(--bone)]">JEDIYWORKS</h1>
            </Link>
          </div>

          <nav className="flex flex-col py-6">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    px-6 py-4 text-[13px] uppercase tracking-[0.06em] font-sans font-medium
                    ${
                      isActive
                        ? "text-[var(--bone)] border-l-2 border-[var(--aged-gold)] bg-[rgba(242,239,233,0.03)]"
                        : "text-[rgba(242,239,233,0.45)] border-l-2 border-transparent"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-[rgba(242,239,233,0.08)]">
           <div className="flex gap-4 mb-6">
            <a href="https://instagram.com/jediyworks" className="text-[rgba(242,239,233,0.45)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://wa.me/6283114977893" className="text-[rgba(242,239,233,0.45)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
          </div>
          <p className="text-[11px] text-[rgba(242,239,233,0.3)]">© {new Date().getFullYear()} JEDIYWORKS</p>
        </div>
      </aside>
    </>
  );
}
