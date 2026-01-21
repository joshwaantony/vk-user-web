export default function CarouselPagination({
  total = 6,
  current = 5,
}) {
  return (
    <div className="flex flex-col items-center mt-10">

      {/* Dots */}
      <div className="flex items-center gap-4 mb-3">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={`
              h-3 rounded-full transition-all
              ${
                index + 1 === current
                  ? "w-12 bg-green-500"
                  : "w-3 bg-gray-300"
              }
            `}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 font-medium">
        Course <span className="text-green-600 font-bold">{current}</span> of {total}
      </p>
    </div>
  );
}
