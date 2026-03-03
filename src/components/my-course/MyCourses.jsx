




"use client";

import { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import CourseCard from "./CourseCard";
import CompletedCourses from "./CompletedCourses";
import useEnrollmentStore from "@/store/useEnrollmentStore";
import PromoLoader from "../loader/PromoLoader";

export default function MyCourses() {
  const { enrollments, fetchEnrollments, loading } =
    useEnrollmentStore();

  const [tab, setTab] = useState("progress");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  /* ------------------------------------
     Separate ACTIVE & COMPLETED
  ------------------------------------- */
  const inProgress = enrollments.filter(
    (item) => item.status === "ACTIVE"
  );

  const completed = enrollments.filter(
    (item) => item.status === "COMPLETED"
  );

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
              {enrollments.length}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Total Courses
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {completed.length}
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
          Completed ({completed.length})
        </button>
      </div>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="text-gray-500 text-sm">
         <PromoLoader/>
        </div>
      )}

      {/* ================= TAB CONTENT ================= */}
      {tab === "progress" && (
        <>
          {!loading && inProgress.length === 0 ? (
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 sm:p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                <FiBookOpen size={24} />
              </div>
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
                No courses in progress
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                Start a course to track your progress here and continue learning anytime.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {inProgress.map((item) => (
                <CourseCard
                  key={item.enrollmentId}
                  course={{
                    id: item.course.id,
                    title: item.course.title,
                    instructor: item.course.instructor.name,
                    lessons: `${item.progress.completedLessons}/${item.progress.totalLessons} lessons`,
                    progress: item.progress.percentage,
                    duration: "—",
                    lastAccessed: "Recently",
                    category: "Course",
                    image: item.course.thumbnail,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "completed" && (
        <div className="mt-4 sm:mt-6">
          <CompletedCourses data={completed} />
        </div>
      )}
    </div>
  );
}
