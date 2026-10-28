"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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

export function LoveStoryV2() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const stories = weddingConfig.loveStory;

  function updateActiveIndex() {
    const node = scrollerRef.current;
    if (!node || node.clientWidth === 0) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), stories.length - 1));
  }

  function goTo(index: number) {
    const node = scrollerRef.current;
    if (!node) return;
    const clamped = Math.min(Math.max(index, 0), stories.length - 1);
    node.scrollTo({ left: clamped * node.clientWidth, behavior: "smooth" });
  }

  return (
    <section
      id="love-story"
      className="relative flex h-dvh shrink-0 snap-start snap-always flex-col overflow-hidden bg-ivory"
    >
      <FadeIn className="flex shrink-0 flex-col items-center gap-1 pt-10 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.loveStory.title}</h2>
      </FadeIn>

      <div
        ref={scrollerRef}
        onScroll={updateActiveIndex}
        className="no-scrollbar flex min-h-0 w-full flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
      >
        {stories.map((story) => (
          <div
            key={story.title}
            className="flex h-full w-full shrink-0 snap-start snap-always flex-col items-center justify-center gap-4 px-6 pb-20"
          >
            <FadeIn className="shrink-0 text-center">
              <p className="text-xs tracking-[0.3em] text-gold uppercase">{story.title}</p>
            </FadeIn>

            <FadeIn
              className={`flex w-full max-w-sm shrink-0 gap-3 ${
                story.images.length === 1 ? "justify-center" : ""
              }`}
            >
              {story.images.map((src) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-md border border-gold-light/40 ${
                    story.images.length === 1 ? "aspect-4/3 w-full" : "h-40 flex-1 sm:h-48"
                  }`}
                >
                  <Image
                    src={src}
                    alt={story.title}
                    fill
                    className={story.images.length === 1 ? "object-contain" : "object-cover"}
                  />
                </div>
              ))}
            </FadeIn>

            <FadeIn className="shrink-0">
              <p className="mx-auto max-w-md text-center text-sm leading-6 text-charcoal/70">
                {story.body}
                {story.highlight && (
                  <>
                    {" "}
                    <span className="font-bold italic">{story.highlight}</span>
                  </>
                )}
              </p>
            </FadeIn>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label={copyV2.loveStory.prevButton}
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory text-gold shadow-sm transition-colors hover:bg-gold hover:text-ivory disabled:opacity-30"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="flex items-center gap-2">
          {stories.map((story, index) => (
            <button
              key={story.title}
              type="button"
              aria-label={story.title}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-gold" : "w-2 bg-gold-light/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={copyV2.loveStory.nextButton}
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === stories.length - 1}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory text-gold shadow-sm transition-colors hover:bg-gold hover:text-ivory disabled:opacity-30"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </section>
  );
}
