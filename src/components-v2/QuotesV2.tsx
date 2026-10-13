"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";
import { useSectionInView } from "./useSectionInView";

const BACKGROUND_IMAGE_INTERVAL_MS = 6000;

export function QuotesV2() {
  const [activeImage, setActiveImage] = useState(0);
  const [cycle, setCycle] = useState(0);
  const { ref, inView } = useSectionInView<HTMLElement>();

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % weddingConfig.backgroundImages.length);
      setCycle((c) => c + 1);
    }, BACKGROUND_IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="quotes"
      ref={ref}
      className="h-dvh shrink-0 snap-start snap-always overflow-hidden"
    >
      <div
        className={`fixed inset-y-0 right-0 w-full -z-10 transition-opacity duration-500 min-[1025px]:w-125 ${inView ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        {weddingConfig.backgroundImages.map((src, index) => {
          const isActive = index === activeImage;
          return (
            <Image
              key={isActive ? `${src}-${cycle}` : src}
              src={src}
              alt=""
              fill
              className={`object-cover grayscale ${isActive ? "opacity-100" : "opacity-0"}`}
              style={{
                transition: "opacity 1500ms ease-in-out",
                animation: isActive
                  ? `hero-zoom-out ${BACKGROUND_IMAGE_INTERVAL_MS}ms linear forwards`
                  : "none",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between overflow-y-auto px-6 pt-16 pb-16 text-center text-ivory">
        <FadeIn>
          <h2 className="font-display text-3xl italic text-ivory">{copyV2.quotes.title}</h2>
        </FadeIn>

        <FadeIn className="flex flex-col items-center gap-6">
          <div className="flex max-w-md flex-col items-center gap-2">
            <p className="font-display text-lg italic leading-7 text-ivory/80">
              {copyV2.quotes.verses[0].quote}
            </p>
            <p className="text-xs tracking-widest text-gold-light uppercase">
              {copyV2.quotes.verses[0].source}
            </p>
          </div>
          <div className="flex max-w-md flex-col items-center gap-2">
            <p className="font-display text-lg italic leading-7 text-ivory/80">
              {copyV2.quotes.verses[1].quote}
            </p>
            <p className="text-xs tracking-widest text-gold-light uppercase">
              {copyV2.quotes.verses[1].source}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
