"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";

const HERO_IMAGE_INTERVAL_MS = 5000;

export function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % weddingConfig.heroImages.length);
      setCycle((c) => c + 1);
    }, HERO_IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex justify-center bg-charcoal">
      <div className="relative flex h-dvh w-full flex-col items-center justify-between overflow-hidden px-6 py-16 text-center lg:max-w-[80vw]">
        {weddingConfig.heroImages.map((src, index) => {
          const isActive = index === activeImage;
          return (
            <Image
              key={isActive ? `${src}-${cycle}` : src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              className={`object-cover ${isActive ? "opacity-100" : "opacity-0"}`}
              style={{
                transition: "opacity 1200ms ease-in-out",
                animation: isActive
                  ? `hero-zoom-out ${HERO_IMAGE_INTERVAL_MS}ms linear forwards`
                  : "none",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/70 via-charcoal/50 to-charcoal/70" />

        {/* <FadeIn className="relative">
          <p className="text-xs tracking-[0.4em] text-gold-light uppercase">
            {copy.hero.kicker}
          </p>
        </FadeIn> */}

        <FadeIn className="relative">
          <h2 className="font-display text-4xl italic text-ivory sm:text-5xl">
            {weddingConfig.groom.name} &amp; {weddingConfig.bride.name}
          </h2>
        </FadeIn>

        <FadeIn className="relative flex flex-col items-center gap-2">
          <p className="max-w-md font-display text-lg font-bold italic leading-7 text-ivory/80 lg:max-w-xl lg:text-xl lg:leading-9">
            {copy.hero.quote}
          </p>
          <p className="text-xs tracking-widest text-gold-light uppercase">
            {copy.hero.quoteSource}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
