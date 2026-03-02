

"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PhoneForm from "@/components/auth/PhoneForm";
import { useAuthFlowStore } from "@/store/authFlow.store";

export default function Page() {
  const searchParams = useSearchParams();
  const { title, subtitle, purpose, setFlow } = useAuthFlowStore();

  useEffect(() => {
    const purposeParam = searchParams.get("purpose");
    if (!purposeParam) return;

    const normalizedPurpose = purposeParam.toUpperCase();

    if (normalizedPurpose === "REGISTER") {
      setFlow({
        purpose: "REGISTER",
        title: "What’s your phone number?",
        subtitle:
          "We’ll send you a one-time verification code to confirm your number.",
      });
      return;
    }

    if (normalizedPurpose === "LOGIN") {
      setFlow({
        purpose: "LOGIN",
        title: "Login with OTP",
        subtitle: "Enter your phone number to login.",
      });
      return;
    }

    if (normalizedPurpose === "FORGOT_PASSWORD") {
      setFlow({
        purpose: "FORGOT_PASSWORD",
        title: "Verification",
        subtitle:
          "We’ll send you a one-time verification code to confirm your number.",
      });
    }
  }, [searchParams, setFlow]);

  return (
    <PhoneForm
      title={title}
      subtitle={subtitle}
      purpose={purpose}
      nextRoute="/phone/verify"
    />
  );
}
