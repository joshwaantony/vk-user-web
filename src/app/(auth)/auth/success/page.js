import { Suspense } from "react";
import AuthSuccessView from "@/components/auth/AuthSuccessView";

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessView />
    </Suspense>
  );
}
