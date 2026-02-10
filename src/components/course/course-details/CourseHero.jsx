
// "use client";

// import { HiArrowLeft, HiStar } from "react-icons/hi";
// import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
// import { useRouter } from "next/navigation";

// export default function CourseHero({ course }) {
//   const router = useRouter();

//   if (!course) return null;

//   return (
//     <>
//       {/* FIXED BACK BAR (OVERLAYS CONTENT) */}
// <div className="sticky top-[72px] z-50 bg-white border-b shadow-sm">
//   <div className="max-w-7xl mx-auto px-4 py-3">
//     <button
//       onClick={() => router.push("/course")}
//       className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition"
//     >
//       <HiArrowLeft />
//       Back to Courses
//     </button>
//   </div>
// </div>

//       {/* HERO CARD (CONTENT WILL SCROLL UNDER BAR) */}
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="bg-white border rounded-2xl overflow-hidden">
//           {/* IMAGE */}
//           <div className="relative h-[220px] w-full">
//             <img
//               src={course.thumbnail}
//               alt={course.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/25" />

//             {/* TITLE */}
//             <h1 className="absolute bottom-5 left-6 text-xl font-semibold text-white">
//               {course.title}
//             </h1>
//           </div>

//           {/* DESCRIPTION */}
//           {course.description && (
//             <p className="px-6 pt-4 text-sm text-gray-600 max-w-3xl">
//               {course.description}
//             </p>
//           )}

//           {/* META */}
//           <div className="px-6 py-4 flex flex-wrap gap-6 text-sm text-gray-600 font-medium">
//             {course.rating && (
//               <span className="flex items-center gap-1">
//                 <HiStar className="text-yellow-400" />
//                 {course.rating} rating
//               </span>
//             )}

//             {typeof course.students === "number" && (
//               <span className="flex items-center gap-1">
//                 <FiUsers />
//                 {course.students.toLocaleString()} students
//               </span>
//             )}

//             {course.duration && (
//               <span className="flex items-center gap-1">
//                 <FiClock />
//                 {course.duration}
//               </span>
//             )}

//             {course.lessons && (
//               <span className="flex items-center gap-1">
//                 <FiPlay />
//                 {course.lessons} lessons
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { HiArrowLeft, HiStar } from "react-icons/hi";
// import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
// import { useRouter } from "next/navigation";

// export default function CourseHero({ course }) {
//   const router = useRouter();

//   const barRef = useRef(null);
//   const heroRef = useRef(null);

//   const [topOffset, setTopOffset] = useState(0);
//   const [visible, setVisible] = useState(true);

//   // 🔹 keep bar at same initial position (NO JUMP)
//   useEffect(() => {
//     if (barRef.current) {
//       const rect = barRef.current.getBoundingClientRect();
//       setTopOffset(rect.top);
//     }
//   }, []);

//   // 🔹 hide bar when HERO leaves viewport
//   useEffect(() => {
//     if (!heroRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setVisible(entry.isIntersecting);
//       },
//       {
//         threshold: 0,
//       }
//     );

//     observer.observe(heroRef.current);
//     return () => observer.disconnect();
//   }, []);

//   if (!course) return null;

//   return (
//     <div className="relative">

//       {/* ✅ BACK BAR */}
//       <div
//         ref={barRef}
//         className={`
//           sticky z-30 bg-white border-b transition-all duration-300
//           ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
//         `}
//         style={{ top: `${topOffset}px` }}
//       >
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <button
//             onClick={() => router.push("/course")}
//             className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
//           >
//             <HiArrowLeft />
//             Back to Courses
//           </button>
//         </div>
//       </div>

//       {/* 👇 HERO (OBSERVED ELEMENT) */}
//       <div
//         ref={heroRef}
//         className="bg-white border rounded-2xl overflow-hidden"
//       >
//         {/* IMAGE */}
//         <div className="relative h-[220px] w-full">
//           <img
//             src={course.thumbnail}
//             alt={course.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/25" />
//           <h1 className="absolute bottom-5 left-6 text-xl font-semibold text-white">
//             {course.title}
//           </h1>
//         </div>

//         {/* DESCRIPTION */}
//         {course.description && (
//           <p className="px-6 pt-4 text-sm text-gray-600 max-w-3xl">
//             {course.description}
//           </p>
//         )}

