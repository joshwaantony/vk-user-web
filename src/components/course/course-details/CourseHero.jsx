



"use client";

import { useEffect, useRef, useState } from "react";
import { HiArrowLeft, HiStar } from "react-icons/hi";
import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CourseHero() {
  const router = useRouter();
  const lastScrollY = useRef(0);
  const [showBack, setShowBack] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        // scrolling down → hide
        setShowBack(false);
      } else {
        // scrolling up → show
        setShowBack(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* STICKY BACK BUTTON */}
      <div
        className={`
          sticky top-0 z-40 bg-white
          transition-all duration-300
          ${showBack ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 border-b">
          <button
            onClick={() => router.push("/course")}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-semibold hover:text-black transition"
          >
            <HiArrowLeft className="text-base sm:text-lg" />
            Back to Courses
          </button>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl overflow-hidden border mt-4">
        {/* IMAGE */}
        <div className="relative h-[200px] sm:h-[240px] lg:h-[260px] w-full">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
            className="h-full w-full object-cover"
            alt="course"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Financial Accounting Fundamentals
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Master the essential principles of financial accounting.
          </p>

          <div className="flex flex-wrap gap-6 text-xs sm:text-sm font-semibold text-gray-600">
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
        </div>
      </div>
    </>
  );
}
