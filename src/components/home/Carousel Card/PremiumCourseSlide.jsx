



"use client";

import { useEffect } from "react";
import usePromoStore from "@/store/usePromoStore";

import {
  HiOutlineClock,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { FaFireAlt } from "react-icons/fa";

export default function PremiumCourseSlide() {
  const {
    promos,
    activeIndex,
    getPromos,
    nextPromo,
    prevPromo,
    loading,
  } = usePromoStore();

  /* ---------------- FETCH PROMOS ---------------- */
  useEffect(() => {
    getPromos();
  }, [getPromos]);

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!promos.length) return;

    const interval = setInterval(() => {
      nextPromo();
    }, 5000);

    return () => clearInterval(interval);
  }, [promos.length, nextPromo]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        Loading promos...
      </div>
    );
  }

  if (!promos.length) return null;

  const promo = promos[activeIndex];

  /* ---------------- BACKGROUND PRESETS ---------------- */
  const backgrounds = [
    ["#7C3AED", "#8B5CF6", "#9333EA"],
    ["#0EA5E9", "#38BDF8", "#0284C7"],
    ["#22C55E", "#4ADE80", "#16A34A"],
    ["#F97316", "#FB923C", "#EA580C"],
  ];

  const [from, via, to] =
    backgrounds[activeIndex % backgrounds.length];

  const bgStyle = {
    background: `linear-gradient(135deg, ${from}, ${via}, ${to})`,
  };

  return (
    <div className="w-full">
      {/* ================= CAROUSEL ================= */}
      <div
        style={bgStyle}
        className="
          relative w-full overflow-hidden
          px-4 sm:px-8 lg:px-12
          py-10 sm:py-14 lg:py-16
          transition-[background] duration-700 ease-in-out
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ================= LEFT – IMAGE ================= */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-[320px] sm:w-full sm:max-w-md mx-auto">
            <div className="relative">
              <img
                src={promo.imageUrl || "/fallback.jpg"}
                alt={promo.title}
                className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover"
              />

              <div className="absolute bottom-3 right-3 text-white text-xs sm:text-sm flex items-center gap-2">
                <HiOutlineClock />
                14 weeks
              </div>
            </div>
          </div>

          {/* ================= RIGHT – CONTENT ================= */}
          <div className="text-white text-center lg:text-left relative">

            {/* ARROWS */}
            <div className="hidden sm:flex absolute top-0 right-0 gap-3">
              <button
                onClick={prevPromo}
                className="w-10 h-10 bg-white text-black rounded-full hover:scale-105 transition"
              >
                <HiChevronLeft />
              </button>

              <button
                onClick={nextPromo}
                className="w-10 h-10 bg-white text-black rounded-full hover:scale-105 transition"
              >
                <HiChevronRight />
              </button>
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 mt-14 mb-5 px-4 py-2 rounded-full bg-white/20 text-xs sm:text-sm font-semibold">
              <FaFireAlt />
              PREMIUM
            </span>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-5">
              {promo.title}
            </h2>

            {/* Description */}
            <p className="text-white/80 max-w-xl mx-auto lg:mx-0 mb-7 text-sm sm:text-base">
              {promo.description}
            </p>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <button className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 transition">
                Start Learning
                <HiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
