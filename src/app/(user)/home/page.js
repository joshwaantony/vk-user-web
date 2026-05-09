import HomePageContent from "@/components/home/HomePageContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Explore VK Accountancy's online learning platform with featured courses, practical commerce education, and flexible study options.",
  path: "/home",
  keywords: [
    "vk accountancy home",
    "online learning kerala",
    "commerce education",
    "accountancy training",
  ],
});

export default function HeroSection() {
  return <HomePageContent />;
}
