"use client";

import { useEffect, useState, type FormEvent } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

type Attendance = "Yes" | "No" | "Maybe";
type Status = "idle" | "submitting" | "success" | "error";

type WishMessage = {
  name: string;
  message: string;
  timestamp?: string;
};

type WishesStatus = "loading" | "success" | "error";

const PAGE_SIZE = 5;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function RSVPWishesV2({ guestName, onSubmitted }: { guestName: string; onSubmitted?: () => void }) {
  const [name, setName] = useState(guestName === copyV2.cover.defaultGuest ? "" : guestName);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [messages, setMessages] = useState<WishMessage[]>([]);
  const [wishesStatus, setWishesStatus] = useState<WishesStatus>("loading");
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const response = await fetch(weddingConfig.messagesApiPath, { cache: "no-store" });
        const data = await response.json().catch(() => null);
        if (cancelled) return;

        if (!response.ok || !data?.ok) {
          setWishesStatus((prev) => (prev === "loading" ? "error" : prev));
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !attendance) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(weddingConfig.rsvpApiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attendance,
          message: message.trim(),
          guestCount,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error || copyV2.rsvp.errorMessage);
        setStatus("error");
        return;
      }

      setStatus("success");
      setRefreshKey((key) => key + 1);
      onSubmitted?.();
    } catch {
      setErrorMessage(copyV2.rsvp.errorMessage);
      setStatus("error");
    }
  }

  function handleReset() {
    setAttendance(null);
    setGuestCount(1);
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  }

  const totalPages = Math.ceil(messages.length / PAGE_SIZE);
  const paginatedMessages = messages.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section
      id="rsvp"
      className="flex h-screen shrink-0 snap-start flex-col items-center gap-8 overflow-y-auto bg-ivory px-6 py-12"
    >
      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.rsvp.title}</h2>
        <p className="max-w-md text-sm text-charcoal/70">{copyV2.rsvp.subtitle}</p>
      </FadeIn>

      <FadeIn className="w-full max-w-md">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-gold-light/50 bg-ivory-soft px-8 py-10 text-center">
            <p className="font-display text-xl italic text-charcoal">{copyV2.rsvp.successTitle}</p>
            <p className="text-sm text-charcoal/70">{copyV2.rsvp.successMessage}</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 text-xs tracking-[0.2em] text-gold uppercase underline underline-offset-4"
            >
              {copyV2.rsvp.resetButton}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs tracking-[0.2em] text-charcoal/60 uppercase">
                {copyV2.rsvp.nameLabel}
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copyV2.rsvp.namePlaceholder}
                className="rounded-md border border-gold-light/60 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-gold"
              />
            </label>

            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-2 text-left">
                <span className="text-xs tracking-[0.2em] text-charcoal/60 uppercase">
                  {copyV2.rsvp.attendanceLabel}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Yes", "No", "Maybe"] as Attendance[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAttendance(option)}
                      className={`rounded-full border px-2 py-2 text-xs transition-colors ${
                        attendance === option
                          ? "border-gold bg-gold text-ivory"
                          : "border-gold-light/60 text-charcoal/70 hover:border-gold"
                      }`}
                    >
                      {option === "Yes"
                        ? copyV2.rsvp.attendanceYes
                        : option === "No"
                          ? copyV2.rsvp.attendanceNo
                          : copyV2.rsvp.attendanceMaybe}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {attendance === "Yes" && (
              <label className="flex flex-col gap-2 text-left">
                <span className="text-xs tracking-[0.2em] text-charcoal/60 uppercase">
                  {copyV2.rsvp.guestCountLabel}
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
                  className="rounded-md border border-gold-light/60 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-gold"
                />
              </label>
            )}

            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs tracking-[0.2em] text-charcoal/60 uppercase">
                {copyV2.rsvp.messageLabel}
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copyV2.rsvp.messagePlaceholder}
                rows={4}
                className="resize-none rounded-md border border-gold-light/60 bg-ivory px-4 py-3 text-sm text-charcoal outline-none focus:border-gold"
              />
            </label>

            {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

            <button
              type="submit"
              disabled={status === "submitting" || !name.trim() || !attendance}
              className="rounded-full bg-charcoal px-8 py-3 text-sm tracking-[0.2em] text-ivory uppercase transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {status === "submitting" ? copyV2.rsvp.submittingButton : copyV2.rsvp.submitButton}
            </button>
          </form>
        )}
      </FadeIn>

      <FadeIn className="flex w-full max-w-md flex-col gap-4">
        <p className="text-xs tracking-[0.25em] text-charcoal/60 uppercase">
          {copyV2.rsvp.wishesTitle}
        </p>

        {wishesStatus === "loading" && (
          <p className="text-center text-sm text-charcoal/60">{copyV2.rsvp.loadingMessage}</p>
        )}
        {wishesStatus === "error" && (
          <p className="text-center text-sm text-charcoal/60">{copyV2.rsvp.wishesErrorMessage}</p>
        )}
        {wishesStatus === "success" && messages.length === 0 && (
          <p className="text-center text-sm text-charcoal/60">{copyV2.rsvp.emptyMessage}</p>
        )}

        {wishesStatus === "success" && messages.length > 0 && (
          <>
            <div className="flex flex-col divide-y divide-gold-light/30 overflow-hidden rounded-lg border border-gold-light/50">
              {paginatedMessages.map((wish, index) => (
                <div
                  key={`${wish.name}-${page * PAGE_SIZE + index}`}
                  className="flex gap-3 bg-ivory-soft px-4 py-4 text-left"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-light/60 bg-ivory text-xs font-semibold text-gold">
                    {initialsOf(wish.name)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-charcoal">{wish.name}</p>
                    <p className="text-sm leading-relaxed text-charcoal/70">{wish.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="text-xs tracking-[0.1em] text-gold uppercase disabled:opacity-30"
                >
                  {copyV2.rsvp.prevButton}
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
                  {copyV2.rsvp.nextButton}
                </button>
              </div>
            )}
          </>
        )}
      </FadeIn>
    </section>
  );
}
