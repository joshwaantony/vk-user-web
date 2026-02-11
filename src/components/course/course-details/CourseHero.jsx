



"use client";

import { HiArrowLeft, HiStar } from "react-icons/hi";
import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CourseHero({ course }) {
  const router = useRouter();
  console.log("course...",course);
  
  if (!course) return null;

  return (
    <div className="space-y-4">

      {/* ✅ STICKY BACK BAR (INSIDE SCROLL CONTAINER) */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="px-4 py-3">
          <button
            onClick={() => router.push("/course")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
          >
            <HiArrowLeft />
            Back to Courses
          </button>
        </div>
      </div>

      {/* HERO CARD */}
      <div className="bg-white rounded-2xl overflow-hidden border">
        <div className="relative h-[220px] w-full">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute bottom-4 left-4 text-xl font-bold text-white">
            {course.title}
          </h1>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-1">
              <HiStar className="text-yellow-400" /> {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <FiUsers /> {course.students} students
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <FiPlay /> {course.lessons} lessons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
