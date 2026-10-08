import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

export function FooterV2() {
  return (
    <footer className="flex h-screen shrink-0 snap-start flex-col items-center justify-center gap-6 overflow-y-auto bg-charcoal px-6 text-center text-ivory">
      <FadeIn className="flex flex-col items-center gap-6">
        <p className="max-w-md text-sm leading-7 text-ivory/80">{copyV2.footer.closing}</p>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.2em] text-ivory/60 uppercase">{copyV2.footer.signature}</p>
          <p className="font-display text-3xl italic">
            {weddingConfig.groom.name} &amp; {weddingConfig.bride.name}
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
