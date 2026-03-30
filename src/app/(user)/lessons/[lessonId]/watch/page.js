



"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import LessonContent from "@/components/course/course-lesson/LessonContent";
import LessonSidebar from "@/components/course/course-lesson/LessonSidebar";
import useLessonStore from "@/store/useLessonStore";
import PromoLoader from "@/components/loader/PromoLoader";

export default function LessonWatchPage() {
  const { lessonId } = useParams();
  const searchParams = useSearchParams();
  const fallbackCourseId = searchParams.get("courseId");

  const { lesson, loading, error, fetchLesson } = useLessonStore();
  const hasLessonData = Boolean(
    lesson &&
      (lesson?.id ||
        lesson?._id ||
        lesson?.lessonId ||
        lesson?.title ||
        lesson?.playbackUrl ||
        lesson?.courseId ||
        lesson?.course ||
        (Array.isArray(lesson?.sections) &&
          lesson.sections.length > 0))
  );

  useEffect(() => {
    if (lessonId) {
      fetchLesson(lessonId);
    }
  }, [lessonId, fetchLesson]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FF] flex items-center justify-center">
       
        <PromoLoader/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!hasLessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Lesson not found
      </div>
    );
  }

  return (
  <motion.div
    className="min-h-screen flex flex-col lg:flex-row bg-[#EEF5FF]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.45 }}
  >

  <motion.div
    className="px-4 sm:px-10 flex-1"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
  >
    <LessonContent
      lesson={lesson}
      lessonId={lessonId}
      fallbackCourseId={fallbackCourseId}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
  >
    <LessonSidebar
      lesson={lesson}
      fallbackCourseId={fallbackCourseId}
    />
  </motion.div>

  </motion.div>
  );
}
