// export default function SpecialOffer() {
//   return (
//     <section className="w-full bg-white py-20 px-4">
//       <div className="max-w-4xl mx-auto text-center">

//         {/* Badge */}
//         <div className="flex justify-center mb-6">
//           <span className="
//             inline-flex items-center gap-2
//             bg-[#10B981]
//             text-white
//             px-6 py-3
//             rounded-full
//             font-semibold
//             text-sm
//             shadow-md
//           ">
//             ⚡ SPECIAL OFFER
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="text-5xl md:text-6xl font-extrabold text-[#0F172A] mb-4">
//           Up to <span className="text-[#059669]">50% Off</span>
//         </h2>

//         {/* Description */}
//         <p className="text-lg text-gray-500">
//           Limited time offer on our most popular courses
//         </p>

//       </div>
//     </section>
//   );
// }


export default function SpecialOffer() {
  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span
            className="
              inline-flex items-center gap-2
              bg-[#10B981]
              text-white
              px-4 py-2 sm:px-6 sm:py-3
              rounded-full
              font-semibold
              text-xs sm:text-sm
              shadow-md
            "
          >
            ⚡ SPECIAL OFFER
          </span>
        </div>

        {/* Heading */}
        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-extrabold
            text-[#0F172A]
            mb-3 sm:mb-4
            leading-tight
          "
        >
          Up to <span className="text-[#059669]">50% Off</span>
        </h2>

        {/* Description */}
        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            text-gray-500
            max-w-xl
            mx-auto
          "
        >
          Limited time offer on our most popular courses
        </p>

      </div>
    </section>
  );
}
