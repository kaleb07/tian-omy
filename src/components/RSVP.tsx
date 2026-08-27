"use client";

import { useState, type FormEvent } from "react";
import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";

type Attendance = "Yes" | "No" | "Maybe";
type Status = "idle" | "submitting" | "success" | "error";

export function RSVP({ onSubmitted }: { onSubmitted?: () => void } = {}) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance | null>(null);
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
        body: JSON.stringify({ name: name.trim(), attendance, message: message.trim() }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error || copy.rsvp.errorMessage);
        setStatus("error");
        return;
      }

      setStatus("success");
      onSubmitted?.();
    } catch {
      setErrorMessage(copy.rsvp.errorMessage);
      setStatus("error");
    }
  }

  function handleReset() {
    setName("");
    setAttendance(null);
    setMessage("");
    setStatus("idle");
    setErrorMessage("");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <FadeIn>
          <h2 className="font-display text-4xl italic text-ivory">{copy.rsvp.title}</h2>
        </FadeIn>
        <FadeIn>
          <p className="max-w-md text-sm leading-relaxed text-ivory/70">{copy.rsvp.subtitle}</p>
        </FadeIn>
      </div>

      <FadeIn className="w-full">
        {status === "success" ? (
          <div className="flex flex-col items-start gap-2 rounded-xl border border-ivory/15 bg-forest-light/40 px-8 py-10 text-left">
            <p className="font-display text-xl italic text-ivory">{copy.rsvp.successTitle}</p>
            <p className="text-sm text-ivory/70">{copy.rsvp.successMessage}</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 text-xs tracking-[0.2em] text-gold-light uppercase underline underline-offset-4"
            >
              {copy.rsvp.resetButton}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold tracking-[0.2em] text-ivory uppercase">
                {copy.rsvp.nameLabel}
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.rsvp.namePlaceholder}
                className="rounded-lg border border-ivory/15 bg-forest-light/50 px-4 py-3 text-sm text-ivory placeholder-ivory/40 outline-none focus:border-gold"
              />
            </label>

            <div className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold tracking-[0.2em] text-ivory uppercase">
                {copy.rsvp.attendanceLabel}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["Yes", "No", "Maybe"] as Attendance[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAttendance(option)}
                    className={`rounded-full border px-3 py-2 text-xs sm:text-sm transition-colors ${
                      attendance === option
                        ? "border-gold bg-gold text-charcoal"
                        : "border-ivory/20 text-ivory/70 hover:border-gold-light"
                    }`}
                  >
                    {option === "Yes"
                      ? copy.rsvp.attendanceYes
                      : option === "No"
                        ? copy.rsvp.attendanceNo
                        : copy.rsvp.attendanceMaybe}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-2 text-left">
              <span className="text-xs font-semibold tracking-[0.2em] text-ivory uppercase">
                {copy.rsvp.messageLabel}
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={copy.rsvp.messagePlaceholder}
                rows={3}
                className="resize-none rounded-lg border border-ivory/15 bg-forest-light/50 px-4 py-3 text-sm text-ivory placeholder-ivory/40 outline-none focus:border-gold"
              />
            </label>

            {status === "error" && (
              <p className="text-sm text-red-300">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting" || !name.trim() || !attendance}
              className="rounded-full bg-gold px-8 py-3 text-sm font-semibold tracking-[0.2em] text-charcoal uppercase transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {status === "submitting" ? copy.rsvp.submittingButton : copy.rsvp.submitButton}
            </button>
          </form>
        )}
      </FadeIn>
    </div>
  );
}
