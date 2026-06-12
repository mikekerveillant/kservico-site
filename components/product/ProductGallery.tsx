"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  emoji: string;
}

export default function ProductGallery({ images, name, emoji }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;
  const thumbs = hasImages ? images : Array(4).fill(null);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="bg-[#F8F8F8] rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
        {hasImages ? (
          <img src={images[active]} alt={name} className="w-full h-full object-contain p-8" />
        ) : (
          <span className="text-[120px]">{emoji}</span>
        )}
        {thumbs.length > 1 && (
          <>
            <button
              onClick={() => setActive((i) => (i - 1 + thumbs.length) % thumbs.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 border border-[#EFEFEF] rounded-full w-9 h-9 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActive((i) => (i + 1) % thumbs.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 border border-[#EFEFEF] rounded-full w-9 h-9 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {thumbs.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`aspect-square bg-[#F8F8F8] rounded-xl flex items-center justify-center border-2 transition-all overflow-hidden ${
              active === i ? "border-[#C8102E]" : "border-transparent hover:border-[#DEDEDE]"
            }`}
          >
            {img ? (
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-[28px] opacity-50">{emoji}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
