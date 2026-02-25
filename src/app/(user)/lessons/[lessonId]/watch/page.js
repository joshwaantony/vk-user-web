



"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import LessonContent from "@/components/course/course-lesson/LessonContent";
import LessonSidebar from "@/components/course/course-lesson/LessonSidebar";
import useLessonStore from "@/store/useLessonStore";
import PromoLoader from "@/components/loader/PromoLoader";

export default function LessonWatchPage() {
  const { lessonId } = useParams();

  const { lesson, loading, error, fetchLesson } = useLessonStore();

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

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Lesson not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#EEF5FF]">
      <LessonContent lesson={lesson} lessonId={lessonId} />
      <LessonSidebar lesson={lesson} />
    </div>
  );
}
