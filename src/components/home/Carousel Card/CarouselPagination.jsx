

export default function CarouselPagination({ total = 0, current = 1 }) {
  return (
    <div className="hidden sm:flex flex-col items-center mt-8 md:mt-10 px-4">
      
      {/* Dots */}
      <div className="flex items-center gap-3 md:gap-4 mb-3 justify-center">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index + 1 === current;

          return (
            <span
              key={index}
              className={`
                rounded-full transition-all duration-300
                ${isActive
                  ? "bg-green-500 w-10 h-2.5 md:w-12 md:h-3"
                  : "bg-gray-300 w-2.5 h-2.5 md:w-3 md:h-3"
                }
              `}
            />
          );
        })}
      </div>

      {/* Text */}
      <p className="text-sm md:text-base text-gray-600 font-medium text-center">
        Course{" "}
        <span className="text-green-600 font-bold">
          {current}
        </span>{" "}
        of {total}
      </p>
    </div>
  );
}
