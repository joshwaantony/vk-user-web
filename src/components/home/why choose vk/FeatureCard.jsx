


export default function FeatureCard({
  icon: Icon,
  title,
  description,
  highlight = false,
}) {
  return (
    <div
      className={`
        border rounded-xl p-6 bg-white transition
        ${highlight
          ? "border-[#1E40E6] shadow-md"
          : "border-gray-200 shadow-sm hover:shadow-md"}
      `}
    >
      {/* Icon with popup animation */}
      <div
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-xl
          bg-[#3B36F4]
          text-white
          mb-4
          transition
          duration-300
          ease-out
          hover:scale-110
          hover:-translate-y-1
          hover:shadow-lg
        "
      >
        <Icon size={22} />
      </div>

      {/* Title */}
      <h3 className="font-semibold text-black mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
