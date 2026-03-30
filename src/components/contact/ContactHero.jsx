
import Image from "next/image";
import ContactCards from "./ContactCards";

export default function ContactHero() {
  return (
    <section
      className="
        relative w-full flex items-center
        min-h-[520px]
        sm:min-h-[480px]
        lg:min-h-[420px]
        max-[650px]:pt-10
        max-[650px]:bg-gradient-to-br
        max-[650px]:from-[#1E40E6]
        max-[650px]:via-[#1e3a8a]
        max-[650px]:to-[#0f172a]
        py-20
      "
    >
      {/* BACKGROUND IMAGE (>=651px) */}
      <div className="absolute inset-0 hidden min-[651px]:block brightness-75">
        <Image
          src="/contact.png"
          alt=""
          fill
          loading="lazy"
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* DARK GRADIENT OVERLAY */}
      <div
        className="
          absolute inset-0 hidden min-[651px]:block
          bg-gradient-to-b
          from-black/50
          via-black/0
          to-black/50
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          max-w-7xl mx-auto
          w-full
          px-5 sm:px-8 lg:px-10
          grid grid-cols-1 lg:grid-cols-2
          gap-8 lg:gap-12
          items-center
          text-white
        "
      >
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-md mb-8 sm:mb-10">
            We're here to help you with admissions, courses, support,
            and career guidance. Reach out anytime — our team is ready.
          </p>

          <ContactCards />
        </div>
      </div>
    </section>
  );
}
