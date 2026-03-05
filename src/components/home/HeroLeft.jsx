import Link from "next/link";
export default function HeroLeft() {
  return (
    <div className="w-full">

      {/* Badge */}
<span
  className="
    inline-block
    mt-4 sm:mt-6 lg:mt-0
    mb-5 sm:mb-6
    text-sm sm:text-base
    font-semibold
    text-[#2563EB]
    tracking-wide
  "
>
  Trusted by thousands of users
</span>

      {/* Heading */}
      <h1
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          font-extrabold
          text-black
          leading-tight
          mb-5 sm:mb-6
        "
      >
        Welcome to VK
      </h1>

      {/* Description */}
      <p
        className="
          text-base
          sm:text-lg
          text-gray-600
          max-w-xl
          mb-8 sm:mb-10
        "
      >
        Your trusted platform for learning and growth. Join thousands of users
        already on their journey to success and unlock your full potential.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 mb-12 sm:mb-14">
<Link href="/phone/enter-phone?purpose=REGISTER">
  <button
    className="
      relative
      overflow-hidden
      bg-gradient-to-r
      from-[#1E40E6]
      to-[#3B82F6]
      text-white
      px-6 sm:px-7
      py-2.5 sm:py-3
      rounded-xl
      font-semibold
      shadow-[0_10px_30px_rgba(30,64,230,0.35)]
      transition-all
      duration-300
      ease-out
      hover:-translate-y-1
      hover:scale-[1.03]
      hover:shadow-[0_16px_40px_rgba(30,64,230,0.55)]
      hover:from-[#1D4ED8]
      hover:to-[#60A5FA]
      active:scale-[0.99]
    "
  >
    Get Started
  </button>
</Link>

        <a
          href="/home#why-choose-vk"
          className="
            inline-flex
            items-center
            bg-white/90
            text-black
            px-6 sm:px-7
            py-2.5 sm:py-3
            rounded-xl
            font-semibold
            border
            border-blue-200
            backdrop-blur-sm
            shadow-[0_8px_24px_rgba(37,99,235,0.12)]
            transition-all
            duration-300
            ease-out
            hover:-translate-y-1
            hover:scale-[1.03]
            hover:bg-white
            hover:border-blue-400
            hover:text-[#1D4ED8]
            hover:shadow-[0_14px_34px_rgba(37,99,235,0.28)]
            active:scale-[0.99]
          "
        >
          Learn More
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-8 sm:gap-10 items-center">
        <div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black">
            50K+
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Active Users
          </p>
        </div>

        <div className="hidden sm:block h-12 w-px bg-gray-300" />

        <div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black">
            4.9/5
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            User Rating
          </p>
        </div>

        <div className="hidden sm:block h-12 w-px bg-gray-300" />

        <div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black">
            100%
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Satisfaction
          </p>
        </div>
      </div>

    </div>
  );
}
