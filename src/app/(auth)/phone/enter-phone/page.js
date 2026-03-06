

import PhoneForm from "@/components/auth/PhoneForm";
const getFlowCopy = (purposeParam) => {
  const normalizedPurpose = String(purposeParam || "REGISTER").toUpperCase();

  if (normalizedPurpose === "LOGIN") {
    return {
      purpose: "LOGIN",
      title: "Login with OTP",
      subtitle: "Enter your phone number to login.",
    };
  }

  if (normalizedPurpose === "FORGOT_PASSWORD") {
    return {
      purpose: "FORGOT_PASSWORD",
      title: "Verification",
      subtitle:
        "We’ll send you a one-time verification code to confirm your number.",
    };
  }

  return {
    purpose: "REGISTER",
    title: "What’s your phone number?",
    subtitle:
      "We’ll send you a one-time verification code to confirm your number.",
  };
};

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { title, subtitle, purpose } = getFlowCopy(
    resolvedSearchParams?.purpose
  );

  return (
    <PhoneForm
      title={title}
      subtitle={subtitle}
      purpose={purpose}
      nextRoute="/phone/verify"
    />
  );
}
