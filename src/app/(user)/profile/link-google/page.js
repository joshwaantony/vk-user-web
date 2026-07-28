"use client";

import PromoLoader from "@/components/loader/PromoLoader";
import GoogleLinkAccountCard from "@/components/auth/GoogleLinkAccountCard";
import { useAuthStore } from "@/store/auth.store";

export default function LinkGooglePage() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        <PromoLoader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F8FF] px-4 py-10">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-center">
        <div className="w-full max-w-[520px]">
          <GoogleLinkAccountCard />
        </div>
      </div>
    </main>
  );
}
