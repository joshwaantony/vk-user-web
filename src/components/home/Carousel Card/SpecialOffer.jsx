export default function SpecialOffer() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="
            inline-flex items-center gap-2
            bg-[#10B981]
            text-white
            px-6 py-3
            rounded-full
            font-semibold
            text-sm
            shadow-md
          ">
            ⚡ SPECIAL OFFER
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] mb-4">
          Up to <span className="text-[#059669]">50% Off</span>
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-500">
          Limited time offer on our most popular courses
        </p>

      </div>
    </section>
  );
}
