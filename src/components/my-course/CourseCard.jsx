



import { FiInfo, FiClock } from "react-icons/fi";

export default function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div
      className="
        bg-white rounded-2xl border overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-lg
        group
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative overflow-hidden">
        <img
          src={course.image || "/course-placeholder.jpg"}
          alt={course.title || "Course"}
          className="
            w-full 
            h-56 sm:h-60 md:h-64 
            object-cover
            transition-transform duration-300
            group-hover:scale-110
          "
        />

        {/* Category */}
        <span
          className="
            absolute top-3 right-3
            bg-blue-600 text-white
            text-xs
            px-3 py-1
            rounded-full
          "
        >
          {course.category}
        </span>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 sm:p-5">
        <h3
          className="
            font-semibold 
            text-base sm:text-lg 
            text-gray-900
            line-clamp-2
          "
        >
          {course.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          by {course.instructor}
        </p>

        {/* 🔥 PROGRESS (Moved Below Image) */}
        <div className="mt-4">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>{course.lessons}</span>
            <span className="font-medium text-blue-600">
              {course.progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="
                h-2 bg-blue-600 rounded-full
                transition-all duration-500
              "
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        {/* Duration & Last Accessed */}
        <div
          className="
            flex flex-col gap-1 
            sm:flex-row sm:justify-between sm:items-center
            text-xs sm:text-sm text-gray-500 
            mt-4
          "
        >
          <span className="flex items-center gap-2">
            <FiClock className="text-gray-400" size={14} />
            {course.duration}
          </span>

          <span className="text-[11px] sm:text-xs">
            Last accessed {course.lastAccessed}
          </span>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center gap-3 mt-5">
          <button
            className="
              flex-1 
              bg-blue-600 text-white 
              py-2 sm:py-2.5 
              rounded-lg 
              text-sm sm:text-base 
              font-semibold 
              transition-all duration-300
              hover:bg-blue-700
              hover:shadow-md
              hover:-translate-y-[1px]
              active:scale-95
            "
          >
            Continue Learning
          </button>

          <button
            className="
              w-9 h-9 sm:w-10 sm:h-10 
              border rounded-lg 
              flex items-center justify-center 
              text-gray-600 
              transition-all duration-300
              hover:text-blue-600
              hover:border-blue-600
              hover:scale-105
              active:scale-95
            "
          >
            <FiInfo size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}