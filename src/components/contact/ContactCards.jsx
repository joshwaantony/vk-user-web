



import { HiPhone, HiOutlineMail, HiLocationMarker } from "react-icons/hi";

export default function ContactCards() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      
      {/* CALL */}
      <div className="group flex min-h-[180px] flex-col rounded-xl bg-white/20 p-4 text-center text-white backdrop-blur transition hover:scale-[1.03]">
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
        <p className="mt-1 text-sm text-blue-100">+91 9447791106</p>
        <p className="mt-auto pt-3 text-xs text-blue-200">Mon–Fri: 9AM–6PM</p>
      </div>

      {/* EMAIL */}
      <div className="group flex min-h-[180px] flex-col rounded-xl bg-white/20 p-4 text-center text-white backdrop-blur transition hover:scale-[1.03]">
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
        <a
          href="mailto:vkeasylearningmodel@gmail.com"
          className="mt-1 text-sm leading-6 text-blue-100 break-all hover:text-white"
        >
          vkeasylearningmodel@gmail.com
        </a>
        <p className="mt-auto pt-3 text-xs text-blue-200">Response within 24 hrs</p>
      </div>

      {/* VISIT */}
      <div className="group flex min-h-[180px] flex-col rounded-xl bg-white/20 p-4 text-center text-white backdrop-blur transition hover:scale-[1.03]">
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
        <p className="mt-1 text-sm text-blue-100">Pazhaveedu</p>
        <p className="mt-auto pt-3 text-xs leading-5 text-blue-200">
          Ambalapuzha, Alappuzha- 688009
        </p>
      </div>

    </div>
  );
}
