"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";

export function CopyButton({ value }: { value: string }) {
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
      className="flex items-center gap-2 rounded-full bg-forest px-5 py-2 text-xs font-semibold tracking-[0.15em] text-ivory uppercase transition-colors hover:bg-forest-light"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
      {copied ? copy.gift.copiedButton : copy.gift.copyButton}
    </button>
  );
}
