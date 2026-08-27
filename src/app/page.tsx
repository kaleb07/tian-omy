import { Suspense } from "react";
import { InvitationApp } from "@/components/InvitationApp";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <InvitationApp />
    </Suspense>
  );
}
