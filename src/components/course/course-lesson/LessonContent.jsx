import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiMaximize,
} from "react-icons/fi";

export default function LessonContent() {
  return (
    <div className="flex-1 flex flex-col bg-[#0F172A] text-white">

      {/* ================= TOP BAR ================= */}
      <div className="h-16 flex items-center px-4 sm:px-6 bg-[#0B1220] border-b border-white/10">

        {/* LEFT : BACK */}
        <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-300">
          <FiArrowLeft />
          <span className="hidden sm:inline">Back to Courses</span>
        </div>

        {/* CENTER / RIGHT SHIFTED TITLE */}
        <div className="
          flex-1
          flex
          justify-center
          sm:justify-start
          sm:ml-24
          lg:ml-48
          xl:ml-64
          items-center
          gap-2
          text-gray-300
          text-sm
        ">
          <FiBookOpen />
          <span className="whitespace-nowrap">
            Financial Accounting Fundamentals
          </span>
        </div>
      </div>



      {/* ================= HERO IMAGE ================= */}
<div className="relative">
  <img
    src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
    alt="lesson"
    className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover"
  />

  {/* FULLSCREEN ICON */}
  <button
    className="
      absolute
      bottom-4
      right-4
      bg-black/60
      hover:bg-black/80
      text-white
      p-2.5
      rounded-lg
      transition
    "
    aria-label="Fullscreen"
  >
    <FiMaximize size={18} />
  </button>
</div>


      {/* ================= LESSON DETAILS ================= */}
      <div className="px-4 sm:px-8 py-6 border-t border-white/10">

        <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
          <h2 className="text-lg sm:text-xl font-semibold">
            What is Financial Accounting?
          </h2>

          <div className="flex items-center gap-1 text-sm text-gray-400">
            <span>🕒</span>
            <span>12:45</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-1">
          Learn the basics of financial accounting and its importance in business
          decision-making
        </p>

        <p className="text-gray-500 text-xs mb-6">
          Section 1: Introduction to Accounting
        </p>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

          {/* PREVIOUS LESSON */}
          <button
            disabled
            className="
              px-5 py-3 rounded-lg
              bg-[#1E293B]
              text-gray-400
              flex items-center gap-2
              cursor-not-allowed
              text-sm
            "
          >
            <FiArrowLeft />
            Previous Lesson
          </button>

          {/* COMPLETED */}
          <button className="px-5 py-3 rounded-lg bg-[#16A34A] font-medium flex items-center gap-2 text-sm">
            <FiCheckCircle />
            Completed
          </button>

          {/* NEXT LESSON */}
        <button className="px-5 py-3 rounded-lg bg-[#2563EB] font-medium flex items-center gap-2 text-sm text-white hover:bg-[#1E4ED8] transition">
  Next Lesson
  <FiArrowRight className="text-lg" />
</button>
        </div>
      </div>

      {/* ================= INSTRUCTOR ================= */}
      <div className="px-4 sm:px-8 py-6 bg-[#0B1220] border-t border-white/10 flex gap-4">

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          alt="Instructor"
        />

        <div>
          <p className="font-medium">Dr. Sarah Johnson</p>
          <p className="text-sm text-gray-400">
            CPA, PhD in Accounting
          </p>
          <p className="text-sm text-yellow-400">
            ⭐ 4.8 <span className="text-gray-400">· 12,500 students</span>
          </p>
        </div>
      </div>
    </div>
  );
}
