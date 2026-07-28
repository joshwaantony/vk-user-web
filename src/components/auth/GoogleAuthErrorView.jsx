"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { getGoogleErrorMessage } from "@/lib/googleAuth";
import { setGoogleLinkContext } from "@/lib/googleLink";

export default function GoogleAuthErrorView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorCode = searchParams?.get("error") || searchParams?.get("code");
  const pendingLinkToken = searchParams?.get("pendingLinkToken") || "";
  const email = searchParams?.get("email") || "";
  const message = useMemo(() => getGoogleErrorMessage(errorCode), [errorCode]);
  const isAccountLinkRequired = errorCode === "ACCOUNT_LINK_REQUIRED";
  const loginHref = useMemo(() => {
    const params = new URLSearchParams();

    if (pendingLinkToken) {
      params.set("pendingLinkToken", pendingLinkToken);
    }

    if (email) {
      params.set("email", email);
    }

    const query = params.toString();
    return query ? `/login?${query}` : "/login";
  }, [email, pendingLinkToken]);
  const otpHref = useMemo(() => {
    const params = new URLSearchParams();

    params.set("purpose", "LOGIN");

    if (pendingLinkToken) {
      params.set("pendingLinkToken", pendingLinkToken);
    }

    if (email) {
      params.set("email", email);
    }

    return `/phone/enter-phone?${params.toString()}`;
  }, [email, pendingLinkToken]);

  useEffect(() => {
    console.info("[google-auth] rendered error page", {
      pathname: window.location.pathname,
      search: window.location.search,
      errorCode,
      pendingLinkToken: Boolean(pendingLinkToken),
      email: email || null,
    });

    if (isAccountLinkRequired) {
      setGoogleLinkContext({
        email,
        pendingLinkToken,
      });
    }
  }, [email, errorCode, isAccountLinkRequired, pendingLinkToken]);

  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-[28px] bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0F172A]">
          {isAccountLinkRequired ? "Account linking required" : "Google sign-in failed"}
        </h1>

        <p className="mt-2 text-[#64748B]">
          {isAccountLinkRequired
            ? "We found an existing account. Please sign in first."
            : message}
        </p>

        {isAccountLinkRequired && email ? (
          <p className="mt-3 text-sm font-medium text-[#1D4ED8]">
            Matched email: {email}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={loginHref}
            className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#2457E6] px-5 font-semibold text-white shadow-[0_10px_24px_rgba(36,87,230,0.28)] transition hover:-translate-y-0.5 hover:bg-[#1E4ED8]"
          >
            Continue with Password
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          {isAccountLinkRequired ? (
            <Link
              href={otpHref}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl border border-[#BFDBFE] bg-[#F8FBFF] px-5 font-semibold text-[#1D4ED8] transition hover:-translate-y-0.5 hover:bg-[#EFF6FF]"
            >
              Continue with OTP
              <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 text-sm font-semibold text-[#2457E6] transition hover:text-[#1E4ED8] hover:underline"
        >
          Go back
        </button>
      </div>
    </main>
  );
}
