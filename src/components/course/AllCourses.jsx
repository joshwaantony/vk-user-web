// import AllCourseCard from "./AllCourseCard";

// export default function AllCourses() {
//   const courses = [
//     {
//       id: 1,
//       title: "Financial Accounting Fundamentals",
//       rating: 4.8,
//       students: "12,500",
//       instructor: "Dr. Sarah Johnson",
//       duration: "8 weeks",
//       price: 149,
//       image: "/course/course1.jpg",
//     },
//     {
//       id: 2,
//       title: "Advanced Tax Strategies",
//       rating: 4.8,
//       students: "12,500",
//       instructor: "Dr. Sarah Johnson",
//       duration: "8 weeks",
//       price: 199,
//       image: "/course/course2.jpg",
//     },
//     {
//       id: 3,
//       title: "Corporate Finance Mastery",
//       rating: 4.8,
//       students: "12,500",
//       instructor: "Dr. Sarah Johnson",
//       duration: "8 weeks",
//       price: 249,
//       image: "/course/course3.jpg",
//     },
//   ];

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {courses.map(course => (
//           <AllCourseCard key={course.id} course={course} />
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect } from "react";
import useCourseStore from "@/store/CourseStore";
import AllCourseCard from "./AllCourseCard";

export default function AllCourses() {
  const { courses, fetchAllCourses, loading, error } = useCourseStore();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading courses...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {courses.map((course) => (
        <AllCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
