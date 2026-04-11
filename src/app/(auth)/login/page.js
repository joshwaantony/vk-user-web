"use client";

import LoginPage from "@/components/auth/LoginForm";
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

  return <div className="">
    <LoginPage/>
  </div>;
}

export default page;
