



"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiClock,
  FiChevronDown,
  FiPlay,
  FiLock,
  FiCheck,
} from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCourseStore from "@/store/CourseStore";
import { watchLesson } from "@/services/lesson.service";
import toast from "react-hot-toast";

/* ================= MAIN COMPONENT ================= */

const escapeSvgText = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getLessonFallbackThumbnail = (title = "Lesson") => {
  const safeTitle = escapeSvgText(title.trim() || "Lesson");
  const label = safeTitle.slice(0, 18);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
      <defs>
        <linearGradient id="lessonGradient" x1="8" y1="8" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1D4ED8" />
          <stop offset="1" stop-color="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="24" fill="url(#lessonGradient)" />
      <rect x="8" y="8" width="80" height="80" rx="20" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.15" />
      <circle cx="30" cy="30" r="10" fill="white" fill-opacity="0.18" />
      <path d="M45 25.5C45 24.1193 46.1193 23 47.5 23H66.5C67.8807 23 69 24.1193 69 25.5C69 26.8807 67.8807 28 66.5 28H47.5C46.1193 28 45 26.8807 45 25.5Z" fill="white" fill-opacity="0.9"/>
      <path d="M45 35.5C45 34.1193 46.1193 33 47.5 33H60.5C61.8807 33 63 34.1193 63 35.5C63 36.8807 61.8807 38 60.5 38H47.5C46.1193 38 45 36.8807 45 35.5Z" fill="white" fill-opacity="0.65"/>
      <path d="M24 58C24 54.6863 26.6863 52 30 52H66C69.3137 52 72 54.6863 72 58V66C72 69.3137 69.3137 72 66 72H30C26.6863 72 24 69.3137 24 66V58Z" fill="white" fill-opacity="0.12"/>
      <path d="M39 57.5C39 55.567 41.1494 54.406 42.7692 55.4698L53.8462 62.7442C55.3102 63.7056 55.3102 65.8544 53.8462 66.8158L42.7692 74.0902C41.1494 75.154 39 73.993 39 72.06V57.5Z" fill="white"/>
      <text x="48" y="86" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="white" fill-opacity="0.95">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export default function CourseContent() {
  const [openSections, setOpenSections] = useState({});
  const unlockMessage = "Complete previous section to unlock";

  const { course, refreshCourseById } = useCourseStore();

  if (!course) return null;

  const sections = course.sections || [];
  const isEnrolled = Boolean(course.isEnrolled);

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sortedSections = [...sections].sort(
    (a, b) => a.order - b.order
  );

  return (
    <motion.div
      className="bg-white  rounded-2xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h2
        className="text-lg sm:text-xl text-black font-semibold mb-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        Course Content
      </motion.h2>

      <motion.p
        className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {sortedSections.length} sections • {course.totalLessons} lessons
      </motion.p>

      {sortedSections.map((section, index) => {
        const previousSection = index > 0 ? sortedSections[index - 1] : null;

        const previousSectionCompleted = previousSection
          ? previousSection.isCompleted ||
            (Number(previousSection.completedLessons || 0) >=
              Number(previousSection.totalLessons || 0))
          : true;

        const sectionUnlockedByApi = section.isUnlocked !== false;

        const isSectionUnlocked = isEnrolled
          ? index === 0
            ? sectionUnlockedByApi
            : sectionUnlockedByApi && previousSectionCompleted
          : true;

        const isOpen =
          openSections[section.id] ??
          (index === 0 && isSectionUnlocked);

        const sortedLessons = [...(section.lessons || [])].sort(
          (a, b) => a.order - b.order
        );

        const completedLessons = sortedLessons.filter(
          (lesson) => lesson.isCompleted
        ).length;

        const sectionPercent =
          sortedLessons.length > 0
            ? Math.round(
                (completedLessons / sortedLessons.length) * 100
              )
            : 0;

        return (
          <motion.div
            key={section.id}
            className="border border-[#EDEDED] rounded-xl mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            {/* SECTION HEADER */}
            <div className="flex justify-between items-center p-3 sm:p-4 gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-[#495565] text-xs sm:text-sm truncate">
                  Section {index + 1}: {section.title}
                </p>

                <p className="text-[11px] sm:text-xs text-gray-500">
                  {sortedLessons.length} lessons
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">

                {course.isEnrolled && (
                  <CircleProgress percentage={sectionPercent} />
                )}

                <button
                  onClick={() => {
                    if (isSectionUnlocked) {
                      toggleSection(section.id);
                      return;
                    }
                    toast.error(unlockMessage);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition ${
                    isSectionUnlocked
                      ? "bg-[#F1F4F9] hover:bg-[#E7EBF3]"
                      : "bg-[#EF4444] text-white ring-2 ring-[#FCA5A5] hover:bg-[#DC2626]"
                  }`}
                >
                  {isSectionUnlocked ? (
                    <FiChevronDown
                      size={16}
                      className={`text-[#495565] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  ) : (
                    <FiLock size={14} />
                  )}
                </button>
              </div>
            </div>

            {/* LESSONS */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="border-t border-[#EDEDED] divide-y"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                {sortedLessons.map((lesson) => (
                  <Lesson
                    key={lesson.id}
                    lessonId={lesson.id}
                    courseId={course.id || course._id}
                    title={lesson.title}
                    time={`${Math.round(lesson.duration / 60)} min`}
                    locked={lesson.locked}
                    isCompleted={lesson.isCompleted}
                    isEnrolled={isEnrolled}
                    isSectionUnlocked={isSectionUnlocked}
                    isFirstSection={index === 0}
                    thumbnail={lesson.thumbnail}
                    onAccessDenied={async (message) => {
                      toast.error(message || unlockMessage);
                      await refreshCourseById(course.id || course._id);
                    }}
                  />
                ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ================= CIRCLE PROGRESS ================= */

function CircleProgress({ percentage }) {
  const radius = 26;
  const stroke = 5;

  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="relative w-12 h-12 sm:w-14 sm:h-14"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <motion.circle
          stroke={percentage === 100 ? "#22C55E" : "#2563EB"}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
          className="transition-all duration-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-semibold text-[#1E293B]">
        {percentage}%
      </div>
    </motion.div>
  );
}

/* ================= LESSON ================= */

function Lesson({
  lessonId,
  courseId,
  title,
  time,
  locked,
  isCompleted,
  isEnrolled,
  isSectionUnlocked,
  isFirstSection,
  thumbnail,
  onAccessDenied,
}) {
  const router = useRouter();

  const canWatchLesson =
    !locked && (!isEnrolled || isSectionUnlocked);

  const handleWatch = async () => {
    if (!canWatchLesson) {
      if (!isEnrolled && isFirstSection) {
        toast.error("Enroll to Course");
        return;
      }
      onAccessDenied?.();
      return;
    }

    try {
      await watchLesson(lessonId);

      const url = courseId
        ? `/lessons/${lessonId}/watch?courseId=${encodeURIComponent(courseId)}`
        : `/lessons/${lessonId}/watch`;

      router.push(url);
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 403) {
        onAccessDenied?.(message);
        return;
      }

      toast.error(message || "Unable to open this lesson right now");
    }
  };

  return (
    <motion.div
      className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-3 sm:p-4 transition ${
        isCompleted
          ? "bg-emerald-50/70 border-l-4 border-emerald-500"
          : "hover:bg-gray-50"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="flex gap-3 sm:gap-4 items-center">
        <Image
          src={thumbnail || getLessonFallbackThumbnail(title)}
          alt={title}
          width={48}
          height={48}
          className="rounded-lg object-cover w-10 h-10 sm:w-12 sm:h-12"
        />

        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-medium text-[#1E293B] flex items-center gap-2">
            {isCompleted && (
              <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 text-white">
                <FiCheck size={11} />
              </span>
            )}
            <span className="truncate">{title}</span>
          </p>

          <p className="text-[11px] sm:text-xs text-gray-500">
            {isCompleted && "Completed"}
            {isCompleted && locked && " • "}
            {locked && "Locked lesson"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3">
        <span className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-500">
          <FiClock /> {time}
        </span>

        <motion.div className="relative group" whileHover={{ y: -2 }}>
          <motion.button
            onClick={handleWatch}
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-white transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:scale-110 ${
              !canWatchLesson
                ? "bg-[#EF4444] ring-2 ring-[#FCA5A5] hover:bg-[#DC2626]"
                : "bg-[#1F3FD7] hover:bg-[#1630A8]"
            }`}
            whileTap={{ scale: 0.96 }}
          >
            {!canWatchLesson ? (
              <FiLock size={14} />
            ) : (
              <FiPlay size={14} />
            )}
          </motion.button>

          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#111827] px-2 py-1 text-[11px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {canWatchLesson ? "Watch lesson" : "Locked lesson"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
