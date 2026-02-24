import FeatureGrid from "./FeatureGrid";
import Link from "next/link";

export default function WhyChooseVK() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
     <span
  className="
    inline-flex
    items-center
    gap-2
    mb-4
    text-sm sm:text-base
    font-semibold
    text-[#2563EB]
    tracking-wide
  "
>
  <span className="text-base">⭐</span>
  Why Choose VK
</span>


          <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            Everything You Need to Succeed
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover powerful features designed to enhance your learning experience
            and accelerate your professional growth
          </p>
        </div>

        {/* Feature Grid */}
        <FeatureGrid />

        {/* Bottom CTA */}
        <div className="mt-20 bg-[#1E40E6] rounded-2xl text-center py-14 px-6 text-white">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Start Your Learning Journey?
          </h3>

          <p className="text-blue-100 mb-6">
            Join thousands of professionals advancing their careers with VK
          </p>

     
<Link href="/phone/enter-phone">
  <button className="bg-white text-[#1E40E6] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
    Get Started Today
  </button>
</Link>
        </div>

      </div>
    </section>
  );
}
