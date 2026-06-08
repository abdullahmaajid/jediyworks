"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Work", href: "/portofolio" },
    { name: "Circle", href: "/circle" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <aside className="fixed top-0 left-0 w-[220px] h-screen bg-[var(--crimson)] flex flex-col justify-between hidden lg:flex border-r border-[rgba(242,239,233,0.08)] z-50">
      <div className="flex flex-col">
        {/* LOGO */}
        <div className="p-8 pb-10 border-b border-[rgba(242,239,233,0.08)]">
          <Link href="/">
            <svg className="h-[20px] w-auto text-[var(--bone)]" viewBox="0 0 2000 811" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1407.01 398.43C1425.98 618.428 1643.3 636.285 1749.17 532.456C1793.92 488.577 1847.11 427.022 1853.09 433.008C1864.78 444.714 1994.06 574.182 1999.11 579.41C2002.54 582.97 1999.33 584.168 1929.08 656.064C1656.41 935.139 1305.74 799.22 1214.43 544.753C1205.46 519.746 1206.49 512.801 1201.19 518.121C1064.26 655.78 1001.27 721.915 996.615 717.401C922.424 645.365 795.006 509.887 792.221 518.263C787.795 531.569 750.913 685.898 585.912 767.048C445.913 835.903 250.273 825.382 96.0427 679.182C86.519 670.156 0.244714 583.713 0.00380667 580.908C-0.37219 576.51 27.0463 552.325 108.626 470.189C139.33 439.276 149.157 426.891 155.315 433.105C220.324 498.688 314.139 627.957 457.566 584.224C558.187 553.545 672.098 393.914 519.739 239.771C512.739 232.69 432.794 151.808 432.609 150.923C431.897 147.519 581.017 -4.37232 585.88 0.358032C619.204 32.7613 616.912 34.7561 996.27 411.653C1001.69 417.043 1003.66 411.527 1207.31 208.977C1415.65 1.77645 1416.43 -3.47399 1420.79 0.812821C1432.8 12.6038 1568.44 145.83 1568.29 150.784C1568.16 154.861 1468.14 249.763 1449.62 273.205C1413.36 319.12 1407.86 387.882 1407.01 398.43Z" fill="currentColor"/>
            </svg>
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col py-6 relative">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  relative px-8 py-3 text-[13px] uppercase tracking-[0.06em] transition-all duration-150 font-sans font-medium
                  ${
                    isActive
                      ? "text-[var(--bone)] border-l-2 border-[var(--aged-gold)]"
                      : "text-[rgba(242,239,233,0.45)] border-l-2 border-transparent hover:text-[rgba(242,239,233,0.85)]"
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FOOTER & SOCIALS */}
      <div className="p-8 pt-6 border-t border-[rgba(242,239,233,0.08)] flex flex-col gap-6">
        <div className="flex gap-4">
          <a
            href="https://instagram.com/jediyworks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(242,239,233,0.45)] hover:text-[var(--bone)] transition-colors"
            aria-label="Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://wa.me/6283114977893"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(242,239,233,0.45)] hover:text-[var(--bone)] transition-colors"
            aria-label="WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
        </div>
        
        <div className="flex flex-col gap-1">
          <p className="text-[11px] text-[rgba(242,239,233,0.3)] font-sans">
            © {new Date().getFullYear()} JEDIYWORKS
          </p>
          <p className="text-[11px] text-[rgba(242,239,233,0.3)] font-sans">
            Based in Yogyakarta.
          </p>
        </div>
      </div>
    </aside>
  );
}
