import LessonContent from "@/components/course/course-lesson/LessonContent";
import LessonSidebar from "@/components/course/course-lesson/LessonSidebar";

export default function CourseLessonPage() {
  return (
    <div className="
      min-h-screen
      flex
      flex-col
      lg:flex-row
    ">
      {/* MAIN CONTENT */}
      <LessonContent />

      {/* SIDEBAR (GOES BELOW ON MOBILE) */}
      <LessonSidebar />
    </div>
  );
}
