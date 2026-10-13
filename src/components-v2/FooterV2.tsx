"use client";

import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

export function FooterV2() {
  const groomFirstName = weddingConfig.groom.fullName.split(" ")[0];
  const brideFirstName = weddingConfig.bride.fullName.split(" ")[0];

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

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end gap-6 overflow-y-auto px-6 pb-16 text-center text-ivory">
        <FadeIn className="flex flex-col items-center gap-6">
          <p className="max-w-md text-sm leading-7 whitespace-pre-line text-ivory/80">
            {copyV2.footer.closing}
          </p>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs tracking-[0.2em] text-ivory/60 uppercase">{copyV2.footer.signature}</p>
            <p className="font-display text-3xl italic">
              {groomFirstName} &amp; {brideFirstName}
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 z-10">
        <div className="flex items-center justify-center bg-ivory px-2 py-1">
          <div className="relative h-4.5 w-16">
            <Image src="/image/logo/logo-public.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
