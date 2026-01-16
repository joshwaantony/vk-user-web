"use client";

export default function VerifyForm() {
  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-[#0F172A]">
          Verification
        </h1>
        <p className="text-[#64748B] mt-2">
          We’ll send you a one-time verification code to confirm your number.
        </p>

        {/* Card */}
        <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          
          {/* Phone Input */}
          <div className="text-left mb-6">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter Your Phone Number"
              className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC]
                         border border-[#94A3B8]
                         text-[#0F172A] placeholder:text-[#94A3B8]
                         outline-none
                         focus:ring-2 focus:ring-[#2457E6]
                         focus:border-[#2457E6]"
            />
          </div>

          {/* Send OTP Button */}
          <button className="w-full h-14 rounded-xl bg-[#2457E6] text-white font-semibold text-lg
                             shadow-[0_10px_20px_rgba(36,87,230,0.35)]
                             hover:bg-[#1E4ED8] transition">
            Send OTP
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#E2E8F0]" />
          </div>

          {/* Privacy Text */}
          <p className="text-xs text-[#64748B] text-center leading-relaxed">
            We use your phone number only to verify your identity.
          </p>
        </div>
      </div>
    </main>
  );
}
