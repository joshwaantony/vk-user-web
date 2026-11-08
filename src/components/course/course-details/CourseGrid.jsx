



"use client";

import { useEffect, useState } from "react";
import useCourseStore from "@/store/CourseStore";
import CourseCard from "./CourseCard";
import AllCourseCardSkeleton from "@/components/loader/AllCourseCardSkeleton";
import { ErrorWithRetry } from "@/components/course/AllCourses";

const INITIAL_LIMIT = 6;

export default function CourseGrid() {
  const {
    popularCourses: courses,
    popularLoading: loading,
    popularError,
    popularCoursesTotal,
    fetchPopularCourses,
  } = useCourseStore();

  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [requested, setRequested] = useState(false);
  const skeletonCount = courses.length || limit;
  const showLoadMoreButton = popularCoursesTotal > limit;

  // GET /courses/popular?page=1&limit=<limit>
  useEffect(() => {
    setRequested(true);
    fetchPopularCourses(limit);
  }, [limit, fetchPopularCourses]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 3);
  };

  if (loading || !requested) {
    return (
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
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <AllCourseCardSkeleton key={index} />
        ))}
      </div>
    );
  }


  if (popularError && !courses.length) {
    return (
      <ErrorWithRetry
        className="mt-12 mb-6"
        message="We couldn't load popular courses right now. Please check your connection and try again."
        onRetry={() => fetchPopularCourses(limit)}
      />
    );
  }

  if (!courses.length) {
    return (
      <p className="mt-12 mb-6 px-4 text-center text-[#475569]">
        No popular courses available yet.
      </p>
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
      {courses?.map((course) => (
  <CourseCard
    key={course.id}
    course={course}
  />
))}
      </div>

      {showLoadMoreButton && (
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
              py-3 mb-6
              rounded-xl
              hover:bg-[#1E40E6]
              hover:text-white
              transition
            "
          >
            View All Courses
          </button>
        </div>
      )}
    </>
  );
}
