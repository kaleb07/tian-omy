"use client";

import { useState } from "react";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "@/components/FadeIn";

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
  return (
    <section
      id="gift"
      className="flex h-screen shrink-0 snap-start flex-col items-center justify-center gap-8 overflow-y-auto bg-ivory px-6 py-12"
    >
      <FadeIn className="flex flex-col items-center gap-3 text-center">
        <h2 className="font-display text-3xl italic text-charcoal">{copyV2.gift.title}</h2>
        <p className="max-w-md text-sm text-charcoal/70">{copyV2.gift.subtitle}</p>
      </FadeIn>

      <FadeIn className="flex w-full max-w-md flex-col gap-4">
        {weddingConfig.bankAccounts.map((account) => (
          <div
            key={account.accountNumber}
            className="flex flex-col items-center gap-2 rounded-lg border border-gold-light/50 bg-ivory-soft px-6 py-6 text-center"
          >
            <p className="text-xs tracking-[0.25em] text-gold uppercase">{account.bank}</p>
            <p className="font-display text-2xl text-charcoal">{account.accountNumber}</p>
            <p className="text-sm text-charcoal/70">a.n. {account.accountHolder}</p>
            <div className="mt-2">
              <CopyButtonV2 value={account.accountNumber} />
            </div>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}
