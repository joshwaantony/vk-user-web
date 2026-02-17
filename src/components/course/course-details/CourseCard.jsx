


"use client";

import { useState } from "react";
import { FaStar, FaUser, FaClock } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import CouponPopup from "@/components/Coupon/CouponPopup";

export default function CourseCard({
  id,
  image,
  title,
  rating,
  students,
  instructor,
  duration,
  price,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);

  const [showPopup, setShowPopup] = useState(false);

  // ✅ Enroll Handler
  const handleEnroll = (e) => {
    e.stopPropagation(); // prevent card navigation

    if (token) {
      // Logged in → open popup
      setShowPopup(true);
    } else {
      // Not logged in → redirect to login with redirect param
      router.push(`/login?redirect=${pathname}`);
    }
  };

  return (
    <>
      <div
        onClick={() => router.push(`/course/${id}`)}
        className="cursor-pointer bg-white border border-[#C5CDD7] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition"
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="h-[200px] w-full object-cover"
        />

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="h-[100px]">
            {/* Title */}
            <h3 className="text-[16px] font-semibold text-[#0F172A] leading-snug">
              {title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3 text-sm text-[#475569]">
              <FaStar className="text-[#F59E0B]" />
              <span className="font-medium">{rating}</span>
              <span>·</span>
              <span>{students} students</span>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-2 mt-3 text-sm text-[#475569]">
              <FaUser className="text-[#64748B]" />
              <span>{instructor}</span>
            </div>
          </div>

          <hr className="my-4 border-[#E2E8F0]" />

          {/* Duration + Price */}
          <div className="flex items-center justify-between text-sm text-[#475569]">
            <div className="flex items-center gap-2">
              <FaClock className="text-[#64748B]" />
              <span>{duration}</span>
            </div>

            <span className="font-semibold text-[#1C3FD1]">
              ${price}
            </span>
          </div>

          {/* ✅ Enroll Button */}
          <button
            onClick={handleEnroll}
            className="
              mt-6
              w-full
              bg-[#1C3FD1]
              text-white
              py-3
              rounded-xl
              font-semibold
              hover:bg-[#1733A5]
              transition
            "
          >
           Login to Enroll
          </button>
        </div>
      </div>

      {/* ✅ Popup */}
      {showPopup && (
        <CouponPopup
          courseId={id}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}