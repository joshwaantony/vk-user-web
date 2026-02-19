
// "use client";

// import { useEffect } from "react";
// import { useParams } from "next/navigation";
// import useCourseStore from "@/store/CourseStore";

// import CourseHero from "@/components/course/course-details/CourseHero";
// import WhatYouWillLearn from "@/components/course/course-details/WhatYouWillLearn";
// import CourseContent from "@/components/course/course-details/CourseContent";
// import CourseSidebar from "@/components/course/course-details/CourseSidebar";

// export default function CourseDetailPage() {
//   const { courseId } = useParams();
//   const { course, loading, fetchCourseById } = useCourseStore();

//   useEffect(() => {
//     if (courseId) {
//       fetchCourseById(courseId);
//     }
//   }, [courseId, fetchCourseById]);

//   if (loading) {
//     return <div className="p-10">
//       <div className="min-h-screen bg-[#EEF5FF] animate-pulse">
//       <div
//         className="
//           max-w-7xl mx-auto px-4 py-8
//           grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
//         "
//       >
//         {/* LEFT CONTENT */}
//         <div className="h-[800px] overflow-y-auto space-y-8 pr-2">

//           {/* ===== Course Hero Skeleton ===== */}
//           <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
//             <div className="h-8 w-3/4 bg-gray-300 rounded" />
//             <div className="h-4 w-1/2 bg-gray-200 rounded" />
//             <div className="h-4 w-2/3 bg-gray-200 rounded" />
//             <div className="h-48 w-full bg-gray-300 rounded-xl mt-4" />
//           </div>

//           {/* ===== What You Will Learn Skeleton ===== */}
//           <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
//             <div className="h-6 w-1/3 bg-gray-300 rounded" />
//             <div className="space-y-3">
//               <div className="h-4 w-full bg-gray-200 rounded" />
//               <div className="h-4 w-5/6 bg-gray-200 rounded" />
//               <div className="h-4 w-4/6 bg-gray-200 rounded" />
//               <div className="h-4 w-3/4 bg-gray-200 rounded" />
//             </div>
//           </div>

//           {/* ===== Course Content Skeleton ===== */}
//           <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
//             <div className="h-6 w-1/3 bg-gray-300 rounded" />

//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="flex justify-between items-center bg-gray-100 rounded-lg p-4"
//               >
//                 <div className="h-4 w-1/2 bg-gray-300 rounded" />
//                 <div className="h-4 w-16 bg-gray-300 rounded" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm h-fit space-y-4">
//           <div className="h-40 w-full bg-gray-300 rounded-xl" />
//           <div className="h-6 w-1/2 bg-gray-300 rounded" />
//           <div className="h-10 w-full bg-gray-400 rounded-xl" />
//           <div className="h-4 w-3/4 bg-gray-200 rounded" />
//           <div className="h-4 w-2/3 bg-gray-200 rounded" />
//         </div>
//       </div>
//     </div>
//     </div>;
//   }

//   if (!course) {
//     return <p className="p-10">Course not found</p>;
//   }

//   return (
//     <div className="min-h-screen bg-[#EEF5FF]">
//       <div
//         className="
//           max-w-7xl mx-auto px-4 py-8
//           grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
//         "
//       >
//         {/* LEFT CONTENT */}
//         <div className="h-[800px] overflow-y-auto space-y-8 pr-2">
//           <CourseHero course={course} />
//           <WhatYouWillLearn points={course.learningOutcomes || []} />
//           <CourseContent
//             sections={course.sections || []}
//             totalLessons={course.totalLessons}
//           />
//         </div>

//         {/* RIGHT SIDEBAR */}
//         <CourseSidebar course={course} />
//       </div>
//     </div>
   
//   );
// }



"use client";

import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import useCourseStore from "@/store/CourseStore";

import CourseHero from "@/components/course/course-details/CourseHero";
import WhatYouWillLearn from "@/components/course/course-details/WhatYouWillLearn";
import CourseContent from "@/components/course/course-details/CourseContent";
import CourseSidebar from "@/components/course/course-details/CourseSidebar";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { course, loading, fetchCourseById } = useCourseStore();

  const isFromPayment = searchParams.get("enrolled");

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [courseId, fetchCourseById]);

  // ✅ Remove query param after load (clean URL)
  useEffect(() => {
    if (isFromPayment) {
      router.replace(`/course/${courseId}`);
    }
  }, [isFromPayment, router, courseId]);

  if (loading) {
    return (
      <div className="p-10">
        <div className="min-h-screen bg-[#EEF5FF] animate-pulse">
          <div
            className="
              max-w-7xl mx-auto px-4 py-8
              grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
            "
          >
            {/* LEFT CONTENT */}
            <div className="h-[800px] overflow-y-auto space-y-8 pr-2">
              <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="h-8 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-48 w-full bg-gray-300 rounded-xl mt-4" />
              </div>

              <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center bg-gray-100 rounded-lg p-4"
                  >
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit space-y-4">
              <div className="h-40 w-full bg-gray-300 rounded-xl" />
              <div className="h-6 w-1/2 bg-gray-300 rounded" />
              <div className="h-10 w-full bg-gray-400 rounded-xl" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return <p className="p-10">Course not found</p>;
  }

  return (
    <div className="min-h-screen bg-[#EEF5FF]">
      <div
        className="
          max-w-7xl mx-auto px-4 py-8
          grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
        "
      >
        {/* LEFT CONTENT */}
        <div className="h-[800px] overflow-y-auto space-y-8 pr-2">
          <CourseHero course={course} />
          <WhatYouWillLearn points={course.learningOutcomes || []} />
          <CourseContent
            sections={course.sections || []}
            totalLessons={course.totalLessons}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <CourseSidebar course={course} />
      </div>
    </div>
  );
}
