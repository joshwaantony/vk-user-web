"use client";

import LoginPage from "@/components/auth/LoginForm";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import PromoLoader from "@/components/loader/PromoLoader";
import { getAuthRedirectFromLocation } from "@/lib/authRedirect";

function page() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace(getAuthRedirectFromLocation());
    }
  }, [user, router]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        <PromoLoader/>
      </div>
    );
  }

  return <div className="">
    <LoginPage/>
  </div>;
}

export default page;
