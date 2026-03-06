



"use client";

import { useEffect, useRef, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiX,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import usePromoStore from "@/store/usePromoStore";
import PromoLoader from "@/components/loader/PromoLoader";
import Hls from "hls.js";

export default function SlideDesign() {
  const router = useRouter();

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

  const [showModal, setShowModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  /* ================= FETCH PROMOS ================= */
  useEffect(() => {
    getPromos();
  }, [getPromos]);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!promos.length) return;

    const interval = setInterval(() => {
      nextPromo();
    }, 10000);

    return () => clearInterval(interval);
  }, [promos.length, nextPromo]);

  /* ================= HLS VIDEO INIT ================= */
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
        video.play().catch(() => {});
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        setVideoLoading(false);
        video.play().catch(() => {});
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

  const activePromo = promos[activeIndex];
  if (!activePromo) return null;

  const imageUrl = activePromo.imageUrl || "/fallback.jpg";

  /* ================= PLAY HANDLER ================= */
  const handlePlay = async () => {
    const url = await watchPromo(activePromo.id);
    if (url) setShowModal(true);
  };

  /* ================= START LEARNING HANDLER ================= */
  const handleStartLearning = () => {
    if (activePromo?.courseId) {
      router.push(`/course/${activePromo.courseId}`);
    }
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

  /* ================= GRADIENTS ================= */
  const gradients = [
    "linear-gradient(90deg, #FFF7ED 0%, #FFEDD5 50%, #FFF7ED 100%)",
    "linear-gradient(90deg, #EEF2FF 0%, #E0E7FF 50%, #EEF2FF 100%)",
    "linear-gradient(90deg, #ECFDF5 0%, #D1FAE5 50%, #ECFDF5 100%)",
    "linear-gradient(90deg, #FEF2F2 0%, #FEE2E2 50%, #FEF2F2 100%)",
  ];

  const bgStyle = gradients[activeIndex % gradients.length];

  return (
    <div className="w-full">

      <section
        className="w-full rounded-3xl relative transition-all duration-700 ease-in-out"
        style={{ background: bgStyle }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* IMAGE */}
            <div className="flex justify-center lg:justify-start">
              <div className="rounded-2xl bg-white overflow-hidden shadow-xl w-full max-w-[500px]">
                <div className="relative group cursor-pointer">

                  <img
                    src={imageUrl}
                    alt={activePromo.title}
                    className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover transition duration-500 group-hover:scale-105"
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

                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="text-gray-900 relative text-center lg:text-left">

              <div className="absolute -top-4 right-0 hidden lg:flex gap-3">
                <button onClick={prevPromo} className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:scale-105 transition">
                  <HiChevronLeft size={16} />
                </button>

                <button onClick={nextPromo} className="w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:scale-105 transition">
                  <HiChevronRight size={16} />
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
                {activePromo.title}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-5">
                {activePromo.description}
              </p>

              {/* START LEARNING BUTTON */}
              <div className="flex justify-center lg:justify-start mt-4">
                <button
                  onClick={handleStartLearning}
                  className="bg-gray-900 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-semibold flex items-center gap-3 hover:scale-105 hover:bg-black transition"
                >
                  Start Learning
                  <HiChevronRight />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
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
