"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { copy } from "@/lib/copy";
import { Cover } from "./Cover";
import { Hero } from "./Hero";
import { Couple } from "./Couple";
import { EventDetails } from "./EventDetails";
import { Gallery } from "./Gallery";
import { GiftAndWishes } from "./GiftAndWishes";
import { Footer } from "./Footer";

export function InvitationApp() {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const guestName = toParam || copy.cover.defaultGuest;
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [opened]);

  return (
    <>
      <Cover guestName={guestName} opened={opened} onOpen={() => setOpened(true)} />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Couple />
        <EventDetails />
        <Gallery />
        <GiftAndWishes />
      </main>
      <Footer />
    </>
  );
}
