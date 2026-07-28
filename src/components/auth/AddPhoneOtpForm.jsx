"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth.store";
import { verifyMePhoneOtpApi } from "@/services/auth.service";

const getErrorMessage = (err) =>
  err?.response?.data?.message ||
  err?.response?.data?.errors?.[0]?.message ||
  "Failed to verify phone number";

export default function AddPhoneOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchMe = useAuthStore((state) => state.fetchMe);

  const phone = searchParams?.get("phone") || "";
  const formattedPhone = useMemo(() => {
    if (!phone) return "";
    return String(phone).startsWith("+91") ? phone : `+91${phone}`;
  }, [phone]);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    if (otp.trim().length < 4) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await verifyMePhoneOtpApi({
        phone: formattedPhone,
        otp: otp.trim(),
      });

      res?.data ?? res ?? {};

      try {
        await fetchMe();
      } catch (fetchError) {
        console.error("Failed to refresh profile after phone link:", fetchError);
      }

      toast.success("Phone number linked");
      router.replace("/profile");
    } catch (err) {
      const code = err?.response?.data?.code;
      const message = getErrorMessage(err);
      setErrorMessage(
        code === "ACCOUNT_MERGE_REQUIRED"
          ? "This phone number already belongs to another account."
          : message
      );
      toast.error(
        code === "ACCOUNT_MERGE_REQUIRED"
          ? "This phone number already belongs to another account."
          : message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-[28px] bg-white px-6 py-7 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <h2 className="text-2xl font-extrabold text-[#0F172A]">
        Verify Phone Number
      </h2>
      <p className="mt-2 text-sm text-[#64748B]">
        Enter the one-time code we sent to {formattedPhone || "your phone"}.
      </p>

      <div className="mt-6 text-left">
        <label className="block text-sm font-semibold text-[#0F172A] mb-2">
          OTP
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter OTP"
          className="w-full h-14 px-5 rounded-xl bg-[#F8FAFC] border border-[#94A3B8] text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:ring-2 focus:ring-[#2457E6] focus:border-[#2457E6]"
        />
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm font-medium text-[#DC2626]">{errorMessage}</p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
          className="w-full rounded-xl bg-[#2457E6] px-4 py-3 font-semibold text-white hover:bg-[#1E4ED8] disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="w-full rounded-xl border border-[#CBD5E1] px-4 py-3 font-semibold text-[#334155] hover:bg-[#F8FAFC]"
        >
          Back
        </button>
      </div>
    </section>
  );
}
