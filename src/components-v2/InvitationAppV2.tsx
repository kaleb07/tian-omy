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

const SCROLL_COMMIT_THRESHOLD = 0.3;
const SCROLL_END_DEBOUNCE_MS = 150;
const SNAP_ANIMATION_DURATION_MS = 450;

function animateScrollTop(node: HTMLDivElement, target: number, duration: number, onDone: () => void) {
  const start = node.scrollTop;
  const delta = target - start;
  if (Math.abs(delta) < 1) {
    onDone();
    return;
  }
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.scrollTop = start + delta * eased;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      onDone();
    }
  }

  requestAnimationFrame(step);
}

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
  const isAutoScrollingRef = useRef(false);
  const gestureStartRef = useRef<number | null>(null);
  const scrollEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    function getSnapPoints() {
      if (!node) return [];
      // Skip children hidden by responsive classes (offsetHeight 0) so a section
      // that renders a different number of visible children per breakpoint
      // (e.g. split mobile-only sections) doesn't break the ascending order.
      return Array.from(node.children)
        .filter((child) => (child as HTMLElement).offsetHeight > 0)
        .map((child) => (child as HTMLElement).offsetTop);
    }

    function goTo(target: number) {
      if (!node) return;
      if (Math.abs(target - node.scrollTop) < 1) return;
      isAutoScrollingRef.current = true;
      animateScrollTop(node, target, SNAP_ANIMATION_DURATION_MS, () => {
        isAutoScrollingRef.current = false;
      });
    }

    function commitSnap() {
      if (!node || isAutoScrollingRef.current) return;

      const snapPoints = getSnapPoints();
      if (snapPoints.length === 0) return;

      const scrollTop = node.scrollTop;
      const gestureStart = gestureStartRef.current ?? scrollTop;
      gestureStartRef.current = null;

      const direction = scrollTop > gestureStart + 0.5 ? 1 : scrollTop < gestureStart - 0.5 ? -1 : 0;

      // Bracket the current position between whichever two sections it actually
      // sits between — robust even after a fast scroll through several sections.
      let idxBelow = 0;
      for (let i = 0; i < snapPoints.length; i += 1) {
        if (snapPoints[i] <= scrollTop + 0.5) idxBelow = i;
        else break;
      }
      const idxAbove = Math.min(idxBelow + 1, snapPoints.length - 1);

      if (idxBelow === idxAbove) {
        goTo(snapPoints[idxBelow]);
        return;
      }

      const gap = snapPoints[idxAbove] - snapPoints[idxBelow];

      // Measure progress from whichever side the gesture approached from, so the
      // 40% threshold applies symmetrically for scrolling down and scrolling up.
      if (direction < 0) {
        const fraction = gap > 0 ? (snapPoints[idxAbove] - scrollTop) / gap : 0;
        goTo(fraction >= SCROLL_COMMIT_THRESHOLD ? snapPoints[idxBelow] : snapPoints[idxAbove]);
      } else {
        const fraction = gap > 0 ? (scrollTop - snapPoints[idxBelow]) / gap : 0;
        goTo(fraction >= SCROLL_COMMIT_THRESHOLD ? snapPoints[idxAbove] : snapPoints[idxBelow]);
      }
    }

    function handleScroll() {
      if (!node || isAutoScrollingRef.current) return;
      if (gestureStartRef.current === null) {
        gestureStartRef.current = node.scrollTop;
      }
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = setTimeout(commitSnap, SCROLL_END_DEBOUNCE_MS);
    }

    node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", handleScroll);
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
    };
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
          className="isolate z-1 h-dvh w-full overflow-y-scroll scroll-auto bg-charcoal min-[1025px]:ml-auto min-[1025px]:w-125"
        >
          <HomeV2 />
          <CoupleV2 />
          <EventDetailsV2 />
          <RSVPV2 guestName={guestName} onSubmitted={() => setWishesRefreshKey((key) => key + 1)} />
          <WishesV2 refreshKey={wishesRefreshKey} />
          <GalleryV2 />
          <GiftV2 />
          <QuotesV2 />
          <FooterV2 />
        </div>
      </div>
    </>
  );
}
