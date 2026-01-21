import FeatureBadges from "./FeatureBadges";

export default function HeroSection() {
  return (
    <section className="relative min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] text-white overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/course/hero.png')",
        }}
      />

      {/* Optional overlay for readability (very light) */}
      <div className="absolute inset-0 bg-[#0B1B3A]/40" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        py-16 sm:py-20 lg:py-24
        grid grid-cols-1 lg:grid-cols-2 items-center
      ">
        
        {/* LEFT CONTENT */}
        <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
          <h1 className="
            text-[28px] sm:text-[34px] lg:text-[46px]
            font-bold leading-tight
          ">
            Explore Courses for
            <br />
            <span className="text-[#EABF56]">
              Tax, Accounting & Finance
            </span>
          </h1>

          <p className="
            mt-4 sm:mt-6
            text-white/80
            text-[14px] sm:text-[16px] lg:text-[17px]
            leading-relaxed
          ">
            Boost your career with top-rated courses <br className="hidden sm:block" />
            designed by industry professionals.
          </p>

          {/* Feature badges */}
          <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
            <FeatureBadges />
          </div>
        </div>

        {/* RIGHT SIDE (empty – image is background) */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
