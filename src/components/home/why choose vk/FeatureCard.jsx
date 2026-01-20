// export default function FeatureCard({ title, description }) {
//   return (
//     <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
      
//       {/* Icon */}
//       <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#1E40E6] text-white mb-4">
//         ⬤
//       </div>

//       {/* Title */}
//       <h3 className="font-semibold text-black mb-2">
//         {title}
//       </h3>

//       {/* Description */}
//       <p className="text-sm text-gray-600 leading-relaxed">
//         {description}
//       </p>

//     </div>
//   );
// }



export default function FeatureCard({
  icon: Icon,
  title,
  description,
  highlight = false,
}) {
  return (
    <div
      className={`
        border
        rounded-xl
        p-6
        bg-white
        transition
        ${
          highlight
            ? "border-[#1E40E6] shadow-md"
            : "border-gray-200 shadow-sm hover:shadow-md"
        }
      `}
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#3B36F4] text-white mb-4">
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
