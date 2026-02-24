



import AllCourses from "./AllCourses";
import CourseFilters from "./CourseFilters";
import SlideDesign from "./courseslide/SlideDesign";

export default function CoursesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-3xl text-black font-bold text-center">
          Explore Our Courses
        </h2>

        <p className="text-center text-[#475569] mt-2">
          Browse our extensive library of professional courses and find the right one to
          <br />
          elevate your career
        </p>
        <div className="pt-20">
          <SlideDesign/>
        </div>

        <CourseFilters />

        {/* 👇 Course List */}
        <div className="">
          <AllCourses />
        </div>
        

       
      </div>
    </section>
  );
}
