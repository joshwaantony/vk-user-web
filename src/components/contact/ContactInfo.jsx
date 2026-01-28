import {
  HiOutlineMail,
  HiOutlineChatAlt2,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";
import InfoCard from "./InfoCard";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <InfoCard
        icon={<HiOutlineMail />}
        title="Email Us"
        desc="Our team is here to help you"
        link="support@vk.com"
      />

      <InfoCard
        icon={<HiOutlineChatAlt2 />}
        title="Live Chat"
        desc="Mon–Fri, 9AM – 6PM"
        link="Start Chat"
      />

      <InfoCard
        icon={<HiOutlineQuestionMarkCircle />}
        title="Help Center"
        desc="Find answers instantly"
        link="Visit Help Center"
      />
    </div>
  );
}
