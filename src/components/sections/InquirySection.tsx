"use client";

import { useEffect, useRef, useState } from "react";
import { submitInquiry } from "../../app/actions/inquiry";

export default function InquirySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [messageCharCount, setMessageCharCount] = useState(0);

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
        if (index > 0 && index <= 3) el.classList.add(`stagger-${index}`);
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  async function clientAction(formData: FormData) {
    setStatus("loading");
    
    try {
      const result = await submitInquiry(formData);
      
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-[var(--bone)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Left: Copy */}
        <div className="flex-1 flex flex-col gap-6 observe-me opacity-0">
          <h2 className="font-serif text-[48px] md:text-[64px] font-normal leading-none text-[var(--near-black)]">
            Initiate a Project.
          </h2>
          <p className="font-sans text-[16px] text-[#6B6762] max-w-sm text-balance">
            Detail your vision. We will orchestrate the execution. No lengthy forms. No pitch decks needed upfront.
          </p>
          
          <div className="mt-4 md:mt-8 flex flex-col gap-2">
            <a href="mailto:hello@jediyworks.com" className="font-sans text-[13px] text-[var(--near-black)] underline underline-offset-4 decoration-[var(--warm-gray)] hover:decoration-[var(--crimson)] transition-colors w-fit">
              hello@jediyworks.com
            </a>
            <a href="https://wa.me/6283114977893" target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] text-[var(--near-black)] underline underline-offset-4 decoration-[var(--warm-gray)] hover:decoration-[var(--crimson)] transition-colors w-fit">
              WhatsApp (+62)
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 observe-me opacity-0">
          {status === "success" ? (
            <div className="h-full flex flex-col justify-center items-center text-center py-12 px-6 border border-[var(--warm-gray)] bg-white/50">
              <div className="w-12 h-12 rounded-full border-2 border-[var(--aged-gold)] flex items-center justify-center text-[var(--aged-gold)] mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="font-serif text-[24px] text-[var(--near-black)] mb-2">We'll be in touch.</h3>
              <p className="font-sans text-[14px] text-[#6B6762]">Your message has been sent successfully.</p>
              
              <button 
                onClick={() => {
                  setStatus("idle");
                  setMessageCharCount(0);
                }} 
                className="mt-8 font-sans text-[13px] uppercase tracking-[0.08em] text-[var(--crimson)] border-b border-[var(--crimson)] pb-1"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form action={clientAction} className="flex flex-col gap-6 w-full">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#6B6762] ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  placeholder="you@company.com"
                  className="input-field"
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#6B6762] ml-1">Project Need</label>
                <div className="relative">
                  <select 
                    id="category" 
                    name="category"
                    required
                    className="input-field appearance-none bg-transparent relative z-10 cursor-pointer"
                    disabled={status === "loading"}
                    defaultValue=""
                  >
                    <option value="" disabled>Select an area</option>
                    <option value="technology">Technology & Engineering</option>
                    <option value="creative_visual">Creative & Visual Identity</option>
                    <option value="audio_post">Audio & Post-Production</option>
                    <option value="multiple">Multiple Areas</option>
                    <option value="other">Something else</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label htmlFor="message" className="font-sans text-[11px] uppercase tracking-[0.08em] text-[#6B6762] ml-1">Message</label>
                  <span className={`font-sans text-[11px] ${messageCharCount > 300 ? 'text-[var(--crimson)]' : 'text-[#6B6762]'}`}>
                    {messageCharCount} / 300
                  </span>
                </div>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  maxLength={300}
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className="input-field resize-none"
                  onChange={(e) => setMessageCharCount(e.target.value.length)}
                  disabled={status === "loading"}
                />
              </div>

              {status === "error" && (
                <p className="text-[var(--crimson)] text-[13px] font-sans">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button 
                type="submit" 
                className="btn-primary mt-2"
                disabled={status === "loading" || messageCharCount > 300}
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--bone)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
