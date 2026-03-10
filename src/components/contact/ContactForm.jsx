



// import ContactInfo from "./ContactInfo";

// export default function ContactForm() {
//   return (
//     <section className="bg-white py-14 sm:py-20 px-4">
//       <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2">

//         {/* ================= LEFT FORM ================= */}
//         <div className="w-full">
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-3">
//             Send Us a Message
//           </h2>

//           <p className="text-[#475569] mb-10 max-w-md text-sm sm:text-base">
//             Have questions? We'd love to hear from you! Fill out the form below and we'll respond as soon as possible.
//           </p>

//           <form className="space-y-6">

//             {/* Full Name */}
//             <div>
//               <label className="block text-sm font-semibold text-black mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="
//                   w-full
//                   border border-[#C5CDD7]
//                   rounded-xl
//                   px-4 py-3.5
//                   text-black
//                   placeholder:text-[#9CA3AF]
//                   text-sm sm:text-base
//                   focus:outline-none
//                   focus:ring-2
//                   focus:ring-[#1E40E6]
//                 "
//               />
//             </div>

//             {/* Email Address */}
//             <div>
//               <label className="block text-sm font-semibold text-black mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className="
//                   w-full
//                   border border-[#C5CDD7]
//                   rounded-xl
//                   px-4 py-3.5
//                   text-black
//                   placeholder:text-[#9CA3AF]
//                   text-sm sm:text-base
//                   focus:outline-none
//                   focus:ring-2
//                   focus:ring-[#1E40E6]
//                 "
//               />
//             </div>

//             {/* Subject */}
//             <div>
//               <label className="block text-sm font-semibold text-black mb-2">
//                 Subject
//               </label>
//               <select
//                 className="
//                   w-full
//                   border border-[#C5CDD7]
//                   rounded-xl
//                   px-4 py-3.5
//                   text-black
//                   text-sm sm:text-base
//                   focus:outline-none
//                   focus:ring-2
//                   focus:ring-[#1E40E6]
//                 "
//               >
//                 <option value="">Select a subject</option>
//                 <option>General Inquiry</option>
//                 <option>Support</option>
//                 <option>Admissions</option>
//               </select>
//             </div>

//             {/* Message */}
//             <div>
//               <label className="block text-sm font-semibold text-black mb-2">
//                 Message
//               </label>
//               <textarea
//                 rows={5}
//                 placeholder="Tell us how we can help you..."
//                 className="
//                   w-full
//                   border border-[#C5CDD7]
//                   rounded-xl
//                   px-4 py-3.5
//                   text-black
//                   placeholder:text-[#9CA3AF]
//                   text-sm sm:text-base
//                   resize-none
//                   focus:outline-none
//                   focus:ring-2
//                   focus:ring-[#1E40E6]
//                 "
//               />
//               <p className="text-right text-xs text-[#64748B] mt-1">
//                 0/500 characters
//               </p>
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="
//                 w-full
//                 bg-[#1E40E6]
//                 text-white
//                 py-4
//                 rounded-xl
//                 font-semibold
//                 text-sm sm:text-base
//                 hover:bg-[#1a36c9]
//                 transition
//               "
//             >
//               Send Message
//             </button>

//           </form>
//         </div>

//         {/* ================= RIGHT INFO ================= */}
//         <div className="w-full">
//           <ContactInfo />
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import ContactInfo from "./ContactInfo";
import { useContactStore } from "@/store/contact.store";
import toast from "react-hot-toast";

export default function ContactForm() {
  const { submitContact, loading } = useContactStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      setCount(value.length);
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await submitContact(form);

      toast.success(res.message);

      setForm({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });

      setCount(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <section className="bg-white py-14 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2">

        {/* ================= LEFT FORM ================= */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-3">
            Send Us a Message
          </h2>

          <p className="text-[#475569] mb-10 max-w-md text-sm sm:text-base">
            Have questions? We'd love to hear from you! Fill out the form below and we'll respond as soon as possible.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="
                  w-full
                  border border-[#C5CDD7]
                  rounded-xl
                  px-4 py-3.5
                  text-black
                  placeholder:text-[#9CA3AF]
                  text-sm sm:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#1E40E6]
                "
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email Address
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="john@example.com"
                className="
                  w-full
                  border border-[#C5CDD7]
                  rounded-xl
                  px-4 py-3.5
                  text-black
                  placeholder:text-[#9CA3AF]
                  text-sm sm:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#1E40E6]
                "
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="
                  w-full
                  border border-[#C5CDD7]
                  rounded-xl
                  px-4 py-3.5
                  text-black
                  text-sm sm:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#1E40E6]
                "
                required
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Admissions">Admissions</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                maxLength={500}
                placeholder="Tell us how we can help you..."
                className="
                  w-full
                  border border-[#C5CDD7]
                  rounded-xl
                  px-4 py-3.5
                  text-black
                  placeholder:text-[#9CA3AF]
                  text-sm sm:text-base
                  resize-none
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#1E40E6]
                "
                required
              />
              <p className="text-right text-xs text-[#64748B] mt-1">
                {count}/500 characters
              </p>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#1E40E6]
                text-white
                py-4
                rounded-xl
                font-semibold
                text-sm sm:text-base
                hover:bg-[#1a36c9]
                transition
              "
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

        {/* ================= RIGHT INFO ================= */}
        <div className="w-full">
          <ContactInfo />
        </div>

      </div>
    </section>
  );
}