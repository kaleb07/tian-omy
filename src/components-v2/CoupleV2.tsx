import Image from "next/image";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

type Person = {
  fullName: string;
  parents: string;
  photo: string;
  instagram: string;
};

function PersonCard({ label, person }: { label: string; person: Person }) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-t-full border border-gold-light/40">
        <Image src={person.photo} alt={person.fullName} fill className="object-cover" />
      </div>
      <p className="text-xs tracking-[0.3em] text-gold uppercase">{label}</p>
      <p className="font-display text-2xl italic text-charcoal">{person.fullName}</p>
      <p className="max-w-xs text-sm text-charcoal/70">{person.parents}</p>
      <a
        href={person.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-light/60 text-gold transition-colors hover:bg-gold hover:text-ivory"
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

export function CoupleV2() {
  return (
    <section
      id="couple"
      className="relative z-10 flex h-dvh shrink-0 snap-start snap-always flex-col items-center justify-start gap-8 overflow-x-hidden overflow-y-auto bg-ivory px-6 py-12 sm:justify-center"
    >
      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.couple.title}</h2>
        <p className="max-w-md text-sm text-charcoal/70">{copyV2.couple.subtitle}</p>
      </FadeIn>

      <div className="flex w-full max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
        <FadeIn>
          <PersonCard label={copyV2.couple.groomLabel} person={weddingConfig.groom} />
        </FadeIn>
        <FadeIn>
          <PersonCard label={copyV2.couple.brideLabel} person={weddingConfig.bride} />
        </FadeIn>
      </div>
    </section>
  );
}
