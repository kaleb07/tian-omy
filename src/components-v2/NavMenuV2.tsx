"use client";

import { copyV2 } from "@/lib/copy-v2";

const NAV_ITEMS = [
  { href: "#home", label: copyV2.nav.home },
  { href: "#couple", label: copyV2.nav.couple },
  { href: "#event", label: copyV2.nav.event },
  { href: "#rsvp", label: copyV2.nav.rsvp },
  { href: "#gallery", label: copyV2.nav.gallery },
  { href: "#gift", label: copyV2.nav.gift },
];

export function NavMenuV2({ visible }: { visible: boolean }) {
  return (
    <nav
      aria-hidden={!visible}
      className={`sticky top-0 z-30 w-full overflow-x-auto border-b border-ivory/10 bg-charcoal/90 backdrop-blur transition-all duration-700 ${
        visible ? "opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      }`}
    >
      <div className="no-scrollbar flex w-full items-center justify-center gap-6 px-6 py-3">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 text-[11px] tracking-[0.2em] text-ivory/70 uppercase transition-colors hover:text-gold-light"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
