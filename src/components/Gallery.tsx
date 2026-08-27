"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { copy } from "@/lib/copy";
import { weddingConfig, type GalleryImage } from "@/lib/config";
import { FadeIn } from "./FadeIn";

const AUTOSCROLL_PX_PER_SECOND = 40;

function chunkColumns(images: GalleryImage[]) {
  const columns: GalleryImage[][] = [];
  let i = 0;
  let pair = true;
  while (i < images.length) {
    const size = pair ? 2 : 1;
    columns.push(images.slice(i, i + size));
    i += size;
    pair = !pair;
  }
  return columns;
}

function animateScrollBy(node: HTMLDivElement, delta: number, duration = 400) {
  const start = node.scrollLeft;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.scrollLeft = start + delta * eased;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

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

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const images = weddingConfig.gallery;
  const columns = chunkColumns(images);
  const loopColumns = [...columns, ...columns];

  function updateProgress() {
    const node = scrollerRef.current;
    if (!node) return;
    const half = node.scrollWidth / 2;
    setScrollProgress(half <= 0 ? 0 : (node.scrollLeft % half) / half);
  }

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    let frameId: number;
    let lastTime: number | null = null;

    function step(time: number) {
      if (node && !pausedRef.current && lastTime !== null) {
        const deltaSeconds = (time - lastTime) / 1000;
        const half = node.scrollWidth / 2;
        node.scrollLeft += AUTOSCROLL_PX_PER_SECOND * deltaSeconds;
        if (half > 0 && node.scrollLeft >= half) {
          node.scrollLeft -= half;
        }
        updateProgress();
      }
      lastTime = time;
      frameId = requestAnimationFrame(step);
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [images.length]);

  function scrollByColumn(direction: "left" | "right") {
    const node = scrollerRef.current;
    if (!node) return;

    pause();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(resume, 1500);

    const amount = node.clientWidth * 0.6;
    animateScrollBy(node, direction === "left" ? -amount : amount);
  }

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    pausedRef.current = false;
  }

  function showPreviousImage() {
    setActiveIndex((prev) => (prev === null ? prev : (prev - 1 + images.length) % images.length));
  }

  function showNextImage() {
    setActiveIndex((prev) => (prev === null ? prev : (prev + 1) % images.length));
  }

  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <FadeIn>
          <h2
            className="font-display text-4xl italic text-ivory sm:text-5xl"
            style={{
              textShadow:
                "0 0 6px var(--color-gold), 0 0 10px var(--color-gold), 0 0 18px var(--color-gold), 0 1px 2px var(--color-gold)",
            }}
          >
            {copy.gallery.title}
          </h2>
        </FadeIn>
        <FadeIn>
          <p
            className="text-base text-ivory sm:text-lg"
            style={{
              textShadow:
                "0 0 6px var(--color-gold), 0 0 10px var(--color-gold), 0 0 18px var(--color-gold), 0 1px 2px var(--color-gold)",
            }}
          >
            {copy.gallery.subtitle}
          </p>
        </FadeIn>
      </div>

      <FadeIn className="w-full max-w-5xl">
        <div>
          <div
            ref={scrollerRef}
            onScroll={updateProgress}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
            className="no-scrollbar flex w-full gap-3 overflow-x-auto pb-2"
          >
            {loopColumns.map((column, columnIndex) => {
              const isPair = column.length === 2;
              const originalColumnIndex = columnIndex % columns.length;
              let imageOffset = 0;
              for (let c = 0; c < originalColumnIndex; c += 1) imageOffset += columns[c].length;

              return (
                <div
                  key={`${columnIndex}-${column.map((image) => image.src).join("-")}`}
                  className={`flex h-72 shrink-0 gap-3 sm:h-96 ${
                    isPair ? "w-40 flex-col sm:w-48" : "w-56 sm:w-72"
                  }`}
                >
                  {column.map((image, itemIndex) => (
                    <button
                      key={`${columnIndex}-${image.src}`}
                      type="button"
                      onClick={() => setActiveIndex(imageOffset + itemIndex)}
                      className={`relative overflow-hidden rounded-md border border-gold-light/40 ${
                        isPair ? "flex-1" : "h-full w-full"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 60vw, 320px"
                      />
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Sebelumnya"
              onClick={() => scrollByColumn("left")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory text-gold shadow-sm transition-colors hover:bg-gold hover:text-ivory"
            >
              <ArrowIcon direction="left" />
            </button>

            <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-gold-light/30">
              <div
                className="h-full rounded-full bg-gold"
                style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
              />
            </div>

            <button
              type="button"
              aria-label="Berikutnya"
              onClick={() => scrollByColumn("right")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory text-gold shadow-sm transition-colors hover:bg-gold hover:text-ivory"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </FadeIn>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 px-6">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
            className="absolute right-6 top-6 text-2xl text-ivory"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={showPreviousImage}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 text-ivory transition-colors hover:bg-charcoal/70"
          >
            <ArrowIcon direction="left" />
          </button>

          <button
            type="button"
            aria-label="Berikutnya"
            onClick={showNextImage}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 text-ivory transition-colors hover:bg-charcoal/70"
          >
            <ArrowIcon direction="right" />
          </button>

          <div className="relative aspect-square w-full max-w-lg">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-ivory/20 bg-charcoal/70 px-4 py-1 text-xs tracking-widest text-ivory backdrop-blur">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
