import { Suspense } from "react";
import { InvitationAppV2 } from "@/components-v2/InvitationAppV2";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <InvitationAppV2 />
    </Suspense>
  );
}
