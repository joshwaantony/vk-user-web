



"use client";

import { useEffect, useState } from "react";
import useCourseStore from "@/store/CourseStore";
import AllCourseCard from "./AllCourseCard";
import AllCourseCardSkeleton from "../loader/AllCourseCardSkeleton";

export default function AllCourses() {
  const {
    courses,
    loading,
    loadingMore,
    error,
    pagination,
    loadMoreCourses,
  } = useCourseStore();

  // 👇 Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (bottom) {
        loadMoreCourses();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreCourses]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array.from({ length: 9 }).map((_, index) => (
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
        {courses.map((course) => (
          <AllCourseCard key={course.id} course={course} />
        ))}

        {loadingMore && (
          <>
            <AllCourseCardSkeleton />
            <AllCourseCardSkeleton />
            <AllCourseCardSkeleton />
          </>
        )}
      </div>

      {!loadingMore && pagination.hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMoreCourses}
            className="
              px-8 py-3.5
              bg-[#1C3FD1]
              text-white
              font-semibold
              rounded-xl
              shadow-lg shadow-[#1C3FD1]/20
              transition duration-300
              hover:bg-[#1532A8]
              hover:shadow-[#1532A8]/30
              hover:scale-[1.02]
              active:scale-95
              focus:outline-none
            "
          >
            Load More Courses
          </button>
        </div>
      )}
    </>
  );
}
