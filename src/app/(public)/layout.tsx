"use client";

import { usePathname } from "next/navigation";
import TopNavbar from "../../components/layout/TopNavbar";
import MobileNav from "../../components/layout/MobileNav";
import Footer from "../../components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showFooter = true; // Footer visible on all pages

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--bone)] w-full overflow-x-hidden">
      
      {/* Navigation */}
      <TopNavbar />
      <MobileNav />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full">
        <div className="flex-grow">{children}</div>
        {showFooter && <Footer />}
      </main>
    </div>
  );
}