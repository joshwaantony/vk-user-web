



export default function InfoCard({ icon, title, desc, link }) {
  return (
    <div
      className="
        group
        border border-[#C5CDD7]
        rounded-2xl
        p-6
        bg-white
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(2,6,23,0.08)]
        hover:border-[#1E40E6]
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          mb-4
          flex items-center justify-center
          rounded-xl
          bg-[#E0EBFF]
          text-[#1E40E6]
          transition
          duration-300
          group-hover:scale-110
          group-hover:shadow-md
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-black mb-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#475569] mb-2">
        {desc}
      </p>

      {/* Link */}
      <p
        className="
          text-sm
          font-medium
          text-[#1E40E6]
          cursor-pointer
          transition
          duration-200
          group-hover:underline
        "
      >
        {link}
      </p>
    </div>
  );
}
