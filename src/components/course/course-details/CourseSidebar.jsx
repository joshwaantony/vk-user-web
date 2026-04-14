




"use client";

import {
  FiPlayCircle,
  FiCheckCircle,
  FiVideo,
  FiSmartphone
} from "react-icons/fi";
import { BsInfinity } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useProgressStore } from "@/store/progress.store";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CouponPopup from "@/components/Coupon/CouponPopup";
import toast from "react-hot-toast";

const getFirstLessonId = (course) => {
  const sections = Array.isArray(course?.sections)
    ? [...course.sections].sort((a, b) => (a?.order || 0) - (b?.order || 0))
    : [];

  for (const section of sections) {
    const lessons = Array.isArray(section?.lessons)
      ? [...section.lessons].sort((a, b) => (a?.order || 0) - (b?.order || 0))
      : [];

    const firstLesson = lessons.find((lesson) => lesson?.id || lesson?._id);
    if (firstLesson) {
      return firstLesson.id || firstLesson._id;
    }
  }

  return null;
};

export default function CourseSidebar({ course }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const isLoggedIn = !!token;

  const {
    courseProgress,
    courseProgressCourseId,
    getCourseProgress,
  } = useProgressStore();

  const isEnrolled = course?.isEnrolled;

  const [showPopup, setShowPopup] = useState(false);

  /* ================= FETCH COURSE PROGRESS ================= */
  useEffect(() => {
    if (isLoggedIn && isEnrolled && course?.id) {
      getCourseProgress(course.id);
    }
  }, [course?.id, isLoggedIn, isEnrolled]);

  /* ---------------- BUTTON CLICK ---------------- */
  const handleButtonClick = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (isEnrolled) {
      const firstLessonId = getFirstLessonId(course);
      const safeCourseId = course?.id || course?._id;

      if (!firstLessonId) {
        toast.error("No lessons available yet");
        return;
      }

      const watchUrl = safeCourseId
        ? `/lessons/${firstLessonId}/watch?courseId=${encodeURIComponent(
            safeCourseId
          )}`
        : `/lessons/${firstLessonId}/watch`;

      router.push(watchUrl);
    } else {
      setShowPopup(true);
    }
  };

  /* ---------------- BUTTON TEXT ---------------- */
  const getButtonText = () => {
    if (!isLoggedIn) return "Login to Enroll";
    if (isEnrolled) return "Watch Now";
    return "Enroll Now";
  };

  /* ================= SAFE VALUES ================= */
  const courseId = course?.id || course?._id;
  const shouldUseStoreProgress =
    String(courseProgressCourseId || "") ===
    String(courseId || "");

  const percent =
    (shouldUseStoreProgress
      ? courseProgress?.percent
      : undefined) ??
    course?.progress?.percent ??
    0;

  const completedLessons =
    (shouldUseStoreProgress
      ? courseProgress?.completedLessons
      : undefined) ??
    course?.progress?.completedLessons ??
    0;

  const totalLessons =
    (shouldUseStoreProgress
      ? courseProgress?.totalLessons
      : undefined) ??
    course?.progress?.totalLessons ??
    course?.totalLessons ??
    0;
  const safePercent = Math.max(
    0,
    Math.min(100, Number(percent) || 0)
  );

  return (
    <>
      <aside className="w-full lg:max-w-sm">
        <div className="space-y-8 lg:sticky lg:top-[120px]">

          {/* PRICE CARD */}
          <motion.div
            className="group bg-[#1F3FD7] text-white rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            {!isEnrolled && (
              <>
                <p className="text-sm opacity-80">Course Price</p>
                <h2 className="text-3xl font-bold my-3">
                  ₹{course?.price}
                </h2>
              </>
            )}

            {isEnrolled && (
              <div className="mb-5 rounded-2xl border border-white/25 bg-white/10 p-4 text-left transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/15">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1F3FD7]">
                    <FiCheckCircle className="text-xl" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      You are enrolled
                    </p>
                    <p className="text-xs text-white/80">
                      Start learning from where you left off
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleButtonClick}
              className="w-full bg-white text-[#1F3FD7] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <FiPlayCircle />
              {getButtonText()}
            </button>
          </motion.div>

          {/* PROGRESS CARD */}
          <motion.div
            className="bg-white border rounded-2xl p-8"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="font-semibold text-black mb-5">
              Your Progress
            </h4>

            <div className="flex justify-between text-sm mb-3">
              <span className="text-[#3C3B3B]">
                Course Completion
              </span>
              <span className="font-semibold text-black">
                {safePercent}%
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mb-4">
              <motion.div
                className="h-2 bg-[#1F3FD7] rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${safePercent}%` }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              />
            </div>

            <p className="text-sm text-gray-500 mb-6">
              {completedLessons} of {totalLessons} lessons completed
            </p>

            <h5 className="font-semibold text-black mb-4">
              This course includes:
            </h5>

            <ul className="space-y-4 text-sm text-gray-600">

              <li className="flex items-center gap-3">
                <FiVideo className="text-[#1F3FD7]" />
                {course?.totalLessons || 0} video{" "}
                {course?.totalLessons === 1 ? "lesson" : "lessons"}
              </li>

              <li className="flex items-center gap-3">
                <FiSmartphone className="text-[#1F3FD7]" />
                Mobile access
              </li>

              <li className="flex items-center gap-3">
                <BsInfinity className="text-[#1F3FD7]" />
                Lifetime access
              </li>

              <li className="flex items-center gap-3">
                <BiSupport className="text-[#1F3FD7]" />
                Q&A support
              </li>

            </ul>
          </motion.div>

        </div>
      </aside>

      {/* COUPON POPUP */}
      {showPopup && isLoggedIn && !isEnrolled && (
        <CouponPopup
          courseId={course.id || course._id}
          course={course}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
