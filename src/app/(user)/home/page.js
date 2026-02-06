import CourseGrid from "@/components/course/CourseGrid";
import CarouselPagination from "@/components/home/Carousel Card/CarouselPagination";
import PremiumCourseSlide from "@/components/home/Carousel Card/PremiumCourseSlide";
import SpecialOffer from "@/components/home/Carousel Card/SpecialOffer";
import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";
import PopularCoursesHeader from "@/components/home/most-popular/PopularCoursesHeader";
import WhyChooseVK from "@/components/home/why choose vk/WhyChooseVK";


export default function HeroSection() {
  return (<>
    <section className="min-h-screen bg-[#F6F9FF] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <HeroLeft />
        <HeroRight />
      </div>
   
    </section>
    <div className="bg-white">
        <SpecialOffer/>
    <PremiumCourseSlide/> 
    <CarouselPagination/>   
    </div>
    <div className="bg-white">
            <PopularCoursesHeader />
            <CourseGrid />
                   


    <div className="w-full flex justify-center mt-12 sm:mt-14 md:mt-16">
  <button
    className="
       mb-20 border-2 
      border-[#1E40E6]
      text-[#1E40E6]
      font-semibold
      text-base sm:text-lg
      px-6 sm:px-8 md:px-10
      py-3 sm:py-3.5 md:py-4
      rounded-xl sm:rounded-xl
      hover:bg-[#1E40E6]
      hover:text-white
      transition
    "
  >
    View All Courses
  </button>
</div>

    </div>
    <div>
    </div>

    <div className="bg-white">
       <WhyChooseVK/>

    </div>

    </>
    
  );
}
