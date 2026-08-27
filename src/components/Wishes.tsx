"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";

type WishMessage = {
  name: string;
  message: string;
  timestamp?: string;
  attendance?: string;
};

const ATTENDANCE_LABELS: Record<string, string> = {
  Yes: copy.rsvp.attendanceYes,
  No: copy.rsvp.attendanceNo,
  Maybe: copy.rsvp.attendanceMaybe,
};

type Status = "loading" | "success" | "error";

const PAGE_SIZE = 5;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function timeAgo(iso: string) {
  const targetMs = new Date(iso).getTime();
  if (Number.isNaN(targetMs)) return "";

  const diffMs = Date.now() - targetMs;
  if (diffMs < 0) return "";

  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Baru saja";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} menit yang lalu`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} jam yang lalu`;
  return `${Math.floor(diffMs / day)} hari yang lalu`;
}

export function Wishes({ refreshKey = 0 }: { refreshKey?: number } = {}) {
  const [messages, setMessages] = useState<WishMessage[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [page, setPage] = useState(0);
  const [pageStripProgress, setPageStripProgress] = useState(0);
  const [isStripScrollable, setIsStripScrollable] = useState(false);
  const pageStripRef = useRef<HTMLDivElement>(null);

  function updatePageStripProgress() {
    const node = pageStripRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setPageStripProgress(max <= 0 ? 0 : node.scrollLeft / max);
  }

  function scrollPageStrip(direction: "left" | "right") {
    const node = pageStripRef.current;
    if (!node) return;
    node.scrollBy({ left: direction === "left" ? -80 : 80, behavior: "smooth" });
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    const node = pageStripRef.current;
    const button = node?.querySelector<HTMLButtonElement>(`[data-page-index="${nextPage}"]`);
    button?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const response = await fetch(weddingConfig.messagesApiPath, { cache: "no-store" });
        const data = await response.json().catch(() => null);

        if (cancelled) return;

        if (!response.ok || !data?.ok) {
          setStatus((prev) => (prev === "loading" ? "error" : prev));
          return;
        }

        setMessages(data.messages ?? []);
        setStatus("success");
        setPage(0);
      } catch {
        if (!cancelled) setStatus((prev) => (prev === "loading" ? "error" : prev));
      }
    }

    loadMessages();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  useEffect(() => {
    function checkScrollable() {
      const node = pageStripRef.current;
      if (!node) return;
      setIsStripScrollable(node.scrollWidth > node.clientWidth + 1);
    }

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [messages.length]);

  if (status === "success" && messages.length === 0) return null;

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);
  const paginatedMessages = messages.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="flex flex-col gap-4">
      <FadeIn>
        <p className="text-xs font-semibold tracking-[0.25em] text-ivory uppercase">
          {copy.wishes.title}
        </p>
      </FadeIn>

      <FadeIn className="flex w-full flex-col gap-3">
        {status === "loading" && (
          <p className="text-sm text-ivory/60">{copy.wishes.loadingMessage}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-ivory/60">{copy.wishes.errorMessage}</p>
        )}
        {status === "success" && (
          <div className="flex flex-col divide-y divide-ivory/15 overflow-hidden rounded-xl border border-ivory/30">
            {paginatedMessages.map((wish, index) => (
              <div
                key={`${wish.name}-${page * PAGE_SIZE + index}`}
                className="flex gap-3 bg-forest-light/20 px-4 py-4 text-left"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/40 bg-forest text-xs font-semibold text-gold-light">
                  {initialsOf(wish.name)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-ivory">{wish.name}</p>
                    {wish.attendance && ATTENDANCE_LABELS[wish.attendance] && (
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          wish.attendance === "Yes"
                            ? "border-gold/60 text-gold-light"
                            : wish.attendance === "No"
                              ? "border-ivory/20 text-ivory/40"
                              : "border-ivory/30 text-ivory/60"
                        }`}
                      >
                        {ATTENDANCE_LABELS[wish.attendance]}
                      </span>
                    )}
                  </div>
                  {wish.timestamp && (
                    <p className="text-xs uppercase tracking-wide text-ivory/50">
                      {timeAgo(wish.timestamp)}
                    </p>
                  )}
                  <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-ivory/70">
                    {wish.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "success" && totalPages > 1 && (
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="shrink-0 rounded-full border border-ivory/30 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-ivory uppercase transition-colors hover:border-gold-light disabled:opacity-30"
              >
                {copy.wishes.prevButton}
              </button>

              <div
                ref={pageStripRef}
                onScroll={updatePageStripProgress}
                className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto"
              >
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    data-page-index={index}
                    onClick={() => goToPage(index)}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                      index === page
                        ? "border-gold bg-gold text-charcoal"
                        : "border-ivory/20 bg-forest-light/40 text-ivory hover:border-gold-light"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToPage(Math.min(totalPages - 1, page + 1))}
                disabled={page === totalPages - 1}
                className="shrink-0 rounded-full border border-ivory/30 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-ivory uppercase transition-colors hover:border-gold-light disabled:opacity-30"
              >
                {copy.wishes.nextButton}
              </button>
            </div>

            {isStripScrollable && (
              <div className="flex items-center gap-1.5 px-1">
                <button
                  type="button"
                  aria-label={copy.wishes.prevButton}
                  onClick={() => scrollPageStrip("left")}
                  className="text-ivory/50 transition-colors hover:text-gold-light"
                >
                  ‹
                </button>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ivory/80">
                  <div
                    className="h-full rounded-full bg-charcoal/50"
                    style={{ width: `${Math.max(pageStripProgress * 100, 15)}%` }}
                  />
                </div>
                <button
                  type="button"
                  aria-label={copy.wishes.nextButton}
                  onClick={() => scrollPageStrip("right")}
                  className="text-ivory/50 transition-colors hover:text-gold-light"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        )}
      </FadeIn>
    </div>
  );
}
