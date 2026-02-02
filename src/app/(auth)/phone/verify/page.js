

"use client";
import OtpVerifyPage from "@/components/auth/OtpForm";
import { useRouter } from "next/navigation";

import React from "react";

function page() {
  const router = useRouter();
  return <div className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4 py-10">

      {/* Logo */}
      <div className="mb-">
        <img src="/logo.svg" alt="Logo" className="size-20 mx-auto" />
      </div>

      <h1 className="text-2xl font-extrabold text-[#0F172A]">
        Check your phone
      </h1>

      <p className="text-sm text-[#475569] mt-2 text-center">
        We’ve sent a one-time verification code
      </p>
<div className="">
        <OtpVerifyPage/>

  </div>        <p className="mt-8 text-[#64748B] mb-10">
          Wrong number ? {" "}
        <button
  onClick={() => router.back()}
  className="text-[#2457E6] font-semibold"
>
  change it
</button>
        </p>
  </div>;
}

export default page;
