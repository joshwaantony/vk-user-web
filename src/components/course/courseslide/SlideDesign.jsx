

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

  /* AUTO SLIDE EVERY 30s */
  useEffect(() => {
    if (!promos.length) return;

    const interval = setInterval(() => {
      nextPromo();
    }, 10000);

    return () => clearInterval(interval);
  }, [promos.length, nextPromo]);

  const activePromo = promos[activeIndex];

  if (loading) {
    return (
      <div className="">
        <PromoLoader/>
      </div>
    );
  }

  if (!activePromo) return null;

  /* IMAGE */
  const imageUrl = activePromo.imageUrl || "/fallback.jpg";

  /* 🎨 Dynamic Backgrounds */
  const gradients = [
    "linear-gradient(90deg, #F97316 0%, #FB923C 50%, #F97316 100%)",
    "linear-gradient(90deg, #6366F1 0%, #8B5CF6 50%, #6366F1 100%)",
    "linear-gradient(90deg, #10B981 0%, #34D399 50%, #10B981 100%)",
    "linear-gradient(90deg, #EF4444 0%, #F87171 50%, #EF4444 100%)",
  ];

  const bgStyle = gradients[activeIndex % gradients.length];

  return (
    <div className="w-full">

      {/* ================= MAIN SLIDE ================= */}
      <section
        className="w-full rounded-3xl relative transition-all duration-700 ease-in-out"
        style={{ background: bgStyle }}
      >
        <div className="max-w-[1400px] mx-auto px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* IMAGE */}
            <div>
              <div className="rounded-2xl bg-white overflow-hidden shadow-xl w-full max-w-[500px]">
                <img
                  src={imageUrl}
                  alt={activePromo.title}
                  className="w-full h-[240px] object-cover transition-opacity duration-700"
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="text-white relative">

              {/* ARROWS */}
              <div className="absolute -top-4 right-0 flex gap-3">
                <button
                  onClick={prevPromo}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow"
                >
                  <HiChevronLeft size={16} />
                </button>

                <button
                  onClick={nextPromo}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow"
                >
                  <HiChevronRight size={16} />
                </button>
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-3 transition-all duration-500">
                {activePromo.title}
              </h1>

              <p className="text-white/80 text-sm max-w-md mb-5 transition-all duration-500">
                {activePromo.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM SLIDER ================= */}
      <section className="hidden md:block bg-white py-5">
        <div className="max-w-5xl mx-auto text-center">

          <div className="flex justify-center gap-3 mb-2">
            {promos.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-green-500 w-6"
                    : "bg-gray-400 w-2"
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
