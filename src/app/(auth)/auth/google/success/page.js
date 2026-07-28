"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import PromoLoader from "@/components/loader/PromoLoader";
import { useAuthStore } from "@/store/auth.store";
import {
  consumeGoogleAuthRedirect,
  handleGoogleSuccessRedirect,
} from "@/lib/googleAuth";

export default function GoogleAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((state) => state.setToken);
  const fetchMe = useAuthStore((state) => state.fetchMe);
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const completeGoogleSignIn = async () => {
      console.info("[google-auth] success page mounted", {
        pathname: window.location.pathname,
        search: window.location.search,
      });

      const errorCode = searchParams?.get("error") || searchParams?.get("code");

      if (errorCode) {
        console.warn("[google-auth] backend returned auth error", {
          errorCode,
          pathname: window.location.pathname,
          search: window.location.search,
        });
        setStatus("error");
        router.replace(
          `/auth/failure?error=${encodeURIComponent(errorCode)}`
        );
        return;
      }

      const result = handleGoogleSuccessRedirect();

      if (!result.ok) {
        console.warn("[google-auth] success redirect failed", result);
        setStatus("error");
        router.replace(
          `/auth/failure?error=${encodeURIComponent(
            "GOOGLE_CODE_MISSING"
          )}`
        );
        return;
      }

      setToken(result.accessToken);

      try {
        await fetchMe();
      } catch (error) {
        console.error("Failed to restore Google session:", error);
      }

      toast.success("Signed in with Google");
      setStatus("done");

      router.replace(consumeGoogleAuthRedirect("/course"));
    };

    completeGoogleSignIn();
  }, [fetchMe, router, searchParams, setToken]);

  const redirectHint = searchParams?.get("redirect");

  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-[28px] bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0F172A]">
          Completing sign-in
        </h1>

        <p className="mt-2 text-[#64748B]">
          We’re restoring your session and sending you into the app.
        </p>

        <div className="mt-8 flex justify-center">
          <PromoLoader />
        </div>

        {redirectHint ? (
          <p className="mt-6 text-sm text-[#64748B]">
            Redirecting to {redirectHint}
          </p>
        ) : null}

        {status === "error" ? (
          <p className="mt-6 text-sm text-[#DC2626]">
            Google sign-in could not be completed.
          </p>
        ) : null}
      </div>
    </main>
  );
}
