// import {
//   HiPlay,
//   HiOutlineClock,
//   HiStar,
//   HiUser,
//   HiCollection,
//   HiChevronLeft,
//   HiChevronRight,
// } from "react-icons/hi";
// import { FaFireAlt, FaUserTie } from "react-icons/fa";

// export default function PremiumCourseSlide() {
//   return (
//     <div className="relative w-full rounded-[28px] overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] p-10">

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

//         {/* LEFT – VIDEO CARD */}
//         <div className="bg-white rounded-2xl overflow-hidden shadow-xl">

//           {/* Image */}
//           <div className="relative">
//             <img
//               src="/investment.avif"
//               alt="Course Preview"
//               className="w-full h-[260px] object-cover"
//             />

//             {/* Play Button */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition">
//                 <HiPlay className="text-2xl text-black ml-1" />
//               </div>
//             </div>

//             {/* Duration */}
//             <div className="absolute bottom-4 right-4 text-white text-sm flex items-center gap-2">
//               <HiOutlineClock />
//               14 weeks
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 text-center py-4 border-t">
//             <div>
//               <HiStar className="inline text-yellow-400" />{" "}
//               <span className="font-semibold">4.9</span>
//               <p className="text-xs text-gray-500">Rating</p>
//             </div>
//             <div>
//               <HiUser className="inline text-green-500" />{" "}
//               <span className="font-semibold">7.8K</span>
//               <p className="text-xs text-gray-500">Students</p>
//             </div>
//             <div>
//               <HiCollection className="inline text-blue-500" />{" "}
//               <span className="font-semibold">52</span>
//               <p className="text-xs text-gray-500">Lessons</p>
//             </div>
//           </div>

//         </div>

//         {/* RIGHT – CONTENT */}
//         <div className="text-white">

//           {/* Badge */}
//           <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/20 text-sm font-semibold">
//             <FaFireAlt />
//             PREMIUM
//           </span>

//           <h2 className="text-4xl font-extrabold leading-tight mb-4">
//             Build Winning <br /> Investment Portfolios
//           </h2>

//           <h4 className="text-lg font-semibold mb-2">
//             Investment Analysis & Portfolio Management
//           </h4>

//           <p className="text-white/80 max-w-lg mb-6">
//             Learn proven investment strategies from Wall Street experts.
//             Master portfolio management and maximize your returns with confidence.
//           </p>

//           {/* Instructor */}
//           <div className="flex items-center gap-3 bg-white/15 rounded-xl px-4 py-3 mb-6 max-w-md">
//             <FaUserTie className="text-xl" />
//             <div>
//               <p className="text-sm opacity-80">Instructor</p>
//               <p className="font-semibold">Dr. Robert Taylor</p>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="flex items-center gap-4 mb-8">
//             <span className="text-5xl font-extrabold">$299</span>
//             <div>
//               <span className="line-through text-white/60">$599</span>
//               <div className="mt-1 inline-block px-3 py-1 rounded-full bg-white/20 text-sm">
//                 50% OFF
//               </div>
//             </div>
//           </div>

//           {/* CTA */}
//           <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition">
//             Start Learning
//             <HiChevronRight />
//           </button>

//         </div>
//       </div>

//       {/* Arrows */}
//       <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition">
//         <HiChevronLeft className="text-xl" />
//       </button>

//       <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition">
//         <HiChevronRight className="text-xl" />
//       </button>

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
    <div className="
      relative w-full
     
      overflow-hidden
      bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#9333EA]
      px-12 py-16
    ">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT – VIDEO CARD */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">

          {/* Image */}
          <div className="relative">
            <img
              src="/investment.avif"
              alt="Course Preview"
              className="w-full h-[320px] object-cover"
            />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="
                w-18 h-18
                rounded-full
                bg-white
                flex items-center justify-center
                shadow-xl
                cursor-pointer
                hover:scale-105
                transition
              ">
                <HiPlay className="text-3xl text-black ml-1" />
              </div>
            </div>

            {/* Duration */}
            <div className="absolute bottom-4 right-4 text-white text-sm flex items-center gap-2">
              <HiOutlineClock />
              14 weeks
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center py-5 border-t">

            <div className="flex flex-col items-center gap-1">
              <HiStar className="text-yellow-400 text-lg" />
              <span className="font-semibold">4.9</span>
              <p className="text-xs text-gray-500">Rating</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <HiUsers className="text-emerald-500 text-lg" />
              <span className="font-semibold">7.8K</span>
              <p className="text-xs text-gray-500">Students</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <HiVideoCamera className="text-blue-500 text-lg" />
              <span className="font-semibold">52</span>
              <p className="text-xs text-gray-500">Lessons</p>
            </div>

          </div>
        </div>

        {/* RIGHT – CONTENT */}
        <div className="text-white">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/20 text-sm font-semibold">
            <FaFireAlt />
            PREMIUM
          </span>

          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Build Winning <br /> Investment Portfolios
          </h2>

          <h4 className="text-lg font-semibold mb-3">
            Investment Analysis & Portfolio Management
          </h4>

          <p className="text-white/80 max-w-xl mb-8">
            Learn proven investment strategies from Wall Street experts.
            Master portfolio management and maximize your returns with confidence.
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-4 bg-white/15 rounded-2xl px-5 py-4 mb-8 max-w-lg">
            <FaUserTie className="text-xl" />
            <div>
              <p className="text-sm opacity-80">Instructor</p>
              <p className="font-semibold">Dr. Robert Taylor</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-6 mb-10">
            <span className="text-6xl font-extrabold">$299</span>
            <div>
              <span className="line-through text-white/60">$599</span>
              <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm">
                50% OFF
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="
            bg-white text-black
            px-10 py-4
            rounded-xl
            font-semibold
            flex items-center gap-3
            hover:scale-105
            transition
          ">
            Start Learning
            <HiChevronRight />
          </button>

        </div>
      </div>

      {/* Arrows */}
      <button className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition">
        <HiChevronLeft className="text-xl" />
      </button>

      <button className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow flex items-center justify-center hover:scale-105 transition">
        <HiChevronRight className="text-xl" />
      </button>

    </div>
  );
}
