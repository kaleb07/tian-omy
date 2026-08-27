import { copy } from "@/lib/copy";
import { weddingConfig } from "@/lib/config";
import { FadeIn } from "./FadeIn";
import { CopyButton } from "./CopyButton";

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="14" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Gift() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <FadeIn>
          <h2 className="font-display text-4xl italic text-ivory">{copy.gift.title}</h2>
        </FadeIn>
        <FadeIn>
          <p className="max-w-md text-sm leading-relaxed text-ivory/70">{copy.gift.subtitle}</p>
        </FadeIn>
      </div>

      <div className="flex w-full flex-col gap-6">
        {weddingConfig.bankAccounts.map((account) => (
          <FadeIn key={account.accountNumber}>
            <div className="flex flex-col gap-4 rounded-2xl bg-linear-to-br from-ivory to-ivory-soft p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <p className="flex items-center gap-2 text-base font-bold tracking-[0.2em] text-gold uppercase">
                  <SparkleIcon />
                  Bank {account.bank}
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-forest shadow-sm">
                  <WalletIcon />
                </div>
              </div>

              <p className="text-xl font-bold text-charcoal">{account.accountHolder}</p>

              <div className="flex flex-col items-center gap-3 rounded-xl bg-ivory px-4 py-5 text-center">
                <p className="text-[11px] tracking-[0.25em] text-charcoal/50 uppercase">
                  {copy.gift.accountNumberLabel}
                </p>
                <p className="font-display text-2xl tracking-[0.2em] text-charcoal">
                  {account.accountNumber}
                </p>
                <CopyButton value={account.accountNumber} />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
