
"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  FiChevronDown,
  FiClock,
  FiCheck,
  FiLock,
  FiPlay,
} from "react-icons/fi";
import useCourseStore from "@/store/CourseStore";
import { useProgressStore } from "@/store/progress.store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const isLessonDebugEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_DEBUG_LESSON_WATCH === "true";

const debugLesson = (...args) => {
  if (!isLessonDebugEnabled) return;
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

export default function LessonSidebar({ lesson, fallbackCourseId }) {
  const router = useRouter();
  const unlockMessage = "Complete previous section to unlock";
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
    [lesson, fallbackCourseId],
  );
  const storeCourseId = useMemo(() => resolveId(course), [course]);
  console.log(lessonCourseId);

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
    if (lesson?.courseDetails && typeof lesson.courseDetails === "object") {
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
    const lessonCourseSections = Array.isArray(lessonCourseObject?.sections)
      ? lessonCourseObject.sections.length
      : 0;

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
    String(courseProgressCourseId || "") === String(lessonCourseId || "");

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
    ],
  );
  const completedLessons = Number(progress?.completedLessons) || 0;
  const totalLessons = Number(progress?.totalLessons) || 0;
  const derivedPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const rawPercent = Number(progress?.percent);
  const percentToShow =
    Number.isFinite(rawPercent) && rawPercent > 0 ? rawPercent : derivedPercent;
  const safePercent = Math.max(0, Math.min(100, percentToShow));
  const isEnrolled = Boolean(sidebarCourse?.isEnrolled ?? lesson?.isEnrolled);

  const shouldWaitForCourse =
    sections.length === 0 &&
    Boolean(lessonCourseId) &&
    storeCourseId !== lessonCourseId;
  const sortedSections = useMemo(
    () => [...sections].sort((a, b) => (a?.order || 0) - (b?.order || 0)),
    [sections],
  );

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

  const handleWatchLesson = (targetLessonId) => {
    if (!targetLessonId) return;

    const url = lessonCourseId
      ? `/lessons/${targetLessonId}/watch?courseId=${encodeURIComponent(
          lessonCourseId,
        )}`
      : `/lessons/${targetLessonId}/watch`;

    router.push(url);
  };

  return (
    <motion.div
      className="w-full lg:w-[360px] bg-white text-black min-h-screen"
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ================= PROGRESS ================= */}
      <motion.div
        className="p-4 sm:p-6 border-b border-[#EDEDED]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
      >
        <h3 className="font-semibold text-lg mb-2">Your Progress</h3>

        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-sm">Course Completion</span>
          <span className="text-sm font-semibold">{safePercent}%</span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
          <motion.div
            className="h-2 bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${safePercent}%` }}
            transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
          />
        </div>

        <p className="text-xs text-gray-500">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </motion.div>

      {/* ================= SECTIONS ================= */}
      {sortedSections.map((section, index) => {
        const previousSection = index > 0 ? sortedSections[index - 1] : null;
        const previousSectionCompleted = previousSection
          ? previousSection.isCompleted ||
            Number(previousSection.completedLessons || 0) >=
              Number(previousSection.totalLessons || 0)
          : true;
        const sectionUnlockedByApi = section.isUnlocked !== false;
        const isSectionUnlocked = isEnrolled
          ? index === 0
            ? sectionUnlockedByApi
            : sectionUnlockedByApi && previousSectionCompleted
          : true;

        const sectionId = section.id || section._id || `${index}`;
        const isOpen =
          openSections[sectionId] ?? (index === 0 && isSectionUnlocked);

        return (
          <motion.div
            key={sectionId}
            className="p-4 sm:p-6 border-b border-[#EDEDED]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 + index * 0.04 }}
          >
            {/* SECTION HEADER */}
            <button
              onClick={() => {
                if (isSectionUnlocked) {
                  toggleSection(sectionId);
                  return;
                }
                toast.error(unlockMessage);
              }}
              className="w-full flex justify-between items-center mb-4"
            >
              <h4 className="font-semibold text-left text-sm">
                Section {index + 1}: {section.title}
              </h4>

              {isSectionUnlocked ? (
                <FiChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-[#EF4444] text-white ring-2 ring-[#FCA5A5] flex items-center justify-center">
                  <FiLock size={14} />
                </span>
              )}
            </button>

            {/* LESSON LIST */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="space-y-3"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                {[...(section.lessons || [])]
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, lessonIndex) => {
                    const lessonId =
                      lesson.id || lesson._id || `${sectionId}-${lessonIndex}`;
                    const canWatchLesson =
                      !lesson.locked && (!isEnrolled || isSectionUnlocked);

                    return (
                      <motion.div
                        key={lessonId}
                        className={`flex justify-between items-start gap-3 py-3 border-t border-[#EDEDED] transition ${
                          lesson.isCompleted
                            ? "bg-emerald-50/60 border-l-4 border-emerald-500 pl-2 rounded-sm"
                            : ""
                        }`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: lessonIndex * 0.03 }}
                      >
                        {/* LEFT */}
                        <div className="flex gap-3">
                          {/* IMPROVED THUMBNAIL */}
                          <div className="relative flex-shrink-0 group/image">
                            <Image
                              src={lesson.thumbnail || "/thumb-line.avif"}
                              alt={lesson.title}
                              width={48}
                              height={48}
                              className={`
                                w-12 h-12 rounded-2xl object-cover shadow-lg border-2 transition-all duration-300
                                group-hover/image:shadow-xl group-hover/image:scale-105 group-hover/image:-rotate-1
                                ${lesson.isCompleted 
                                  ? 'ring-4 ring-emerald-200/70 shadow-emerald-300/50 border-emerald-200/50 bg-emerald-50/50' 
                                  : 'ring-2 ring-slate-200/70 shadow-slate-200/50 border-slate-200/50 opacity-85 hover:opacity-100'
                                }
                              `}
                            />
                            
                            {/* Play overlay for non-completed lessons */}
                            {!lesson.isCompleted && canWatchLesson && (
                              <div className="absolute inset-0 w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                                <FiPlay className="w-5 h-5 text-white shadow-lg" />
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-medium flex items-center gap-2">
                              {lesson.isCompleted && (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shadow-md">
                                  <FiCheck size={12} />
                                </span>
                              )}
                              <span>{lesson.title}</span>
                            </p>

                            {lesson.isCompleted && (
                              <span className="inline-block mt-1 text-[11px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full font-semibold shadow-sm">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <FiClock />
                            {Math.floor(lesson.duration / 60)}:
                            {String(lesson.duration % 60).padStart(2, "0")}
                          </span>

                          <motion.div className="relative group" whileHover={{ y: -2 }}>
                            <motion.button
                              type="button"
                              onClick={() => {
                                if (!canWatchLesson) {
                                  toast.error(unlockMessage);
                                  return;
                                }
                                handleWatchLesson(lesson.id || lesson._id);
                              }}
                              className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:scale-110 ${
                                !canWatchLesson
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-[#1F3FD7] hover:bg-[#1630A8]"
                              }`}
                              aria-label={
                                canWatchLesson
                                  ? "Watch lesson"
                                  : "Locked lesson"
                              }
                              whileTap={canWatchLesson ? { scale: 0.96 } : undefined}
                            >
                              {canWatchLesson ? (
                                <FiPlay size={14} />
                              ) : (
                                <FiLock size={14} />
                              )}
                            </motion.button>

                            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              {canWatchLesson
                                ? "Watch lesson"
                                : "Locked lesson"}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
