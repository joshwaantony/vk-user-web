// "use client";

// import { useEffect, useRef, useState } from "react";
// import Hls from "hls.js";
// import useCourseStore from "@/store/CourseStore";
// import {
//   FiArrowLeft,
//   FiArrowRight,
//   FiBookOpen,
//   FiCheckCircle,
//   FiMaximize,
// } from "react-icons/fi";
// import { useRouter } from "next/navigation";
// import PromoLoader from "@/components/loader/PromoLoader";
// import { useProgressStore } from "@/store/progress.store";

// const PROGRESS_SAVE_INTERVAL_SECONDS = 10;
// const { course, fetchCourseById } = useCourseStore();

// export default function LessonContent({
//   lesson,
//   lessonId: lessonIdProp,
// }) {
//   const router = useRouter();
//   const videoRef = useRef(null);
//   const hlsRef = useRef(null);
//   const lastSavedTimeRef = useRef(0);
//   const hasResumedRef = useRef(false);

//   const [videoLoading, setVideoLoading] = useState(true);
//   const lessonId =
//     lesson?.id || lesson?._id || lesson?.lessonId || lessonIdProp;

//   const {
//     updateProgress,
//     getLessonProgress,
//     lessonProgress,
//     setActiveLesson,
//     clearLessonProgress,
//     updateLoading,
//   } = useProgressStore();

//   // ================= FETCH SAVED PROGRESS =================

//   useEffect(() => {
//   if (lesson?.courseId) {
//     fetchCourseById(lesson.courseId);
//   }
// }, [lesson?.courseId]);
//   useEffect(() => {
//     if (!lessonId) return;

//     hasResumedRef.current = false;
//     lastSavedTimeRef.current = 0;
//     setActiveLesson(lessonId);
//     getLessonProgress(lessonId);

//     return () => {
//       clearLessonProgress();
//     };
//   }, [
//     lessonId,
//     setActiveLesson,
//     getLessonProgress,
//     clearLessonProgress,
//   ]);

//   // ================= RESUME PLAYBACK =================
//   useEffect(() => {
//     const video = videoRef.current;
//     const watchedSeconds = Math.floor(
//       Number(lessonProgress?.watchedSeconds || 0)
//     );

//     if (
//       !video ||
//       watchedSeconds <= 0 ||
//       hasResumedRef.current
//     ) {
//       return;
//     }

//     const applyResume = () => {
//       video.currentTime = watchedSeconds;
//       lastSavedTimeRef.current = watchedSeconds;
//       hasResumedRef.current = true;
//     };

//     if (video.readyState >= 1) {
//       applyResume();
//       return;
//     }

//     video.addEventListener("loadedmetadata", applyResume, {
//       once: true,
//     });

//     return () => {
//       video.removeEventListener(
//         "loadedmetadata",
//         applyResume
//       );
//     };
//   }, [lessonProgress?.watchedSeconds]);

//   // ================= HLS PLAYER SETUP =================
//   useEffect(() => {
//     if (!lesson?.playbackUrl || !videoRef.current) return;

//     const video = videoRef.current;

//     setVideoLoading(true);

//     if (Hls.isSupported()) {
//       const hls = new Hls({
//         enableWorker: true,
//         lowLatencyMode: true,
//       });

//       hls.loadSource(lesson.playbackUrl);
//       hls.attachMedia(video);

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         setVideoLoading(false);
//       });

//       hls.on(Hls.Events.ERROR, (event, data) => {
//         console.error("HLS Error:", data);
//       });

//       hlsRef.current = hls;
//     } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       const handleLoadedMetadata = () => {
//         setVideoLoading(false);
//       };
//       video.src = lesson.playbackUrl;
//       video.addEventListener(
//         "loadedmetadata",
//         handleLoadedMetadata
//       );

//       return () => {
//         video.removeEventListener(
//           "loadedmetadata",
//           handleLoadedMetadata
//         );
//       };
//     }

