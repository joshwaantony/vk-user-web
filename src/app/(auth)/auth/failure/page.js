import { Suspense } from "react";
import GoogleAuthErrorView from "@/components/auth/GoogleAuthErrorView";

export default function GoogleAuthFailurePage() {
  return (
    <Suspense fallback={null}>
      <GoogleAuthErrorView />
    </Suspense>
  );
}
