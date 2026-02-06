import CourseCard from "@/components/my-course/CourseCard";
import MyCourses from "@/components/my-course/MyCourses";
import React from "react";

function page() {
  return <div className="bg-[#F6F9FF]">
    <CourseCard/>
    <MyCourses/>
  </div>;
}

export default page;
