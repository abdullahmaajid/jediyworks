import Link from "next/link";
import Image from "next/image";
import type { Collaborator } from "@prisma/client";

interface CollaboratorCardProps {
  collaborator: Collaborator;
  index?: number;
}

export default function CollaboratorCard({ collaborator, index = 0 }: CollaboratorCardProps) {
  return (
    <Link 
      href={`/circle/${collaborator.slug}`}
      className={`group flex flex-col gap-4 opacity-0 fade-up-enter stagger-${(index % 5) + 1}`}
    >
      <div className="relative w-full aspect-[4/5] bg-[var(--warm-gray)] overflow-hidden">
        {collaborator.photoUrl ? (
          <Image
            src={collaborator.photoUrl}
            alt={collaborator.brandingName}
            fill
            className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#E5E2DC] transition-all duration-500">
            <span className="font-serif text-[80px] text-[var(--bone)] opacity-50">
              {collaborator.brandingName.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-[28px] md:text-[32px] font-light text-[var(--near-black)] leading-none tracking-[-0.01em]">
            {collaborator.brandingName}
          </h3>
          <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--aged-gold)]">
            ↗
          </div>
        </div>
        
        {collaborator.defaultRole && (
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--aged-gold)] font-medium mt-1">
            {collaborator.defaultRole}
          </p>
        )}
        
        {collaborator.positionLine && (
          <p className="font-serif italic text-[14px] text-[#6B6762] leading-tight mt-1">
            {collaborator.positionLine}
          </p>
        )}
      </div>
    </Link>
  );
}
