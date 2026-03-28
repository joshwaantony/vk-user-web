



"use client";

import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useCourseStore from "@/store/CourseStore";

import CourseHero from "@/components/course/course-details/CourseHero";
import WhatYouWillLearn from "@/components/course/course-details/WhatYouWillLearn";
import CourseContent from "@/components/course/course-details/CourseContent";
import CourseSidebar from "@/components/course/course-details/CourseSidebar";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { course, loading, fetchCourseById } = useCourseStore();

  const isFromPayment = searchParams.get("enrolled");

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [courseId, fetchCourseById]);

  // ✅ Remove query param after load (clean URL)
  useEffect(() => {
    if (isFromPayment) {
      fetchCourseById(courseId);
      router.replace(`/course/${courseId}`);
    }
  }, [isFromPayment, router, courseId, fetchCourseById]);

  if (loading) {
    return (
      <div className="p-10 bg-[#EEF5FF]">
        <div className="min-h-screen bg-[#EEF5FF] animate-pulse">
          <div
            className="
              max-w-7xl mx-auto px-4 py-8
              grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
            "
          >
            {/* LEFT CONTENT */}
            <div className="h-[800px] overflow-y-auto space-y-8 pr-2">
              <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="h-8 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="h-48 w-full bg-gray-300 rounded-xl mt-4" />
              </div>

              <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="h-6 w-1/3 bg-gray-300 rounded" />
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="flex justify-between items-center bg-gray-100 rounded-lg p-4"
                  >
                    <div className="h-4 w-1/2 bg-gray-300 rounded" />
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit space-y-4">
              <div className="h-40 w-full bg-gray-300 rounded-xl" />
              <div className="h-6 w-1/2 bg-gray-300 rounded" />
              <div className="h-10 w-full bg-gray-400 rounded-xl" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#EEF5FF] px-4 py-10 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-3xl bg-white border border-blue-100 shadow-[0_24px_60px_rgba(37,99,235,0.12)] p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E0EAFF] text-[#2457E6] text-2xl font-bold">
            !
          </div>

          <h2 className="text-2xl font-bold text-[#0F172A]">
            Course not found
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-7">
            This course may have been removed, renamed, or the link may be invalid.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => router.push("/course")}
              className="px-5 py-3 rounded-xl bg-[#2457E6] text-white font-semibold hover:bg-[#1E4ED8] transition"
            >
              Browse Courses
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-3 rounded-xl border border-[#CBD5E1] text-[#334155] font-semibold hover:bg-[#F8FAFC] transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF5FF]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="
          max-w-7xl mx-auto px-4 py-8
          grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
        "
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[800px] overflow-y-auto space-y-8 pr-2"
        >
          <CourseHero course={course} />
          <WhatYouWillLearn points={course.learningOutcomes || []} />
          <CourseContent
            sections={course.sections || []}
            totalLessons={course.totalLessons}
          />
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <CourseSidebar course={course} />
        </motion.div>
      </motion.div>
    </div>
  );
}
