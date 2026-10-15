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
import { RSVPV2 } from "./RSVPV2";
import { WishesV2 } from "./WishesV2";
import { GalleryV2 } from "./GalleryV2";
import { GiftV2 } from "./GiftV2";
import { QuotesV2 } from "./QuotesV2";
import { FooterV2 } from "./FooterV2";
import { MusicDiscV2 } from "./MusicDiscV2";

export function InvitationAppV2() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const guestName = toParam || copyV2.cover.defaultGuest;
  const [opened, setOpened] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishesRefreshKey, setWishesRefreshKey] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!weddingConfig.music.enabled) return;

    // Pause whenever the tab/window isn't the one the user is looking at (switched
    // tabs, minimized, screen locked) — resume only if music was actually playing
    // before it went out of view, never force-starting it from a paused state.
    function handleVisibilityChange() {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (isPlayingRef.current) {
        audio.play().catch(() => {});
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

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

  // Duck the background music for the gallery video, the same way it's
  // ducked when the tab goes out of view — pause without touching `isPlaying`
  // (the user's actual intent), then only resume if that intent was still "on".
  function pauseMusicForVideo() {
    audioRef.current?.pause();
  }

  function resumeMusicAfterVideo() {
    if (isPlayingRef.current) {
      audioRef.current?.play().catch(() => {});
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
        <MusicDiscV2 isPlaying={isPlaying} onToggle={toggleMusic} />
      )}

      <div className="min-[1025px]:flex min-[1025px]:min-h-dvh">
        <div className="hidden min-[1025px]:fixed min-[1025px]:inset-y-0 min-[1025px]:left-0 min-[1025px]:right-125 min-[1025px]:z-99 min-[1025px]:block">
          <Image src={weddingConfig.coverPhoto} alt="" fill priority className="object-cover" />
        </div>

        <div
          ref={scrollerRef}
          className="isolate z-1 w-full bg-charcoal min-[1025px]:ml-auto min-[1025px]:h-dvh min-[1025px]:w-125 min-[1025px]:snap-y min-[1025px]:snap-mandatory min-[1025px]:overflow-y-scroll min-[1025px]:scroll-smooth"
        >
          <HomeV2 />
          <CoupleV2 />
          <EventDetailsV2 />
          <RSVPV2 guestName={guestName} onSubmitted={() => setWishesRefreshKey((key) => key + 1)} />
          <WishesV2 refreshKey={wishesRefreshKey} />
          <GalleryV2 onVideoPlay={pauseMusicForVideo} onVideoEnd={resumeMusicAfterVideo} />
          <GiftV2 />
          <QuotesV2 />
          <FooterV2 />
        </div>
      </div>
    </>
  );
}
