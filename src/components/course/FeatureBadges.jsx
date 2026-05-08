"use client";

import { useState } from "react";
import { FaAward, FaShieldAlt, FaChartLine } from "react-icons/fa";

export default function FeatureBadges() {
  const [active, setActive] = useState(null);

  const items = [
    {
      icon: <FaAward className="text-[#EABF56] text-xl" />,
      label: "Award winning\nCurriculum",
      tooltip: "Industry-recognized syllabus designed by experts",
    },
    {
      icon: <FaShieldAlt className="text-[#5EEAD4] text-xl" />,
      label: "Expert\nInstructor",
      tooltip: "Learn directly from experienced professionals",
    },
    {
      icon: <FaChartLine className="text-[#60A5FA] text-xl" />,
      label: "Career\nGrowth",
      tooltip: "Skills that help you grow faster in your career",
    },
  ];

  return (
    <div className="grid w-full max-w-[340px] grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:gap-6 sm:justify-start">
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={`relative group ${i === items.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
          onClick={() => setActive(active === i ? null : i)}
        >
          {/* Card */}
          <div
            className="
              h-[124px] w-full rounded-2xl
              border border-white/10 bg-white/10
              px-4 backdrop-blur-md
              flex flex-col
              items-center
              justify-center
              text-center
              gap-3.5
              cursor-pointer
              transition duration-300
              shadow-[0_18px_40px_rgba(3,10,27,0.18)]
              hover:bg-white/20
              sm:h-[120px] sm:w-[140px] sm:px-3
            "
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8">
              {item.icon}
            </div>
            <p className="text-[13px] text-white/90 whitespace-pre-line leading-snug sm:text-sm">
              {item.label}
            </p>
          </div>

          {/* Tooltip */}
          <div
            className={`
              absolute
              -top-16
              left-1/2
              -translate-x-1/2
              z-10 w-[220px]
              px-3
              py-2
              rounded-lg
              bg-[#0B1B3A]
              text-xs
              text-white
              text-center
              transition
              pointer-events-none
              ${
                active === i
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }
              sm:group-hover:opacity-100
              sm:group-hover:scale-100
            `}
          >
            {item.tooltip}

            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[#0B1B3A] rotate-45" />
          </div>
        </div>
      ))}
    </div>
  );
}
