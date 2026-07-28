"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sendMePhoneOtpApi } from "@/services/auth.service";

export default function AddPhoneForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const localPhone = phone.replace(/\D/g, "").slice(0, 10);

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(localPhone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await sendMePhoneOtpApi({
        phone: `+91${localPhone}`,
      });

      const payload = res?.data ?? res ?? {};
      const message = payload?.message || "OTP sent successfully";

      toast.success(message);
      router.push(`/profile/add-phone/verify?phone=${encodeURIComponent(`+91${localPhone}`)}`);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.message ||
        "Failed to send OTP";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[28px] bg-white px-6 py-7 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <h2 className="text-2xl font-extrabold text-[#0F172A]">
        Add Phone Number
      </h2>
      <p className="mt-2 text-sm text-[#64748B]">
        Verify a phone number for your account. We’ll send a code to confirm ownership.
      </p>

      <div className="mt-6 text-left">
        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          maxLength={10}
          value={localPhone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 10-digit number"
          className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#2457E6] focus:border-[#2457E6]"
        />
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm font-medium text-[#DC2626]">{errorMessage}</p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full rounded-xl bg-[#2457E6] px-4 py-3 font-semibold text-white hover:bg-[#1E4ED8] disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full rounded-xl border border-[#CBD5E1] px-4 py-3 font-semibold text-[#334155] hover:bg-[#F8FAFC]"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
