
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth.store";

export default function PhoneForm({
  title,
  subtitle,
  purpose,
  nextRoute,
}) {
  const router = useRouter();

  const {
    phone,
    setPhone,
    sendOtp,
  } = useAuthStore();
  const [otpIssueState, setOtpIssueState] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const localPhone = String(phone || "")
    .replace(/^\+91/, "")
    .replace(/\D/g, "")
    .slice(0, 10);

  // ✅ VALIDATION
  const validate = () => {
    if (!/^\d{10}$/.test(localPhone)) {
      toast.error("Enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  // const handleSendOtp = async () => {
  //   if (!validate()) return;

  //   const toastId = toast.loading("Sending OTP...");

  //   const success = await sendOtp({
  //     phone: `+91${phone}`,
  //     purpose,
  //   });

  //   toast.dismiss(toastId);

  //   if (success) {
  //     toast.success("OTP sent successfully");
  //     router.push(nextRoute);
  //   } else {
  //     toast.error("Failed to send OTP");
  //   }
  // };
  const handleSendOtp = async () => {
    if (!validate()) return;

    const toastId = toast.loading("Sending OTP...");
    setOtpIssueState(null);
    setIsSubmitting(true);

    const result = await sendOtp({
      phone: `+91${localPhone}`,
      purpose,
    });

    toast.dismiss(toastId);
    setIsSubmitting(false);

    if (result.success && result.otpIssued !== false) {
      toast.success(result.message || "OTP sent successfully");
      router.push(nextRoute);
    } else if (result.success && purpose === "FORGOT_PASSWORD") {
      setOtpIssueState({
        type: "info",
      });
    } else if (result.success) {
      toast.error(result.message || "Unable to send OTP right now");
    } else {
      toast.error(result.message || "Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    await handleSendOtp();
  };



  return (
    <main className="min-h-screen bg-[#F3F8FF] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] text-center">

        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="Logo" className="size-20" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0F172A]">
          {title}
        </h1>

        <p className="text-[#64748B] mt-2">
          {subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
        >

          <div className="text-left mb-6">
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Phone Number
            </label>

            <div
              className="flex items-center h-14 rounded-xl bg-[#F8FAFC]
                         border border-[#94A3B8]
                         focus-within:ring-2 focus-within:ring-[#2457E6]
                         focus-within:border-[#2457E6]"
            >
              <span className="px-4 text-[#0F172A] font-semibold border-r border-[#CBD5E1]">
                +91
              </span>

            <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={localPhone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="Enter 10-digit number"
                className="flex-1 h-full px-4 bg-transparent
                           text-[#0F172A] placeholder:text-[#94A3B8]
                           outline-none"
                enterKeyHint="send"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-[#2457E6]
                       text-white font-semibold text-lg
                       hover:bg-[#1E4ED8]
                       disabled:opacity-60
                       disabled:cursor-not-allowed
                       transition"
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>

          {otpIssueState?.type === "info" && (
            <div className="mt-5 rounded-2xl border border-[#D6E4FF] bg-[#F8FBFF] p-4 text-left">
              <p className="text-sm font-semibold text-[#0F172A]">
                We’re unable to send an OTP to this number right now.
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Please try again in a moment or sign up if you’re new here.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl border border-[#CBD5E1] px-4 py-3 text-sm font-semibold text-[#334155] transition hover:bg-white disabled:opacity-60"
                >
                  Retry
                </button>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href =
                      "/phone/enter-phone?purpose=REGISTER";
                  }}
                  className="flex-1 rounded-xl bg-[#2457E6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1E4ED8]"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
