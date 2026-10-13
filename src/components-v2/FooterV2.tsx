"use client";

import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

export function FooterV2() {
  return (
    <footer className="relative h-dvh shrink-0 snap-start snap-always overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={weddingConfig.footerBackgroundV2}
          alt=""
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between overflow-y-auto px-6 pt-16 pb-16 text-center text-ivory">
        <FadeIn>
          <p className="max-w-md text-base leading-8 text-ivory/80">
            {copyV2.footer.gratitude.map((part, index) =>
              part.highlight ? (
                <span key={index} className="font-display text-xl font-bold text-ivory">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </p>
        </FadeIn>

        <FadeIn className="flex flex-col items-center gap-6">
          <p className="max-w-md text-sm leading-7 text-ivory/80">{copyV2.footer.closing}</p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs tracking-[0.2em] text-ivory/60 uppercase">{copyV2.footer.signature}</p>
            <p className="font-display text-3xl italic">
              {weddingConfig.groom.name} &amp; {weddingConfig.bride.name}
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
