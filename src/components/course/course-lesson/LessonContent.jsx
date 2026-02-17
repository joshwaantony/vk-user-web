"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiMaximize,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LessonContent({ lesson }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const [videoLoading, setVideoLoading] = useState(true);

  // ================= HLS PLAYER SETUP =================
  useEffect(() => {
    if (!lesson?.playbackUrl || !videoRef.current) return;

    const video = videoRef.current;

    setVideoLoading(true);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(lesson.playbackUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setVideoLoading(false);
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari Native Support
      video.src = lesson.playbackUrl;
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
  }, [lesson]);

  // ================= FULLSCREEN =================
  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#EEF5FF]">

      {/* ================= TOP BAR ================= */}
      <div className="h-16 flex items-center px-4 sm:px-6 border-b bg-[#EEF5FF]">

        <div
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-black font-semibold cursor-pointer hover:text-gray-500 transition"
        >
          <FiArrowLeft />
          <span className="hidden sm:inline">Back to Course</span>
        </div>

        <div className="flex-1 flex justify-center items-center gap-2 text-black font-semibold text-sm">
          <FiBookOpen />
          <span className="whitespace-nowrap">
            {lesson?.title}
          </span>
        </div>
      </div>

      {/* ================= VIDEO PLAYER ================= */}
      <div className="relative bg-black">

        {videoLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/60 z-10">
            Loading video...
          </div>
        )}

        <video
          ref={videoRef}
          controls
          className="w-full h-[240px] sm:h-[320px] lg:h-[480px]"
        />

        <button
          onClick={handleFullscreen}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-lg transition"
          aria-label="Fullscreen"
        >
          <FiMaximize size={18} />
        </button>
      </div>

      {/* ================= LESSON DETAILS ================= */}
      <div className="px-4 sm:px-8 py-6 border-t">

        <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
          <h2 className="text-lg sm:text-xl text-black font-semibold">
            {lesson?.title}
          </h2>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>🕒</span>
            <span>
              {lesson?.duration
                ? `${Math.round(lesson.duration / 60)} min`
                : ""}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          {lesson?.description || ""}
        </p>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

          <button className="px-5 py-3 rounded-lg bg-[#1E293B] text-gray-400 flex items-center gap-2 text-sm">
            <FiArrowLeft />
            Previous Lesson
          </button>

          <button className="px-5 py-3 rounded-lg bg-[#16A34A] text-white font-medium flex items-center gap-2 text-sm hover:bg-[#15803D] transition">
            <FiCheckCircle />
            Mark as Completed
          </button>

          <button className="px-5 py-3 rounded-lg bg-[#2563EB] text-white font-medium flex items-center gap-2 text-sm hover:bg-[#1E4ED8] transition">
            Next Lesson
            <FiArrowRight />
          </button>

        </div>
      </div>

      {/* ================= INSTRUCTOR ================= */}
      <div className="px-4 sm:px-8 py-6 border-t flex gap-4 pb-20">

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
          alt="Instructor"
        />

        <div>
          <p className="font-semibold text-black">
            Instructor Name
          </p>
          <p className="text-sm font-semibold text-gray-500">
            Course Instructor
          </p>
        </div>
      </div>
    </div>
  );
}
