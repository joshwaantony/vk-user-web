

"use client";

import { HiArrowLeft, HiStar } from "react-icons/hi";
import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CourseHero({ course }) {
  const router = useRouter();

  if (!course) return null;


  const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
  const handleBack = () => {
    // If user has history, go back
    if (window.history.length > 1) {
      router.back();
    } else {
      // fallback route
      router.push("/course");
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* ✅ STICKY BACK BAR */}
      <motion.div
        className="sticky top-0 z-40 bg-white "
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        <div className="px-4 py-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
          >
            <HiArrowLeft />
            Back
          </button>
        </div>
      </motion.div>

      {/* HERO CARD */}
      <motion.div
        className="bg-white rounded-2xl overflow-hidden "
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.12 }}
      >
        <div className="relative h-[220px] w-full">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <motion.h1
            className="absolute bottom-4 left-4 text-xl font-bold text-white"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            {course.title}
          </motion.h1>
        </div>

        <motion.div
          className="p-6 space-y-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <p className="text-sm text-gray-600">
            {course.description}
          </p>

          <motion.div
            className="flex flex-wrap gap-6 text-sm font-semibold text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.28 }}
          >
            <span className="flex items-center gap-1">
              <HiStar className="text-yellow-400" /> {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <FiUsers /> {course.students} students
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> {formatDuration(course.duration)}
            </span>
            <span className="flex items-center gap-1">
              <FiPlay /> {course.lessons} lessons
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
