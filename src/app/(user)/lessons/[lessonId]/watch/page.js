// import LessonContent from "@/components/course/course-lesson/LessonContent";
// import LessonSidebar from "@/components/course/course-lesson/LessonSidebar";

// export default function LessonWatchPage() {
//     return (
//         <div className="
//       min-h-screen
//       flex
//       flex-col
//       lg:flex-row
//     ">
//             {/* MAIN CONTENT */}
//             <LessonContent />

//             {/* SIDEBAR (GOES BELOW ON MOBILE) */}
//             <LessonSidebar />
//         </div>
//     );
// }
// "use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";

// import LessonContent from "@/components/course/course-lesson/LessonContent";
// import LessonSidebar from "@/components/course/course-lesson/LessonSidebar";
// import useLessonStore from "@/store/useLessonStore";

// export default function LessonWatchPage() {
//   const { lessonId } = useParams();

//   const { lesson, loading, error, fetchLesson } = useLessonStore();

//   useEffect(() => {
//     if (lessonId) {
//       fetchLesson(lessonId);
//     }
//   }, [lessonId, fetchLesson]);

//   if (loading) {
//     return <p className="p-10">Loading lesson...</p>;
//   }

//   if (error) {
//     return <p className="p-10 text-red-500">{error}</p>;
//   }

//   if (!lesson) {
//     return <p className="p-10">Lesson not found</p>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       <LessonContent lesson={lesson} />
//       <LessonSidebar lesson={lesson} />
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import LessonContent from "@/components/course/course-lesson/LessonContent";
import LessonSidebar from "@/components/course/course-lesson/LessonSidebar";
import useLessonStore from "@/store/useLessonStore";

export default function LessonWatchPage() {
  const { lessonId } = useParams();

  const { lesson, loading, error, fetchLesson } = useLessonStore();

  useEffect(() => {
    if (lessonId) {
      fetchLesson(lessonId);
    }
  }, [lessonId, fetchLesson]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading lesson...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Lesson not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#EEF5FF]">
      <LessonContent lesson={lesson} />
      <LessonSidebar lesson={lesson} />
    </div>
  );
}