import Image from "next/image";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";

export function Footer() {
  return (
    <footer className="relative flex h-screen flex-col items-center justify-end gap-6 overflow-hidden bg-charcoal px-6 pb-16 text-center text-ivory">
      <Image src="/footer/BUD08632.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/80 via-charcoal/60 to-charcoal/85" />

      <div className="relative flex w-full max-w-md flex-col items-center gap-6">
        <FadeIn>
          <p className="text-sm leading-7 text-ivory/80">{copy.footer.closing}</p>
        </FadeIn>
        <FadeIn>
          <p className="text-xs tracking-[0.2em] text-gold-light uppercase">
            {copy.footer.thankYou}
          </p>
        </FadeIn>
        <FadeIn className="mt-2 flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.2em] text-ivory/60 uppercase">
            {copy.footer.signature}
          </p>
          <p className="font-display text-3xl italic">
            {weddingConfig.groom.name} &amp; {weddingConfig.bride.name}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
