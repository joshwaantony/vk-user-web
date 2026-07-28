"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PromoLoader from "@/components/loader/PromoLoader";
import { useAuthStore } from "@/store/auth.store";
import {
  consumeGoogleAuthRedirect,
  handleGoogleSuccessRedirect,
} from "@/lib/googleAuth";

export default function AuthSuccessView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((state) => state.setToken);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const completeSignIn = async () => {
      console.info("[auth-success] callback page mounted", {
        pathname: window.location.pathname,
        search: window.location.search,
      });

      const errorCode = searchParams?.get("error") || searchParams?.get("code");
      const pendingLinkToken = searchParams?.get("pendingLinkToken") || "";
      const email = searchParams?.get("email") || "";

      if (errorCode) {
        console.warn("[auth-success] backend returned auth error", {
          errorCode,
          pathname: window.location.pathname,
          search: window.location.search,
        });
        setStatus("error");

        const failureParams = new URLSearchParams();
        failureParams.set("error", errorCode);

        if (pendingLinkToken) {
          failureParams.set("pendingLinkToken", pendingLinkToken);
        }

        if (email) {
          failureParams.set("email", email);
        }

        router.replace(`/auth/failure?${failureParams.toString()}`);
        return;
      }

      const result = handleGoogleSuccessRedirect();

      if (!result.ok) {
        console.warn("[auth-success] success redirect failed", result);
        setStatus("error");
        router.replace(
          `/auth/failure?error=${encodeURIComponent("GOOGLE_CODE_MISSING")}`
        );
        return;
      }

      setToken(result.accessToken);
      void fetchMe().catch((error) => {
        console.error("Failed to restore session:", error);
      });

      const target = consumeGoogleAuthRedirect("/course");
      setStatus("done");

      window.location.replace(target);
    };

    completeSignIn();
  }, [fetchMe, router, searchParams, setToken]);

  const redirectHint = searchParams?.get("redirect");

  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5">
          <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
        </div>

        <p className="text-lg font-semibold text-[#0F172A]">
          Signing you in
        </p>

        <p className="mt-2 text-sm text-[#64748B]">
          One moment while we take you into the app.
        </p>

        <div className="mt-6">
          <PromoLoader />
        </div>

        {redirectHint ? (
          <p className="mt-6 text-sm text-[#64748B]">
            Redirecting to {redirectHint}
          </p>
        ) : null}

        {status === "error" ? (
          <p className="mt-6 text-sm text-[#DC2626]">
            Sign-in could not be completed.
          </p>
        ) : null}
      </div>
    </main>
  );
}