//         {/* META */}
//         <div className="px-6 py-4 flex flex-wrap gap-6 text-sm text-gray-600 font-medium">
//           {course.rating && (
//             <span className="flex items-center gap-1">
//               <HiStar className="text-yellow-400" />
//               {course.rating}
//             </span>
//           )}
//           {course.students && (
//             <span className="flex items-center gap-1">
//               <FiUsers />
//               {course.students.toLocaleString()} students
//             </span>
//           )}
//           {course.duration && (
//             <span className="flex items-center gap-1">
//               <FiClock />
//               {course.duration}
//             </span>
//           )}
//           {course.lessons && (
//             <span className="flex items-center gap-1">
//               <FiPlay />
//               {course.lessons} lessons
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { HiArrowLeft, HiStar } from "react-icons/hi";
// import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
// import { useRouter } from "next/navigation";

// export default function CourseHero() {
//   const router = useRouter();

//   const lastScrollY = useRef(0);
//   const heroRef = useRef(null);

//   const [showBack, setShowBack] = useState(true);
//   const [heroEnded, setHeroEnded] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;

//       // 🔹 check hero boundary
//       if (heroRef.current) {
//         const heroBottom =
//           heroRef.current.offsetTop + heroRef.current.offsetHeight;

//         setHeroEnded(currentScroll > heroBottom - 80);
//       }

//       // 🔹 hero kazhinjal → always hide
//       if (heroEnded) {
//         setShowBack(false);
//       } else {
//         // scroll direction logic
//         if (currentScroll > lastScrollY.current && currentScroll > 80) {
//           setShowBack(false); // down
//         } else {
//           setShowBack(true); // up
//         }
//       }

//       lastScrollY.current = currentScroll;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [heroEnded]);

//   return (
//     <>
//       {/* STICKY BACK BAR */}
//       <div
//         className={`
//           sticky top-0 z-40 bg-white border-b
//           transition-transform duration-300
//           ${showBack ? "translate-y-0" : "-translate-y-full"}
//         `}
//       >
//         <div className="max-w-6xl mx-auto px-4 py-3">
//           <button
//             onClick={() => router.push("/course")}
//             className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
//           >
//             <HiArrowLeft />
//             Back to Courses
//           </button>
//         </div>
//       </div>

//       {/* HERO */}
//       <div
//         ref={heroRef}
//         className="bg-white rounded-2xl overflow-hidden border mt-4"
//       >
//         <div className="relative h-[220px] w-full">
//           <img
//             src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
//             className="h-full w-full object-cover"
//             alt="course"
//           />
//           <div className="absolute inset-0 bg-black/30" />
//           <h1 className="absolute bottom-4 left-4 text-xl font-bold text-white">
//             Financial Accounting Fundamentals
//           </h1>
//         </div>

//         <div className="p-6 space-y-4">
//           <p className="text-sm text-gray-600">
//             Master the essential principles of financial accounting.
//           </p>

//           <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-600">
//             <span className="flex items-center gap-1">
//               <HiStar className="text-yellow-400" /> 4.8 rating
//             </span>
//             <span className="flex items-center gap-1">
//               <FiUsers /> 12,500 students
//             </span>
//             <span className="flex items-center gap-1">
//               <FiClock /> 8 weeks
//             </span>
//             <span className="flex items-center gap-1">
//               <FiPlay /> 24 lessons
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";

import { HiArrowLeft, HiStar } from "react-icons/hi";
import { FiUsers, FiClock, FiPlay } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CourseHero({ course }) {
  const router = useRouter();
  if (!course) return null;

  return (
    <div className="space-y-4">

      {/* ✅ STICKY BACK BAR (INSIDE SCROLL CONTAINER) */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="px-4 py-3">
          <button
            onClick={() => router.push("/course")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black"
          >
            <HiArrowLeft />
            Back to Courses
          </button>
        </div>
      </div>

      {/* HERO CARD */}
      <div className="bg-white rounded-2xl overflow-hidden border">
        <div className="relative h-[220px] w-full">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute bottom-4 left-4 text-xl font-bold text-white">
            {course.title}
          </h1>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">{course.description}</p>

          <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-600">
            <span className="flex items-center gap-1">
              <HiStar className="text-yellow-400" /> {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <FiUsers /> {course.students} students
            </span>
            <span className="flex items-center gap-1">
              <FiClock /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <FiPlay /> {course.lessons} lessons
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
