"use client";

import Image from "next/image";
import { weddingConfig } from "@/lib/config";

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-px" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

export function MusicDiscV2({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
      className="fixed right-5 bottom-6 z-40 h-20 w-20 rounded-full shadow-[0_10px_28px_rgba(59,50,44,0.35)]"
    >
      <span
        className={`vinyl-disc absolute inset-0 overflow-hidden rounded-full ${
          isPlaying ? "" : "is-paused"
        }`}
      >
        <span className="absolute inset-[14%] flex overflow-hidden rounded-full ring-1 ring-gold-light/80">
          <span className="relative h-full w-1/2">
            <Image
              src={weddingConfig.groom.photo}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-[center_18%]"
            />
          </span>
          <span className="relative h-full w-1/2">
            <Image
              src={weddingConfig.bride.photo}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-[center_18%]"
            />
          </span>
        </span>
        <span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_2px_#3b322c]" />
      </span>

      {!isPlaying && (
        <span className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-charcoal/35 text-ivory">
          <PlayGlyph />
        </span>
      )}
    </button>
  );
}
