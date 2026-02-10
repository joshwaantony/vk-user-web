




"use client";

import { useState } from "react";
import { FiClock, FiChevronDown } from "react-icons/fi";
import Image from "next/image";

export default function CourseContent({ sections = [] }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((p) => ({ ...p, [id]: !p[id] }));
  };

  const totalLessons = sections.reduce(
    (acc, s) => acc + s.lessons.length,
    0
  );

  return (
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-xl text-black font-semibold mb-1">Course Content</h2>
      <p className="text-sm text-gray-500 mb-6">
        {sections.length} sections • {totalLessons} lessons
      </p>

      {sections.map((section, i) => {
        const isOpen = openSections[section.id] ?? i === 0;

        return (
          <div key={section.id} className="border rounded-xl mb-4">
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold text-[#495565] text-sm">
                  Section {i + 1}: {section.title}
                </p>
                <p className="text-xs text-gray-500">
                  {section.lessons.length} lessons
                </p>
              </div>

        <button
  onClick={() => toggleSection(section.id)}
  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F4F9] hover:bg-[#E7EBF3] transition"
>
  <FiChevronDown
    size={16}
    className={`text-[#495565] transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
  />
</button>

            </div>

            {isOpen && (
              <div className="border-t divide-y">
                {section.lessons.map((l) => (
                  <Lesson
                    key={l.id}
                    title={l.title}
                    time={`${Math.round(l.duration / 60)} min`}
                    isFree={l.isFree}
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

function Lesson({ title, time, isFree }) {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-4">
        <Image
          src="/thumb-line.avif"
          alt=""
          width={40}
          height={40}
          className={isFree ? "" : "opacity-40"}
        />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500">
            {isFree ? "Free lesson" : "Locked lesson"}
          </p>
        </div>
      </div>

      <span className="flex items-center gap-1 text-xs text-gray-500">
        <FiClock /> {time}
      </span>
    </div>
  );
}
