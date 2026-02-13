




// import {
//   FiPlayCircle,
//   FiVideo,
//   FiDownload,
//   FiSmartphone
// } from "react-icons/fi";
// import { HiOutlineBadgeCheck } from "react-icons/hi";
// import { BsInfinity } from "react-icons/bs";
// import { BiSupport } from "react-icons/bi";
// import Link from "next/link";

// export default function CourseSidebar() {
//   return (
//     <aside className="w-full lg:max-w-sm">
//       <div className="space-y-8 lg:sticky lg:top-24">

//         <div className="bg-[#1F3FD7] text-white rounded-2xl p-8 text-center">
//           <p className="text-sm opacity-80">Course Price</p>
//           <h2 className="text-3xl font-bold my-3">$149</h2>

//           <Link href="/course/slug/lesson">
//             <button className="w-full bg-white text-[#1F3FD7] py-3 rounded-xl font-semibold flex justify-center gap-2">
//               <FiPlayCircle /> Continue Learning
//             </button>
//           </Link>
//         </div>

//         <div className="bg-white border rounded-2xl p-8">
//           <h4 className="font-semibold text-black mb-5">Your Progress</h4>

//           <div className="flex justify-between text-sm mb-2">
//             <span className="text-[#3C3B3B]">Course Completion</span>
//             <span className="font-semibold text-[#000000]">13%</span>
//           </div>

//           <div className="h-2 bg-gray-200 rounded-full mb-4">
//             <div className="h-2 bg-[#1F3FD7] rounded-full w-[13%]" />
//           </div>

//           <p className="text-sm text-gray-500 mb-6">
//             3 of 24 lessons completed
//           </p>

//           <h5 className="font-semibold text-black mb-4">This course includes:</h5>

//           <ul className="space-y-4 text-sm text-gray-600">
//             <li className="flex gap-3"><FiVideo /> 24 video lessons</li>
//             <li className="flex gap-3"><FiDownload /> Downloadable resources</li>
//             <li className="flex gap-3"><FiSmartphone /> Mobile access</li>
//             <li className="flex gap-3"><HiOutlineBadgeCheck /> Certificate</li>
//             <li className="flex gap-3"><BsInfinity /> Lifetime access</li>
//             <li className="flex gap-3"><BiSupport /> Q&A support</li>
//           </ul>
//         </div>

//       </div>
//     </aside>
//   );
// }



  import {
    FiPlayCircle,
    FiVideo,
    FiDownload,
    FiSmartphone
  } from "react-icons/fi";
  import { HiOutlineBadgeCheck } from "react-icons/hi";
  import { BsInfinity } from "react-icons/bs";
  import { BiSupport } from "react-icons/bi";
  import Link from "next/link";

  export default function CourseSidebar() {
    return (
      <aside className="w-full lg:max-w-sm">
        {/* ✅ Sticky wrapper (desktop only) */}
        <div className="space-y-8 lg:sticky lg:top-[120px]">

          {/* PRICE CARD */}
          <div className="bg-[#1F3FD7] text-white rounded-2xl p-8 text-center">
            <p className="text-sm opacity-80">Course Price</p>
            <h2 className="text-3xl font-bold my-3">$149</h2>

            <Link href="/courseId/lesson">
              <button className="w-full bg-white text-[#1F3FD7] py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                <FiPlayCircle />
                Continue Learning
              </button>
            </Link>
          </div>

          {/* PROGRESS CARD */}
          <div className="bg-white border rounded-2xl p-8">
            <h4 className="font-semibold text-black mb-5">
              Your Progress
            </h4>

            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#3C3B3B]">
                Course Completion
              </span>
              <span className="font-semibold text-black">
                13%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mb-4">
              <div className="h-2 bg-[#1F3FD7] rounded-full w-[13%]" />
            </div>

            <p className="text-sm text-gray-500 mb-6">
              3 of 24 lessons completed
            </p>

            <h5 className="font-semibold text-black mb-4">
              This course includes:
            </h5>

            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <FiVideo className="text-[#1F3FD7]" />
                24 video lessons
              </li>
              <li className="flex items-center gap-3">
                <FiDownload className="text-[#1F3FD7]" />
                Downloadable resources
              </li>
              <li className="flex items-center gap-3">
                <FiSmartphone className="text-[#1F3FD7]" />
                Mobile access
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineBadgeCheck className="text-[#1F3FD7]" />
                Certificate
              </li>
              <li className="flex items-center gap-3">
                <BsInfinity className="text-[#1F3FD7]" />
                Lifetime access
              </li>
              <li className="flex items-center gap-3">
                <BiSupport className="text-[#1F3FD7]" />
                Q&A support
              </li>
            </ul>
          </div>

        </div>
      </aside>
    );
  }
