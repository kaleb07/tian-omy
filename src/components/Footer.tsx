import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-charcoal px-6 py-20 text-center text-ivory">
      <div className="flex flex-col items-center gap-6">
        <FadeIn>
          <p className="max-w-md text-sm leading-7 text-ivory/80">{copy.footer.closing}</p>
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
