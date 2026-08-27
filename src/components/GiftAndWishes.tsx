"use client";

import { useState } from "react";
import { Gift } from "./Gift";
import { RSVP } from "./RSVP";
import { Wishes } from "./Wishes";

export function GiftAndWishes() {
  const [wishesRefreshKey, setWishesRefreshKey] = useState(0);

  return (
    <section className="bg-forest px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-2 lg:gap-14">
        <Gift />
        <div className="flex flex-col gap-12">
          <RSVP onSubmitted={() => setWishesRefreshKey((key) => key + 1)} />
          <Wishes refreshKey={wishesRefreshKey} />
        </div>
      </div>
    </section>
  );
}
