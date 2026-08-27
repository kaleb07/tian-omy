"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getTimeLeft(targetMs: number): TimeLeft {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
    expired: false,
  };
}

// Initial value is computed at render time on both server and client, so it
// can differ by a second or two between them — expected for a live clock.
// Callers should render the digits with suppressHydrationWarning.
export function useCountdown(targetISO: string): TimeLeft {
  const targetMs = new Date(targetISO).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetMs));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return timeLeft;
}
