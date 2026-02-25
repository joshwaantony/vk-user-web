



//   "use client";

// import {
//   FiPlayCircle,
//   FiVideo,
//   FiDownload,
//   FiSmartphone
// } from "react-icons/fi";
// import { HiOutlineBadgeCheck } from "react-icons/hi";
// import { BsInfinity } from "react-icons/bs";
// import { BiSupport } from "react-icons/bi";
// import { useRouter, usePathname } from "next/navigation";
// import { useAuthStore } from "@/store/auth.store";
// import { useState } from "react";
// import CouponPopup from "@/components/Coupon/CouponPopup";

// export default function CourseSidebar({ course }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const token = useAuthStore((state) => state.token);
//   const isLoggedIn = !!token;

//   const isEnrolled = course?.isEnrolled;

//   const [showPopup, setShowPopup] = useState(false);

//   /* ---------------- BUTTON CLICK ---------------- */
//   const handleButtonClick = () => {
//     if (!isLoggedIn) {
//       router.push(`/login?redirect=${pathname}`);
//       return;
//     }

//     if (isEnrolled) {
//       router.push(`/course/${course.id}`);
//     } else {
//       setShowPopup(true);
//     }
//   };

//   /* ---------------- BUTTON TEXT ---------------- */
//   const getButtonText = () => {
//     if (!isLoggedIn) return "Login to Enroll";
//     if (isEnrolled) return "Watch Now";
//     return "Enroll Now";
//   };

//   return (
//     <>
//       <aside className="w-full lg:max-w-sm">
//         <div className="space-y-8 lg:sticky lg:top-[120px]">

//           {/* PRICE CARD */}
//           <div className="bg-[#1F3FD7] text-white rounded-2xl p-8 text-center">
//             <p className="text-sm opacity-80">Course Price</p>
//             <h2 className="text-3xl font-bold my-3">
//               ₹{course?.price}
//             </h2>

//             <button
//               onClick={handleButtonClick}
//               className="w-full bg-white text-[#1F3FD7] py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
//             >
//               <FiPlayCircle />
//               {getButtonText()}
//             </button>
//           </div>

//           {/* PROGRESS CARD */}
//           <div className="bg-white border rounded-2xl p-8">
//             <h4 className="font-semibold text-black mb-5">
//               Your Progress
//             </h4>

//             <div className="flex justify-between text-sm mb-2">
//               <span className="text-[#3C3B3B]">
//                 Course Completion
//               </span>
//               <span className="font-semibold text-black">
//                 {/* {course?.progress || 0}% */}
//                 {course?.progress?.percent || 0}%
//               </span>
//             </div>

//             <div className="h-2 bg-gray-200 rounded-full mb-4">
//               <div
//                 className="h-2 bg-[#1F3FD7] rounded-full"
//                 // style={{ width: `${course?.progress || 0}%` }}
//                 style={{ width: `${course?.progress?.percent || 0}%` }}
//               />
//             </div>

//             <p className="text-sm text-gray-500 mb-6">
//               {/* {course?.completedLessons || 0} of {course?.totalLessons || 0} lessons completed */}
//               {course?.progress?.completedLessons || 0} of {course?.progress?.totalLessons || course?.totalLessons || 0}
//             </p>

//             <h5 className="font-semibold text-black mb-4">
//               This course includes:
//             </h5>

//             <ul className="space-y-4 text-sm text-gray-600">
         
//            <li className="flex items-center gap-3">
//   <FiVideo className="text-[#1F3FD7]" />
//   {course?.totalLessons || 0} video {course?.totalLessons === 1 ? "lesson" : "lessons"}
// </li>
//               <li className="flex items-center gap-3">
//                 <FiSmartphone className="text-[#1F3FD7]" />
//                 Mobile access
//               </li>
           
//               <li className="flex items-center gap-3">
//                 <BsInfinity className="text-[#1F3FD7]" />
//                 Lifetime access
//               </li>
//               <li className="flex items-center gap-3">
//                 <BiSupport className="text-[#1F3FD7]" />
//                 Q&A support
//               </li>
//             </ul>
//           </div>

//         </div>
//       </aside>

//       {/* COUPON POPUP */}
//       {showPopup && isLoggedIn && !isEnrolled && (
//         <CouponPopup
//           courseId={course.id}
//           onClose={() => setShowPopup(false)}
//         />
//       )}
//     </>
//   );
// }




"use client";

import {
  FiPlayCircle,
  FiVideo,
  FiSmartphone
} from "react-icons/fi";
import { BsInfinity } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useProgressStore } from "@/store/progress.store";
import { useEffect, useState } from "react";
import CouponPopup from "@/components/Coupon/CouponPopup";

export default function CourseSidebar({ course }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  const {
    courseProgress,
    getCourseProgress,
  } = useProgressStore();

  const isEnrolled = course?.isEnrolled;

  const [showPopup, setShowPopup] = useState(false);

  /* ================= FETCH COURSE PROGRESS ================= */
  useEffect(() => {
    if (isLoggedIn && isEnrolled && course?.id) {
      getCourseProgress(course.id);
    }
  }, [course?.id, isLoggedIn, isEnrolled]);

  /* ---------------- BUTTON CLICK ---------------- */
  const handleButtonClick = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (isEnrolled) {
      router.push(`/course/${course.id}`);
    } else {
      setShowPopup(true);
    }
  };

  /* ---------------- BUTTON TEXT ---------------- */
  const getButtonText = () => {
    if (!isLoggedIn) return "Login to Enroll";
    if (isEnrolled) return "Watch Now";
    return "Enroll Now";
  };

  /* ================= SAFE VALUES ================= */
  const percent =
    courseProgress?.percent ??
    course?.progress?.percent ??
    0;

  const completedLessons =
    courseProgress?.completedLessons ??
    course?.progress?.completedLessons ??
    0;

  const totalLessons =
    courseProgress?.totalLessons ??
    course?.progress?.totalLessons ??
    course?.totalLessons ??
    0;

  return (
    <>
      <aside className="w-full lg:max-w-sm">
        <div className="space-y-8 lg:sticky lg:top-[120px]">

          {/* PRICE CARD */}
          <div className="bg-[#1F3FD7] text-white rounded-2xl p-8 text-center">
            <p className="text-sm opacity-80">Course Price</p>
            <h2 className="text-3xl font-bold my-3">
              ₹{course?.price}
            </h2>

            <button
              onClick={handleButtonClick}
              className="w-full bg-white text-[#1F3FD7] py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <FiPlayCircle />
              {getButtonText()}
            </button>
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
                {percent}%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mb-4">
              <div
                className="h-2 bg-[#1F3FD7] rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="text-sm text-gray-500 mb-6">
              {completedLessons} of {totalLessons} lessons completed
            </p>

            <h5 className="font-semibold text-black mb-4">
              This course includes:
            </h5>

            <ul className="space-y-4 text-sm text-gray-600">

              <li className="flex items-center gap-3">
                <FiVideo className="text-[#1F3FD7]" />
                {course?.totalLessons || 0} video{" "}
                {course?.totalLessons === 1 ? "lesson" : "lessons"}
              </li>

              <li className="flex items-center gap-3">
                <FiSmartphone className="text-[#1F3FD7]" />
                Mobile access
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

      {/* COUPON POPUP */}
      {showPopup && isLoggedIn && !isEnrolled && (
        <CouponPopup
          courseId={course.id}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}