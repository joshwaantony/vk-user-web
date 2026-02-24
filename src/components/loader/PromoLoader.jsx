



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
