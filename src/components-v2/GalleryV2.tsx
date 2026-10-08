"use client";

import { useState } from "react";
import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d={direction === "left" ? "M14 5l-7 7 7 7" : "M10 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GalleryV2() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = weddingConfig.gallery;

  function showPreviousImage() {
    setActiveIndex((prev) => (prev === null ? prev : (prev - 1 + images.length) % images.length));
  }

  function showNextImage() {
    setActiveIndex((prev) => (prev === null ? prev : (prev + 1) % images.length));
  }

  return (
    <section
      id="gallery"
      className="flex h-dvh shrink-0 snap-start snap-always flex-col items-center gap-8 overflow-y-auto bg-ivory-soft px-6 py-12"
    >
      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.gallery.title}</h2>
        <p className="text-sm text-charcoal/70">{copyV2.gallery.subtitle}</p>
      </FadeIn>

      <FadeIn className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative aspect-square overflow-hidden rounded-md border border-gold-light/40"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </FadeIn>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 px-6"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
            className="absolute right-6 top-6 z-10 text-2xl text-ivory"
          >
            ×
          </button>

          <button
            type="button"
            aria-label={copyV2.rsvp.prevButton}
            onClick={(e) => {
              e.stopPropagation();
              showPreviousImage();
            }}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 text-ivory transition-colors hover:bg-charcoal/70"
          >
            <ArrowIcon direction="left" />
          </button>

          <button
            type="button"
            aria-label={copyV2.rsvp.nextButton}
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 text-ivory transition-colors hover:bg-charcoal/70"
          >
            <ArrowIcon direction="right" />
          </button>

          <div className="relative aspect-square w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <Image src={images[activeIndex].src} alt={images[activeIndex].alt} fill className="object-contain" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-ivory/20 bg-charcoal/70 px-4 py-1 text-xs tracking-widest text-ivory backdrop-blur">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
