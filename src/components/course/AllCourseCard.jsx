



// import Link from "next/link";
// import { FiClock, FiUser } from "react-icons/fi";
// import { HiStar } from "react-icons/hi";

// export default function AllCourseCard({ course }) {
//   return (
//     <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
      
//       {/* Image */}
//       <img
//         src={course.thumbnail}
//         alt={course.title}
//         className="w-full h-48 object-cover"
//       />

//       {/* Content */}
//       <div className="p-5 flex flex-col gap-3">
        
//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-[60px]">
//           {course.title}
//         </h3>

//         {/* Rating (static for now) */}
//         <div className="flex  items-center gap-2 text-sm text-gray-600">
//           <HiStar className="text-yellow-500" />
//           <span>4.5</span>
//           <span>•</span>
//           <span>{course.totalStudents} students</span>
//         </div>

//         {/* Instructor */}
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <FiUser />
//           <span>{course.faculty?.[0]?.name || "Instructor"}</span>
//         </div>

//         <hr />

//         {/* Duration & Price */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <FiClock />
//             <span>{course.duration} mins</span>
//           </div>

//           <span className="text-blue-600 font-semibold">
//             ₹{course.price}
//           </span>
//         </div>

//         {/* Button */}
       
// <Link
//   href={`/course/${course.id}`}
//   className="
//     mt-4
//     inline-flex
//     items-center
//     justify-center
//     w-full
//     px-6
//     py-3
//     rounded-xl
//     font-semibold
//     text-white
//     bg-gradient-to-r
//     from-blue-600
//     to-indigo-600
//     shadow-md
//     hover:from-blue-700
//     hover:to-indigo-700
//     hover:shadow-lg
//     active:scale-[0.98]
//     transition-all
//     duration-300
//   "
// >
//   Enroll Now
// </Link>

//       </div>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import { FiClock, FiUser } from "react-icons/fi";
import { HiStar } from "react-icons/hi";

export default function AllCourseCard({ course }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/course/${course.id}`)}
      className="cursor-pointer bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {/* Image */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 h-[60px]">
          {course.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <HiStar className="text-yellow-500" />
          <span>4.5</span>
          <span>•</span>
          <span>{course.totalStudents} students</span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiUser />
          <span>{course.faculty?.[0]?.name || "Instructor"}</span>
        </div>

        <hr />

        {/* Duration & Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiClock />
            <span>{course.duration} mins</span>
          </div>

          <span className="text-blue-600 font-semibold">
            ₹{course.price}
          </span>
        </div>

        {/* Enroll Button (NO ROUTE) */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // ❗ prevent card click
            console.log("Enroll Clicked");
          }}
          className="
            mt-4
            inline-flex
            items-center
            justify-center
            w-full
            px-6
            py-3
            rounded-xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            shadow-md
            hover:from-blue-700
            hover:to-indigo-700
            hover:shadow-lg
            active:scale-[0.98]
            transition-all
            duration-300
          "
        >
          Enroll Now
        </button>

      </div>
    </div>
  );
}