



"use client";

import { useEffect, useState } from "react";
import useCourseStore from "@/store/CourseStore";
import AllCourseCard from "./AllCourseCard";
import AllCourseCardSkeleton from "../loader/AllCourseCardSkeleton";

export default function AllCourses() {
  const { courses, fetchAllCourses, loading, error } = useCourseStore();

  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // 👇 Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (bottom) {
        setVisibleCount((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

if (loading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <AllCourseCardSkeleton key={index} />
      ))}
    </div>
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {courses.slice(0, visibleCount).map((course) => (
          <AllCourseCard key={course.id} course={course} />
        ))}
      </div>

  
    </>
  );
}