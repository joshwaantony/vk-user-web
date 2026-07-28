import { Suspense } from "react";
import AuthSuccessView from "@/components/auth/AuthSuccessView";

export default function GoogleAuthSuccessPage() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessView />
    </Suspense>
  );
}
