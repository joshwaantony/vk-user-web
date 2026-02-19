



"use client";

import { useEffect } from "react";
import usePromoStore from "@/store/usePromoStore";
import {
  HiOutlineClock,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { FaFireAlt } from "react-icons/fa";
import PromoLoader from "@/components/loader/PromoLoader";

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
  if (loading) return <PromoLoader />;
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
      <div
        style={bgStyle}
        className="
          relative w-full overflow-hidden
          px-4 sm:px-6 md:px-10 lg:px-16
          py-12 sm:py-14 md:py-16 lg:py-20
          transition-[background] duration-700 ease-in-out
        "
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ================= IMAGE ================= */}
          <div className="w-full flex justify-center lg:justify-start">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg">
              <div className="relative">
                <img
                  src={promo.imageUrl || "/fallback.jpg"}
                  alt={promo.title}
                  className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
                />

                <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs sm:text-sm flex items-center gap-2">
                  <HiOutlineClock />
                  14 weeks
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="text-white text-center lg:text-left relative">

            {/* Desktop Arrows */}
            <div className="hidden md:flex absolute -top-4 right-0 gap-3">
              <button
                onClick={prevPromo}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 transition"
              >
                <HiChevronLeft />
              </button>

              <button
                onClick={nextPromo}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-110 transition"
              >
                <HiChevronRight />
              </button>
            </div>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/20 text-xs sm:text-sm font-semibold">
              <FaFireAlt />
              PREMIUM
            </span>

            {/* Title */}
            <h2 className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-extrabold leading-tight mb-5
            ">
              {promo.title}
            </h2>

            {/* Description */}
            <p className="
              text-white/80
              max-w-xl
              mx-auto lg:mx-0
              mb-8
              text-sm sm:text-base md:text-lg
            ">
              {promo.description}
            </p>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <button className="
                bg-white text-black
                px-6 sm:px-8 md:px-10
                py-3 sm:py-4
                rounded-xl font-semibold
                flex items-center gap-3
                hover:scale-105 transition
              ">
                Start Learning
                <HiChevronRight />
              </button>
            </div>

            {/* Mobile Arrows */}
            <div className="flex md:hidden justify-center gap-6 mt-8">
              <button
                onClick={prevPromo}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full"
              >
                <HiChevronLeft />
              </button>

              <button
                onClick={nextPromo}
                className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full"
              >
                <HiChevronRight />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