//     return () => {
//       if (hlsRef.current) {
//         hlsRef.current.destroy();
//         hlsRef.current = null;
//       }
//     };
//   }, [lesson?.playbackUrl]);

//   // ================= AUTO SAVE PROGRESS =================
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !lessonId) return;

//     const saveProgress = (force = false) => {
//       const currentTime = Math.floor(video.currentTime);
//       if (currentTime <= 0) return;
//       if (currentTime <= lastSavedTimeRef.current) return;

//       if (
//         !force &&
//         currentTime - lastSavedTimeRef.current <
//           PROGRESS_SAVE_INTERVAL_SECONDS
//       ) {
//         return;
//       }

//       lastSavedTimeRef.current = currentTime;
//       updateProgress(lessonId, currentTime);
//     };

//     const handleTimeUpdate = () => {
//       saveProgress(false);
//     };
//     const handlePause = () => saveProgress(true);
//     const handleEnded = () => saveProgress(true);

//     video.addEventListener("timeupdate", handleTimeUpdate);
//     video.addEventListener("pause", handlePause);
//     video.addEventListener("ended", handleEnded);

//     return () => {
//       video.removeEventListener("timeupdate", handleTimeUpdate);
//       video.removeEventListener("pause", handlePause);
//       video.removeEventListener("ended", handleEnded);
//       saveProgress(true);
//     };
//   }, [lessonId, updateProgress]);

//   const handleMarkCompleted = () => {
//     if (!lessonId) return;
//     const video = videoRef.current;
//     const duration = Math.floor(
//       Number(
//         lesson?.duration || video?.duration || video?.currentTime
//       )
//     );

//     if (duration > 0) {
//       lastSavedTimeRef.current = duration;
//       updateProgress(lessonId, duration, {
//         silent: false,
//       });
//     }
//   };

