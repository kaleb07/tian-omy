import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";
import { scriptFont } from "./fonts";

export function HomeV2() {
  return (
    <section id="home" className="relative flex h-screen shrink-0 snap-start flex-col items-center justify-center gap-8 overflow-y-auto px-6 py-20 text-center">
      <Image src="/hero/BUD08507.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/75 via-charcoal/55 to-charcoal/80" />

      <FadeIn className="relative flex flex-col items-center gap-2">
        <p className="text-[11px] tracking-[0.4em] text-ivory/80 uppercase">
          {copyV2.cover.kicker}
        </p>
        <div className={`${scriptFont.className} leading-[0.8] text-ivory`}>
          <p className="text-5xl sm:text-6xl">{weddingConfig.groom.name}</p>
          <p className="-mt-2 text-2xl text-gold-light sm:text-3xl">&amp;</p>
          <p className="-mt-2 text-5xl sm:text-6xl">{weddingConfig.bride.name}</p>
        </div>
        <p className="mt-2 text-xs tracking-[0.3em] text-ivory/70 uppercase">
          {weddingConfig.ceremony.dateLabel}
        </p>
      </FadeIn>

      <FadeIn className="relative flex max-w-md flex-col items-center gap-2">
        <p className="font-display text-lg italic leading-7 text-ivory/80">
          {copyV2.home.quote}
        </p>
        <p className="text-xs tracking-widest text-gold-light uppercase">
          {copyV2.home.quoteSource}
        </p>
      </FadeIn>
    </section>
  );
}
