"use client";

export default function OtpVerifyPage() {
  return (
    <main className="min-h-screen bg-[#EEF4FF] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo.svg" alt="Logo" className="h-10 mx-auto" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-extrabold text-[#0F172A]">
        Check your phone
      </h1>
      <p className="text-sm text-[#475569] mt-2 text-center">
        We’ve sent a one-time verification code to <br />
        <span className="font-semibold text-[#0F172A]">
          +91 8790034567
        </span>
      </p>

      {/* OTP Card */}
      <div className="mt-8 w-full max-w-[380px] bg-white rounded-2xl px-8 py-10
                      shadow-[0_25px_60px_rgba(36,87,230,0.15)] text-center">

        {/* Enter OTP */}
        <p className="text-sm font-semibold text-[#0F172A] mb-4">
          Enter OTP
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3, 4].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-14 h-14 text-center text-lg font-semibold
                         rounded-xl bg-[#F8FAFC]
                         border border-[#CBD5E1]
                         outline-none
                         focus:border-[#2457E6]
                         focus:ring-2 focus:ring-[#2457E6]"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="text-left mb-6">
          <button className="text-sm text-[#2457E6] font-semibold">
            Resend OTP ?
          </button>
          <p className="text-xs text-[#64748B] mt-1">
            Didn’t receive the code?
          </p>
        </div>

        {/* Verify Button */}
        <button className="w-full h-12 rounded-xl bg-[#1E40D8]
                           text-white font-semibold text-base
                           
                           transition">
          Verify
        </button>

        {/* Divider */}
        <div className="my-6 h-px bg-[#E2E8F0]" />

        {/* Footer Text */}
        <p className="text-xs text-[#64748B]">
          We use your phone number only to verify your identity.
        </p>
      </div>
    </main>
  );
}
