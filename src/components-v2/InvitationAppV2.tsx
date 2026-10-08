"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { IntroV2 } from "./IntroV2";
import { CoverV2 } from "./CoverV2";
import { HomeV2 } from "./HomeV2";
import { CoupleV2 } from "./CoupleV2";
import { EventDetailsV2 } from "./EventDetailsV2";
import { RSVPWishesV2 } from "./RSVPWishesV2";
import { GalleryV2 } from "./GalleryV2";
import { GiftV2 } from "./GiftV2";
import { FooterV2 } from "./FooterV2";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function InvitationAppV2() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const guestName = toParam || copyV2.cover.defaultGuest;
  const [opened, setOpened] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  function handleOpen() {
    setOpened(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (weddingConfig.music.enabled) {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      {weddingConfig.music.enabled && (
        <audio ref={audioRef} src={weddingConfig.music.src} loop preload="auto" />
      )}
      <CoverV2 guestName={guestName} opened={opened} onOpen={handleOpen} />
      <IntroV2 finished={introFinished} onFinish={() => setIntroFinished(true)} />
      {weddingConfig.music.enabled && opened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/40 bg-charcoal/70 text-ivory shadow-lg backdrop-blur transition-colors hover:bg-charcoal/90"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}

      <div className="min-[1025px]:flex min-[1025px]:min-h-screen">
        <div className="hidden min-[1025px]:fixed min-[1025px]:inset-y-0 min-[1025px]:left-0 min-[1025px]:right-125 min-[1025px]:block">
          <Image src="/cover/cover.jpg" alt="" fill priority className="object-cover" />
        </div>

        <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-auto min-[1025px]:ml-auto min-[1025px]:w-125">
          <main className="flex flex-1 flex-col">
            <HomeV2 />
            <CoupleV2 />
            <EventDetailsV2 />
            <RSVPWishesV2 guestName={guestName} />
            <GalleryV2 />
            <GiftV2 />
          </main>
          <FooterV2 />
        </div>
      </div>
    </>
  );
}
