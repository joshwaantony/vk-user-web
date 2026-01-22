import { FiCheck } from "react-icons/fi";

export default function WhatYouWillLearn() {
  const points = [
    "You will master the Python programming language by building 100 unique projects over 100 days.",
    "You will be able to program in Python professionally",
    "Create a portfolio of 100 Python projects to apply for developer jobs",
    "Be able to use Python for data science and machine learning",
    "Build GUIs and Desktop applications with Python",
    "You will learn automation, game, app and web development, data science and machine learning all using Python.",
    "You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib.",
    "Be able to build fully fledged websites and web apps with Python",
    "Build games like Blackjack, Pong and Snake using Python",
  ];

  return (
    <div className="bg-white border rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl text-black font-semibold mb-6">
        What you&apos;ll learn
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
        {points.map((item, index) => (
          <div key={index} className="flex gap-3">
            <FiCheck className="text-blue-600 mt-1 shrink-0" />
            <p className="text-gray-700 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
