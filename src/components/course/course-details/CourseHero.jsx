import { HiArrowLeft, HiStar } from "react-icons/hi";
import { FiUsers, FiClock, FiPlay } from "react-icons/fi";

export default function CourseHero() {
  return (
    <>
      {/* BACK BUTTON */}
      <button className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold mb-3">
        <HiArrowLeft className="text-base sm:text-lg" />
        Back to Courses
      </button>

      <div className="bg-white rounded-2xl overflow-hidden border">

        {/* IMAGE WITH OVERLAY */}
        <div className="relative h-[200px] sm:h-[240px] lg:h-[260px] w-full">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
            className="h-full w-full object-cover"
            alt="course"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/30" />

          {/* BADGE + TITLE */}
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 space-y-2 max-w-[90%]">
          

            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white leading-snug drop-shadow">
              Financial Accounting Fundamentals
            </h1>
          </div>
        </div>

        {/* CONTENT BELOW IMAGE */}
        <div className="p-4 sm:p-6 space-y-4">

          <p className="text-sm text-gray-600">
            Master the essential principles of financial accounting, from basic
            concepts to advanced reporting techniques.
          </p>

          {/* META INFO */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-1">
              <HiStar className="text-yellow-400" /> 4.8 rating
            </span>
            <span className="flex items-center gap-1">
              <FiUsers /> 12,500 students
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> 8 weeks
            </span>
            <span className="flex items-center gap-1">
              <FiPlay /> 24 lessons
            </span>
          </div>

          {/* INSTRUCTOR */}
          <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full"
              alt="instructor"
            />
            <div>
              <p className="text-sm text-black font-semibold">
                Dr. Sarah Johnson
              </p>
              <p className="text-xs text-gray-500">
                CPA, PhD in Accounting
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
