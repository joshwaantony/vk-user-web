



// "use client";

// import { useState } from "react";
// import { FiClock, FiChevronDown, FiPlay, FiLock } from "react-icons/fi";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// /* ================= MAIN COMPONENT ================= */

// export default function CourseContent({
//   sections = [],
//   totalLessons = 0,
// }) {
//   const [openSections, setOpenSections] = useState({});

//   const toggleSection = (id) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const sortedSections = [...sections].sort(
//     (a, b) => a.order - b.order
//   );

//   const calculatedLessons =
//     sortedSections.reduce(
//       (acc, s) => acc + (s.lessons?.length || 0),
//       0
//     ) || 0;

//   const lessonCount = totalLessons || calculatedLessons;

//   return (
//     <div className="bg-white border rounded-2xl p-6">
//       <h2 className="text-xl text-black font-semibold mb-1">
//         Course Content
//       </h2>

//       <p className="text-sm text-gray-500 mb-6">
//         {sortedSections.length} sections • {lessonCount} lessons
//       </p>

//       {sortedSections.map((section, index) => {
//         const isOpen =
//           openSections[section.id] ?? index === 0;

//         const sortedLessons = [...(section.lessons || [])].sort(
//           (a, b) => a.order - b.order
//         );

//         // ✅ Completed lessons count
//         const completedLessons = sortedLessons.filter(
//           (lesson) => lesson.completed
//         ).length;

//         const totalSectionLessons = sortedLessons.length;

//         const percentage =
//           totalSectionLessons > 0
//             ? Math.round(
//                 (completedLessons / totalSectionLessons) * 100
//               )
//             : 0;

//         return (
//           <div
//             key={section.id}
//             className="border rounded-xl mb-4"
//           >
//             {/* SECTION HEADER */}
//             <div className="flex justify-between items-center p-4">
//               <div>
//                 <p className="font-semibold text-[#495565] text-sm">
//                   Section {index + 1}: {section.title}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {sortedLessons.length} lessons •{" "}
//                   {completedLessons}/{totalSectionLessons} completed
//                 </p>
//               </div>

//               <div className="flex items-center gap-4">
//                 <CircleProgress percentage={percentage} />

//                 <button
//                   onClick={() => toggleSection(section.id)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F4F9] hover:bg-[#E7EBF3] transition"
//                 >
//                   <FiChevronDown
//                     size={16}
//                     className={`text-[#495565] transition-transform duration-300 ${
//                       isOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* LESSONS */}
//             {isOpen && (
//               <div className="border-t divide-y">
//                 {sortedLessons.map((lesson) => (
//                   <Lesson
//                     key={lesson.id}
//                     lessonId={lesson.id}
//                     title={lesson.title}
//                     time={`${Math.round(
//                       lesson.duration / 60
//                     )} min`}
//                     locked={lesson.locked}
//                     thumbnail={lesson.thumbnail}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ================= CIRCLE PROGRESS ================= */

// function CircleProgress({ percentage }) {
//   const radius = 28;
//   const stroke = 5;
//   const normalizedRadius = radius - stroke / 2;
//   const circumference = normalizedRadius * 2 * Math.PI;

//   const strokeDashoffset =
//     circumference - (percentage / 100) * circumference;

//   return (
//     <div className="relative w-14 h-14">
//       <svg height={radius * 2} width={radius * 2}>
//         {/* Background circle */}
//         <circle
//           stroke="#E5E7EB"
//           fill="transparent"
//           strokeWidth={stroke}
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//         />

//         {/* Progress circle */}
//         <circle
//           stroke={percentage === 100 ? "#22C55E" : "#2563EB"}
//           fill="transparent"
//           strokeWidth={stroke}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           r={normalizedRadius}
//           cx={radius}
//           cy={radius}
//           style={{
//             transform: "rotate(-90deg)",
//             transformOrigin: "50% 50%",
//           }}
//           className="transition-all duration-500"
//         />
//       </svg>

