import CourseListCard from "../CourseListCard";

export default function TaxPlanningSection() {
  return (
    <section className="w-full bg-[#F9FAFC] py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block mb-6 sm:mb-4 rounded-full bg-[#E0EBFF] px-4 py-1.5  text-sm font-semibold text-[#2563EB]">
            Specialized Training
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
            Tax Planning & Compliance
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Expert-led courses to help you navigate complex tax regulations and
            optimize tax strategies
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-8">
          <CourseListCard
            image="/course/course1.png"
            title="Business Tax Compliance"
            price="149"
          />

          <CourseListCard
            image="/course/course2.png"
            title="Tax Planning Fundamentals"
            price="149"
          />

          <CourseListCard
            image="/course/course3.png"
            title="Advanced Tax Strategies"
            price="149"
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-[#1E40E6] rounded-2xl text-center py-14 px-6 text-white">
          <h3 className="text-2xl font-bold mb-3">
            Need Custom Tax Training for Your Team?
          </h3>

          <p className="text-sm text-blue-100 mb-6 max-w-xl mx-auto">
            We offer tailored corporate training programs for businesses and organizations
          </p>

          <button className="bg-white text-[#1E40E6] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Contact Us for Corporate Training
          </button>
        </div>

      </div>
    </section>
  );
}
