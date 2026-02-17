
"use client";

import { useState } from "react";
import { FiClock, FiChevronDown, FiPlay, FiLock } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CourseContent({
  sections = [],
  totalLessons = 0,
}) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Sort sections by order
  const sortedSections = [...sections].sort(
    (a, b) => a.order - b.order
  );

  // ✅ Safe lesson count (fallback if totalLessons missing)
  const calculatedLessons =
    sortedSections.reduce(
      (acc, s) => acc + (s.lessons?.length || 0),
      0
    ) || 0;

  const lessonCount = totalLessons || calculatedLessons;

  return (
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-xl text-black font-semibold mb-1">
        Course Content
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {sortedSections.length} sections • {lessonCount} lessons
      </p>

      {sortedSections.map((section, index) => {
        const isOpen =
          openSections[section.id] ?? index === 0;

        // ✅ Sort lessons by order
        const sortedLessons = [...(section.lessons || [])].sort(
          (a, b) => a.order - b.order
        );

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

              <button
                onClick={() => toggleSection(section.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F4F9] hover:bg-[#E7EBF3] transition"
              >
                <FiChevronDown
                  size={16}
                  className={`text-[#495565] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>

            {/* LESSONS */}
            {isOpen && (
              <div className="border-t divide-y">
                {sortedLessons.map((lesson) => (
                  <Lesson
                    key={lesson.id}
                    lessonId={lesson.id}
                    title={lesson.title}
                    time={`${Math.round(
                      lesson.duration / 60
                    )} min`}
                    locked={lesson.locked}
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

function Lesson({ lessonId, title, time, locked }) {
  const router = useRouter();

  const handleWatch = () => {
    router.push(`/lessons/${lessonId}/watch`);
  };

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-4">
        <Image
          src="/thumb-line.avif"
          alt="lesson thumbnail"
          width={40}
          height={40}
          className={locked ? "opacity-40" : ""}
        />

        <div>
          <p className="text-sm font-medium text-[#1E293B]">
            {title}
          </p>
          <p className="text-xs text-gray-500">
            {locked && "Locked lesson"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <FiClock /> {time}
        </span>

        {/* Watch/Lock Icon */}
        <button
          onClick={locked ? undefined : handleWatch}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${locked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1F3FD7] hover:bg-[#1630A8] cursor-pointer"
            }`}
          aria-label={locked ? "Locked lesson" : "Watch lesson"}
          disabled={locked}
        >
          {locked ? <FiLock size={14} /> : <FiPlay size={14} />}
        </button>
      </div>
    </div>
  );
}