"use client";

import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig, type EventDetail } from "@/lib/config";
import { useCountdown } from "@/lib/useCountdown";
import { FadeIn } from "@/components/FadeIn";

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
    <div className="flex w-16 flex-col items-center justify-center gap-1 rounded-lg border border-gold-light/40 bg-ivory px-3 py-4 shadow-sm sm:w-20 sm:py-5">
      <span className="font-display text-3xl text-charcoal sm:text-4xl" suppressHydrationWarning>
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] tracking-[0.2em] text-charcoal/60 uppercase">{label}</span>
    </div>
  );
}

function EventCard({ event }: { event: EventDetail }) {
  const startIso = buildStartIso(weddingConfig.weddingDateISO, event.timeLabel);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-lg border border-gold-light/50 bg-ivory px-8 py-10 text-center">
      <p className="text-xs tracking-[0.3em] text-gold uppercase">{event.label}</p>
      <p className="font-display text-xl text-charcoal">{event.dateLabel}</p>
      <p className="text-sm text-charcoal/70">{event.timeLabel}</p>
      <div className="mt-2 h-px w-10 bg-gold-light" />
      <p className="mt-2 text-sm font-medium text-charcoal">{event.venueName}</p>
      <p className="max-w-xs text-sm text-charcoal/70">{event.venueAddress}</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold px-5 py-2 text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-ivory"
        >
          {copyV2.event.mapButton}
        </a>
        <a
          href={buildCalendarUrl(event, startIso)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-charcoal/30 px-5 py-2 text-xs tracking-[0.2em] text-charcoal uppercase transition-colors hover:bg-charcoal hover:text-ivory"
        >
          {copyV2.event.calendarButton}
        </a>
      </div>
    </div>
  );
}

export function EventDetailsV2() {
  const timeLeft = useCountdown(weddingConfig.weddingDateISO);

  return (
    <section
      id="event"
      className="flex h-screen shrink-0 snap-start flex-col items-center justify-center gap-8 overflow-y-auto bg-ivory-soft px-6 py-12"
    >
      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.event.title}</h2>
        <p className="max-w-md text-sm text-charcoal/70">{copyV2.event.subtitle}</p>
      </FadeIn>

      <FadeIn className="flex flex-col items-center gap-6">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">{copyV2.event.countdownTitle}</p>
        <p className="font-display text-4xl text-charcoal sm:text-5xl">
          {formatShortDate(weddingConfig.weddingDateISO)}
        </p>
        <div className="flex gap-3 sm:gap-4">
          <CountdownBox value={timeLeft.days} label={copyV2.event.days} />
          <CountdownBox value={timeLeft.hours} label={copyV2.event.hours} />
          <CountdownBox value={timeLeft.minutes} label={copyV2.event.minutes} />
          <CountdownBox value={timeLeft.seconds} label={copyV2.event.seconds} />
        </div>
      </FadeIn>

      <div className="flex w-full flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:justify-center">
        <FadeIn>
          <EventCard event={weddingConfig.ceremony} />
        </FadeIn>
        <FadeIn>
          <EventCard event={weddingConfig.reception} />
        </FadeIn>
      </div>
    </section>
  );
}
