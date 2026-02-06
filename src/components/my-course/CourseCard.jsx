




import { FiInfo, FiClock } from "react-icons/fi";

export default function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden transition hover:shadow-md">
      {/* ================= IMAGE ================= */}
      <div className="relative">
        <img
          src={course.image || "/course-placeholder.jpg"}
          alt={course.title || "Course"}
          className="
            w-full 
            h-40 sm:h-44 md:h-48 
            object-cover
          "
        />

        {/* Category */}
        <span className="
          absolute top-2 right-2 sm:top-3 sm:right-3
          bg-blue-600 text-white
          text-[10px] sm:text-xs
          px-2.5 py-1
          rounded-full
        ">
          {course.category}
        </span>

        {/* Progress */}
        <div className="
          absolute bottom-2 left-2 right-2 
          sm:bottom-3 sm:left-3 sm:right-3
          bg-white rounded-lg px-3 py-2
        ">
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 mb-1">
            <span>{course.lessons}</span>
            <span>{course.progress}%</span>
          </div>

          <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full">
            <div
              className="h-1.5 sm:h-2 bg-blue-600 rounded-full"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 sm:p-5">
        <h3 className="
          font-semibold 
          text-base sm:text-lg 
          text-gray-900
          line-clamp-2
        ">
          {course.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          by {course.instructor}
        </p>

        {/* Duration & Last Accessed */}
        <div className="
          flex flex-col gap-1 
          sm:flex-row sm:justify-between sm:items-center
          text-xs sm:text-sm text-gray-500 
          mt-4
        ">
          <span className="flex items-center gap-2">
            <FiClock className="text-gray-400" size={14} />
            {course.duration}
          </span>

          <span className="text-[11px] sm:text-xs">
            Last accessed {course.lastAccessed}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <button className="
            flex-1 
            bg-blue-600 text-white 
            py-2 sm:py-2.5 
            rounded-lg 
            text-sm sm:text-base 
            font-semibold 
            hover:bg-blue-700 
            transition
          ">
            Continue Learning
          </button>

          <button className="
            w-9 h-9 sm:w-10 sm:h-10 
            border rounded-lg 
            flex items-center justify-center 
            text-gray-600 
            hover:text-blue-600 
            transition
          ">
            <FiInfo size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
