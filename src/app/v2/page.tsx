import { Suspense } from "react";
import { InvitationAppV2 } from "@/components-v2/InvitationAppV2";

export default function HomeV2Page() {
  return (
    <Suspense fallback={null}>
      <InvitationAppV2 />
    </Suspense>
  );
}
