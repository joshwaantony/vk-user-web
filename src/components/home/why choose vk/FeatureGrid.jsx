import { HiOutlineBookOpen, HiOutlineChartBar, HiOutlineChatAlt2, HiOutlineClock, HiOutlineDeviceMobile, HiOutlineDocumentText, HiOutlinePlay, HiOutlineRefresh, HiOutlineSupport, HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi";
import { HiOutlineTrophy } from "react-icons/hi2";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Comprehensive Course Library",
    description:
      "Access thousands of courses across accounting, finance, taxation, and business management taught by industry experts.",
    icon: HiOutlineBookOpen,
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from certified professionals and industry leaders with years of real-world experience.",
    icon: HiOutlineUsers,
  },
  {
    title: "Certification Programs",
    description:
      "Earn recognized certificates upon course completion to boost your career credentials.",
    icon: HiOutlineTrophy,
  },
  {
    title: "Learn at Your Own Pace",
    description:
      "Flexible learning schedules that fit your lifestyle. Study anytime, anywhere, on any device.",
    icon: HiOutlineClock,
  },
  {
    title: "HD Video Lectures",
    description:
      "High-quality video content with clear explanations, practical examples, and downloadable resources.",
    icon: HiOutlinePlay,
  },
  {
    title: "Interactive Q&A",
    description:
      "Get your questions answered by instructors and engage with a community of learners.",
    icon: HiOutlineChatAlt2,
  },
  {
    title: "Practice Assignments",
    description:
      "Hands-on exercises, quizzes, and real-world case studies to reinforce learning.",
    icon: HiOutlineDocumentText,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and personalized progress reports.",
    icon: HiOutlineChartBar,
    highlight: true, // highlighted card in screenshot
  },
  {
    title: "Mobile Learning",
    description:
      "Access courses on-the-go with our mobile-optimized platform for seamless learning.",
    icon: HiOutlineDeviceMobile,
  },
  {
    title: "Community Support",
    description:
      "Join study groups, discussion forums, and networking opportunities worldwide.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Lifetime Access",
    description:
      "Once enrolled, enjoy unlimited access to course materials and future updates forever.",
    icon: HiOutlineRefresh,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to help with any questions or issues.",
    icon: HiOutlineSupport,
  },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((item, index) => (
        <FeatureCard
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          highlight={item.highlight}
        />
      ))}
    </div>
  );
}
