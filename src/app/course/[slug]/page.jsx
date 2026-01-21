import CourseContent from "@/components/course/course-details/CourseContent";
import CourseHero from "@/components/course/course-details/CourseHero";
import CourseSidebar from "@/components/course/course-details/CourseSidebar";


export default function Page() {
  return (
    <section className="bg-[#EEF5FF] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <CourseHero />
          <CourseContent />
        </div>

        {/* RIGHT */}
        <CourseSidebar />

      </div>
    </section>
  );
}
