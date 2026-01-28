



// import {
//   HiPlay,
//   HiOutlineClock,
//   HiStar,
//   HiUsers,
//   HiVideoCamera,
//   HiChevronLeft,
//   HiChevronRight,
// } from "react-icons/hi";
// import { FaFireAlt, FaUserTie } from "react-icons/fa";

// export default function PremiumCourseSlide() {
//   return (
//     <div
//       className="
//         relative w-full overflow-hidden
//         bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#9333EA]
//         px-4 sm:px-8 lg:px-12
//         py-10 sm:py-14 lg:py-16
//       "
//     >
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

//         {/* ================= LEFT – VIDEO CARD ================= */}
//         <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
//           <div className="relative">
//             <img
//               src="/investment.avif"
//               alt="Course Preview"
//               className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover"
//             />

//             {/* Play Button */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="
//                 w-14 h-14 sm:w-16 sm:h-16
//                 rounded-full bg-white
//                 flex items-center justify-center
//                 shadow-xl cursor-pointer
//                 hover:scale-105 transition
//               ">
//                 <HiPlay className="text-2xl sm:text-3xl text-black ml-1" />
//               </div>
//             </div>

//             {/* Duration */}
//             <div className="absolute bottom-3 right-3 text-white text-xs sm:text-sm flex items-center gap-2">
//               <HiOutlineClock />
//               14 weeks
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 text-center py-4 sm:py-5 border-t">
//             <div className="flex flex-col items-center gap-1">
//               <HiStar className="text-yellow-400 text-lg" />
//               <span className="font-semibold text-sm sm:text-base">4.9</span>
//               <p className="text-xs text-gray-500">Rating</p>
//             </div>
//             <div className="flex flex-col items-center gap-1">
//               <HiUsers className="text-emerald-500 text-lg" />
//               <span className="font-semibold text-sm sm:text-base">7.8K</span>
//               <p className="text-xs text-gray-500">Students</p>
//             </div>
//             <div className="flex flex-col items-center gap-1">
//               <HiVideoCamera className="text-blue-500 text-lg" />
//               <span className="font-semibold text-sm sm:text-base">52</span>
//               <p className="text-xs text-gray-500">Lessons</p>
//             </div>
//           </div>
//         </div>

//         {/* ================= RIGHT – CONTENT ================= */}
//         <div className="text-white text-center lg:text-left relative">

//           {/* 🔥 TOP ARROWS (ALL DEVICES) */}
//           <div
//             className="
//               absolute top-0
//               left-0 right-0
//               flex justify-between
//               md:justify-end
//               gap-3
//             "
//           >
//             <button className="
//               w-9 h-9 sm:w-10 sm:h-10
//               bg-transparent md:bg-white
//               border border-white/40 md:border-none
//               text-white md:text-black
//               rounded-full
//               flex items-center justify-center
//               hover:scale-105 transition
//             ">
//               <HiChevronLeft />
//             </button>

//             <button className="
//               w-9 h-9 sm:w-10 sm:h-10
//               bg-transparent md:bg-white
//               border border-white/40 md:border-none
//               text-white md:text-black
//               rounded-full
//               flex items-center justify-center
//               hover:scale-105 transition
//             ">
//               <HiChevronRight />
//             </button>
//           </div>

//           {/* Badge */}
//           <span className="inline-flex items-center gap-2 mt-14 mb-5 px-4 py-2 rounded-full bg-white/20 text-xs sm:text-sm font-semibold">
//             <FaFireAlt />
//             PREMIUM
//           </span>

//           {/* Heading */}
//           <h2 className="
//             text-3xl sm:text-4xl md:text-5xl xl:text-6xl
//             font-extrabold leading-tight mb-5
//           ">
//             Build Winning <br className="hidden sm:block" />
//             Investment Portfolios
//           </h2>

//           <h4 className="text-base sm:text-lg font-semibold mb-3">
//             Investment Analysis & Portfolio Management
//           </h4>

//           <p className="text-white/80 max-w-xl mx-auto lg:mx-0 mb-7 text-sm sm:text-base">
//             Learn proven investment strategies from Wall Street experts.
//             Master portfolio management and maximize your returns with confidence.
//           </p>

//           {/* Instructor */}
//           <div className="
//             flex items-center gap-4
//             bg-white/15 rounded-2xl
//             px-4 py-3 sm:px-5 sm:py-4
//             mb-7 max-w-lg
//             mx-auto lg:mx-0
//           ">
//             <FaUserTie className="text-lg sm:text-xl" />
//             <div>
//               <p className="text-xs sm:text-sm opacity-80">Instructor</p>
//               <p className="font-semibold text-sm sm:text-base">
//                 Dr. Robert Taylor
//               </p>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="flex items-center justify-center lg:justify-start gap-5 mb-8">
//             <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
//               $299
//             </span>
//             <div>
//               <span className="line-through text-white/60 text-sm sm:text-base">
//                 $599
//               </span>
//               <div className="mt-2 inline-block px-3 py-1.5 rounded-full bg-white/20 text-xs sm:text-sm">
//                 50% OFF
//               </div>
//             </div>
//           </div>

