
"use client";

import { useState } from "react";
import { FaStar, FaClock } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import CouponPopup from "@/components/Coupon/CouponPopup";

export default function CourseCard({ course }) {
  
  if (!course) return null;

  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  const [showPopup, setShowPopup] = useState(false);

  const faculty = course?.faculty?.[0];

  const handleEnroll = (e) => {
    e.stopPropagation();

    if (isLoggedIn) {
      setShowPopup(true);
    } else {
      router.push(`/login?redirect=${pathname}`);
    }
  };

  return (
    <>
      <div
        onClick={() => router.push(`/course/${course?.id}`)}
        className="cursor-pointer bg-white border border-[#C5CDD7] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition"
      >
        {/* Thumbnail */}
        <img
          src={course?.thumbnail || "/fallback.jpg"}
          alt={course?.title}
          className="h-[200px] w-full object-cover"
        />

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="min-h-[130px]">

            {/* Title */}
            <h3 className="text-[16px] font-semibold text-[#0F172A] line-clamp-2">
              {course?.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-sm text-[#475569]">
              <FaStar className="text-[#F59E0B]" />
              <span>4.5</span>
              <span>·</span>
              <span>{course?.totalStudents} students</span>
            </div>

            {/* Faculty */}
            <div className="flex items-center gap-3 mt-4">
              <img
                src={faculty?.imageUrl || "/avatar.png"}
                alt={faculty?.name}
                onError={(e) => {
                  e.currentTarget.src = "/avatar.png";
                }}
                className="w-10 h-10 rounded-full object-cover border"
              />

              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#334155]">
                  {faculty?.name || "Instructor"}
                </span>
                <span className="text-xs text-gray-500">
                  {faculty?.qualification || ""}
                </span>
              </div>
            </div>
          </div>

          <hr className="my-4 border-[#E2E8F0]" />

          {/* Duration + Price */}
          <div className="flex items-center justify-between text-sm text-[#475569]">
            <div className="flex items-center gap-2">
              <FaClock className="text-[#64748B]" />
              <span>{course?.duration} mins</span>
            </div>

            <span className="font-semibold text-[#1C3FD1]">
              ₹{course?.price}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleEnroll}
            className="mt-6 w-full bg-[#1C3FD1] text-white py-3 rounded-xl font-semibold hover:bg-[#1733A5] transition"
          >
            {isLoggedIn ? "Enroll Now" : "Login to Enroll"}
          </button>
        </div>
      </div>

      {showPopup && isLoggedIn && (
        <CouponPopup
          courseId={course?.id}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
