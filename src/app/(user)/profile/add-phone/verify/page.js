"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import PromoLoader from "@/components/loader/PromoLoader";
import OtpVerifyPage from "@/components/auth/OtpForm";
import { useAuthStore } from "@/store/auth.store";

export default function AddPhoneVerifyPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login?redirect=/profile/add-phone");
    }
  }, [router, token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        <PromoLoader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4 py-10">
      <div className="mb-4">
        <img src="/logo.svg" alt="Logo" className="size-20 mx-auto" />
      </div>

      <h1 className="text-2xl font-extrabold text-[#0F172A]">
        Verify your phone number
      </h1>

      <p className="text-sm text-[#475569] mt-2 text-center">
        We’ve sent a one-time verification code
      </p>

      <div className="">
        <Suspense fallback={null}>
          <OtpVerifyPage />
        </Suspense>
      </div>

      <p className="mt-8 text-[#64748B] mb-10">
        Wrong number?{" "}
        <button
          onClick={() => router.back()}
          className="text-[#2457E6] font-semibold"
        >
          change it
        </button>
      </p>
    </main>
  );
}
