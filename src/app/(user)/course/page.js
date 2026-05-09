import CoursesSection from "@/components/course/CoursesSection";
import HeroSection from "@/components/course/HeroSection";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Courses",
  description:
    "Browse VK Accountancy courses in accountancy, commerce, and related subjects designed for practical understanding and career growth.",
  path: "/course",
  keywords: [
    "vk accountancy courses",
    "online accounting classes",
    "commerce courses",
    "practical accountancy training",
  ],
});

export default function HomePage() {
  return (
    <>
    <div className="bg-[#FFFFFF]">
          <HeroSection />
      <div className="">
              

      </div>

      <CoursesSection />
    </div>
  
    </>
  );
}
