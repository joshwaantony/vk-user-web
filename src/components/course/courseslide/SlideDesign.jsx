

"use client";

import { useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import usePromoStore from "@/store/usePromoStore";
import PromoLoader from "@/components/loader/PromoLoader";

export default function SlideDesign() {
  const {
    promos,
    activeIndex,
    getPromos,
    nextPromo,
    prevPromo,
    loading,
  } = usePromoStore();

  /* FETCH PROMOS */
  useEffect(() => {
    getPromos();
  }, [getPromos]);

  /* AUTO SLIDE */
  useEffect(() => {
    if (!promos.length) return;

    const interval = setInterval(() => {
      nextPromo();
    }, 10000);

    return () => clearInterval(interval);
  }, [promos.length, nextPromo]);

  if (loading) {
    return (
      <div>
        <PromoLoader />
      </div>
    );
  }

  const activePromo = promos[activeIndex];
  if (!activePromo) return null;

  const imageUrl = activePromo.imageUrl || "/fallback.jpg";

  /* 🎨 Light Pastel Gradients */
  const gradients = [
    "linear-gradient(90deg, #FFF7ED 0%, #FFEDD5 50%, #FFF7ED 100%)", // orange
    "linear-gradient(90deg, #EEF2FF 0%, #E0E7FF 50%, #EEF2FF 100%)", // indigo
    "linear-gradient(90deg, #ECFDF5 0%, #D1FAE5 50%, #ECFDF5 100%)", // green
    "linear-gradient(90deg, #FEF2F2 0%, #FEE2E2 50%, #FEF2F2 100%)", // red
  ];

  const bgStyle = gradients[activeIndex % gradients.length];

  return (
    <div className="w-full">

      {/* ================= MAIN SLIDE ================= */}
      <section
        className="w-full rounded-3xl relative transition-all duration-700 ease-in-out"
        style={{ background: bgStyle }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* IMAGE */}
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-2xl bg-white overflow-hidden shadow-xl w-full max-w-[500px]">
                <img
                  src={imageUrl}
                  alt={activePromo.title}
                  className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover transition-opacity duration-700"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="text-gray-900 relative text-center lg:text-left">

              {/* ARROWS */}
              <div className="absolute -top-4 right-0 flex gap-3">
                <button
                  onClick={prevPromo}
                  className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:scale-105 transition"
                >
                  <HiChevronLeft size={16} />
                </button>

                <button
                  onClick={nextPromo}
                  className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:scale-105 transition"
                >
                  <HiChevronRight size={16} />
                </button>
              </div>

              {/* TITLE */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
                {activePromo.title}
              </h1>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-5">
                {activePromo.description}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BOTTOM INDICATOR ================= */}
      <section className="hidden md:block bg-white py-6">
        <div className="max-w-5xl mx-auto text-center">

          <div className="flex justify-center gap-3 mb-2">
            {promos.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-green-500 w-6"
                    : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-700 text-sm">
            Promo{" "}
            <span className="text-green-600 font-semibold">
              {activeIndex + 1}
            </span>{" "}
            of {promos.length}
          </p>

        </div>
      </section>

    </div>
  );
}
