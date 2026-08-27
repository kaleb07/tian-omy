"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { Cover } from "./Cover";
import { MainBackground } from "./MainBackground";
import { Hero } from "./Hero";
import { Couple } from "./Couple";
import { EventDetails } from "./EventDetails";
import { Gallery } from "./Gallery";
import { GiftAndWishes } from "./GiftAndWishes";
import { Footer } from "./Footer";

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

export function InvitationApp() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const guestName = toParam || copy.cover.defaultGuest;
  const [opened, setOpened] = useState(false);
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
      <Cover guestName={guestName} opened={opened} onOpen={handleOpen} />
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
      <MainBackground />
      <main className="flex flex-1 flex-col lg:mx-auto lg:max-w-[80%]">
        <Hero />
        <Couple />
        <EventDetails />
        <Gallery />
        <GiftAndWishes />
      </main>
      <Footer />
    </>
  );
}
