import Image from "next/image";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";

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

function PersonCard({
  label,
  person,
  align,
}: {
  label: string;
  person: Person;
  align: "left" | "right";
}) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className={`font-display text-2xl italic text-gold ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {label}
      </p>
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-gold/60">
        <Image
          src={person.photo}
          alt={person.fullName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-linear-to-t from-charcoal/90 via-charcoal/50 to-transparent px-4 pb-5 pt-12 text-center">
          <p className="font-display text-xl italic text-gold-light">{person.fullName}</p>
          <p className="text-xs text-ivory/80">{person.parents}</p>
          <a
            href={person.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-ivory/50 text-ivory transition-colors hover:bg-ivory/10"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Couple() {
  return (
    <section className="flex flex-col items-center gap-10 px-6 py-20">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">
        <FadeIn>
          <PersonCard label={copy.couple.groomLabel} person={weddingConfig.groom} align="left" />
        </FadeIn>
        <FadeIn>
          <PersonCard label={copy.couple.brideLabel} person={weddingConfig.bride} align="right" />
        </FadeIn>
      </div>
    </section>
  );
}