//   // ================= FULLSCREEN =================
//   const handleFullscreen = () => {
//     if (videoRef.current?.requestFullscreen) {
//       videoRef.current.requestFullscreen();
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-[#EEF5FF]">

//       {/* ================= TOP BAR ================= */}
//       <div className="h-16 flex items-center px-4 sm:px-6 border-b bg-[#EEF5FF]">

//         <div
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-sm text-black font-semibold cursor-pointer hover:text-gray-500 transition"
//         >
//           <FiArrowLeft />
//           <span className="hidden sm:inline">Back to Course</span>
//         </div>

//         <div className="flex-1 flex justify-center items-center gap-2 text-black font-semibold text-sm">
//           <FiBookOpen />
//           <span className="whitespace-nowrap">
//             {lesson?.title}
//           </span>
//         </div>
//       </div>

//       {/* ================= VIDEO PLAYER ================= */}
//       <div className="relative bg-black">

//         {videoLoading && (
//           <div className="absolute inset-0 flex items-center justify-center text-white bg-[#F3F8FF]">
//             <PromoLoader/>
//           </div>
//         )}

//         <video
//           ref={videoRef}
//           controls
//           className="w-full h-[240px] sm:h-[320px] lg:h-[480px]"
//         />

//         <button
//           onClick={handleFullscreen}
//           className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-lg transition"
//           aria-label="Fullscreen"
//         >
//           <FiMaximize size={18} />
//         </button>
//       </div>

//       {/* ================= LESSON DETAILS ================= */}
//       <div className="px-4 sm:px-8 py-6 border-t">

//         <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
//           <h2 className="text-lg sm:text-xl text-black font-semibold">
//             {lesson?.title}
//           </h2>

//           <div className="flex items-center gap-1 text-sm text-gray-500">
//             <span>🕒</span>
//             <span>
//               {lesson?.duration
//                 ? `${Math.round(lesson.duration / 60)} min`
//                 : ""}
//             </span>
//           </div>
//         </div>

//         <p className="text-gray-500 text-sm mb-6">
//           {lesson?.description || ""}
//         </p>

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="flex flex-wrap items-center gap-3 sm:gap-4">

//           <button className="px-5 py-3 rounded-lg bg-[#1E293B] text-gray-400 flex items-center gap-2 text-sm">
//             <FiArrowLeft />
//             Previous Lesson
//           </button>

//           <button
//             type="button"
//             onClick={handleMarkCompleted}
//             disabled={updateLoading}
//             className="px-5 py-3 rounded-lg bg-[#16A34A] text-white font-medium flex items-center gap-2 text-sm hover:bg-[#15803D] transition disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             <FiCheckCircle />
//             {updateLoading
//               ? "Saving..."
//               : "Mark as Completed"}
//           </button>

//           <button className="px-5 py-3 rounded-lg bg-[#2563EB] text-white font-medium flex items-center gap-2 text-sm hover:bg-[#1E4ED8] transition">
//             Next Lesson
//             <FiArrowRight />
//           </button>

//         </div>
//       </div>

//       {/* ================= INSTRUCTOR ================= */}
//       {/* <div className="px-4 sm:px-8 py-6 border-t flex gap-4 pb-20">

//         <img
//           src="https://randomuser.me/api/portraits/women/44.jpg"
//           className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
//           alt="Instructor"
//         />

//         <div>
//           <p className="font-semibold text-black">
//             Instructor Name
//           </p>
//           <p className="text-sm font-semibold text-gray-500">
//             Course Instructor
//           </p>
//         </div>
//       </div> */}


//       {/* ================= INSTRUCTOR ================= */}
// {course?.faculty?.length > 0 && (
//   <div className="px-4 sm:px-8 py-6 border-t flex gap-4 pb-20">

//     <img
//       src={
//         course.faculty[0]?.imageUrl ||
//         "https://randomuser.me/api/portraits/men/32.jpg"
//       }
//       className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
//       alt={course.faculty[0]?.name}
//     />

//     <div>
//       <p className="font-semibold text-black">
//         {course.faculty[0]?.name}
//       </p>
//       <p className="text-sm font-semibold text-gray-500">
//         {course.faculty[0]?.qualification}
//       </p>
//     </div>

//   </div>
// )}
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import useCourseStore from "@/store/CourseStore";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiMaximize,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import PromoLoader from "@/components/loader/PromoLoader";
import { useProgressStore } from "@/store/progress.store";

const PROGRESS_SAVE_INTERVAL_SECONDS = 10;
const resolveId = (value) => {
  if (!value) return null;
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "object") {
    return (
      value.id?.toString?.() ||
      value._id?.toString?.() ||
      value.courseId?.toString?.() ||
      null
    );
  }
  return null;
};

