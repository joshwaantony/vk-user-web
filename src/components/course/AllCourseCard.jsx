// import { FiClock, FiUser } from "react-icons/fi";
// import { HiStar } from "react-icons/hi";

// export default function AllCourseCard({ course }) {
//   return (
//     <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
      
//       {/* Image */}
//       <img
//         src={course.image}
//         alt={course.title}
//         className="w-full h-48 object-cover"
//       />

//       {/* Content */}
//       <div className="p-5 flex flex-col gap-3">
        
//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-900">
//           {course.title}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <HiStar className="text-yellow-500" />
//           <span>{course.rating}</span>
//           <span>•</span>
//           <span>{course.students} students</span>
//         </div>

//         {/* Instructor */}
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <FiUser />
//           <span>{course.instructor}</span>
//         </div>

//         <hr />

//         {/* Duration & Price */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <FiClock />
//             <span>{course.duration}</span>
//           </div>

//           <span className="text-blue-600 font-semibold">
//             ${course.price}
//           </span>
//         </div>

//         {/* Button */}
//         <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
//           Enroll Now
//         </button>
//       </div>
//     </div>
//   );
// }



import { FiClock, FiUser } from "react-icons/fi";
import { HiStar } from "react-icons/hi";

export default function AllCourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
      
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

        {/* Rating (static for now) */}
        <div className="flex  items-center gap-2 text-sm text-gray-600">
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

        {/* Button */}
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
