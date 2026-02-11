



// "use client";

// export default function PromoLoader() {
//   return (
//     <div className="h-[300px] flex items-center justify-center">

//       <div className="relative w-12 h-12">

//         {/* Outer Faded Circle */}
//         <div className="absolute inset-0 border-2 border-[#1C4ED8]/30 rounded-full"></div>

//         {/* Rotating Dot */}
//         <div className="absolute inset-0 animate-spin">
//           <div className="w-3 h-3 bg-[#1C4ED8] rounded-full -top-1 left-1/2 -translate-x-1/2 absolute"></div>
//         </div>

//       </div>

//     </div>
//   );
// }



"use client";

export default function PromoLoader() {
  return (
    <div className="h-[300px] flex items-center justify-center rounded-3xl">

      <div className="flex items-center justify-center space-x-2">

        {/* Dot 1 */}
        <span className="w-3 h-3 bg-[#1C4ED8] rounded-full animate-bounce [animation-delay:-0.3s]"></span>

        {/* Dot 2 */}
        <span className="w-3 h-3 bg-[#1C4ED8]/80 rounded-full animate-bounce [animation-delay:-0.15s]"></span>

        {/* Dot 3 */}
        <span className="w-3 h-3 bg-[#1C4ED8]/60 rounded-full animate-bounce"></span>

      </div>

    </div>
  );
}
