


// import courses from "@/data/courses";
// import CourseCard from "./CourseCard";

// export default function CourseGrid() {
//   return (
//     <div
//       className="
//         mt-12
//         px-4          /* mobile */
//         sm:px-10       /* tablet */
//         lg:px-24      /* desktop */
//         xl:px-32      /* large desktop */
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-3
//         gap-6
//         lg:gap-8
//       "
//     >
//       {courses.map((course) => (
//         <CourseCard
//           key={course.id}
//           image={course.image}
//           title={course.title}
//           rating={course.rating}
//           students={course.students}
//           instructor={course.instructor}
//           duration={course.duration}
//           price={course.price}
//         />
//       ))}
//     </div>
//   );
// }



// "use client";

// import { useEffect } from "react";
// import usePopularCourseStore from "@/store/CourseStore";
// import CourseCard from "./CourseCard";
// import PromoLoader from "@/components/loader/PromoLoader";

// export default function CourseGrid() {
//   const { courses, loading, fetchPopularCourses } =
//     usePopularCourseStore();

//   useEffect(() => {
//     fetchPopularCourses(6);
//   }, []);

//   if (loading) {
//     return (
//       <div className="">
//       <PromoLoader/>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="
//         mt-12
//         px-4
//         sm:px-10
//         lg:px-24
//         xl:px-32
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-3
//         gap-6
//         lg:gap-8
//       "
//     >
//       {courses.map((course) => (
//         <CourseCard
//           key={course.id}
//           id={course.id}
//           image={course.thumbnail}
//           title={course.title}
//           rating="4.8"              // backend illa → temp
//           students={course.totalStudents}
//           instructor={course.faculty?.[0]?.name || "Instructor"}
//           duration={`${course.duration} mins`}
//           price={course.price}
//         />
//       ))}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import usePopularCourseStore from "@/store/CourseStore";
import CourseCard from "./CourseCard";
import PromoLoader from "@/components/loader/PromoLoader";

export default function CourseGrid() {
  const { courses, loading, fetchPopularCourses } =
    usePopularCourseStore();

  const [limit, setLimit] = useState(6); // 👈 initial 6

  useEffect(() => {
    fetchPopularCourses(limit);
  }, [limit]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 3); // 👈 add 3 more
  };

  if (loading) {
    return (
      <div>
        <PromoLoader />
      </div>
    );
  }

  return (
    <>
      <div
        className="
          mt-12
          px-4
          sm:px-10
          lg:px-24
          xl:px-32
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          lg:gap-8
        "
      >
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            image={course.thumbnail}
            title={course.title}
            rating="4.8"
            students={course.totalStudents}
            instructor={course.faculty?.[0]?.name || "Instructor"}
            duration={`${course.duration} mins`}
            price={course.price}
          />
        ))}
      </div>

      {/* 👇 Load More Button */}
      <div className="w-full flex justify-center mt-12 ">
        <button
          onClick={handleLoadMore}
          className="
            border
            border-[#1E40E6]
            text-[#1E40E6]
            font-semibold
            text-base sm:text-lg
            px-6 sm:px-8 md:px-10
            py-3
            rounded-xl
            hover:bg-[#1E40E6]
            hover:text-white
            transition
          "
        >
          View All Courses
        </button>
      </div>
    </>
  );
}