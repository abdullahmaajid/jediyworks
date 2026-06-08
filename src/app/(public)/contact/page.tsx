import InquirySection from "../../../components/sections/InquirySection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Drop your brief. Let's talk about what you're building.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--bone)] min-h-[90vh] flex flex-col">

      {/* ── Page Hero ───────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 lg:px-16 border-b border-[var(--warm-gray)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-4 fade-up-enter">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--aged-gold)]">
              Get In Touch
            </span>
            <h1 className="font-serif text-[48px] md:text-[72px] font-normal leading-none text-[var(--near-black)]">
              Let&apos;s Build<br />Something.
            </h1>
            <p className="font-sans text-[14px] text-[#6B6762] max-w-md">
              Have a vision that demands absolute excellence? Drop your brief below — no pitch decks needed.
            </p>
          </div>

          {/* Quick contact info — right side */}
          <div className="flex flex-col gap-3 shrink-0 fade-up-enter stagger-1">
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#6B6762]">Email</span>
              <a href="mailto:hello@jediyworks.com" className="font-sans text-[14px] text-[var(--near-black)] hover:text-[var(--crimson)] transition-colors">
                hello@jediyworks.com
              </a>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#6B6762]">WhatsApp</span>
              <a href="https://wa.me/6283114977893" target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] text-[var(--near-black)] hover:text-[var(--crimson)] transition-colors">
                +62 831 1497 7893
              </a>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#6B6762]">Based In</span>
              <span className="font-sans text-[14px] text-[var(--near-black)]">
                Yogyakarta, Indonesia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form Section ────────────────────────────────────── */}
      <InquirySection />

      {/* ── Bottom Navigation ───────────────────────────────── */}
      <section className="px-6 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto border-t border-[var(--warm-gray)] pt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-sans text-[14px] text-[#6B6762]">
            Not ready for a project? Browse our work first.
          </p>
          <div className="flex gap-4">
            <Link
              href="/portofolio"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--near-black)] border border-[var(--warm-gray)] px-6 py-3 hover:border-[var(--near-black)] hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-300"
            >
              View Work
            </Link>
            <Link
              href="/circle"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-[var(--near-black)] border border-[var(--warm-gray)] px-6 py-3 hover:border-[var(--near-black)] hover:bg-[var(--near-black)] hover:text-[var(--bone)] transition-all duration-300"
            >
              Meet the Circle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}