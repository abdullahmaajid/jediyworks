import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--crimson)] text-[var(--bone)] px-6">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <h2 className="font-serif text-[120px] md:text-[180px] leading-none text-[rgba(242,239,233,0.05)] select-none">
          404
        </h2>
        
        <div className="mt-[-80px] md:mt-[-120px] flex flex-col gap-4 z-10">
          <h3 className="font-sans text-[20px] md:text-[24px] font-medium tracking-wide">
            Not Found
          </h3>
          <p className="font-sans text-[15px] text-[rgba(242,239,233,0.55)] mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="font-sans text-[13px] uppercase tracking-[0.08em] text-[var(--aged-gold)] border-b border-[var(--aged-gold)] pb-1 hover:text-[var(--gold-dim)] transition-colors w-fit mx-auto">
            Return Home →
          </Link>
        </div>
      </div>
    </div>
  )
}
