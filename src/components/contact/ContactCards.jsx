



import { HiPhone, HiOutlineMail, HiLocationMarker } from "react-icons/hi";

export default function ContactCards() {
  const cards = [
    {
      title: "Call Us",
      value: "+91 9447791106",
      note: "Mon-Fri: 9AM-6PM",
      href: "tel:+919447791106",
      ariaLabel: "Call VK Accountancy",
      icon: HiPhone,
      noteClassName:
        "whitespace-nowrap text-[12px] font-medium tracking-[0.01em] text-[#E7D9FF]",
    },
    {
      title: "Email Us",
      value: "info@vkaccountancy.com",
      note: "Response within 24 hrs",
      href: "mailto:info@vkaccountancy.com",
      ariaLabel: "Email VK Accountancy",
      icon: HiOutlineMail,
      valueClassName: "whitespace-nowrap text-[11px] leading-5 sm:text-[12px]",
      noteClassName:
        "whitespace-nowrap text-[11px] font-medium tracking-[0.01em] text-[#E7D9FF]",
    },
    {
      title: "Visit Us",
      value: "Pazhaveedu",
      note: "Ambalapuzha, Alappuzha- 688009",
      href: "https://www.google.com/maps?q=Pazhaveedu%2C%20Alappuzha%2C%20Kerala",
      ariaLabel: "Open VK Accountancy location in Google Maps",
      icon: HiLocationMarker,
      external: true,
      noteClassName:
        "whitespace-nowrap text-[11px] font-medium tracking-[0.01em] text-[#E7D9FF]",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 xl:max-w-[860px]">
      {cards.map(
        ({
          title,
          value,
          note,
          href,
          ariaLabel,
          icon: Icon,
          external,
          valueClassName = "",
          noteClassName = "",
        }) => (
          <a
            key={title}
            href={href}
            aria-label={ariaLabel}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="
              group relative flex min-h-[230px] flex-col items-center overflow-hidden
              rounded-[22px] border border-white/10 bg-[#b995d8]/35 px-5 py-7
              text-center text-white backdrop-blur-md
              shadow-[0_12px_36px_rgba(17,24,39,0.22)]
              transition duration-300 ease-out
              hover:-translate-y-1 hover:bg-[#c5a2df]/40 hover:shadow-[0_18px_40px_rgba(30,64,175,0.20)]
            "
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/10" />
            <div className="absolute inset-x-6 top-0 h-px bg-white/30" />

            <div
              className="
                relative mb-4 flex h-14 w-14 items-center justify-center rounded-full
                bg-white/20 text-xl text-white transition duration-300
                group-hover:scale-105 group-hover:bg-white/28
              "
            >
              <Icon />
            </div>

            <h4 className="relative text-[1.75rem] font-semibold tracking-tight">
              {title}
            </h4>
            <div
              className={`relative mt-2 text-base text-white/90 ${valueClassName}`}
            >
              {value}
            </div>
            <p
              className={`relative mt-auto pt-5 text-sm leading-5 text-white/75 ${noteClassName}`}
            >
              {note}
            </p>
          </a>
        )
      )}
    </div>
  );
}
