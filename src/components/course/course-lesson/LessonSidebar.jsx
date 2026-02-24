





"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiClock } from "react-icons/fi";
import useCourseStore from "@/store/CourseStore";

export default function LessonSidebar() {
  const { course, loading } = useCourseStore();
  const [openSections, setOpenSections] = useState({});

  if (loading) {
    return (
      <div className="w-full lg:w-[360px] bg-white p-6">
        <p className="text-sm text-gray-500">Loading course...</p>
      </div>
    );
  }

  if (!course) return null;

  const { sections, progress } = course;

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

        <div className="flex justify-between text-sm mb-2">
          <span>Course Completion</span>
          <span className="font-semibold">
            {progress?.percent || 0}%
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${progress?.percent || 0}%` }}
          />
        </div>

        <p className="text-xs text-gray-500">
          {progress?.completedLessons || 0} of{" "}
          {progress?.totalLessons || 0} lessons completed
        </p>
      </div>

      {/* ================= SECTIONS ================= */}
      {sections
        ?.sort((a, b) => a.order - b.order)
        .map((section, index) => {
          const isOpen =
            openSections[section.id] ?? index === 0;

          return (
            <div
              key={section.id}
              className="p-4 sm:p-6 border-b border-[#EDEDED]"
            >
              {/* SECTION HEADER */}
              <button
                onClick={() => toggleSection(section.id)}
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
                  {section.lessons
                    ?.sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <div
                        key={lesson.id}
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