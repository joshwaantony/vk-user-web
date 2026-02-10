




export default function WhatYouWillLearn({ points = [] }) {
  return (
    <div className="bg-white border rounded-2xl p-8">
      <h2 className="text-xl text-black font-semibold mb-6">
        What you’ll learn
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
        {points.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-700">
            <span className="text-[#1F3FD7] font-bold">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
