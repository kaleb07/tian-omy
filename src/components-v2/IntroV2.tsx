"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/config";

const TEXT_SWITCH_DELAY_MS = 1800;
const INTRO_DURATION_MS = 5400;

export function IntroV2({ finished, onFinish }: { finished: boolean; onFinish: () => void }) {
  const [started, setStarted] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const groomFirstName = weddingConfig.groom.fullName.split(" ")[0];
  const brideFirstName = weddingConfig.bride.fullName.split(" ")[0];

  useEffect(() => {
    const raf = requestAnimationFrame(() => setStarted(true));
    const switchTimer = setTimeout(() => setShowNames(true), TEXT_SWITCH_DELAY_MS);
    const finishTimer = setTimeout(onFinish, INTRO_DURATION_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(switchTimer);
      clearTimeout(finishTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden={finished}
      className={`fixed inset-x-0 top-0 z-60 flex h-dvh flex-col items-center justify-center gap-6 overflow-hidden bg-black px-6 text-center transition-opacity duration-1000 ease-in-out ${
        finished ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image src="/background/BUD09046-Edit.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden sm:h-28">
        <div
          className={`relative h-20 w-20 transition-all duration-2800 ease-in-out sm:h-24 sm:w-24 ${
            showNames ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Image src="/letterName/letter-name.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative h-8 w-full">
        <p
          className={`absolute inset-0 flex items-center justify-center text-sm tracking-[0.3em] text-ivory uppercase transition-opacity duration-700 ease-in-out ${
            started && !showNames ? "opacity-100" : "opacity-0"
          }`}
        >
          The Wedding Of
        </p>
        <p
          className={`absolute inset-0 flex items-center justify-center text-sm tracking-[0.3em] text-ivory uppercase transition-opacity duration-700 ease-in-out ${
            showNames ? "opacity-100" : "opacity-0"
          }`}
        >
          {groomFirstName} &amp; {brideFirstName}
        </p>
      </div>
    </div>
  );
}