//       {/* Percentage text */}
//       <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#1E293B]">
//         {percentage}%
//       </div>
//     </div>
//   );
// }

// /* ================= LESSON ================= */

// function Lesson({
//   lessonId,
//   title,
//   time,
//   locked,
//   thumbnail,
// }) {
//   const router = useRouter();

//   const handleWatch = () => {
//     router.push(`/lessons/${lessonId}/watch`);
//   };

//   return (
//     <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
//       <div className="flex gap-4 items-center">
//         <Image
//           src={thumbnail || "/thumb-line.avif"}
//           alt={title}
//           width={48}
//           height={48}
//           className="rounded-lg object-cover"
//         />

//         <div>
//           <p className="text-sm font-medium text-[#1E293B]">
//             {title}
//           </p>
//           <p className="text-xs text-gray-500">
//             {locked && "Locked lesson"}
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <span className="flex items-center gap-1 text-xs text-gray-500">
//           <FiClock /> {time}
//         </span>

//         <button
//           onClick={locked ? undefined : handleWatch}
//           className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${
//             locked
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-[#1F3FD7] hover:bg-[#1630A8]"
//           }`}
//           disabled={locked}
//         >
//           {locked ? <FiLock size={14} /> : <FiPlay size={14} />}
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { FiClock, FiChevronDown, FiPlay, FiLock } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProgressStore } from "@/store/progress.store";

/* ================= MAIN COMPONENT ================= */

export default function CourseContent({
  sections = [],
  totalLessons = 0,
}) {
  const [openSections, setOpenSections] = useState({});

  const {
    lessonProgressByLessonId,
    getLessonProgress,
  } = useProgressStore();

  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sortedSections = [...sections].sort(
    (a, b) => a.order - b.order
  );

  /* ================= FETCH ALL LESSON PROGRESS ================= */
  useEffect(() => {
    sortedSections.forEach((section) => {
      section.lessons?.forEach((lesson) => {
        if (!lessonProgressByLessonId[lesson.id]) {
          getLessonProgress(lesson.id);
        }
      });
    });
  }, [sections]);

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

        const sortedLessons = [...(section.lessons || [])].sort(
          (a, b) => a.order - b.order
        );

        /* ================= CALCULATE COMPLETION ================= */

        const completedLessons = sortedLessons.filter(
          (lesson) => {
            const progress =
              lessonProgressByLessonId[lesson.id];

            if (!progress) return false;

            const watched =
              progress?.watchedSeconds || 0;

            const duration =
              lesson.duration || 0;

            return (
              duration > 0 &&
              watched / duration >= 0.95
            );
          }
        ).length;

        const totalSectionLessons = sortedLessons.length;

        const percentage =
          totalSectionLessons > 0
            ? Math.round(
                (completedLessons /
                  totalSectionLessons) *
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
                  {sortedLessons.length} lessons •{" "}
                  {completedLessons}/{totalSectionLessons} completed
                </p>
              </div>

              <div className="flex items-center gap-4">
                <CircleProgress percentage={percentage} />

                <button
                  onClick={() =>
                    toggleSection(section.id)
                  }
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
                    thumbnail={lesson.thumbnail}
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
  title,
  time,
  locked,
  thumbnail,
}) {
  const router = useRouter();

  const handleWatch = () => {
    router.push(`/lessons/${lessonId}/watch`);
  };

  return (
    <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
      <div className="flex gap-4 items-center">
        <Image
          src={thumbnail || "/thumb-line.avif"}
          alt={title}
          width={48}
          height={48}
          className="rounded-lg object-cover"
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

        <button
          onClick={locked ? undefined : handleWatch}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white transition-all ${
            locked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1F3FD7] hover:bg-[#1630A8]"
          }`}
          disabled={locked}
        >
          {locked ? <FiLock size={14} /> : <FiPlay size={14} />}
        </button>
      </div>
    </div>
  );
}