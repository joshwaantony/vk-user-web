export default function PopularCoursesHeader() {
  return (
    <section
      className="
        w-full
        bg-white
        py-14 sm:py-16 md:py-20
        px-4 sm:px-6
      "
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
       <span
  className="
    inline-flex
    items-center
    gap-2
    mt-4 sm:mt-6 lg:mt-0
    mb-5 sm:mb-6
    text-sm sm:text-base
    font-semibold
    text-[#2563EB]
    tracking-wide
  "
>
  <span className="text-base">🔥</span>
  Most Popular
</span>

        </div>

        {/* Title */}
        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-extrabold
            text-black
            mb-4 sm:mb-5
          "
        >
          Popular Courses
        </h2>

        {/* Description */}
        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            text-gray-600
            max-w-2xl
            mx-auto
            leading-relaxed
          "
        >
          Explore our most sought-after courses designed by industry experts
          to help you excel in your career
        </p>

      </div>
    </section>
  );
}
