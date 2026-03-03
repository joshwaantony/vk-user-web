





"use client";

import { useState } from "react";
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
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-xl text-black font-semibold mb-1">
        Course Content
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        {sortedSections.length} sections •{" "}
        {course.totalLessons} lessons
      </p>

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
                (completedLessons / sortedLessons.length) *
                  100
              )
            : 0;

        return (
          <div
            key={section.id}
            className="border rounded-xl mb-4"
          >
            {/* SECTION HEADER */}
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold text-[#495565] text-sm">
                  Section {index + 1}: {section.title}
                </p>
                <p className="text-xs text-gray-500">
                  {sortedLessons.length} lessons
                </p>
              </div>

              <div className="flex items-center gap-4">

                {/* ✅ Show circle ONLY if enrolled */}
                {course.isEnrolled && (
                  <CircleProgress
                    percentage={sectionPercent}
                  />
                )}

                <button
                  onClick={() => {
                    if (isSectionUnlocked) {
                      toggleSection(section.id);
                      return;
                    }
                    toast.error(unlockMessage);
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
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
            {isOpen && (
              <div className="border-t divide-y">
                {sortedLessons.map((lesson) => (
                  <Lesson
                    key={lesson.id}
                    lessonId={lesson.id}
                    courseId={course.id || course._id}
                    title={lesson.title}
                    time={`${Math.round(
                      lesson.duration / 60
                    )} min`}
                    locked={lesson.locked}
                    isCompleted={lesson.isCompleted}
                    isEnrolled={isEnrolled}
                    isSectionUnlocked={isSectionUnlocked}
                    isFirstSection={index === 0}
                    thumbnail={lesson.thumbnail}
                    onAccessDenied={async (message) => {
                      toast.error(
                        message ||
                          unlockMessage
                      );
                      await refreshCourseById(
                        course.id || course._id
                      );
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ================= CIRCLE PROGRESS ================= */

function CircleProgress({ percentage }) {
  const radius = 28;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-14 h-14">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
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
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#1E293B]">
        {percentage}%
      </div>
    </div>
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
        ? `/lessons/${lessonId}/watch?courseId=${encodeURIComponent(
            courseId
          )}`
        : `/lessons/${lessonId}/watch`;
      router.push(url);
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 403) {
        onAccessDenied?.(message);
        return;
      }

      toast.error(
        message || "Unable to open this lesson right now"
      );
    }
  };

  return (
    <div
      className={`flex justify-between items-center p-4 transition ${
        isCompleted
          ? "bg-emerald-50/70 border-l-4 border-emerald-500"
          : "hover:bg-gray-50"
      }`}
    >
      <div className="flex gap-4 items-center">
        <Image
          src={thumbnail || "/thumb-line.avif"}
          alt={title}
          width={48}
          height={48}
          className="rounded-lg object-cover"
        />

        <div>
          <p className="text-sm font-medium text-[#1E293B] flex items-center gap-2">
            {isCompleted && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white">
                <FiCheck size={12} />
              </span>
            )}
            <span>{title}</span>
          </p>
          <p className="text-xs text-gray-500">
            {isCompleted && "Completed"}
            {isCompleted && locked && " • "}
            {locked && "Locked lesson"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <FiClock /> {time}
        </span>

        <button
          onClick={handleWatch}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${
            !canWatchLesson
              ? "bg-[#EF4444] ring-2 ring-[#FCA5A5] hover:bg-[#DC2626]"
              : "bg-[#1F3FD7] hover:bg-[#1630A8]"
          }`}
          aria-label={
            canWatchLesson ? "Watch lesson" : "Locked lesson"
          }
        >
          {!canWatchLesson ? (
            <FiLock size={14} />
          ) : (
            <FiPlay size={14} />
          )}
        </button>
      </div>
    </div>
  );
}
