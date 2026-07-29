"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PromoLoader from "@/components/loader/PromoLoader";
import PasswordSetupForm from "@/components/auth/PasswordSetupForm";
import { useAuthStore } from "@/store/auth.store";

export default function ProfilePasswordPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login?redirect=/profile/password");
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
    <main className="min-h-screen bg-[#F3F8FF] px-4 py-8 lg:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <PasswordSetupForm />
      </div>
    </main>
  );
}
