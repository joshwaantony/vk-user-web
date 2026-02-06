



"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import CompletedCourses from "./CompletedCourses";

const courses = [
  {
    id: 1,
    title: "Financial Accounting Fundamentals",
    instructor: "Dr. Sarah Johnson",
    lessons: "16/24 lessons",
    progress: 65,
    duration: "8 weeks",
    lastAccessed: "2 days ago",
    category: "Accounting",
    status: "progress",
    image: "/course/course1.png",
  },
  {
    id: 2,
    title: "Advanced Tax Strategies",
    instructor: "Michael Chen",
    lessons: "9/30 lessons",
    progress: 30,
    duration: "10 weeks",
    lastAccessed: "1 week ago",
    category: "Taxation",
    status: "progress",
    image: "/course/course2.png",
  },
  {
    id: 3,
    title: "Bookkeeping Essentials",
    instructor: "James Wilson",
    lessons: "15/18 lessons",
    progress: 85,
    duration: "6 weeks",
    lastAccessed: "3 days ago",
    category: "Accounting",
    status: "progress",
    image: "/course/course3.png",
  },
];

export default function MyCourses() {
  const [tab, setTab] = useState("progress");

  const inProgress = courses.filter(c => c.status === "progress");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start mb-8">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            My Courses
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Continue your learning journey
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className="flex gap-6 sm:gap-10">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-blue-600">
              {courses.length}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Total Courses
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              2
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Completed
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-6 sm:gap-8 border-b mb-6 sm:mb-8 overflow-x-auto">
        <button
          onClick={() => setTab("progress")}
          className={`pb-3 text-sm sm:text-base font-medium whitespace-nowrap ${
            tab === "progress"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          In Progress ({inProgress.length})
        </button>

        <button
          onClick={() => setTab("completed")}
          className={`pb-3 text-sm sm:text-base font-medium whitespace-nowrap ${
            tab === "completed"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Completed (2)
        </button>
      </div>

      {/* ================= TAB CONTENT ================= */}
      {tab === "progress" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {inProgress.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}

      {tab === "completed" && (
        <div className="mt-4 sm:mt-6">
          <CompletedCourses />
        </div>
      )}
    </div>
  );
}
