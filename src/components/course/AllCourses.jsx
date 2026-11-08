



"use client";

import { useEffect } from "react";
import useCourseStore from "@/store/CourseStore";
import AllCourseCard from "./AllCourseCard";
import AllCourseCardSkeleton from "../loader/AllCourseCardSkeleton";

export function ErrorWithRetry({ message, onRetry, className = "mt-10" }) {
  return (
    <div className={`flex flex-col items-center gap-4 px-4 ${className}`} role="alert">
      <p className="text-center text-red-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-6 py-2.5 rounded-xl border border-[#1C3FD1] text-[#1C3FD1] font-semibold hover:bg-[#1C3FD1] hover:text-white transition"
      >
        Retry
      </button>
    </div>
  );
}

export default function AllCourses() {
  const {
    courses,
    loading,
    loadingMore,
    hasLoaded,
    error,
    pagination,
    loadMoreCourses,
    fetchCourses,
    fetchActiveLanguages,
    filters,
    languages,
    languagesLoaded,
    languagesLoading,
    languagesError,
    selectedLanguageId,
  } = useCourseStore();

  const selectedLanguageLabel =
    languages.find((language) => language.id === selectedLanguageId)?.label || "";

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

  // No language available at all (none active, or languages failed to load).
  if (languagesLoaded && !languagesLoading && !selectedLanguageId) {
    if (languagesError) {
      return (
        <ErrorWithRetry
          message="We couldn't load courses right now. Please check your connection and try again."
          onRetry={fetchActiveLanguages}
        />
      );
    }

    return (
      <p className="text-center mt-10 text-[#475569]">
        No course languages are available right now.
      </p>
    );
  }

  // Loading, or waiting for languages / the first request of this language.
  if (loading || !hasLoaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <AllCourseCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error && !courses.length) {
    return (
      <ErrorWithRetry
        message="We couldn't load courses right now. Please check your connection and try again."
        onRetry={() => fetchCourses({ page: 1 })}
      />
    );
  }

  if (!courses.length) {
    // `filters` are the ones that produced this (empty) result.
    const languageText = selectedLanguageLabel || "this language";
    const emptyMessage = filters.q?.trim()
      ? "No courses found matching your search."
      : filters.sortBy === "POPULAR"
        ? `No popular courses available for ${languageText} yet.`
        : `No courses available in ${languageText} yet.`;

    return (
      <p className="text-center mt-12 text-[#475569]">{emptyMessage}</p>
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

      {error ? (
        <p className="text-center mt-8 text-red-500">
          {"We couldn't load more courses. Please try again."}
        </p>
      ) : null}

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
