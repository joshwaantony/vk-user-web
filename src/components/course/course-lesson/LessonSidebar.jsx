





"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiClock } from "react-icons/fi";
import useCourseStore from "@/store/CourseStore";
import { useProgressStore } from "@/store/progress.store";

const isLessonDebugEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_DEBUG_LESSON_WATCH === "true";

const debugLesson = (...args) => {
  if (!isLessonDebugEnabled) return;
  // Keep logs grouped and searchable in browser console.
  console.log("[LessonSidebar]", ...args);
};

const resolveId = (value) => {
  if (!value) return null;
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "object") {
    return (
      value.id?.toString?.() ||
      value._id?.toString?.() ||
      value.courseId?.toString?.() ||
      null
    );
  }
  return null;
};

export default function LessonSidebar({
  lesson,
  fallbackCourseId,
}) {
  const { course, loading, fetchCourseById } = useCourseStore();
  const {
    courseProgress,
    courseProgressCourseId,
    lessonProgress,
    getCourseProgress,
  } = useProgressStore();
  const [openSections, setOpenSections] = useState({});

  const lessonCourseId = useMemo(
    () =>
      resolveId(fallbackCourseId) ||
      resolveId(lesson?.courseId) ||
      resolveId(lesson?.course) ||
      resolveId(lesson?.courseDetails),
    [lesson, fallbackCourseId]
  );
  const storeCourseId = useMemo(() => resolveId(course), [course]);

  useEffect(() => {
    if (!lessonCourseId) {
      debugLesson("Skip fetch: no lessonCourseId");
      return;
    }
    if (storeCourseId === lessonCourseId) {
      debugLesson("Skip fetch: store already has matching course", {
        lessonCourseId,
      });
      return;
    }

    debugLesson("Fetching course by id", { lessonCourseId });
    fetchCourseById(lessonCourseId);
  }, [lessonCourseId, storeCourseId, fetchCourseById]);

  useEffect(() => {
    if (!lessonCourseId) return;
    getCourseProgress(lessonCourseId);
  }, [lessonCourseId, getCourseProgress]);

  useEffect(() => {
    if (!lessonCourseId) return;
    if (!lessonProgress) return;

    const timerId = setTimeout(() => {
      getCourseProgress(lessonCourseId);
    }, 500);

    return () => clearTimeout(timerId);
  }, [
    lessonCourseId,
    lessonProgress?.watchedSeconds,
    lessonProgress?.isCompleted,
    getCourseProgress,
  ]);

  const lessonCourseObject = useMemo(() => {
    if (
      lesson?.courseDetails &&
      typeof lesson.courseDetails === "object"
    ) {
      return lesson.courseDetails;
    }
    if (lesson?.course && typeof lesson.course === "object") {
      return lesson.course;
    }
    return null;
  }, [lesson]);

  const sidebarCourse = useMemo(() => {
    const courseSections = Array.isArray(course?.sections)
      ? course.sections.length
      : 0;
    const lessonCourseSections = Array.isArray(
      lessonCourseObject?.sections
    )
      ? lessonCourseObject.sections.length
      : 0;

    // Prefer the richer course payload (usually store course on watch page).
    if (courseSections >= lessonCourseSections) {
      return course || lessonCourseObject;
    }

    return lessonCourseObject || course;
  }, [lessonCourseObject, course]);

  const sections = useMemo(() => {
    if (Array.isArray(course?.sections) && course.sections.length > 0) {
      return course.sections;
    }
    if (
      Array.isArray(lessonCourseObject?.sections) &&
      lessonCourseObject.sections.length > 0
    ) {
      return lessonCourseObject.sections;
    }
    return lesson?.sections || [];
  }, [course?.sections, lessonCourseObject?.sections, lesson?.sections]);

  const shouldUseStoreProgress =
    String(courseProgressCourseId || "") ===
    String(lessonCourseId || "");

  const progress = useMemo(
    () =>
      (shouldUseStoreProgress ? courseProgress : null) ||
      course?.progress ||
      lessonCourseObject?.progress ||
      lesson?.progress ||
      {},
    [
      shouldUseStoreProgress,
      courseProgress,
      course?.progress,
      lessonCourseObject?.progress,
      lesson?.progress,
    ]
  );
  const completedLessons = Number(progress?.completedLessons) || 0;
  const totalLessons = Number(progress?.totalLessons) || 0;
  const derivedPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;
  const rawPercent = Number(progress?.percent);
  const percentToShow =
    Number.isFinite(rawPercent) && rawPercent > 0
      ? rawPercent
      : derivedPercent;
  const safePercent = Math.max(
    0,
    Math.min(100, percentToShow)
  );

  const shouldWaitForCourse =
    sections.length === 0 &&
    Boolean(lessonCourseId) &&
    storeCourseId !== lessonCourseId;

  useEffect(() => {
    debugLesson("Incoming lesson payload", {
      lessonId: resolveId(lesson),
      courseId: resolveId(lesson?.courseId),
      courseShape:
        lesson?.course == null
          ? "null"
          : Array.isArray(lesson?.course)
            ? "array"
            : typeof lesson?.course,
      hasCourseDetails: Boolean(lesson?.courseDetails),
      lessonSections: Array.isArray(lesson?.sections)
        ? lesson.sections.length
        : null,
    });
  }, [lesson]);

  useEffect(() => {
    debugLesson("Resolved sidebar state", {
      lessonCourseId,
      storeCourseId,
      loading,
      shouldWaitForCourse,
      sectionsCount: sections.length,
      usingLessonCourseObject: Boolean(lessonCourseObject),
      usingStoreCourse: Boolean(course),
    });
  }, [
    lessonCourseId,
    storeCourseId,
    loading,
    shouldWaitForCourse,
    sections.length,
    lessonCourseObject,
    course,
  ]);

  if ((loading || shouldWaitForCourse) && sections.length === 0) {
    return (
      <div className="w-full lg:w-[360px] bg-white p-6">
        <p className="text-sm text-gray-500">Loading course...</p>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="w-full lg:w-[360px] bg-white p-6">
        <p className="text-sm text-gray-500">
          Course content is unavailable right now.
        </p>
      </div>
    );
  }

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full lg:w-[360px] bg-white text-black min-h-screen">

      {/* ================= PROGRESS ================= */}
      <div className="p-4 sm:p-6 border-b border-[#EDEDED]">
        <h3 className="font-semibold text-lg mb-2">Your Progress</h3>

        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-sm">Course Completion</span>
          <span className="text-sm font-semibold">
            {safePercent}%
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${safePercent}%` }}
          />
        </div>

        <p className="text-xs text-gray-500">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>

      {/* ================= SECTIONS ================= */}
      {[...sections]
        .sort((a, b) => a.order - b.order)
        .map((section, index) => {
          const sectionId = section.id || section._id || `${index}`;
          const isOpen = openSections[sectionId] ?? index === 0;

          return (
            <div
              key={sectionId}
              className="p-4 sm:p-6 border-b border-[#EDEDED]"
            >
              {/* SECTION HEADER */}
              <button
                onClick={() => toggleSection(sectionId)}
                className="w-full flex justify-between items-center mb-4"
              >
                <h4 className="font-semibold text-left text-sm">
                  Section {index + 1}: {section.title}
                </h4>

                <FiChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* LESSON LIST */}
              {isOpen && (
                <div className="space-y-3">
                  {[...(section.lessons || [])]
                    .sort((a, b) => a.order - b.order)
                    .map((lesson, lessonIndex) => (
                      <div
                        key={
                          lesson.id ||
                          lesson._id ||
                          `${sectionId}-${lessonIndex}`
                        }
                        className="flex justify-between items-start gap-3 py-3 border-t border-[#EDEDED]"
                      >
                        {/* LEFT */}
                        <div className="flex gap-3">
                          <Image
                            src={
                              lesson.thumbnail ||
                              "/thumb-line.avif"
                            }
                            alt={lesson.title}
                            width={36}
                            height={36}
                            className={
                              lesson.isCompleted
                                ? ""
                                : "opacity-60"
                            }
                          />

                          <div>
                            <p className="text-sm font-medium">
                              {lesson.title}
                            </p>

                            {lesson.isCompleted && (
                              <span className="inline-block mt-1 text-[11px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <FiClock />
                          {Math.floor(lesson.duration / 60)}:
                          {String(
                            lesson.duration % 60
                          ).padStart(2, "0")}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
