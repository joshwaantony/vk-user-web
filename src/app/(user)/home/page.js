"use client"
import CourseGrid from "@/components/course/course-details/CourseGrid";
import CarouselPagination from "@/components/home/Carousel Card/CarouselPagination";
import PremiumCourseSlide from "@/components/home/Carousel Card/PremiumCourseSlide";
import SpecialOffer from "@/components/home/Carousel Card/SpecialOffer";
import HeroLeft from "@/components/home/HeroLeft";
import HeroRight from "@/components/home/HeroRight";
import PopularCoursesHeader from "@/components/home/most-popular/PopularCoursesHeader";
import WhyChooseVK from "@/components/home/why choose vk/WhyChooseVK";
import usePromoStore from "@/store/usePromoStore";


export default function HeroSection() {
   const {
    promos,
    activeIndex,
  } = usePromoStore();
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

          <CarouselPagination
        total={promos.length}
        current={activeIndex + 1}
      />
    </div>
    <div className="bg-white ">
            <PopularCoursesHeader />
            <CourseGrid />
                   




    </div>
    <div>
    </div>

    <div className="bg-white">
       <WhyChooseVK/>

    </div>

    </>
    
  );
}
