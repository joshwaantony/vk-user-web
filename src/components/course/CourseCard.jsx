import { FaStar, FaUser, FaClock } from "react-icons/fa";
import Link from "next/link";

export default function CourseCard({
  image,
  title,
  rating,
  students,
  instructor,
  duration,
  price,
}) {
  return (
    <div className="bg-white border border-[#C5CDD7] rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <img src={image} alt={title} className="h-[200px] w-full object-cover" />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="h-[100px]">
          {/* Title */}
          <h3 className="text-[16px] font-semibold text-[#0F172A] leading-snug">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3 text-sm text-[#475569]">
            <FaStar className="text-[#F59E0B]" />
            <span className="font-medium">{rating}</span>
            <span>·</span>
            <span>{students} students</span>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2 mt-3 text-sm text-[#475569]">
            <FaUser className="text-[#64748B]" />
            <span>{instructor}</span>
          </div>
        </div>

        <hr className="my-4 border-[#E2E8F0]" />

        {/* Duration + Price */}
        <div className="flex items-center justify-between text-sm text-[#475569]">
          <div className="flex items-center gap-2">
            <FaClock className="text-[#64748B]" />
            <span>{duration}</span>
          </div>

          <span className="font-semibold text-[#1C3FD1]">${price}</span>
        </div>

        {/* Button */}
   <Link href="/course/slug">
  <button
    className="
      mt-6
      w-full
      bg-[#1C3FD1]
      text-white
      py-3
      rounded-lg
      font-semibold
      hover:bg-[#1733A5]
      transition
    "
  >
    Enroll Now
  </button>
</Link>
      </div>
    </div>
  );
}
