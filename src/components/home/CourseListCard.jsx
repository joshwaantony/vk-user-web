




export default function CourseListCard({
  image,
  title,
  price,
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
      
      {/* Image */}
      <div className="md:w-1/3 h-48 md:h-auto">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        
        {/* Rating */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          4.8 · 12,500 students
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-black mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          Master the essentials of tax planning and learn strategies to
          optimize tax efficiency for individuals and businesses.
        </p>

        {/* What you learn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#3D3B3B] mb-4">
          
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E0EBFF] text-[#1E40E6] text-xs font-bold">
              ✓
            </span>
            Corporate tax filing
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E0EBFF] text-[#1E40E6] text-xs font-bold">
              ✓
            </span>
            Quarterly tax payments
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E0EBFF] text-[#1E40E6] text-xs font-bold">
              ✓
            </span>
            Tax audit preparation
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E0EBFF] text-[#1E40E6] text-xs font-bold">
              ✓
            </span>
            Compliance documentation
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Dr. Sarah Johnson · 8 weeks
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-[#1E40E6]">
              ${price}
            </span>

            <button className="bg-[#1E40E6] text-white px-5 py-2 rounded-lg t font-semibold hover:bg-[#1a36c9] transition">
              Enroll Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
