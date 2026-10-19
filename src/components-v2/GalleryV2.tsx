"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig, type GalleryImage } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

const AUTOSCROLL_PX_PER_SECOND = 40;
const TOUCH_SAFETY_TIMEOUT_MS = 4000;

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

export function GalleryV2({
  onVideoPlay,
  onVideoEnd,
}: {
  onVideoPlay?: () => void;
  onVideoEnd?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchSafetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  function handleTouchStart() {
    pause();
    if (touchSafetyTimeoutRef.current) clearTimeout(touchSafetyTimeoutRef.current);
    // Safety net: some mobile browsers (notably iOS) don't reliably fire
    // touchend on this element when a touch here turns into a vertical page
    // scroll instead of a horizontal swipe — without this, autoscroll would
    // stay paused forever after a single such touch.
    touchSafetyTimeoutRef.current = setTimeout(resume, TOUCH_SAFETY_TIMEOUT_MS);
  }

  function handleTouchEnd() {
    if (touchSafetyTimeoutRef.current) {
      clearTimeout(touchSafetyTimeoutRef.current);
      touchSafetyTimeoutRef.current = null;
    }
    resume();
  }

  function showPreviousImage() {
    setActiveIndex((prev) => (prev === null ? prev : (prev - 1 + images.length) % images.length));
  }

  function showNextImage() {
    setActiveIndex((prev) => (prev === null ? prev : (prev + 1) % images.length));
  }

  return (
    <section
      id="gallery"
      className="flex h-dvh shrink-0 snap-start snap-always flex-col items-center gap-4 overflow-hidden bg-ivory-soft px-6 py-6"
    >
      <FadeIn className="flex shrink-0 flex-col items-center gap-2 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.gallery.title}</h2>
        <p className="text-sm text-charcoal/70">{copyV2.gallery.subtitle}</p>
      </FadeIn>

      <FadeIn className="w-full max-w-sm shrink-0 sm:max-w-xl">
        <div
          ref={scrollerRef}
          onScroll={updateProgress}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
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
                className={`flex h-56 shrink-0 gap-3 sm:h-64 ${
                  isPair ? "w-44 flex-col sm:w-56" : "w-60 sm:w-72"
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
                      sizes="(max-width: 640px) 50vw, 240px"
                    />
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label={copyV2.gallery.prevButton}
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
            aria-label={copyV2.gallery.nextButton}
            onClick={() => scrollByColumn("right")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory text-gold shadow-sm transition-colors hover:bg-gold hover:text-ivory"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </FadeIn>

      <FadeIn className="flex min-h-0 w-full max-w-sm flex-1 flex-col sm:max-w-xl">
        <div className="relative min-h-0 w-full flex-1 max-h-[42dvh] overflow-hidden rounded-md border border-gold-light/40 bg-charcoal sm:max-h-96">
          <video
            src={weddingConfig.galleryVideo}
            controls
            playsInline
            preload="metadata"
            onPlay={onVideoPlay}
            onPause={onVideoEnd}
            onEnded={onVideoEnd}
            className="h-full w-full object-contain"
          />
        </div>
      </FadeIn>

      {activeIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-120 flex items-center justify-center bg-charcoal/90 px-6"
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
              aria-label={copyV2.gallery.prevButton}
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
              aria-label={copyV2.gallery.nextButton}
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/50 text-ivory transition-colors hover:bg-charcoal/70"
            >
              <ArrowIcon direction="right" />
            </button>

            <div className="relative aspect-square w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
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
          </div>,
          document.body,
        )}
    </section>
  );
}
