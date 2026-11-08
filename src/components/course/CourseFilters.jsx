


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useCourseStore from "@/store/CourseStore";
import { FiChevronDown, FiX } from "react-icons/fi";

// "" = Default: no sortBy is sent, backend returns the admin-configured order.
const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "LATEST", label: "Latest" },
  { value: "OLDEST", label: "Oldest" },
  { value: "PRICE_ASC", label: "Price: Low to High" },
  { value: "PRICE_DESC", label: "Price: High to Low" },
  { value: "POPULAR", label: "Popular" },
];

const SEARCH_DEBOUNCE_MS = 350;

export default function CourseFilters() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const sortRef = useRef(null);
  const languageRef = useRef(null);
  const searchInputRef = useRef(null);

  const {
    languages,
    languagesLoading,
    languagesError,
    selectedLanguageId,
    fetchActiveLanguages,
    setSelectedLanguageId,
    setSortBy,
    fetchCourses,
    filters,
    courses,
    loading,
    pagination,
  } = useCourseStore();

  const sortOption = filters.sortBy || "";
  const activeFilter = sortOption === "POPULAR" ? "popular" : sortOption === "" ? "all" : "";

  const [query, setQuery] = useState(filters.q || "");
  const [debouncedQuery, setDebouncedQuery] = useState((filters.q || "").trim());

  const selectedLanguageLabel = useMemo(() => {
    const match = languages.find((language) => language.id === selectedLanguageId);
    return match?.label || "Select language";
  }, [languages, selectedLanguageId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sortRef.current?.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (!languageRef.current?.contains(event.target)) {
        setIsLanguageOpen(false);
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

  /* ================= LANGUAGES ================= */
  useEffect(() => {
    fetchActiveLanguages();
  }, [fetchActiveLanguages]);

  /* ================= SEARCH (debounced) ================= */
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timerId);
  }, [query]);

  /* ================= SINGLE FETCH POINT =================
     One request per change of language, search or sort.
     sortBy "" is never sent, so the admin order is used by default. */
  useEffect(() => {
    if (!selectedLanguageId) return;

    fetchCourses({
      languageId: selectedLanguageId,
      q: debouncedQuery,
      sortBy: sortOption,
      page: 1,
    });
  }, [selectedLanguageId, debouncedQuery, sortOption, fetchCourses]);

  /* ================= CLEAR SEARCH =================
     Reset both values at once so the full list reloads immediately
     (no debounce wait) and keep focus in the box. */
  const handleClearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    searchInputRef.current?.focus();
  };

  /* ================= HANDLE FILTER BUTTONS ================= */
  const handleFilterChange = (type) => {
    setSortBy(type === "popular" ? "POPULAR" : "");
  };

  return (
    <div className="mt-10 space-y-6">
      
      {/* TOP ROW – Search + Language + Sort */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px_260px] gap-4 items-start">
        
        {/* Search */}
        <div className="w-full">
          <label className="mb-2 block text-xs font-medium text-[#475569] opacity-0 select-none">
            Search
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              🔍
            </span>
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape" && query) {
                  e.preventDefault();
                  handleClearSearch();
                }
              }}
              placeholder="Search Courses..."
              aria-label="Search courses"
              className="
                w-full h-[54px]
                bg-[#F8FAFC]
                border border-[#C5CDD7]
                rounded-xl
                pl-12 pr-12
                text-black
                placeholder:text-[#9CA3AF]
                focus:outline-none
              "
            />

            {query ? (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                title="Clear search"
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  flex h-8 w-8 items-center justify-center
                  rounded-full
                  text-[#64748B]
                  transition
                  hover:bg-[#E2E8F0] hover:text-[#0F172A]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1C3FD1]/30
                "
              >
                <FiX size={18} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Language Dropdown */}
        <div className="relative w-full" ref={languageRef}>
          <label className="mb-2 block text-xs font-medium text-[#475569] opacity-0 select-none">
            Language
          </label>
          <button
            type="button"
            onClick={() => setIsLanguageOpen((prev) => !prev)}
            disabled={languagesLoading || !languages.length}
            className="
              w-full
              bg-[#F8FAFC]
              border border-[#C5CDD7]
              rounded-xl
              h-[54px] px-4
              text-sm font-medium text-[#0F172A]
              transition
              hover:border-[#9AA6B2]
              focus:outline-none
              focus:ring-2 focus:ring-[#1C3FD1]/20 focus:border-[#1C3FD1]
              flex items-center justify-between
              disabled:cursor-not-allowed disabled:opacity-70
            "
            aria-haspopup="listbox"
            aria-expanded={isLanguageOpen}
          >
            <span className="truncate">
              {languagesLoading && !languages.length
                ? "Loading languages..."
                : selectedLanguageLabel}
            </span>
            <FiChevronDown
              className={`text-[#1C3FD1] transition-transform ${
                isLanguageOpen ? "rotate-180" : ""
              }`}
              size={18}
            />
          </button>

          {isLanguageOpen && languages.length ? (
            <div
              className="
                absolute z-30 mt-2 w-full
                rounded-xl border border-[#C5CDD7]
                bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]
                p-1
              "
              role="listbox"
              aria-label="Language select"
            >
              {languages.map((language) => {
                const isActive = language.id === selectedLanguageId;

                return (
                  <button
                    key={language.id}
                    type="button"
                    onClick={() => {
                      setSelectedLanguageId(language.id);
                      setIsLanguageOpen(false);
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
                    {language.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {languagesError ? (
            <p className="mt-2 text-xs text-red-600">{languagesError}</p>
          ) : null}
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full" ref={sortRef}>
          <label className="mb-2 block text-xs font-medium text-[#475569] opacity-0 select-none">
            Sort
          </label>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="
              w-full
              bg-[#F8FAFC]
              border border-[#C5CDD7]
              rounded-xl
              h-[54px] px-4
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
              {SORT_OPTIONS.find((opt) => opt.value === sortOption)
                ?.label || "Default"}
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
              {SORT_OPTIONS.map((option) => {
                const isActive = sortOption === option.value;

                return (
                  <button
                    key={option.value || "default"}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
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
            {loading ? "..." : (pagination?.totalItems ?? courses.length)}
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
