import {
  HiOutlineMail,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 mb-4 rounded-full bg-[#E0EBFF] px-4 py-1.5 text-sm font-semibold text-[#1E40E6]">
            <HiOutlineMail className="text-lg transition duration-300 hover:scale-110" />
            Get in Touch
          </span>

          <h2 className="text-4xl font-extrabold text-black mb-4">
            Contact Us
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT – FORM */}
          <div>
            <form className="space-y-6">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="john Doe"
                  className="w-full placeholder:text-[#9CA3AF] text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E40E6]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full placeholder:text-[#9CA3AF] text-black rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1E40E6]"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Subject
                </label>
                <select className="w-full text-black rounded-xl border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E40E6]">
                  <option>Select a subject</option>
                  <option>General Inquiry</option>
                  <option>Support</option>
                  <option>Partnership</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  className="w-full placeholder:text-[#9CA3AF] text-black rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E40E6]"
                />
                <p className="text-xs text-gray-400 text-right mt-1">
                  0/500 characters
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#1E40E6] text-white py-4 rounded-xl font-semibold hover:bg-[#1a36c9] transition"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* RIGHT – INFO CARDS */}
          <div className="space-y-6">

            {/* Email Us */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#E0EBFF] text-[#1E40E6] mb-4 transition duration-300 hover:scale-110 hover:shadow-md">
                <HiOutlineMail className="text-xl" />
              </div>
              <h3 className="font-semibold text-black mb-1">Email Us</h3>
              <p className="text-sm text-gray-600 mb-2">
                Our team is here to help you
              </p>
              <p className="text-sm font-medium text-[#1E40E6]">
                support@vk.com
              </p>
            </div>

            {/* Live Chat */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#E0EBFF] text-[#1E40E6] mb-4 transition duration-300 hover:scale-110 hover:shadow-md">
                <HiOutlineChatAlt2 className="text-xl" />
              </div>
              <h3 className="font-semibold text-black mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-2">
                Available Monday to Friday, 9AM - 6PM
              </p>
              <p className="text-sm font-medium text-[#1E40E6]">
                Start a conversation
              </p>
            </div>

            {/* Help Center */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#E0EBFF] text-[#1E40E6] mb-4 transition duration-300 hover:scale-110 hover:shadow-md">
                <HiOutlineQuestionMarkCircle className="text-xl" />
              </div>
              <h3 className="font-semibold text-black mb-1">Help Center</h3>
              <p className="text-sm text-gray-600 mb-2">
                Find answers to common questions
              </p>
              <p className="text-sm font-medium text-[#1E40E6]">
                Visit Help Center
              </p>
            </div>

            {/* Follow Us */}
            <div className="bg-[#1E40E6] rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-1">Follow Us</h3>
              <p className="text-sm text-blue-100 mb-4">
                Stay connected on social media
              </p>

              <div className="flex gap-3">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                  (Icon, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center transition duration-300 hover:scale-110 hover:bg-white/30"
                    >
                      <Icon />
                    </div>
                  )
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
