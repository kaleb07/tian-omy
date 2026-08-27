"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/config";

const BACKGROUND_IMAGE_INTERVAL_MS = 6000;

export function MainBackground() {
  const [activeImage, setActiveImage] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % weddingConfig.backgroundImages.length);
      setCycle((c) => c + 1);
    }, BACKGROUND_IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 flex h-screen w-screen justify-center overflow-hidden bg-charcoal" aria-hidden="true">
      <div className="relative h-full w-full lg:max-w-[80vw]">
        {weddingConfig.backgroundImages.map((src, index) => {
          const isActive = index === activeImage;
          return (
            <Image
              key={isActive ? `${src}-${cycle}` : src}
              src={src}
              alt=""
              fill
              priority={index === 0}
              className={`object-cover grayscale ${isActive ? "opacity-100" : "opacity-0"}`}
              style={{
                transition: "opacity 1500ms ease-in-out",
                animation: isActive
                  ? `hero-zoom-out ${BACKGROUND_IMAGE_INTERVAL_MS}ms linear forwards`
                  : "none",
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-charcoal/55" />
      </div>
    </div>
  );
}
