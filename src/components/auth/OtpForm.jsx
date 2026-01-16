



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function OtpVerifyPage() {
  const router = useRouter();
  const { verifyOtp, loading, error } = useAuthStore();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) return;

    const success = await verifyOtp(otpValue);
    if (success) {
      router.push("/course"); // or home page
    }
  };

  return (
    <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.svg" alt="Logo" className="h-10 mx-auto" />
      </div>

      <h1 className="text-2xl font-extrabold text-[#0F172A]">
        Check your phone
      </h1>

      <p className="text-sm text-[#475569] mt-2 text-center">
        We’ve sent a one-time verification code
      </p>

      <div className="mt-8 w-full max-w-[380px] bg-white rounded-2xl px-8 py-10
                      shadow-[0_25px_60px_rgba(36,87,230,0.15)] text-center">

        <p className="text-sm font-semibold text-[#0F172A] mb-4">
          Enter OTP
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-14 h-14 text-center text-lg font-semibold
                         rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]
                         outline-none
                         focus:border-[#2457E6]
                         focus:ring-2 focus:ring-[#2457E6]"
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#1E40D8]
                     text-white font-semibold text-base transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="my-6 h-px bg-[#E2E8F0]" />

        <p className="text-xs text-[#64748B]">
          We use your phone number only to verify your identity.
        </p>
      </div>
    </main>
  );
}
