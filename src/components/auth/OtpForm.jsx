



"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function OtpVerifyPage() {
  const router = useRouter();

  const {
    verifyOtp,
    sendOtp,
    loading,
    error,
    purpose,
    phone,
    expiresIn,
  } = useAuthStore();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(expiresIn || 0);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (!expiresIn) return;

    setTimeLeft(expiresIn);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresIn]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) return;

    const success = await verifyOtp(otpValue);
    if (!success) return;

    if (purpose === "FORGOT_PASSWORD") {
      router.replace("/reset-password");
    } else if (purpose === "REGISTER") {
      router.replace("/signup");
    } else {
      router.replace("/course");
    }
  };

  const handleResendOtp = async () => {
    if (!phone || !purpose) return;

    setOtp(["", "", "", ""]);
    inputsRef.current[0]?.focus();
    setTimeLeft(1);

    await sendOtp({ phone, purpose });
  };

  return (
    <div className="w-full max-w-[380px] bg-white rounded-2xl px-8 py-10 shadow-[0_25px_60px_rgba(36,87,230,0.15)] text-center mt-4">
      <p className="text-sm font-semibold text-[#0F172A] mb-4">
        Enter OTP
      </p>

      <div className="flex justify-center gap-4 mb-4">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-14 h-14 text-center text-black text-lg font-semibold rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] outline-none focus:border-[#2457E6] focus:ring-2 focus:ring-[#2457E6]"
          />
        ))}
      </div>

      {timeLeft > 0 ? (
        <p className="text-xs text-[#475569] mb-4">
          OTP expires in <span className="font-semibold">{formatTime(timeLeft)}</span>
        </p>
      ) : (
        <button
          onClick={handleResendOtp}
          disabled={loading}
          className="text-sm text-[#1E40D8] font-semibold mb-4 hover:underline"
        >
          Resend OTP
        </button>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={loading || timeLeft === 0}
        className="w-full h-12 rounded-xl bg-[#1E40D8] disabled:opacity-60 text-white font-semibold text-base transition"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}
