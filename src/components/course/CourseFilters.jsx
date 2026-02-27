


"use client";

import { useEffect, useState } from "react";
import useCourseStore from "@/store/CourseStore";

export default function CourseFilters() {
  const [activeFilter, setActiveFilter] = useState("all");

  const {
    fetchAllCourses,
    fetchPopularCourses,
    courses,
    loading,
  } = useCourseStore();

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchAllCourses();
  }, []);

  /* ================= HANDLE FILTER ================= */
  const handleFilterChange = async (type) => {
    setActiveFilter(type);

    if (type === "all") {
      fetchAllCourses();
    } else {
      fetchPopularCourses();
    }
  };

  return (
    <div className="mt-10 space-y-6">
      
      {/* TOP ROW – Search + Category */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
            🔍
          </span>
          <input
            placeholder="Search Courses..."
            className="
              w-full
              bg-[#F8FAFC]
              border border-[#C5CDD7]
              rounded-xl
              pl-12 pr-4 py-3
              text-black
              placeholder:text-[#9CA3AF]
              focus:outline-none
            "
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full lg:w-[260px]">
          <select
            className="
              w-full
              bg-[#F8FAFC]
              border border-[#C5CDD7]
              rounded-xl
              px-4 py-3
              text-black
              appearance-none
              focus:outline-none
            "
          >
            <option>All Courses</option>
            <option>Popular Courses</option>
          
          </select>

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      {/* BOTTOM ROW – Results + Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Showing Results */}
        <p className="text-sm text-[#475569]">
          Showing{" "}
          <span className="font-semibold">
            {loading ? "..." : courses.length}
          </span>{" "}
          Results
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => handleFilterChange("all")}
            className={`
              px-6 py-3
              rounded-xl
              text-sm
              font-medium
              transition
              ${
                activeFilter === "all"
                  ? "bg-[#1C3FD1] text-white"
                  : "bg-white border border-[#C5CDD7] text-black hover:bg-[#F1F5F9]"
              }
            `}
          >
            All Courses
          </button>

          <button
            onClick={() => handleFilterChange("popular")}
            className={`
              px-6 py-3
              rounded-xl
              text-sm
              font-medium
              transition
              ${
                activeFilter === "popular"
                  ? "bg-[#1C3FD1] text-white"
                  : "bg-white border border-[#C5CDD7] text-black hover:bg-[#F1F5F9]"
              }
            `}
          >
            Popular Courses
          </button>

        </div>
      </div>
    </div>
  );
}