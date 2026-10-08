"use client";

import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { scriptFont } from "./fonts";

export function CoverV2({
  guestName,
  opened,
  onOpen,
}: {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}) {
  const groomFirstName = weddingConfig.groom.fullName.split(" ")[0];
  const brideFirstName = weddingConfig.bride.fullName.split(" ")[0];

  return (
    <div
      aria-hidden={opened}
      className={`fixed inset-x-0 top-0 z-50 flex h-dvh items-center justify-center overflow-hidden bg-charcoal transition-all duration-1000 ease-in-out ${
        opened ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden px-6 py-10 text-center text-ivory lg:max-w-[50vw] lg:shadow-2xl">
        <Image src="/background/BUD07950.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/80 via-charcoal/55 to-charcoal/85" />

        <div className="relative flex w-full flex-col items-center gap-2">
          <p className="text-[11px] tracking-[0.4em] text-ivory/80 uppercase">
            {copyV2.cover.kicker}
          </p>
          <div className={`${scriptFont.className} leading-[0.8] text-ivory`}>
            <p className="text-5xl sm:text-6xl">{groomFirstName}</p>
            <p className="-mt-2 text-2xl text-gold-light sm:text-3xl">&amp;</p>
            <p className="-mt-2 text-5xl sm:text-6xl">{brideFirstName}</p>
          </div>
          <p className="mt-2 text-xs tracking-[0.3em] text-ivory/70 uppercase">
            {weddingConfig.ceremony.dateLabel}
          </p>
        </div>

        <div className="relative flex-1" />

        <div className="relative flex w-full flex-col items-center gap-3 pb-4">
          <p className="text-xs text-ivory/70">{copyV2.cover.to}</p>
          <p className="font-display text-xl italic text-ivory">{guestName}</p>
          <p className="max-w-xs text-[11px] italic text-ivory/50">
            {copyV2.cover.disclaimer}
          </p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-4 rounded-full border border-ivory/60 px-8 py-3 text-xs tracking-[0.3em] uppercase text-ivory transition-colors hover:bg-ivory/10"
          >
            {copyV2.cover.openButton}
          </button>
        </div>
      </div>
    </div>
  );
}
