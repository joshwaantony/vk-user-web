import PhoneForm from "@/components/auth/PhoneForm";
const getFlowCopy = (purposeParam) => {
  const normalizedPurpose = String(purposeParam || "REGISTER").toUpperCase();

  // FORGOT_PASSWORD remains its own flow
  if (normalizedPurpose === "FORGOT_PASSWORD") {
    return {
      purpose: "FORGOT_PASSWORD",
      title: "Verification",
      subtitle:
        "We'll send you a one-time verification code to confirm your number.",
    };
  }

  // All other entry points (login + register) are now unified under REGISTER.
  // The backend will return accessToken for existing accounts and
  // verificationToken for new ones. OtpForm handles the branching.
  return {
    purpose: "REGISTER",
    title: "What's your phone number?",
    subtitle:
      "We'll send you a one-time verification code to confirm your number.",
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
