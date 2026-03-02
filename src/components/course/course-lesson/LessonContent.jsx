


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import WhatYouWillLearn from "@/components/course/course-details/WhatYouWillLearn";

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
  const { course, fetchCourseById, refreshCourseById } =
    useCourseStore();

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
  const refreshCourseTimerRef = useRef(null);

  const [videoLoading, setVideoLoading] = useState(true);

  const lessonId =
    lesson?.id || lesson?._id || lesson?.lessonId || lessonIdProp;
  const resolvedCourseId =
    resolveId(fallbackCourseId) ||
    resolveId(lesson?.courseId) ||
    resolveId(lesson?.course) ||
    resolveId(lesson?.courseDetails) ||
    resolveId(course);

  const orderedLessons = useMemo(() => {
    const sectionsFromCourse = Array.isArray(course?.sections)
      ? course.sections
      : [];
    const sectionsFromLessonCourse = Array.isArray(
      lesson?.courseDetails?.sections
    )
      ? lesson.courseDetails.sections
      : Array.isArray(lesson?.course?.sections)
        ? lesson.course.sections
        : [];
    const sections =
      sectionsFromCourse.length > 0
        ? sectionsFromCourse
        : sectionsFromLessonCourse;

    return [...sections]
      .sort((a, b) => (a?.order || 0) - (b?.order || 0))
      .flatMap((section) =>
        [...(section?.lessons || [])].sort(
          (a, b) => (a?.order || 0) - (b?.order || 0)
        )
      );
  }, [course?.sections, lesson?.courseDetails?.sections, lesson?.course?.sections]);

  const currentLessonIndex = useMemo(
    () =>
      orderedLessons.findIndex(
        (item) => resolveId(item) === resolveId(lessonId)
      ),
    [orderedLessons, lessonId]
  );

  const previousLesson =
    currentLessonIndex > 0
      ? orderedLessons[currentLessonIndex - 1]
      : null;
  const nextLesson =
    currentLessonIndex >= 0 &&
    currentLessonIndex < orderedLessons.length - 1
      ? orderedLessons[currentLessonIndex + 1]
      : null;
  const learningPoints = useMemo(() => {
    if (
      Array.isArray(course?.learningOutcomes) &&
      course.learningOutcomes.length > 0
    ) {
      return course.learningOutcomes;
    }
    if (
      Array.isArray(lesson?.courseDetails?.learningOutcomes) &&
      lesson.courseDetails.learningOutcomes.length > 0
    ) {
      return lesson.courseDetails.learningOutcomes;
    }
    if (
      Array.isArray(lesson?.course?.learningOutcomes) &&
      lesson.course.learningOutcomes.length > 0
    ) {
      return lesson.course.learningOutcomes;
    }
    return [];
  }, [
    course?.learningOutcomes,
    lesson?.courseDetails?.learningOutcomes,
    lesson?.course?.learningOutcomes,
  ]);

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

    const saveProgress = async (force = false) => {
      const currentTime = Math.floor(video.currentTime);

      if (currentTime <= 0) return;
      if (currentTime <= lastSavedTimeRef.current) return;

      if (
        !force &&
        currentTime - lastSavedTimeRef.current <
          PROGRESS_SAVE_INTERVAL_SECONDS
      ) return;

      lastSavedTimeRef.current = currentTime;
      await updateProgress(lessonId, currentTime);
      scheduleCourseRefresh();
    };

    const handleTimeUpdate = () => saveProgress(false);
    const handlePause = () => saveProgress(true);
    const handleEnded = async () => {
      const completionSeconds = Math.floor(
        Number(
          lesson?.duration ||
            video.duration ||
            video.currentTime
        )
      );

      if (completionSeconds > 0) {
        lastSavedTimeRef.current = completionSeconds;
        await updateProgress(lessonId, completionSeconds, {
          silent: false,
        });
        await refreshCourseNow();
        return;
      }

      saveProgress(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      saveProgress(true);
    };
  }, [lessonId, lesson?.duration, updateProgress]);

  const handleMarkCompleted = async () => {
    if (!lessonId) return;

    const video = videoRef.current;
    const duration = Math.floor(
      Number(
        lesson?.duration || video?.duration || video?.currentTime
      )
    );

    if (duration > 0) {
      lastSavedTimeRef.current = duration;
      await updateProgress(lessonId, duration, {
        silent: false,
      });
      await refreshCourseNow();
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const scheduleCourseRefresh = () => {
    if (!resolvedCourseId) return;

    if (refreshCourseTimerRef.current) {
      clearTimeout(refreshCourseTimerRef.current);
    }

    refreshCourseTimerRef.current = setTimeout(() => {
      refreshCourseById(resolvedCourseId);
    }, 400);
  };

  const refreshCourseNow = async () => {
    if (!resolvedCourseId) return;
    await refreshCourseById(resolvedCourseId);
    scheduleCourseRefresh();
  };

  useEffect(
    () => () => {
      if (refreshCourseTimerRef.current) {
        clearTimeout(refreshCourseTimerRef.current);
      }
    },
    []
  );

  const navigateToLesson = (targetLesson) => {
    const targetLessonId = resolveId(targetLesson);
    if (!targetLessonId) return;

    const url = resolvedCourseId
      ? `/lessons/${targetLessonId}/watch?courseId=${encodeURIComponent(
          resolvedCourseId
        )}`
      : `/lessons/${targetLessonId}/watch`;

    router.push(url);
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

          <button
            type="button"
            onClick={() => navigateToLesson(previousLesson)}
            disabled={!previousLesson}
            className={`px-5 py-3 rounded-lg flex items-center gap-2 text-sm transition ${
              previousLesson
                ? "bg-[#1E293B] text-white hover:bg-[#111827]"
                : "bg-[#1E293B] text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiArrowLeft />
            Previous Lesson
          </button>

     

          <button
            type="button"
            onClick={() => navigateToLesson(nextLesson)}
            disabled={!nextLesson}
            className={`px-5 py-3 rounded-lg font-medium flex items-center gap-2 text-sm transition ${
              nextLesson
                ? "bg-[#2563EB] text-white hover:bg-[#1E4ED8]"
                : "bg-[#93C5FD] text-white cursor-not-allowed"
            }`}
          >
            Next Lesson
            <FiArrowRight />
          </button>

        </div>
      </div>

      {learningPoints.length > 0 && (
        <div className="px-4 sm:px-8 pb-6">
          <WhatYouWillLearn points={learningPoints} />
        </div>
      )}

      {/* ================= INSTRUCTOR ================= */}
      {course?.faculty?.length > 0 && (
        <div className="px-4 sm:px-8 pb-20">
          <div className="relative overflow-hidden rounded-2xl border border-[#D7E3F5] bg-gradient-to-r from-[#F7FAFF] via-[#EDF3FF] to-[#E3EDFF] p-5 sm:p-6">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#1F3FD7]/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#60A5FA]/15 blur-2xl" />

            <p className="relative text-xs font-semibold tracking-[0.18em] uppercase text-[#1F3FD7] mb-4">
              Instructor
            </p>

            <div className="relative flex items-center gap-4">
              <img
                src={
                  course.faculty[0]?.imageUrl ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                }
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                alt={course.faculty[0]?.name}
              />

              <div>
                <p className="text-lg font-bold text-[#0F172A] leading-tight">
                  {course.faculty[0]?.name}
                </p>
                <p className="text-sm font-medium text-[#475569] mt-1">
                  {course.faculty[0]?.qualification || "Course Instructor"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
