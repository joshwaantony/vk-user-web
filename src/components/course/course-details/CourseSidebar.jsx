import { FiPlayCircle, FiVideo, FiDownload, FiSmartphone } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { BsInfinity } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";

export default function CourseSidebar() {
  return (
    <aside className="w-full lg:max-w-sm">

      {/* Sticky only on desktop */}
      <div className="space-y-6 lg:sticky lg:mt-9">

        {/* PRICE CARD */}
        <div className="bg-[#1F3FD7] text-white rounded-2xl p-4 sm:p-6 text-center">
          <p className="text-xs sm:text-sm opacity-80">
            Course Price
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold my-2">
            $149
          </h2>

          <button className="mt-4 w-full bg-white text-[#1F3FD7] flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base">
            <FiPlayCircle size={18} />
            Continue Learning
          </button>
        </div>

        {/* PROGRESS CARD */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border">
          <h4 className="font-semibold text-black mb-4">
            Your Progress
          </h4>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#3D3B3B]">
              Course Completion
            </span>
            <span className="font-semibold text-black">
              13%
            </span>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div className="h-2 bg-[#1F3FD7] rounded-full w-[13%]" />
          </div>

          <p className="text-xs text-[#3D3B3B] mb-6">
            3 of 24 lessons completed
          </p>

          <h5 className="font-semibold text-black mb-3">
            This course includes:
          </h5>

          {/* COURSE FEATURES */}
          <ul className="space-y-3 text-xs sm:text-sm text-[#3D3B3B]">
            <li className="flex items-center gap-3">
              <FiVideo className="text-[#1F3FD7] text-base" />
              24 video lessons
            </li>

            <li className="flex items-center gap-3">
              <FiDownload className="text-[#1F3FD7] text-base" />
              Downloadable resources
            </li>

            <li className="flex items-center gap-3">
              <FiSmartphone className="text-[#1F3FD7] text-base" />
              Mobile access
            </li>

            <li className="flex items-center gap-3">
              <HiOutlineBadgeCheck className="text-[#1F3FD7] text-base" />
              Certificate
            </li>

            <li className="flex items-center gap-3">
              <BsInfinity className="text-[#1F3FD7] text-base" />
              Lifetime access
            </li>

            <li className="flex items-center gap-3">
              <BiSupport className="text-[#1F3FD7] text-base" />
              Q&A support
            </li>
          </ul>
        </div>

      </div>
    </aside>
  );
}
