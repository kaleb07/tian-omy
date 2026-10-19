"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";
import { useSectionInView } from "./useSectionInView";

const BACKGROUND_IMAGE_INTERVAL_MS = 6000;
const CLOSE_ANIMATION_DURATION_MS = 300;

function CopyButtonV2({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-gold px-4 py-1.5 text-xs tracking-[0.15em] text-gold uppercase transition-colors hover:bg-gold hover:text-ivory"
    >
      {copied ? copyV2.gift.copiedButton : copyV2.gift.copyButton}
    </button>
  );
}

export function GiftV2() {
  const [showAccounts, setShowAccounts] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [cycle, setCycle] = useState(0);
  const { ref, inView } = useSectionInView<HTMLElement>();

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      setShowAccounts(false);
      setIsClosing(false);
    }, CLOSE_ANIMATION_DURATION_MS);
  }

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage(
        (prev) => (prev + 1) % weddingConfig.backgroundImages.length,
      );
      setCycle((c) => c + 1);
    }, BACKGROUND_IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="gift"
      ref={ref}
      className="min-h-dvh shrink-0 snap-start snap-always"
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

      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center gap-8 px-6 py-12">
        <FadeIn className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-display text-3xl italic text-ivory">
            {copyV2.gift.title}
          </h2>
          <p className="max-w-md text-sm text-ivory/80">
            {copyV2.gift.subtitle}
          </p>
        </FadeIn>

        {!showAccounts ? (
          <FadeIn>
            <button
              type="button"
              onClick={() => setShowAccounts(true)}
              className="rounded-full bg-ivory px-8 py-3 text-sm tracking-[0.22em] text-charcoal uppercase transition-opacity hover:opacity-90"
            >
              {copyV2.gift.sendGiftButton}
            </button>
          </FadeIn>
        ) : (
          <div
            className="flex w-full max-w-md flex-col gap-4"
            style={{
              animation: isClosing
                ? `zoom-out-pop ${CLOSE_ANIMATION_DURATION_MS}ms ease-in forwards`
                : "zoom-in-pop 400ms ease-out forwards",
            }}
          >
            {weddingConfig.bankAccounts.slice(1).map((account) => (
              <div
                key={account.accountNumber}
                className="flex flex-col items-center gap-2 rounded-lg border border-gold-light/50 bg-ivory-soft px-6 py-6 text-center"
              >
                <div className="relative h-16 w-16">
                  <Image
                    src={account.logo}
                    alt={account.bank}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <p className="font-display text-2xl text-charcoal">
                    {account.accountNumber}
                  </p>
                </div>
                <p className="text-sm text-charcoal/70">
                  a.n. {account.accountHolder}
                </p>
                <div className="mt-2">
                  <CopyButtonV2 value={account.accountNumber} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleClose}
              className="mx-auto mt-2 text-xs tracking-[0.2em] text-ivory uppercase underline underline-offset-4"
            >
              {copyV2.gift.closeButton}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
