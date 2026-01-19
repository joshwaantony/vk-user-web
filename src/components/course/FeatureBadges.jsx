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
    <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
      {items.map((item, i) => (
        <div
          key={i}
          className="relative group"
          onClick={() => setActive(active === i ? null : i)}
        >
          {/* Card */}
          <div
            className="
              w-[120px] sm:w-[140px]
              h-[110px] sm:h-[120px]
              rounded-xl
              bg-white/10
              backdrop-blur
              flex flex-col
              items-center
              justify-center
              text-center
              gap-3
              cursor-pointer
              transition
              hover:bg-white/20
            "
          >
            {item.icon}
            <p className="text-[13px] sm:text-sm text-white/90 whitespace-pre-line leading-snug">
              {item.label}
            </p>
          </div>

          {/* Tooltip */}
          <div
            className={`
              absolute
              -top-14
              left-1/2
              -translate-x-1/2
              w-[220px]
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
