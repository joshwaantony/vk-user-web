



import { HiPhone, HiOutlineMail, HiLocationMarker } from "react-icons/hi";

export default function ContactCards() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      
      {/* CALL */}
      <div className="group bg-white/20 backdrop-blur rounded-xl p-4 text-center text-white transition hover:scale-[1.03]">
        <div
          className="
            w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full
            bg-white/30 text-white
            transition-all duration-300 ease-out
            group-hover:bg-[#1C4ED8]
            group-hover:text-white
            group-hover:scale-110
          "
        >
          <HiPhone />
        </div>
        <h4 className="font-semibold">Call Us</h4>
        <p className="text-sm text-blue-100">+91 98765 43210</p>
        <p className="text-xs text-blue-200">Mon–Fri: 9AM–6PM</p>
      </div>

      {/* EMAIL */}
      <div className="group bg-white/20 backdrop-blur rounded-xl p-4 text-center text-white transition hover:scale-[1.03]">
        <div
          className="
            w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full
            bg-white/30 text-white
            transition-all duration-300 ease-out
            group-hover:bg-[#1C4ED8]
            group-hover:text-white
            group-hover:scale-110
          "
        >
          <HiOutlineMail />
        </div>
        <h4 className="font-semibold">Email Us</h4>
        <p className="text-sm text-blue-100">info@example.com</p>
        <p className="text-xs text-blue-200">Response within 24 hrs</p>
      </div>

      {/* VISIT */}
      <div className="group bg-white/20 backdrop-blur rounded-xl p-4 text-center text-white transition hover:scale-[1.03]">
        <div
          className="
            w-10 h-10 mx-auto mb-2 flex items-center justify-center rounded-full
            bg-white/30 text-white
            transition-all duration-300 ease-out
            group-hover:bg-[#1C4ED8]
            group-hover:text-white
            group-hover:scale-110
          "
        >
          <HiLocationMarker />
        </div>
        <h4 className="font-semibold">Visit Us</h4>
        <p className="text-sm text-blue-100">123 Main Street</p>
        <p className="text-xs text-blue-200">City, State 12345</p>
      </div>

    </div>
  );
}
