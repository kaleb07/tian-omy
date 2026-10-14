"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig, type EventDetail } from "@/lib/config";
import { useCountdown } from "@/lib/useCountdown";
import { FadeIn } from "@/components/FadeIn";
import { useSectionInView } from "./useSectionInView";

const BACKGROUND_IMAGE_INTERVAL_MS = 6000;

function buildStartIso(baseIso: string, timeLabel: string) {
  const match = timeLabel.match(/(\d{1,2})[.:](\d{2})/);
  if (!match) return baseIso;
  const [, hh, mm] = match;
  const datePart = baseIso.split("T")[0];
  const offsetMatch = baseIso.match(/([+-]\d{2}:\d{2})$/);
  const offset = offsetMatch ? offsetMatch[1] : "+00:00";
  return `${datePart}T${hh.padStart(2, "0")}:${mm}:00${offset}`;
}

function toGoogleCalendarStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildCalendarUrl(event: EventDetail, startIso: string) {
  const endDate = new Date(startIso);
  endDate.setHours(endDate.getHours() + 2);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.label} - ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
    dates: `${toGoogleCalendarStamp(startIso)}/${toGoogleCalendarStamp(endDate.toISOString())}`,
    location: `${event.venueName}, ${event.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatShortDate(iso: string) {
  const [datePart] = iso.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day} . ${month} . ${year}`;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center justify-center gap-1 rounded-lg border border-gold-light/40 bg-ivory px-2 py-3 shadow-sm">
      <span className="font-display text-3xl text-charcoal" suppressHydrationWarning>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-[0.16em] text-charcoal/60 uppercase">{label}</span>
    </div>
  );
}

function EventCard({ event }: { event: EventDetail }) {
  const startIso = buildStartIso(weddingConfig.weddingDateISO, event.timeLabel);

  return (
    <div className="flex h-full min-w-0 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-gold-light/50 bg-ivory px-3 py-4 text-center">
      <p className="text-base font-semibold tracking-widest text-gold uppercase">{event.label}</p>
      <p className="text-xs text-charcoal/70">{event.timeLabel}</p>
      <div className="h-px w-8 bg-gold-light" />
      <p className="text-xs font-medium text-charcoal">{event.venueName}</p>
      <p className="text-[11px] leading-4 text-charcoal/70">{event.venueAddress}</p>
      <div className="mt-1 flex flex-col items-center gap-1.5">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold px-3 py-1.5 text-[10px] tracking-[0.12em] text-gold uppercase transition-colors hover:bg-gold hover:text-ivory"
        >
          {copyV2.event.mapButton}
        </a>
        <a
          href={buildCalendarUrl(event, startIso)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-charcoal/30 px-3 py-1.5 text-[10px] tracking-[0.12em] text-charcoal uppercase transition-colors hover:bg-charcoal hover:text-ivory"
        >
          {copyV2.event.calendarButton}
        </a>
      </div>
    </div>
  );
}

export function EventDetailsV2() {
  const timeLeft = useCountdown(weddingConfig.weddingDateISO);
  const [activeImage, setActiveImage] = useState(0);
  const [cycle, setCycle] = useState(0);
  const { ref, inView } = useSectionInView<HTMLElement>();

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % weddingConfig.backgroundImages.length);
      setCycle((c) => c + 1);
    }, BACKGROUND_IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="event"
      ref={ref}
      className="h-dvh shrink-0 snap-start snap-always overflow-hidden"
    >
      <div
        className={`fixed inset-y-0 right-0 w-full -z-10 transition-opacity duration-500 min-[1025px]:w-125 ${inView ? "opacity-100" : "opacity-50"}`}
        aria-hidden="true"
      >
        {weddingConfig.backgroundImages.map((src, index) => {
          const isActive = index === activeImage;
          return (
            <Image
              key={isActive ? `${src}-${cycle}` : src}
              src={src}
              alt=""
              fill
              className={`object-cover grayscale ${isActive ? "opacity-100" : "opacity-0"}`}
              style={{
                transition: "opacity 1500ms ease-in-out",
                animation: isActive
                  ? `hero-zoom-out ${BACKGROUND_IMAGE_INTERVAL_MS}ms linear forwards`
                  : "none",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between gap-3 overflow-hidden px-5 pt-6 pb-6">
        <FadeIn className="flex shrink-0 flex-col items-center gap-1 text-center">
          <h2 className="font-display text-3xl italic text-ivory">{copyV2.event.title}</h2>
          <p className="max-w-sm text-xs text-ivory/80">{copyV2.event.subtitle}</p>
        </FadeIn>

        <FadeIn className="flex shrink-0 flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.24em] text-gold-light uppercase">{copyV2.event.countdownTitle}</p>
          <p className="font-display text-2xl text-ivory">
            {formatShortDate(weddingConfig.weddingDateISO)}
          </p>
          <div className="flex gap-2">
            <CountdownBox value={timeLeft.days} label={copyV2.event.days} />
            <CountdownBox value={timeLeft.hours} label={copyV2.event.hours} />
            <CountdownBox value={timeLeft.minutes} label={copyV2.event.minutes} />
            <CountdownBox value={timeLeft.seconds} label={copyV2.event.seconds} />
          </div>
        </FadeIn>

        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col items-stretch gap-2.5">
          <FadeIn className="flex min-h-0 min-w-0 w-full flex-1">
            <EventCard event={weddingConfig.ceremony} />
          </FadeIn>
          <FadeIn className="flex min-h-0 min-w-0 w-full flex-1">
            <EventCard event={weddingConfig.reception} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
