


"use client";

import { useEffect, useRef, useState } from "react";
import usePromoStore from "@/store/usePromoStore";
import { useRouter } from "next/navigation";
import {
  HiOutlineClock,
  HiChevronLeft,
  HiChevronRight,
  HiX,
} from "react-icons/hi";
import { FaFireAlt } from "react-icons/fa";
import PromoLoader from "@/components/loader/PromoLoader";
import Hls from "hls.js";

export default function PremiumCourseSlide() {
  const {
    promos,
    activeIndex,
    getPromos,
    nextPromo,
    prevPromo,
    loading,
    watchPromo,
    videoUrl,
    clearVideo,
  } = usePromoStore();
const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const handleStartLearning = () => {
  if (promo?.courseId) {
    router.push(`/course/${promo.courseId}`);
  }
};

  /* ================= FETCH PROMOS ================= */
  useEffect(() => {
    getPromos();
  }, [getPromos]);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!promos.length) return;

    const interval = setInterval(() => {
      nextPromo();
    }, 5000);

    return () => clearInterval(interval);
  }, [promos.length, nextPromo]);

  /* ================= HLS INIT ================= */
  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const video = videoRef.current;
    setVideoLoading(true);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setVideoLoading(false);
        video.play().catch(() => { });
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        setVideoLoading(false);
        video.play().catch(() => { });
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl, showModal]);

  if (loading) return <PromoLoader />;
  if (!promos.length) return null;

  const promo = promos[activeIndex];

  /* ================= PLAY HANDLER ================= */
  const handlePlay = async () => {
    const url = await watchPromo(promo.id);
    if (url) setShowModal(true);
  };

  /* ================= CLOSE HANDLER ================= */
  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    clearVideo();
    setShowModal(false);
  };

  /* ================= BACKGROUND ================= */
  const backgrounds = [
    ["#F3E8FF", "#E9D5FF", "#DDD6FE"],
    ["#E0F2FE", "#BAE6FD", "#BFDBFE"],
    ["#DCFCE7", "#BBF7D0", "#86EFAC"],
    ["#FFEDD5", "#FED7AA", "#FDBA74"],
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
        className="relative w-full overflow-hidden px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-14 md:py-16 lg:py-20 transition-[background] duration-700 ease-in-out"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ================= IMAGE ================= */}
          <div className="w-full flex justify-center lg:justify-start">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg">
              <div className="relative group cursor-pointer">

                <img
                  src={promo.imageUrl || "/fallback.jpg"}
                  alt={promo.title}
                  className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110"
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-20 animate-ping"></span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 px-3 py-1 rounded-full text-white text-xs sm:text-sm flex items-center gap-2">
                  <HiOutlineClock />
                  14 weeks
                </div>
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="text-gray-900 text-center lg:text-left relative">

            <div className="hidden md:flex absolute -top-4 right-0 gap-3">
              <button onClick={prevPromo} className="w-10 h-10 flex items-center justify-center bg-white border border-[#E5E7EB] text-gray-800 rounded-full hover:scale-110 transition">
                <HiChevronLeft />
              </button>
              <button onClick={nextPromo} className="w-10 h-10 flex items-center justify-center bg-white border border-[#E5E7EB] text-gray-800 rounded-full hover:scale-110 transition">
                <HiChevronRight />
              </button>
            </div>

            <span className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white shadow-sm text-gray-800 text-xs sm:text-sm font-semibold">
              <FaFireAlt className="text-orange-500" />
              PREMIUM
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-5">
              {promo.title}
            </h2>

            <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 text-sm sm:text-base md:text-lg">
              {promo.description}
            </p>


                        
         {/* CTA */}
<div className="flex justify-center lg:justify-start">
  <button
    onClick={handleStartLearning}
    className="
      bg-gray-900 text-white
      px-6 sm:px-8 md:px-10
      py-3 sm:py-4
      rounded-xl font-semibold
      flex items-center gap-3
      hover:scale-105 hover:bg-black
      transition
    "
  >
    Start Learning
    <HiChevronRight />
  </button>
</div>

          </div>
        </div>
      </div>

      {/* ================= VIDEO MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl px-4">

            <button onClick={handleClose} className="absolute -top-10 right-0 text-white text-3xl">
              <HiX />
            </button>

            <div className="relative bg-black rounded-xl overflow-hidden">

              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <PromoLoader />
                </div>
              )}

              <video
                ref={videoRef}
                controls
                className="w-full h-[240px] sm:h-[320px] lg:h-[480px]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}