"use client";

import { useState, useEffect } from "react";

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show ShareBar after scrolling down a bit, hide near bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      // Show after 300px, hide if near bottom (footer)
      if (scrollY > 300 && scrollY < docHeight - winHeight - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 transform
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <button
        onClick={handleCopy}
        className="flex items-center gap-3 bg-[var(--crimson)] text-[var(--bone)] px-6 py-3 rounded-full font-sans text-[13px] font-medium tracking-wide shadow-xl border border-[rgba(242,239,233,0.1)] hover:bg-[var(--crimson)] hover:scale-105 transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        {copied ? "Copied ✓" : "Copy Link"}
      </button>
    </div>
  );
}
