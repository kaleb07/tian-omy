import { Suspense } from "react";
import type { Metadata } from "next";
import { InvitationAppV2 } from "@/components-v2/InvitationAppV2";
import { copyV2 } from "@/lib/copy-v2";
import { weddingConfig } from "@/lib/config";
import cloudinaryLoader from "@/lib/cloudinary-loader";

const ogImage = cloudinaryLoader({ src: weddingConfig.homeHero, width: 1200 });

export const metadata: Metadata = {
  title: copyV2.meta.title,
  description: copyV2.meta.description,
  openGraph: {
    title: copyV2.meta.title,
    description: copyV2.meta.description,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: copyV2.meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: copyV2.meta.title,
    description: copyV2.meta.description,
    images: [ogImage],
  },
};

export default function HomeV2Page() {
  return (
    <Suspense fallback={null}>
      <InvitationAppV2 />
    </Suspense>
  );
}
