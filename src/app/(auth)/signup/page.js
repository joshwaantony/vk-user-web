"use client";

import SignupPage from "@/components/auth/SignupForm";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import PromoLoader from "@/components/loader/PromoLoader";

function page() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      router.replace("/course");
    }
  }, [token, router]);

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        <PromoLoader/>
      </div>
    );
  }

  return <div>
    <SignupPage/>
  </div>;
}

export default page;
