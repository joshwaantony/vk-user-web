export default function CourseFilters() {
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

        {/* All Categories Dropdown */}
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
            <option>All Categories</option>
            <option>Finance</option>
            <option>Accounting</option>
            <option>Tax Planning</option>
          </select>

          {/* Dropdown Arrow */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
            ▼
          </span>
        </div>
      </div>

      {/* BOTTOM ROW – Results + Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Showing Results */}
        <p className="text-sm text-[#475569]">
          Showing <span className="font-semibold">9</span> Results
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4">
          {["All Courses", "Popular Courses"].map(
            (item, i) => (
              <button
                key={i}
                className={`
                  px-6 py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  ${
                    i === 0
                      ? "bg-[#1C3FD1] text-white"
                      : "bg-white border border-[#C5CDD7] text-black hover:bg-[#F1F5F9]"
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
