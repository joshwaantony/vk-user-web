"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PromoLoader from "@/components/loader/PromoLoader";
import AddPhoneOtpForm from "@/components/auth/AddPhoneOtpForm";
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
    <main className="min-h-screen bg-[#F3F8FF] px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <AddPhoneOtpForm />
      </div>
    </main>
  );
}
