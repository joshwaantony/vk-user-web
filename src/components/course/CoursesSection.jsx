import CourseFilters from "./CourseFilters";
import CourseGrid from "./CourseGrid";

export default function CoursesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-3xl text-black font-bold text-center">
          Explore Our Courses
        </h2>

        <p className="text-center text-[#475569] mt-2">
         Browse our extensive library of professional courses and find the right one to <br />elevate your career
        </p>

        <CourseFilters />
        <CourseGrid />

        <div className="flex justify-center mt-10">
          <button className="border-2 bg-white text-[#1C4ED8] font-semibold border-[#1C4ED8] px-6 py-2 rounded-lg">
            Load More
          </button>
        </div>

      </div>
    </section>
  );
}
