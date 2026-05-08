

import Image from "next/image";
import FeatureBadges from "./FeatureBadges";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white min-h-[500px] sm:min-h-[520px] lg:min-h-[560px]">

      {/* MOBILE GRADIENT BACKGROUND */}
      <div className="
        absolute inset-0
        bg-gradient-to-br
        from-[#0B1B3A]
        via-[#102A5C]
        to-[#163A7A]
        sm:hidden
      " />

      {/* IMAGE BACKGROUND (sm and above) */}
      <div
        className="
          absolute inset-0
          hidden sm:block
        "
      >
        <Image
          src="/course/hero.png"
          alt=""
          fill
          loading="lazy"
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Overlay (for both) */}
      <div className="absolute inset-0 bg-[#08162F]/55 sm:bg-[#0B1B3A]/45" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent sm:hidden" />
      <div className="absolute -left-16 top-24 h-36 w-36 rounded-full bg-[#EABF56]/15 blur-3xl sm:hidden" />
      <div className="absolute -right-12 bottom-20 h-40 w-40 rounded-full bg-[#60A5FA]/15 blur-3xl sm:hidden" />

      {/* Content */}
      <div
        className="
          relative max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-12 sm:py-20 lg:py-24
          grid grid-cols-1 lg:grid-cols-2
          items-center
        "
      >
        {/* LEFT CONTENT */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/75 backdrop-blur-sm sm:hidden">
            Learn from experts
          </div>
          <h1
            className="
              mt-5 text-[34px] font-bold leading-[1.05]
              sm:mt-0 sm:text-[34px] sm:leading-tight lg:text-[46px]
            "
          >
            Explore Courses for
            <span className="mt-2 block text-[#EABF56]">
              Tax, Accounting & Finance
            </span>
          </h1>

          <p
            className="
              mx-auto mt-5 max-w-md
              text-white/80
              text-[15px] leading-7
              sm:mx-0 sm:mt-6 sm:text-[16px] lg:text-[17px]
            "
          >
            Boost your career with top-rated courses
            <br className="hidden sm:block" />
            designed by industry professionals.
          </p>

          {/* Feature badges */}
          <div className="mt-8 flex justify-center sm:mt-10 lg:justify-start">
            <FeatureBadges />
          </div>
        </div>

        {/* RIGHT SIDE EMPTY */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
