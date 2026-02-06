
import { FiCheckCircle, FiClock } from "react-icons/fi";

export default function CompletedCourses() {
  const completedCourses = [
    {
      id: 1,
      title: "Corporate Finance Mastery",
      instructor: "Prof. Emily Rodriguez",
      duration: "12 weeks",
      completedAt: "2 weeks ago",
      lessonsCompleted: 36,
      image: "/course/course1.png",
    },
    {
      id: 2,
      title: "Investment Analysis & Portfolio Management",
      instructor: "Dr. Robert Taylor",
      duration: "14 weeks",
      completedAt: "1 month ago",
      lessonsCompleted: 42,
      image: "/course/course3.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-5 sm:mb-6">
        Completed Courses
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {completedCourses.map((course) => (
          <div
            key={course.id}
            className="
              bg-white rounded-2xl border overflow-hidden
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:scale-[1.02]
              hover:shadow-lg
            "
          >
            {/* ================= IMAGE ================= */}
            <div className="relative overflow-hidden group">
              <img
                src={course.image}
                alt={course.title}
                className="
                  w-full
                  h-40 sm:h-44 md:h-48
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-110
                "
              />

              {/* Check icon */}
              <span
                className="
                  absolute top-2 left-2
                  sm:top-3 sm:left-3
                  bg-green-500 text-white
                  w-7 h-7 sm:w-8 sm:h-8
                  rounded-full
                  flex items-center justify-center
                  transition-transform duration-300
                  group-hover:scale-110
                "
              >
                <FiCheckCircle size={16} />
              </span>

              {/* Completed badge */}
              <span
                className="
                  absolute top-2 right-2
                  sm:top-3 sm:right-3
                  bg-green-500 text-white
                  text-[10px] sm:text-xs
                  px-2.5 py-1
                  rounded-full
                "
              >
                Completed
              </span>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="p-4 sm:p-6">
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

              {/* Duration & Completed Date */}
              <div
                className="
                  flex flex-col gap-1
                  sm:flex-row sm:justify-between sm:items-center
                  text-xs sm:text-sm text-gray-500
                  mt-4
                "
              >
                <span className="flex items-center gap-2">
                  <FiClock size={14} />
                  {course.duration}
                </span>

                <span className="text-[11px] sm:text-xs">
                  Completed {course.completedAt}
                </span>
              </div>

              {/* Lessons completed */}
              <p className="text-green-600 text-sm sm:text-base font-semibold mt-4">
                {course.lessonsCompleted} lessons completed
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
