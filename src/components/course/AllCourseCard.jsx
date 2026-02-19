



"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FiClock } from "react-icons/fi";
import { HiStar } from "react-icons/hi";
import { useAuthStore } from "@/store/auth.store";
import CouponPopup from "../Coupon/CouponPopup";

export default function AllCourseCard({ course }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  const isEnrolled = course?.isEnrolled;

  const [showPopup, setShowPopup] = useState(false);

  /* ---------------- BUTTON CLICK ---------------- */
  const handleButtonClick = (e) => {
    e.stopPropagation();

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

  const getButtonText = () => {
    if (!isLoggedIn) return "Login to Enroll";
    if (isEnrolled) return "Watch Now";
    return "Enroll Now";
  };

  return (
    <>
      {/* ================= COURSE CARD ================= */}
      <div
        onClick={() => router.push(`/course/${course.id}`)}
        className="cursor-pointer bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden"
      >
        {/* Thumbnail */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-[56px]">
            {course.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <HiStar className="text-yellow-500" />
            <span>4.5</span>
            <span>•</span>
            <span>{course.totalStudents} students</span>
          </div>

       
         {/* Faculty Section */}
<div className="flex items-center gap-3">
  <img
    src={course.faculty?.[0]?.imageUrl || "/avatar.png"}
    alt={course.faculty?.[0]?.name}
    onError={(e) => {
      e.currentTarget.src = "/avatar.png";
    }}
    className="w-9 h-9 rounded-full object-cover border"
  />

  <div className="flex flex-col leading-tight">
    <span className="text-sm font-medium text-gray-800">
      {course.faculty?.[0]?.name || "Instructor"}
    </span>
    <span className="text-xs text-gray-500">
      {course.faculty?.[0]?.qualification || ""}
    </span>
  </div>
</div>


          <hr />

          {/* Duration & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiClock />
              <span>{course.duration} mins</span>
            </div>

            <span className="text-blue-600 font-semibold">
              ₹{course.price}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleButtonClick}
            className={`mt-4 w-full px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300
              ${
                isEnrolled
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              } shadow-md`}
          >
            {getButtonText()}
          </button>
        </div>
      </div>

      {/* ================= COUPON POPUP ================= */}
      {showPopup && isLoggedIn && !isEnrolled && (
        <CouponPopup
          courseId={course.id}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
