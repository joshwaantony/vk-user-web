

"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ FIX
import useCourseStore from "@/store/CourseStore";

import CourseHero from "@/components/course/course-details/CourseHero";
import WhatYouWillLearn from "@/components/course/course-details/WhatYouWillLearn";
import CourseContent from "@/components/course/course-details/CourseContent";
import CourseSidebar from "@/components/course/course-details/CourseSidebar";

export default function CourseDetailPage() {
  const { courseId } = useParams(); // now defined
  const { course, loading, fetchCourseById } = useCourseStore();

  useEffect(() => {
    if (courseId) fetchCourseById(courseId);
  }, [courseId]);

  if (loading) return <p className="p-10">Loading course...</p>;
  if (!course) return null;

  return (
    <div className="min-h-screen bg-[#EEF5FF]">
      <div
        className="
          max-w-7xl mx-auto px-4 py-8
          grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8
        "
      >
        {/* SCROLL AREA */}
        <div className="h-[800px] overflow-y-auto space-y-8">
          <CourseHero course={course} />
          <WhatYouWillLearn points={course.learningOutcomes} />
          <CourseContent sections={course.sections} />
        </div>

        <CourseSidebar course={course} />
      </div>
    </div>
  );
}
