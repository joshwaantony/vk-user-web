
"use client";

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
    loading,
  } = useAuthStore();

  // ✅ VALIDATION
  const validate = () => {
    if (!/^\d{10}$/.test(phone || "")) {
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

  const result = await sendOtp({
    phone: `+91${phone}`,
    purpose,
  });

  toast.dismiss(toastId);

  if (result.success) {
    toast.success("OTP sent successfully");
    router.push(nextRoute);

  } else if (result.status === 409) {
    toast.error("Phone number already registered. Please login.");

  } else {
    toast.error(result.message); // ✅ show backend message
  }
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

        <div className="mt-8 bg-white rounded-[28px] px-8 py-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">

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
                value={phone || ""}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter 10-digit number"
                className="flex-1 h-full px-4 bg-transparent
                           text-[#0F172A] placeholder:text-[#94A3B8]
                           outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full h-14 rounded-xl bg-[#2457E6]
                       text-white font-semibold text-lg
                       hover:bg-[#1E4ED8]
                       disabled:opacity-60
                       disabled:cursor-not-allowed
                       transition"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </main>
  );
}