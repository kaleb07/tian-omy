"use client";

import Image from "next/image";
import { copy } from "@/lib/copy";
import { weddingConfig, type EventDetail } from "@/lib/config";
import { useCountdown } from "@/lib/useCountdown";
import { FadeIn } from "./FadeIn";

function formatShortDate(iso: string) {
  const [datePart] = iso.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day} . ${month} . ${year}`;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center justify-center gap-1 rounded-lg border border-gold-light/40 bg-ivory-soft px-3 py-4 shadow-sm sm:w-20 sm:py-5">
      <span
        className="font-display text-3xl text-charcoal sm:text-4xl"
        suppressHydrationWarning
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-[0.2em] text-charcoal/60 uppercase">
        {label}
      </span>
    </div>
  );
}

function EventCard({ event }: { event: EventDetail }) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-2 rounded-lg border border-gold-light/50 bg-ivory px-8 py-6 text-center lg:gap-1.5 lg:py-5">
      <p className="text-xs tracking-[0.3em] text-gold uppercase">{event.label}</p>
      <p className="font-display text-xl text-charcoal">{event.dateLabel}</p>
      <p className="text-sm text-charcoal/70">{event.timeLabel}</p>
      <div className="mt-1 h-px w-10 bg-gold-light" />
      <p className="mt-1 text-sm font-medium text-charcoal">{event.venueName}</p>
      <p className="max-w-xs text-sm text-charcoal/70">{event.venueAddress}</p>
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 rounded-full border border-gold px-6 py-2 text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-ivory"
      >
        {copy.event.mapButton}
      </a>
    </div>
  );
}

export function EventDetails() {
  const timeLeft = useCountdown(weddingConfig.weddingDateISO);

  return (
    <section className="flex flex-col lg:h-screen lg:flex-row">
      <div className="relative h-72 w-full sm:h-96 lg:h-full lg:w-1/2">
        <Image src="/eventDetails/BUD08507.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-8 overflow-hidden bg-[#F4ECEA] px-6 py-12 lg:h-full lg:w-1/2 lg:gap-6 lg:py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl italic text-charcoal">{copy.event.title}</h2>
          </FadeIn>
          <FadeIn>
            <p className="max-w-md text-sm text-charcoal/70">{copy.event.subtitle}</p>
          </FadeIn>
        </div>

        <div className="flex flex-col items-center gap-4 lg:gap-3">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              {copy.event.countdownTitle}
            </p>
          </FadeIn>
          <FadeIn>
            <p className="font-display text-4xl text-charcoal sm:text-5xl">
              {formatShortDate(weddingConfig.weddingDateISO)}
            </p>
          </FadeIn>
          <FadeIn className="flex gap-3 sm:gap-4">
            <CountdownBox value={timeLeft.days} label={copy.event.days} />
            <CountdownBox value={timeLeft.hours} label={copy.event.hours} />
            <CountdownBox value={timeLeft.minutes} label={copy.event.minutes} />
            <CountdownBox value={timeLeft.seconds} label={copy.event.seconds} />
          </FadeIn>
        </div>

        <FadeIn>
          <EventCard event={weddingConfig.event} />
        </FadeIn>
      </div>
    </section>
  );
}
