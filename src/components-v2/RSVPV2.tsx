"use client";

import { useState, type FormEvent } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";

type Attendance = "Yes" | "No" | "Maybe";
type Status = "idle" | "submitting" | "success" | "error";

const ATTENDANCE_OPTIONS: { value: Attendance; label: string }[] = [
  { value: "Yes", label: copyV2.rsvp.attendanceYes },
  { value: "No", label: copyV2.rsvp.attendanceNo },
  { value: "Maybe", label: copyV2.rsvp.attendanceMaybe },
];

export function RSVPV2({ guestName, onSubmitted }: { guestName: string; onSubmitted?: () => void }) {
  const [name, setName] = useState(guestName === copyV2.cover.defaultGuest ? "" : guestName);
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <section
      id="rsvp"
      className="relative z-10 flex h-dvh shrink-0 snap-start snap-always flex-col overflow-hidden bg-ivory px-5 py-7 sm:px-6 sm:py-12"
    >
      <header className="shrink-0 pb-5 text-center">
        <p className="text-[10px] tracking-[0.35em] text-gold uppercase">Konfirmasi</p>
        <h2 className="mt-2 font-display text-3xl italic text-charcoal sm:text-4xl">{copyV2.rsvp.title}</h2>
        <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-charcoal/70 sm:max-w-md sm:text-sm">
          {copyV2.rsvp.subtitle}
        </p>
      </header>

      {status === "success" ? (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-gold-light/50 bg-ivory-soft px-6 text-center">
          <p className="font-display text-2xl italic text-charcoal">{copyV2.rsvp.successTitle}</p>
          <p className="mt-2 max-w-xs text-sm text-charcoal/70">{copyV2.rsvp.successMessage}</p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 text-xs tracking-[0.2em] text-gold uppercase underline underline-offset-4"
          >
            {copyV2.rsvp.resetButton}
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col gap-4 rounded-2xl border border-gold-light/40 bg-ivory-soft p-5 sm:gap-5 sm:p-8"
        >
          <label className="flex shrink-0 flex-col gap-2 text-left">
            <span className="text-[10px] tracking-[0.22em] text-charcoal/60 uppercase sm:text-xs">
              {copyV2.rsvp.nameLabel}
            </span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={copyV2.rsvp.namePlaceholder}
              className="h-12 rounded-xl border border-gold-light/60 bg-ivory px-4 text-sm text-charcoal outline-none focus:border-gold"
            />
          </label>

          <div className="flex shrink-0 flex-col gap-2 text-left">
            <span className="text-[10px] tracking-[0.22em] text-charcoal/60 uppercase sm:text-xs">
              {copyV2.rsvp.attendanceLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {ATTENDANCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAttendance(option.value)}
                  className={`min-h-12 rounded-xl border px-2 text-[11px] leading-4 transition-colors sm:text-xs ${
                    attendance === option.value
                      ? "border-gold bg-gold text-ivory"
                      : "border-gold-light/60 bg-ivory text-charcoal/70 hover:border-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {attendance === "Yes" && (
            <div className="flex shrink-0 items-center justify-between rounded-xl border border-gold-light/60 bg-ivory px-4 py-3">
              <span className="text-[10px] tracking-[0.22em] text-charcoal/60 uppercase sm:text-xs">
                {copyV2.rsvp.guestCountLabel}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                  aria-label="Kurangi tamu"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-light/70 text-charcoal"
                >
                  −
                </button>
                <span className="w-6 text-center font-display text-xl text-charcoal">{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount((count) => Math.min(10, count + 1))}
                  aria-label="Tambah tamu"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-light/70 text-charcoal"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <label className="flex min-h-0 flex-1 flex-col gap-2 text-left">
            <span className="text-[10px] tracking-[0.22em] text-charcoal/60 uppercase sm:text-xs">
              {copyV2.rsvp.messageLabel}
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copyV2.rsvp.messagePlaceholder}
              className="min-h-0 flex-1 resize-none rounded-xl border border-gold-light/60 bg-ivory px-4 py-3 text-sm leading-6 text-charcoal outline-none focus:border-gold"
            />
          </label>

          {status === "error" && <p className="shrink-0 text-sm text-red-600">{errorMessage}</p>}

          <button
            type="submit"
            disabled={status === "submitting" || !name.trim() || !attendance}
            className="mt-auto h-12 shrink-0 rounded-full bg-charcoal text-sm tracking-[0.22em] text-ivory uppercase transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {status === "submitting" ? copyV2.rsvp.submittingButton : copyV2.rsvp.submitButton}
          </button>
        </form>
      )}
    </section>
  );
}