//           {/* CTA */}
//           <div className="flex justify-center lg:justify-start">
//             <button className="
//               bg-white text-black
//               px-8 sm:px-10 py-3 sm:py-4
//               rounded-xl font-semibold
//               flex items-center gap-3
//               hover:scale-105 transition
//             ">
//               Start Learning
//               <HiChevronRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  HiPlay,
  HiOutlineClock,
  HiStar,
  HiUsers,
  HiVideoCamera,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { FaFireAlt, FaUserTie } from "react-icons/fa";

export default function PremiumCourseSlide() {
  return (
    <div
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#9333EA]
        px-4 sm:px-8 lg:px-12
        py-10 sm:py-14 lg:py-16
      "
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* ================= LEFT – VIDEO CARD ================= */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
          <div className="relative">
            <img
              src="/investment.avif"
              alt="Course Preview"
              className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="
                w-14 h-14 sm:w-16 sm:h-16
                rounded-full bg-white
                flex items-center justify-center
                shadow-xl cursor-pointer
                hover:scale-105 transition
              ">
                <HiPlay className="text-2xl sm:text-3xl text-black ml-1" />
              </div>
            </div>

            {/* Duration */}
            <div className="absolute bottom-3 right-3 text-white text-xs sm:text-sm flex items-center gap-2">
              <HiOutlineClock />
              14 weeks
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center py-4 sm:py-5 border-t">
            <div className="flex flex-col items-center gap-1">
              <HiStar className="text-yellow-400 text-lg" />
              <span className="font-semibold text-sm sm:text-base">4.9</span>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <HiUsers className="text-emerald-500 text-lg" />
              <span className="font-semibold text-sm sm:text-base">7.8K</span>
              <p className="text-xs text-gray-500">Students</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <HiVideoCamera className="text-blue-500 text-lg" />
              <span className="font-semibold text-sm sm:text-base">52</span>
              <p className="text-xs text-gray-500">Lessons</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT – CONTENT ================= */}
        <div className="text-white text-center lg:text-left relative">

          {/* 🔼 DESKTOP / TABLET ARROWS */}
          <div className="hidden sm:flex absolute top-0 right-0 gap-3">
            <button className="
              w-10 h-10
              bg-white text-black
              rounded-full
              flex items-center justify-center
              hover:scale-105 transition
            ">
              <HiChevronLeft />
            </button>

            <button className="
              w-10 h-10
              bg-white text-black
              rounded-full
              flex items-center justify-center
              hover:scale-105 transition
            ">
              <HiChevronRight />
            </button>
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 mt-14 mb-5 px-4 py-2 rounded-full bg-white/20 text-xs sm:text-sm font-semibold">
            <FaFireAlt />
            PREMIUM
          </span>

          {/* Heading */}
          <h2 className="
            text-3xl sm:text-4xl md:text-5xl xl:text-6xl
            font-extrabold leading-tight mb-5
          ">
            Build Winning <br className="hidden sm:block" />
            Investment Portfolios
          </h2>

          <h4 className="text-base sm:text-lg font-semibold mb-3">
            Investment Analysis & Portfolio Management
          </h4>

          <p className="text-white/80 max-w-xl mx-auto lg:mx-0 mb-7 text-sm sm:text-base">
            Learn proven investment strategies from Wall Street experts.
            Master portfolio management and maximize your returns with confidence.
          </p>

          {/* Instructor */}
          <div className="
            flex items-center gap-4
            bg-white/15 rounded-2xl
            px-4 py-3 sm:px-5 sm:py-4
            mb-7 max-w-lg
            mx-auto lg:mx-0
          ">
            <FaUserTie className="text-lg sm:text-xl" />
            <div>
              <p className="text-xs sm:text-sm opacity-80">Instructor</p>
              <p className="font-semibold text-sm sm:text-base">
                Dr. Robert Taylor
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-center lg:justify-start gap-5 mb-8">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              $299
            </span>
            <div>
              <span className="line-through text-white/60 text-sm sm:text-base">
                $599
              </span>
              <div className="mt-2 inline-block px-3 py-1.5 rounded-full bg-white/20 text-xs sm:text-sm">
                50% OFF
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center lg:justify-start">
            <button className="
              bg-white text-black
              px-8 sm:px-10 py-3 sm:py-4
              rounded-xl font-semibold
              flex items-center gap-3
              hover:scale-105 transition
            ">
              Start Learning
              <HiChevronRight />
            </button>
          </div>

          {/* 🔽 MOBILE ARROWS */}
          <div className="flex sm:hidden justify-between mt-10 px-6">
            <button className="
              w-10 h-10
              border border-white/40
              text-white
              rounded-full
              flex items-center justify-center
              hover:scale-105 transition
            ">
              <HiChevronLeft />
            </button>

            <button className="
              w-10 h-10
              border border-white/40
              text-white
              rounded-full
              flex items-center justify-center
              hover:scale-105 transition
            ">
              <HiChevronRight />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
