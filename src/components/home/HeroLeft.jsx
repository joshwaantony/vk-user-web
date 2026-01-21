export default function HeroLeft() {
  return (
    <div className="w-full">

      {/* Badge */}
      <span
        className="
    inline-block
    mt-4 sm:mt-6 lg:mt-0
    mb-5 sm:mb-6
    rounded-full
    bg-[#E0EBFF]
    px-4 sm:px-5
    py-1.5 sm:py-2
    text-xs sm:text-sm
    font-semibold
    text-[#2563EB]
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
        <button
          className="
            bg-[#1E40E6]
            text-white
            px-6 sm:px-7
            py-2.5 sm:py-3
            rounded-xl
            font-semibold
            shadow-md
            hover:bg-[#1a36c9]
            transition
          "
        >
          Get Started
        </button>

        <button
          className="
            bg-white
            text-black
            px-6 sm:px-7
            py-2.5 sm:py-3
            rounded-xl
            font-semibold
            border
            border-gray-300
            hover:bg-gray-50
            transition
          "
        >
          Learn More
        </button>
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
