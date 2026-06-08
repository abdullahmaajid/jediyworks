"use client";

import Image from "next/image";

interface GalleryImage {
  url: string;
  alt: string;
}

interface AsymmetricalGalleryProps {
  images: GalleryImage[];
}

export default function AsymmetricalGallery({ images }: AsymmetricalGalleryProps) {
  if (!images || images.length === 0) return null;

  // Helper for the hover/image styles to keep code DRY
  const ImageBox = ({ img, className, sizes }: { img: GalleryImage, className: string, sizes: string }) => (
    <div className={`relative bg-[var(--warm-gray)] overflow-hidden group cursor-pointer fade-up-enter ${className}`}>
      <Image
        src={img.url}
        alt={img.alt}
        fill
        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        sizes={sizes}
      />
      {/* Dark gradient overlay on hover for premium feel */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700 pointer-events-none" />
      
      {/* Elegant Caption */}
      <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        <span className="bg-[var(--bone)] text-[var(--near-black)] px-3 py-1 font-sans text-[11px] uppercase tracking-[0.1em]">
          {img.alt}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full gap-y-16 md:gap-y-32">
      
      {/* 1. THE STATEMENT (Full Bleed) */}
      {images[0] && (
        <div className="w-[100vw] relative left-1/2 -translate-x-1/2">
          <ImageBox 
            img={images[0]} 
            className="w-full aspect-[16/9] md:aspect-[21/9]" 
            sizes="100vw" 
          />
        </div>
      )}

      {/* 2 & 3. THE DIALOGUE (Top-aligned asymmetrical split) */}
      {(images[1] || images[2]) && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          {images[1] && (
            <div className="md:col-span-5 w-full">
              <ImageBox 
                img={images[1]} 
                className="w-full aspect-[4/5]" 
                sizes="(max-width: 768px) 100vw, 40vw" 
              />
            </div>
          )}
          {images[2] && (
            <div className="md:col-start-7 md:col-span-6 w-full pt-8 md:pt-0">
              <ImageBox 
                img={images[2]} 
                className="w-full aspect-[4/3] md:aspect-[3/2]" 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
            </div>
          )}
        </div>
      )}

      {/* 4. THE ISOLATION (Centered focus with massive whitespace) */}
      {images[3] && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-start-4 md:col-span-6 w-full">
            <ImageBox 
              img={images[3]} 
              className="w-full aspect-square md:aspect-[4/5]" 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </div>
        </div>
      )}

      {/* 5. THE STABILIZER (Standard wide closer) */}
      {images[4] && (
        <div className="w-full max-w-7xl mx-auto">
          <ImageBox 
            img={images[4]} 
            className="w-full aspect-[16/9] md:aspect-[16/7]" 
            sizes="(max-width: 768px) 100vw, 90vw" 
          />
        </div>
      )}

      {/* Fallback for any extra images > 5 */}
      {images.length > 5 && (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-16">
          {images.slice(5).map((img, idx) => (
            <ImageBox 
              key={idx + 5} 
              img={img} 
              className="w-full aspect-video" 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          ))}
        </div>
      )}

    </div>
  );
}
