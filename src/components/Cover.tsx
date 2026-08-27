import Image from "next/image";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";

export function Cover({
  guestName,
  opened,
  onOpen,
}: {
  guestName: string;
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      aria-hidden={opened}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-charcoal transition-all duration-1000 ease-in-out ${
        opened ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-between overflow-y-auto overflow-x-hidden text-ivory lg:max-w-[50vw] lg:shadow-2xl">
        <Image
          src="/cover/cover.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />

        <div className="relative flex flex-1 flex-col items-center justify-start gap-6 px-6 pt-8 pb-4 text-center sm:pt-10">
          <p className="text-xs tracking-[0.4em] text-gold-light uppercase">
            {copy.cover.kicker}
          </p>
          <h1 className="font-display text-4xl italic leading-tight text-ivory sm:text-5xl">
            {weddingConfig.groom.name}
            <span className="mx-3 not-italic text-gold-light">&amp;</span>
            {weddingConfig.bride.name}
          </h1>
          <p className="mt-1 text-xs tracking-[0.3em] text-ivory/70 uppercase">
            {weddingConfig.event.dateLabel}
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-4 px-6 pb-6 text-center sm:pb-8">
          <p className="text-sm font-semibold tracking-[0.3em] text-ivory uppercase">
            {copy.cover.to}
          </p>
          <div className="w-full max-w-xs rounded-2xl bg-ivory-soft px-6 py-5 shadow-sm">
            <p className="font-display text-xl italic leading-relaxed text-charcoal sm:text-2xl">
              {guestName}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="mt-4 rounded-full border border-ivory/70 bg-ivory/10 px-8 py-3 text-sm tracking-[0.2em] uppercase text-ivory transition-colors hover:bg-ivory/20"
          >
            {copy.cover.openButton}
          </button>
        </div>
      </div>
    </div>
  );
}
