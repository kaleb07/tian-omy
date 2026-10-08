"use client";

import { useEffect, useState } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";

type WishMessage = {
  name: string;
  message: string;
  timestamp?: string;
};

type WishesStatus = "loading" | "success" | "error" | "unconfigured";

const PAGE_SIZE = 5;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function WishesV2({ refreshKey = 0 }: { refreshKey?: number }) {
  const [messages, setMessages] = useState<WishMessage[]>([]);
  const [wishesStatus, setWishesStatus] = useState<WishesStatus>("loading");
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const response = await fetch(weddingConfig.messagesApiPath, { cache: "no-store" });
        const data = await response.json().catch(() => null);
        if (cancelled) return;

        if (!response.ok || !data?.ok) {
          setWishesStatus((prev) => {
            if (prev !== "loading") return prev;
            return response.status === 503 ? "unconfigured" : "error";
          });
          return;
        }

        setMessages(data.messages ?? []);
        setWishesStatus("success");
        setPage(0);
      } catch {
        if (!cancelled) setWishesStatus((prev) => (prev === "loading" ? "error" : prev));
      }
    }

    loadMessages();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);
  const paginatedMessages = messages.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section
      id="wishes"
      className="relative z-10 flex h-dvh shrink-0 snap-start snap-always flex-col overflow-hidden bg-ivory-soft px-5 py-7 sm:px-6 sm:py-12"
    >
      <header className="shrink-0 pb-5 text-center">
        <p className="text-[10px] tracking-[0.35em] text-gold uppercase">Guestbook</p>
        <h2 className="mt-2 font-display text-3xl italic text-charcoal sm:text-4xl">{copyV2.wishes.title}</h2>
        <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-charcoal/70 sm:max-w-md sm:text-sm">
          {copyV2.wishes.subtitle}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gold-light/40 bg-ivory">
        {wishesStatus === "loading" && (
          <p className="m-auto px-6 text-center text-sm text-charcoal/60">{copyV2.wishes.loadingMessage}</p>
        )}
        {wishesStatus === "unconfigured" && (
          <p className="m-auto max-w-xs px-6 text-center text-sm leading-6 text-charcoal/60">
            {copyV2.wishes.notConfiguredMessage}
          </p>
        )}
        {wishesStatus === "error" && (
          <p className="m-auto px-6 text-center text-sm text-charcoal/60">{copyV2.wishes.errorMessage}</p>
        )}
        {wishesStatus === "success" && messages.length === 0 && (
          <p className="m-auto max-w-xs px-6 text-center text-sm leading-6 text-charcoal/60">
            {copyV2.wishes.emptyMessage}
          </p>
        )}

        {wishesStatus === "success" && messages.length > 0 && (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex flex-col divide-y divide-gold-light/30">
                {paginatedMessages.map((wish, index) => (
                  <div
                    key={`${wish.name}-${page * PAGE_SIZE + index}`}
                    className="flex gap-3 px-4 py-4 text-left"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory-soft text-xs font-semibold text-gold">
                      {initialsOf(wish.name)}
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-sm font-semibold text-charcoal">{wish.name}</p>
                      <p className="text-sm leading-relaxed text-charcoal/70">{wish.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex shrink-0 items-center justify-center gap-4 border-t border-gold-light/30 py-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="text-xs tracking-[0.1em] text-gold uppercase disabled:opacity-30"
                >
                  {copyV2.wishes.prevButton}
                </button>
                <span className="text-xs text-charcoal/60">
                  {page + 1} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="text-xs tracking-[0.1em] text-gold uppercase disabled:opacity-30"
                >
                  {copyV2.wishes.nextButton}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
