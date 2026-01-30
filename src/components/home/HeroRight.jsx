import Link from "next/link";

export default function HeroRight() {
  return (
    <div className="relative flex justify-center items-center w-full pb-20">
      {/* OUTER SOFT GLOW CONTAINER */}
      <div
        className="
              absolute
    hidden sm:block
    w-[280px] h-[360px]
    sm:w-[340px] sm:h-[440px]
    md:w-[400px] md:h-[500px]
    lg:w-[440px] lg:h-[560px]
    rounded-[32px]
    bg-[#f9fafd]
    shadow-[0_0_60px_rgba(37,99,235,0.15)]
        "
      />

      {/* MAIN CARD */}
      <div
        className="
          relative
          w-[500px]
          sm:w-[300px]
          md:w-[340px]
          lg:w-[360px]
          bg-white
          rounded-2xl
          px-6 sm:px-7 md:px-8
          py-8 sm:py-9 md:py-10
          text-center
          border border-gray-200
          shadow-[0_18px_40px_rgba(0,0,0,0.15)]
        "
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src="/logo.svg" alt="VK Logo" className="h-13 sm:h-13 md:h-14" />
        </div>

        {/* TITLE */}
        <h3 className="text-[20px] sm:text-xl font-semibold text-black mb-3">
          Welcome to VK
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm leading-relaxed text-gray-600 mb-8 px-3">
          Your trusted platform for learning and growth. Join thousands of users
          already on their journey.
        </p>

        {/* PRIMARY BUTTON */}
        <Link
          href="/login"
          className="
    block w-full text-center
    bg-[#1E40E6]
    text-white
    py-2.5 sm:py-3
    rounded-xl
    font-semibold
    mb-4
    shadow-[0_6px_16px_rgba(30,64,230,0.35)]
    hover:bg-[#1a36c9]
    transition
  "
        >
          Sign In
        </Link>

        {/* SECONDARY BUTTON */}
  <Link href="/phone/enter-phone" className="w-full block">
  <button
    className="
      w-full
      border
      border-[#1E40E6]
      text-[#1E40E6]
      py-2.5 sm:py-3
      rounded-xl
      font-semibold
      hover:bg-[#EEF3FF]
      transition
    "
  >
    Create Account
  </button>
</Link>
      </div>
    </div>
  );
}