export default function LessonContent({
  lesson,
  lessonId: lessonIdProp,
  fallbackCourseId,
}) {
  const router = useRouter();

  // ✅ MUST BE INSIDE COMPONENT
  const { course, fetchCourseById } = useCourseStore();

  const {
    updateProgress,
    getLessonProgress,
    lessonProgress,
    setActiveLesson,
    clearLessonProgress,
    updateLoading,
  } = useProgressStore();

  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const lastSavedTimeRef = useRef(0);
  const hasResumedRef = useRef(false);

  const [videoLoading, setVideoLoading] = useState(true);

  const lessonId =
    lesson?.id || lesson?._id || lesson?.lessonId || lessonIdProp;

  /* ================= FETCH COURSE ================= */
  useEffect(() => {
    const lessonCourseId =
      resolveId(fallbackCourseId) ||
      resolveId(lesson?.courseId) ||
      resolveId(lesson?.course) ||
      resolveId(lesson?.courseDetails);
    const currentCourseId = resolveId(course);

    if (!lessonCourseId) return;
    if (currentCourseId === lessonCourseId) return;

    fetchCourseById(lessonCourseId);
  }, [fallbackCourseId, lesson, course, fetchCourseById]);

  /* ================= FETCH PROGRESS ================= */
  useEffect(() => {
    if (!lessonId) return;

    hasResumedRef.current = false;
    lastSavedTimeRef.current = 0;

    setActiveLesson(lessonId);
    getLessonProgress(lessonId);

    return () => {
      clearLessonProgress();
    };
  }, [lessonId, setActiveLesson, getLessonProgress, clearLessonProgress]);

  /* ================= RESUME VIDEO ================= */
  useEffect(() => {
    const video = videoRef.current;
    const watchedSeconds = Math.floor(
      Number(lessonProgress?.watchedSeconds || 0)
    );

    if (!video || watchedSeconds <= 0 || hasResumedRef.current) return;

    const applyResume = () => {
      video.currentTime = watchedSeconds;
      lastSavedTimeRef.current = watchedSeconds;
      hasResumedRef.current = true;
    };

    if (video.readyState >= 1) {
      applyResume();
      return;
    }

    video.addEventListener("loadedmetadata", applyResume, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", applyResume);
    };
  }, [lessonProgress?.watchedSeconds]);

  /* ================= HLS PLAYER ================= */
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
      });

      hlsRef.current = hls;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      const handleLoaded = () => setVideoLoading(false);
      video.src = lesson.playbackUrl;
      video.addEventListener("loadedmetadata", handleLoaded);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoaded);
      };
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [lesson?.playbackUrl]);

  /* ================= AUTO SAVE ================= */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !lessonId) return;

    const saveProgress = (force = false) => {
      const currentTime = Math.floor(video.currentTime);

      if (currentTime <= 0) return;
      if (currentTime <= lastSavedTimeRef.current) return;

      if (
        !force &&
        currentTime - lastSavedTimeRef.current <
          PROGRESS_SAVE_INTERVAL_SECONDS
      ) return;

      lastSavedTimeRef.current = currentTime;
      updateProgress(lessonId, currentTime);
    };

    video.addEventListener("timeupdate", () => saveProgress(false));
    video.addEventListener("pause", () => saveProgress(true));
    video.addEventListener("ended", () => saveProgress(true));

    return () => saveProgress(true);
  }, [lessonId, updateProgress]);

  const handleMarkCompleted = () => {
    if (!lessonId) return;

    const video = videoRef.current;
    const duration = Math.floor(
      Number(
        lesson?.duration || video?.duration || video?.currentTime
      )
    );

    if (duration > 0) {
      lastSavedTimeRef.current = duration;
      updateProgress(lessonId, duration, { silent: false });
    }
  };

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
          <div className="absolute inset-0 flex items-center justify-center text-white bg-[#F3F8FF]">
            <PromoLoader />
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

        {/* ================= ACTION BUTTONS (UNCHANGED UI) ================= */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

          <button className="px-5 py-3 rounded-lg bg-[#1E293B] text-gray-400 flex items-center gap-2 text-sm">
            <FiArrowLeft />
            Previous Lesson
          </button>

          {/* <button
            type="button"
            onClick={handleMarkCompleted}
            disabled={updateLoading}
            className="px-5 py-3 rounded-lg bg-[#16A34A] text-white font-medium flex items-center gap-2 text-sm hover:bg-[#15803D] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FiCheckCircle />
            {updateLoading ? "Saving..." : "Mark as Completed"}
          </button> */}

          <button className="px-5 py-3 rounded-lg bg-[#2563EB] text-white font-medium flex items-center gap-2 text-sm hover:bg-[#1E4ED8] transition">
            Next Lesson
            <FiArrowRight />
          </button>

        </div>
      </div>

      {/* ================= INSTRUCTOR ================= */}
      {course?.faculty?.length > 0 && (
        <div className="px-4 sm:px-8 py-6 border-t flex gap-4 pb-20">

          <img
            src={
              course.faculty[0]?.imageUrl ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            alt={course.faculty[0]?.name}
          />

          <div>
            <p className="font-semibold text-black">
              {course.faculty[0]?.name}
            </p>
            <p className="text-sm font-semibold text-gray-500">
              {course.faculty[0]?.qualification}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
