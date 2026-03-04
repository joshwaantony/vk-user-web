


"use client";

import { useEffect, useRef, useState } from "react";
import useCourseStore from "@/store/CourseStore";
import { FiChevronDown } from "react-icons/fi";

export default function CourseFilters() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  const {
    fetchCourses,
    courses,
    loading,
  } = useCourseStore();

  const sortOptions = [
    { value: "", label: "All" },
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Popular" },
  ];

  const resolveSortBy = (filterType, optionValue) => {
    if (filterType === "popular") return "POPULAR";
    if (optionValue === "latest") return "LATEST";
    if (optionValue === "oldest") return "OLDEST";
    if (optionValue === "popular") return "POPULAR";
    if (filterType === "all") return "LATEST";
    return "LATEST";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sortRef.current?.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchCourses({
        q: query.trim(),
        categoryId: "",
        level: "",
        minPrice: 0,
        maxPrice: 10000,
        sortBy: resolveSortBy(activeFilter, sortOption),
        page: 1,
        limit: 9,
      });
    }, 350);

    return () => clearTimeout(timerId);
  }, [query, sortOption, activeFilter, fetchCourses]);

  /* ================= HANDLE FILTER ================= */
  const handleFilterChange = (type) => {
    setActiveFilter(type);
    fetchCourses({
      q: query.trim(),
      categoryId: "",
      level: "",
      minPrice: 0,
      maxPrice: 10000,
      sortBy: resolveSortBy(type, sortOption),
      page: 1,
      limit: 9,
    });
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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

        {/* Sort Dropdown */}
        <div className="relative w-full lg:w-[260px]" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="
              w-full
              bg-[#F8FAFC]
              border border-[#C5CDD7]
              rounded-xl
              px-4 py-3
              text-sm font-medium text-[#0F172A]
              transition
              hover:border-[#9AA6B2]
              focus:outline-none
              focus:ring-2 focus:ring-[#1C3FD1]/20 focus:border-[#1C3FD1]
              flex items-center justify-between
            "
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
          >
            <span>
              {sortOptions.find((opt) => opt.value === sortOption)
                ?.label || "All"}
            </span>
            <FiChevronDown
              className={`text-[#1C3FD1] transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          {isSortOpen && (
            <div
              className="
                absolute z-30 mt-2 w-full
                rounded-xl border border-[#C5CDD7]
                bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]
                p-1
              "
              role="listbox"
              aria-label="Sort courses"
            >
              {sortOptions.map((option) => {
                const isActive = sortOption === option.value;

                return (
                  <button
                    key={option.value || "all"}
                    type="button"
                    onClick={() => {
                      setSortOption(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg text-sm transition
                      ${
                        isActive
                          ? "bg-[#1C3FD1] text-white"
                          : "text-[#0F172A] hover:bg-[#F1F5F9]"
                      }
                    `}
                    role="option"
                    aria-selected={isActive}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
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
